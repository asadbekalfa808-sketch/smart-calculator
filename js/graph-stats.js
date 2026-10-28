/**
 * OMNI-CALCULATOR 114 — 5. GRAFIK VA JADVALLAR (Funksiyalar 62–69)
 */

class GraphStatsEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
  }

  init() {
    this.canvas = document.getElementById("functionCanvas");
    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
      this.drawAxes();
    }

    this.bindEvents();
    this.renderInitialGraph();
  }

  bindEvents() {
    // 62 & 63: Funksiya chizish
    const plotBtn = document.getElementById("plotFuncBtn");
    if (plotBtn) {
      plotBtn.addEventListener("click", () => this.plotCustomFunction());
    }

    const presetTrig = document.getElementById("trigPresetSelect");
    if (presetTrig) {
      presetTrig.addEventListener("change", (e) => {
        const exprInput = document.getElementById("plotExpression");
        if (exprInput && e.target.value) {
          exprInput.value = e.target.value;
          this.plotCustomFunction();
        }
      });
    }

    // 69: Grafikni yuklab olish
    const downloadBtn = document.getElementById("downloadGraphBtn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => this.downloadCanvasImage());
    }

    // 64, 65, 66: Statistika va Dinamik ma'lumotlar jadvali
    const statBtn = document.getElementById("calcStatsBtn");
    const dataInput = document.getElementById("statsDataInput");
    if (statBtn) {
      statBtn.addEventListener("click", () => this.calculateStatistics());
    }
    if (dataInput) {
      dataInput.addEventListener("input", () => this.calculateStatistics());
    }

    // 67: Progressiya (Arifmetik / Geometrik)
    const progBtn = document.getElementById("calcProgBtn");
    if (progBtn) {
      progBtn.addEventListener("click", () => this.calculateProgression());
    }

    // 68: Sonli ketma-ketliklar
    const seqBtn = document.getElementById("calcSeqBtn");
    if (seqBtn) {
      seqBtn.addEventListener("click", () => this.calculateSequences());
    }
  }

  drawAxes() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.ctx.clearRect(0, 0, w, h);

    // Fon to'ri
    this.ctx.strokeStyle = document.body.getAttribute("data-theme") === "dark" ? "#1f2937" : "#e2e8f0";
    this.ctx.lineWidth = 1;

    for (let x = 0; x <= w; x += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, h);
      this.ctx.stroke();
    }
    for (let y = 0; y <= h; y += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(w, y);
      this.ctx.stroke();
    }

    // O'qlar X va Y
    this.ctx.strokeStyle = document.body.getAttribute("data-theme") === "dark" ? "#64748b" : "#94a3b8";
    this.ctx.lineWidth = 2;

    // X o'qi
    this.ctx.beginPath();
    this.ctx.moveTo(0, h / 2);
    this.ctx.lineTo(w, h / 2);
    this.ctx.stroke();

    // Y o'qi
    this.ctx.beginPath();
    this.ctx.moveTo(w / 2, 0);
    this.ctx.lineTo(w / 2, h);
    this.ctx.stroke();
  }

  renderInitialGraph() {
    this.plotCustomFunction("Math.sin(x)");
  }

  // 62 & 63: y = f(x) va Trigonometriya grafigi
  plotCustomFunction(customExpr = null) {
    if (!this.ctx || !this.canvas) return;
    this.drawAxes();

    const exprInput = document.getElementById("plotExpression");
    let expr = customExpr || (exprInput ? exprInput.value.trim() : "Math.sin(x)");

    if (!expr) expr = "Math.sin(x)";

    // Sanitization & format
    let jsExpr = expr
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/sqrt/g, "Math.sqrt")
      .replace(/\^/g, "**")
      .replace(/pi|PI|π/g, "Math.PI")
      .replace(/e\^x/g, "Math.exp(x)");

    // Qayta Math.Math bo'lib qolmasligi uchun
    jsExpr = jsExpr.replace(/Math\.Math\./g, "Math.");

    const w = this.canvas.width;
    const h = this.canvas.height;
    const originX = w / 2;
    const originY = h / 2;
    const scale = 30; // 1 birlik = 30px

    this.ctx.strokeStyle = "#2563eb";
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();

    let started = false;
    let func = null;

    try {
      func = new Function("x", `return (${jsExpr});`);
    } catch (e) {
      alert("Funksiya sintaksisida xatolik: " + e.message);
      return;
    }

    for (let px = 0; px <= w; px++) {
      const x = (px - originX) / scale;
      try {
        const y = func(x);
        if (isFinite(y)) {
          const py = originY - y * scale;
          if (!started) {
            this.ctx.moveTo(px, py);
            started = true;
          } else {
            // Asimptotalarda (masalan tan da sakrash) chiziqni uzish
            if (Math.abs(y) > 20) {
              started = false;
            } else {
              this.ctx.lineTo(px, py);
            }
          }
        } else {
          started = false;
        }
      } catch (err) {
        started = false;
      }
    }
    this.ctx.stroke();
  }

  // 69: Grafikni PNG sifatida yuklab olish
  downloadCanvasImage() {
    if (!this.canvas) return;
    const link = document.createElement("a");
    link.download = "omni-calculator-graph.png";
    link.href = this.canvas.toDataURL("image/png");
    link.click();
    window.AppHistory && window.AppHistory.showToast("Grafik rasm sifatida yuklandi!");
  }

  // 64, 65, 66: Statistik tahlil va dinamik jadval
  calculateStatistics() {
    const raw = document.getElementById("statsDataInput")?.value || "";
    // Vergul, bo'sh joy yoki nuqtali vergul bilan ajratilgan sonlar
    const nums = raw
      .split(/[\s,;]+/)
      .map(Number)
      .filter(n => !isNaN(n) && isFinite(n));

    const resEl = document.getElementById("statsResult");
    if (!resEl) return;

    if (nums.length === 0) {
      resEl.innerHTML = "Sonlarni vergul yoki bo'sh joy bilan kiriting (masalan: 12, 15, 23, 23, 40)";
      return;
    }

    nums.sort((a, b) => a - b);
    const n = nums.length;
    const sum = nums.reduce((acc, v) => acc + v, 0);
    const mean = sum / n;

    // Mediana
    let median = 0;
    if (n % 2 === 1) {
      median = nums[Math.floor(n / 2)];
    } else {
      median = (nums[n / 2 - 1] + nums[n / 2]) / 2;
    }

    // Moda
    const freq = {};
    let maxFreq = 0;
    nums.forEach(val => {
      freq[val] = (freq[val] || 0) + 1;
      if (freq[val] > maxFreq) maxFreq = freq[val];
    });
    const modes = Object.keys(freq).filter(k => freq[k] === maxFreq && maxFreq > 1);

    // Min, Max, Quloch (Range)
    const min = nums[0];
    const max = nums[n - 1];
    const range = max - min;

    // Dispersiya va Standart chetlanish
    const variance = nums.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    resEl.innerHTML = `
      <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:8px;">
        <div>Elementlar soni (N): <strong>${n}</strong></div>
        <div>Yig'indi (Σ): <strong>${sum.toFixed(4)}</strong></div>
        <div>O'rtacha arifmetik: <strong>${mean.toFixed(4)}</strong></div>
        <div>Mediana: <strong>${median.toFixed(4)}</strong></div>
        <div>Moda: <strong>${modes.length ? modes.join(", ") : "Mavjud emas"}</strong></div>
        <div>Min / Max: <strong>${min} / ${max}</strong></div>
        <div>Quloch (Range): <strong>${range}</strong></div>
        <div>Dispersiya (σ²): <strong>${variance.toFixed(4)}</strong></div>
        <div>Standart chetlanish (σ): <strong>${stdDev.toFixed(4)}</strong></div>
      </div>
    `;

    // 66: Dinamik ma'lumotlar grafigi chizish
    this.drawDataPoints(nums);
  }

  drawDataPoints(nums) {
    const dataCanvas = document.getElementById("statsCanvas");
    if (!dataCanvas) return;
    const ctx = dataCanvas.getContext("2d");
    const w = dataCanvas.width;
    const h = dataCanvas.height;

    ctx.clearRect(0, 0, w, h);
    if (nums.length < 2) return;

    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const range = max - min || 1;

    ctx.strokeStyle = "#10b981";
    ctx.fillStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.beginPath();

    const padding = 20;
    const stepX = (w - padding * 2) / (nums.length - 1);

    nums.forEach((val, i) => {
      const x = padding + i * stepX;
      const y = h - padding - ((val - min) / range) * (h - padding * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Nuqtalarni belgilash
    nums.forEach((val, i) => {
      const x = padding + i * stepX;
      const y = h - padding - ((val - min) / range) * (h - padding * 2);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // 67: Arifmetik va geometrik progressiya
  calculateProgression() {
    const type = document.getElementById("progType").value; // 'arithmetic' yoki 'geometric'
    const a1 = parseFloat(document.getElementById("progA1").value) || 0;
    const diff = parseFloat(document.getElementById("progDiff").value) || 0;
    const n = parseInt(document.getElementById("progN").value) || 10;

    const resEl = document.getElementById("progResult");
    if (n <= 0) return;

    const terms = [];
    let sum = 0;

    if (type === "arithmetic") {
      // an = a1 + (n - 1) * d; Sn = n * (a1 + an) / 2
      for (let i = 1; i <= Math.min(n, 30); i++) {
        const val = a1 + (i - 1) * diff;
        terms.push(val);
      }
      const an = a1 + (n - 1) * diff;
      sum = (n * (a1 + an)) / 2;

      if (resEl) {
        resEl.innerHTML = `
          <div><strong>${n}-hadi (a_${n}):</strong> ${an}</div>
          <div><strong>Dastlabki ${n} ta hadi yig'indisi (S_${n}):</strong> ${sum}</div>
          <div style="font-size:12px; margin-top:4px; color:var(--text-muted); word-break:break-all;">Ketma-ketlik: ${terms.join(", ")}${n > 30 ? "..." : ""}</div>
        `;
      }
    } else {
      // Geometrik: an = a1 * q^(n-1); Sn = a1 * (1 - q^n) / (1 - q)
      for (let i = 1; i <= Math.min(n, 20); i++) {
        const val = a1 * Math.pow(diff, i - 1);
        terms.push(val);
      }
      const an = a1 * Math.pow(diff, n - 1);
      if (diff === 1) {
        sum = a1 * n;
      } else {
        sum = (a1 * (1 - Math.pow(diff, n))) / (1 - diff);
      }

      if (resEl) {
        resEl.innerHTML = `
          <div><strong>${n}-hadi (b_${n}):</strong> ${an.toLocaleString()}</div>
          <div><strong>Dastlabki ${n} ta hadi yig'indisi (S_${n}):</strong> ${sum.toLocaleString()}</div>
          <div style="font-size:12px; margin-top:4px; color:var(--text-muted); word-break:break-all;">Ketma-ketlik: ${terms.join(", ")}${n > 20 ? "..." : ""}</div>
        `;
      }
    }
  }

  // 68: Sonli ketma-ketliklar (Fibonachchi, Tub sonlar, Kvadratlar, Kublar)
  calculateSequences() {
    const type = document.getElementById("seqType").value;
    const count = parseInt(document.getElementById("seqCount").value) || 15;
    const resEl = document.getElementById("seqResult");
    if (!resEl) return;

    let res = [];

    if (type === "fibonacci") {
      let a = 0, b = 1;
      for (let i = 0; i < count; i++) {
        res.push(a);
        const temp = a + b;
        a = b;
        b = temp;
      }
    } else if (type === "prime") {
      let candidate = 2;
      while (res.length < count) {
        let isPrime = true;
        for (let d = 2; d * d <= candidate; d++) {
          if (candidate % d === 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) res.push(candidate);
        candidate++;
      }
    } else if (type === "squares") {
      for (let i = 1; i <= count; i++) res.push(i * i);
    } else if (type === "cubes") {
      for (let i = 1; i <= count; i++) res.push(i * i * i);
    }

    resEl.innerHTML = `<strong>Ketma-ketlik (${res.length} ta):</strong><br><span style="font-family:monospace; line-height:1.6;">${res.join(", ")}</span>`;
  }
}

window.AppGraphStats = new GraphStatsEngine();
