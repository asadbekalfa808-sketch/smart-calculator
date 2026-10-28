/**
 * OMNI-CALCULATOR 114 — 11. QULAYLIK VA SOZLAMALAR (Funksiyalar 85–94)
 */

// Web Audio API yordamida tovushlar sintezi
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem("omni_sound_enabled") !== "false";
  }

  init() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {}
  }

  playClick() {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playSuccess() {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
    osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.1); // E5
    osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.2); // G5

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playAlarm() {
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
      }, i * 300);
    }
  }
}

window.AppAudio = new SoundEffects();

// Tarix va Sozlamalar menejeri
class SettingsHistoryManager {
  constructor() {
    this.history = JSON.parse(localStorage.getItem("omni_calc_history") || "[]");
    this.theme = localStorage.getItem("omni_theme") || "light";
  }

  init() {
    window.AppAudio.init();
    this.applyTheme(this.theme);
    this.renderHistory();
    this.bindKeyboard();
    this.bindSettings();
  }

  // 85: Hisoblash tarixini saqlash
  addEntry(expression, result) {
    const entry = {
      id: Date.now(),
      expr: expression,
      res: result,
      time: new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })
    };
    this.history.unshift(entry);
    if (this.history.length > 50) this.history.pop();
    localStorage.setItem("omni_calc_history", JSON.stringify(this.history));
    this.renderHistory();
  }

  clearHistory() {
    this.history = [];
    localStorage.removeItem("omni_calc_history");
    this.renderHistory();
    this.showToast("Tarix tozalandi");
  }

  renderHistory() {
    const container = document.getElementById("historyList");
    if (!container) return;

    if (this.history.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:13px;" data-i18n="empty_history">${window.t ? window.t("empty_history") : "Tarix bo'sh"}</div>`;
      return;
    }

    container.innerHTML = "";
    this.history.forEach(item => {
      const el = document.createElement("div");
      el.className = "history-item";
      el.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="history-expr">${item.expr} =</div>
          <span style="font-size:11px; color:var(--text-muted);">${item.time}</span>
        </div>
        <div class="history-res">${item.res}</div>
      `;
      el.addEventListener("click", () => {
        if (window.CoreCalc) {
          window.CoreCalc.expression = item.res.toString();
          window.CoreCalc.displayValue = item.res.toString();
          window.CoreCalc.updateScreen();
        }
      });
      container.appendChild(el);
    });
  }

  // 86: Natijani nusxalash
  copyToClipboard(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      this.showToast((window.t ? window.t("copied") : "Nusxalandi!") + " " + text);
      window.AppAudio.playClick();
    }).catch(() => {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      this.showToast("Nusxalandi!");
    });
  }

  showToast(message) {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>📋</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // 87: Klaviatura orqali boshqaruv
  bindKeyboard() {
    window.addEventListener("keydown", (e) => {
      // Input yoki textarea da bo'lsa aralashmaslik
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        return;
      }

      const key = e.key;

      if (!isNaN(key)) {
        window.CoreCalc && window.CoreCalc.inputDigitOrSymbol(key);
      } else if (["+", "-", "*", "/", "%", "^", "(", ")", "."].includes(key)) {
        window.CoreCalc && window.CoreCalc.inputDigitOrSymbol(key);
      } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        window.CoreCalc && window.CoreCalc.evaluate();
      } else if (key === "Backspace") {
        window.CoreCalc && window.CoreCalc.handleAction("backspace");
      } else if (key === "Escape" || key.toLowerCase() === "c") {
        window.CoreCalc && window.CoreCalc.handleAction("clear");
      }
    });
  }

  // 88: Dark mode / Light mode
  applyTheme(theme) {
    this.theme = theme;
    localStorage.setItem("omni_theme", theme);
    document.body.setAttribute("data-theme", theme);

    const themeToggleBtn = document.getElementById("themeToggleBtn");
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === "dark" ? "☀️" : "🌙";
      themeToggleBtn.title = theme === "dark" ? "Kunduzgi rejim" : "Tungi rejim";
    }
  }

  toggleTheme() {
    const newTheme = this.theme === "dark" ? "light" : "dark";
    this.applyTheme(newTheme);
  }

  // 89: Ovozli o'qish (Text-to-Speech)
  speakText(text) {
    if (!("speechSynthesis" in window)) {
      alert("Brauzeringiz ovozli sintezni qo'llab-quvvatlamaydi.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === "ru" ? "ru-RU" : (currentLang === "en" ? "en-US" : "uz-UZ");
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  // 93: PDF va CSV eksport
  exportCSV() {
    if (this.history.length === 0) {
      alert("Tarix bo'sh, eksport qilib bo'lmaydi.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,ID,Vaqt,Ifoda,Natija\n";
    this.history.forEach(item => {
      csvContent += `${item.id},"${item.time}","${item.expr}","${item.res}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `omni-calculator-history-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast("CSV fayl yuklab olindi!");
  }

  exportPDF() {
    if (this.history.length === 0) {
      alert("Tarix bo'sh, eksport qilib bo'lmaydi.");
      return;
    }

    if (window.jspdf && window.jspdf.jsPDF) {
      const doc = new window.jspdf.jsPDF();
      doc.setFontSize(16);
      doc.text("OmniCalc 114 - Hisoblash Tarixi", 14, 20);
      doc.setFontSize(10);
      doc.text(`Sana: ${new Date().toLocaleString()}`, 14, 28);

      let y = 38;
      doc.setFontSize(11);
      this.history.slice(0, 25).forEach((item, idx) => {
        doc.text(`${idx + 1}. [${item.time}] ${item.expr} = ${item.res}`, 14, y);
        y += 8;
      });

      doc.save(`omni-calculator-report-${Date.now()}.pdf`);
      this.showToast("PDF hisobot yuklandi!");
    } else {
      // Fallback: brauzer print orqali PDF
      window.print();
    }
  }

  bindSettings() {
    // Theme toggle
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => this.toggleTheme());
    }

    // Modal open/close
    const settingsBtn = document.getElementById("settingsModalBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeBtn = document.getElementById("closeSettingsModal");

    if (settingsBtn && settingsModal) {
      settingsBtn.addEventListener("click", () => settingsModal.classList.add("active"));
    }
    if (closeBtn && settingsModal) {
      closeBtn.addEventListener("click", () => settingsModal.classList.remove("active"));
    }
    if (settingsModal) {
      settingsModal.addEventListener("click", (e) => {
        if (e.target === settingsModal) settingsModal.classList.remove("active");
      });
    }

    // Sound toggle
    const soundCheck = document.getElementById("settingSoundToggle");
    if (soundCheck) {
      soundCheck.checked = window.AppAudio.enabled;
      soundCheck.addEventListener("change", (e) => {
        window.AppAudio.enabled = e.target.checked;
        localStorage.setItem("omni_sound_enabled", e.target.checked);
      });
    }

    // Precision setting
    const precInput = document.getElementById("settingPrecisionInput");
    if (precInput) {
      precInput.value = window.CoreCalc?.precision || 8;
      precInput.addEventListener("change", (e) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val >= 0 && val <= 12) {
          if (window.CoreCalc) window.CoreCalc.precision = val;
          localStorage.setItem("omni_precision", val);
        }
      });
    }

    // Export buttons
    const exportCsvBtn = document.getElementById("exportCsvBtn");
    const exportPdfBtn = document.getElementById("exportPdfBtn");
    const clearHistBtn = document.getElementById("clearHistoryBtn");

    if (exportCsvBtn) exportCsvBtn.addEventListener("click", () => this.exportCSV());
    if (exportPdfBtn) exportPdfBtn.addEventListener("click", () => this.exportPDF());
    if (clearHistBtn) clearHistBtn.addEventListener("click", () => this.clearHistory());
  }
}

window.AppHistory = new SettingsHistoryManager();
