/**
 * OMNI-CALCULATOR 114 — 10. YANGI VA INNOVATSION FUNKSIYALAR (Funksiyalar 107–114)
 */

class InnovationAIEngine {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.stopwatchTimer = null;
    this.stopwatchElapsed = 0;
    this.stopwatchRunning = false;
    this.timerCountdown = null;
  }

  init() {
    this.bindEvents();
    this.initClock();
    this.initNotepad();
    this.initSpeechRecognition();
  }

  bindEvents() {
    // 107: AI yordamchisi
    const aiBtn = document.getElementById("aiAskBtn");
    if (aiBtn) aiBtn.addEventListener("click", () => this.askAI());

    // 108: Ovozli kiritish
    const voiceBtn = document.getElementById("voiceInputBtn");
    if (voiceBtn) voiceBtn.addEventListener("click", () => this.toggleVoiceInput());

    // 109: Bosqichma-bosqich yechim
    const stepBtn = document.getElementById("stepSolverBtn");
    if (stepBtn) stepBtn.addEventListener("click", () => this.solveStepByStep());

    // 110: Raqamni so'z bilan yozish
    const numToWordsBtn = document.getElementById("numToWordsBtn");
    if (numToWordsBtn) numToWordsBtn.addEventListener("click", () => this.convertNumberToWords());

    // 111: QR-kod yaratish
    const qrBtn = document.getElementById("genQrBtn");
    if (qrBtn) qrBtn.addEventListener("click", () => this.generateQRCode());

    // 112: Shtrix-kod yaratish
    const barcodeBtn = document.getElementById("genBarcodeBtn");
    if (barcodeBtn) barcodeBtn.addEventListener("click", () => this.generateBarcode());

    // 113: Sekundomer va Taymer
    const swStart = document.getElementById("swStartBtn");
    const swReset = document.getElementById("swResetBtn");
    if (swStart) swStart.addEventListener("click", () => this.toggleStopwatch());
    if (swReset) swReset.addEventListener("click", () => this.resetStopwatch());

    const tmStart = document.getElementById("tmStartBtn");
    if (tmStart) tmStart.addEventListener("click", () => this.startTimer());
  }

  // 107: AI yordamchisi (Mahalliy aqlli ekspertiza + ixtiyoriy tashqi API)
  askAI() {
    const query = document.getElementById("aiQueryInput")?.value.trim();
    const resEl = document.getElementById("aiResult");
    const apiKey = document.getElementById("aiApiKeyInput")?.value.trim();

    if (!query) return;

    if (resEl) {
      resEl.innerHTML = `<div style="color:var(--primary);">${window.t ? window.t("ai_loading") : "AI tahlil qilmoqda..."}</div>`;
    }

    // Agar foydalanuvchi OpenAI yoki Gemini API kalitini kiritgan bo'lsa
    if (apiKey) {
      this.fetchExternalAI(query, apiKey, resEl);
      return;
    }

    // Mahalliy ekspert intellektual bazasi (O'zbek, Rus va Ingliz tillarida tushuntirish)
    setTimeout(() => {
      const q = query.toLowerCase();
      let response = "";

      if (q.includes("pifagor") || q.includes("pythagor")) {
        response = `<strong>Pifagor teoremasi:</strong> To'g'ri burchakli uchburchakda gipotenuza kvadrati katetlar kvadratlari yig'indisiga teng: <br><code>c² = a² + b²</code>.<br>Masalan, katetlar 3 va 4 bo'lsa: 3² + 4² = 9 + 16 = 25, demak c = √25 = 5.`;
      } else if (q.includes("kvadrat tenglama") || q.includes("дискриминант") || q.includes("quadratic")) {
        response = `<strong>Kvadrat tenglama yechish usuli:</strong> <code>ax² + bx + c = 0</code> ko'rinishidagi tenglama.<br>1. Diskriminant topiladi: <code>D = b² - 4ac</code><br>2. Agar D > 0 bo'lsa: x₁,₂ = (-b ± √D) / (2a)<br>3. Agar D = 0 bo'lsa: bitta ildiz x = -b / (2a)<br>4. Agar D < 0 bo'lsa: haqiqiy ildizlar yo'q.`;
      } else if (q.includes("foiz") || q.includes("процент") || q.includes("percent")) {
        response = `<strong>Foiz hisoblash:</strong> Foiz — bu sonning yuzdan bir qismi (1/100).<br>A sonining B foizini topish uchun: <code>(A × B) / 100</code> amali bajariladi.`;
      } else if (q.includes("faktorial") || q.includes("factorial") || q.includes("!")) {
        response = `<strong>Faktorial (n!):</strong> 1 dan n gacha bo'lgan barcha natural sonlar ko'paytmasi.<br>Masalan: 5! = 1 × 2 × 3 × 4 × 5 = 120. Matematikada 0! = 1 deb qabul qilingan.`;
      } else if (q.includes("logarifm") || q.includes("logarithm") || q.includes("log")) {
        response = `<strong>Logarifm:</strong> log_b(a) = c bu b^c = a degani. Ya'ni, asos b ni qaysi darajaga ko'tarsak a hosil bo'ladi degan savolga javob beradi.`;
      } else {
        // Matematik ifodani avtomatik tahlil qilish
        try {
          const sanitized = query.replace(/[^0-9\+\-\*\/\.\(\)\^]/g, "").replace(/\^/g, "**");
          if (sanitized) {
            const val = eval(sanitized);
            response = `Kiritilgan matematik ifoda: <code>${query}</code><br>Hisoblash natijasi: <strong>${val}</strong><br>Hisoblash ketma-ketligi: Qavslar ichi -> Daraja -> Ko'paytirish/Bo'lish -> Qo'shish/Ayirish qoidasi asosida bajarildi.`;
          } else {
            response = `Siz kiritgan savol bo'yicha tushuntirish: Ushbu mavzuni to'liq tahlil qilish uchun aniq matematik ifoda yoki formulani kiriting, yoki Gemini API kalitini kiritib kengroq javob oling.`;
          }
        } catch (e) {
          response = `Matematik savolingiz qabul qilindi. Aniq formula yoki ifodani kiriting (masalan: 2^10 yoki kvadrat tenglama).`;
        }
      }

      if (resEl) resEl.innerHTML = response;
    }, 600);
  }

  async fetchExternalAI(query, apiKey, resEl) {
    try {
      // Gemini API or OpenAI API format
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Sen eng aqlli matematik yordamchisan. Ushbu savolga tushunarli, bosqichma-bosqich javob ber: ${query}` }] }]
        })
      });
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        resEl.innerHTML = text.replace(/\n/g, "<br>");
      } else {
        resEl.textContent = "AI javob bera olmadi. API kalitni tekshiring.";
      }
    } catch (err) {
      resEl.textContent = "API ulanish xatosi: " + err.message;
    }
  }

  // 108: Ovozli kiritish (Web Speech API)
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = "uz-UZ";

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.processVoiceText(transcript);
        this.stopVoiceInput();
      };

      this.recognition.onerror = () => {
        this.stopVoiceInput();
      };

      this.recognition.onend = () => {
        this.stopVoiceInput();
      };
    }
  }

  toggleVoiceInput() {
    if (!this.recognition) {
      alert("Kechirasiz, brauzeringiz ovozli kiritishni qo'llab-quvvatlamaydi (Google Chrome tavsiya etiladi).");
      return;
    }

    if (this.isListening) {
      this.stopVoiceInput();
    } else {
      this.startVoiceInput();
    }
  }

  startVoiceInput() {
    this.isListening = true;
    const btn = document.getElementById("voiceInputBtn");
    const status = document.getElementById("voiceStatusText");
    if (btn) btn.classList.add("active");
    if (status) status.textContent = window.t ? window.t("speech_listening") : "Eshitilmoqda... gapiring";

    try {
      this.recognition.lang = currentLang === "ru" ? "ru-RU" : (currentLang === "en" ? "en-US" : "uz-UZ");
      this.recognition.start();
    } catch (e) {}
  }

  stopVoiceInput() {
    this.isListening = false;
    const btn = document.getElementById("voiceInputBtn");
    const status = document.getElementById("voiceStatusText");
    if (btn) btn.classList.remove("active");
    if (status) status.textContent = "";
    try {
      this.recognition.stop();
    } catch (e) {}
  }

  processVoiceText(text) {
    // Matndagi matematik so'zlarni belgilarga aylantirish
    let expr = text.toLowerCase()
      .replace(/qo'shuv|qo'shish|plyus|плюс|plus/g, "+")
      .replace(/ayiruv|ayirish|minus|минус/g, "-")
      .replace(/ko'paytiruv|ko'paytirish|zarb|умножить|times|multiply/g, "*")
      .replace(/bo'luv|bo'lish|taqsim|разделить|divide/g, "/")
      .replace(/daraja|darajasi|степень|power/g, "^")
      .replace(/ildiz|ildizi|корень|root/g, "sqrt")
      .replace(/bir|один|one/g, "1")
      .replace(/ikki|два|two/g, "2")
      .replace(/uch|три|three/g, "3")
      .replace(/to'rt|четыре|four/g, "4")
      .replace(/besh|пять|five/g, "5")
      .replace(/olti|шесть|six/g, "6")
      .replace(/yetti|семь|seven/g, "7")
      .replace(/sakkiz|восемь|eight/g, "8")
      .replace(/to'qqiz|девять|nine/g, "9")
      .replace(/nol|ноль|zero/g, "0");

    const input = document.getElementById("stepExprInput");
    if (input) input.value = expr;
    this.solveStepByStep(expr);
  }

  // 109: Ifodani bosqichma-bosqich yechib ko'rsatish
  solveStepByStep(forcedExpr = null) {
    const raw = forcedExpr || document.getElementById("stepExprInput")?.value.trim();
    const resEl = document.getElementById("stepResult");
    if (!raw || !resEl) return;

    try {
      const steps = [];
      steps.push(`Boshlang'ich ifoda: <strong>${raw}</strong>`);

      let expr = raw.replace(/\s+/g, "");

      // Qavslarni qadamma-qadam yechish
      while (/\([^\(\)]+\)/.test(expr)) {
        expr = expr.replace(/\(([^\(\)]+)\)/, (match, inner) => {
          const val = eval(inner.replace(/\^/g, "**"));
          steps.push(`Qavs ichidagi amal (${inner}) = <strong>${val}</strong>`);
          return val;
        });
      }

      // Ko'paytirish va bo'lish
      const finalVal = eval(expr.replace(/\^/g, "**"));
      steps.push(`Yakuniy arifmetik hisob = <strong>${finalVal}</strong>`);

      resEl.innerHTML = steps.map((s, idx) => `<div>${idx + 1}-qadam: ${s}</div>`).join("");
    } catch (e) {
      resEl.textContent = "Ifodani yechishda xatolik yuz berdi.";
    }
  }

  // 110: Raqamni so'z bilan yozish (O'zbek, Rus, Ingliz)
  convertNumberToWords() {
    const num = parseInt(document.getElementById("numToWordsInput")?.value);
    const resEl = document.getElementById("numToWordsResult");
    if (isNaN(num)) return;

    const uzText = this.numberToUzbekWords(num);
    const ruText = this.numberToRussianWords(num);
    const enText = this.numberToEnglishWords(num);

    if (resEl) {
      resEl.innerHTML = `
        <div>🇺🇿 O'zbekcha: <strong>${uzText}</strong></div>
        <div>🇷🇺 Русский: <strong>${ruText}</strong></div>
        <div>🇬🇧 English: <strong>${enText}</strong></div>
      `;
    }
  }

  numberToUzbekWords(n) {
    if (n === 0) return "nol";
    if (n < 0) return "minus " + this.numberToUzbekWords(-n);

    const units = ["", "bir", "ikki", "uch", "to'rt", "besh", "olti", "yetti", "sakkiz", "to'qqiz"];
    const tens = ["", "o'n", "yigirma", "o'ttiz", "qirq", "ellik", "oltmish", "yetmish", "sakson", "to'qson"];

    const convertChunk = (num) => {
      let str = "";
      const h = Math.floor(num / 100);
      const t = Math.floor((num % 100) / 10);
      const u = num % 10;

      if (h > 0) str += (h === 1 ? "bir yuz" : units[h] + " yuz") + " ";
      if (t > 0) str += tens[t] + " ";
      if (u > 0) str += units[u] + " ";
      return str.trim();
    };

    const billion = Math.floor(n / 1000000000);
    const million = Math.floor((n % 1000000000) / 1000000);
    const thousand = Math.floor((n % 1000000) / 1000);
    const remainder = n % 1000;

    let res = "";
    if (billion > 0) res += convertChunk(billion) + " milliard ";
    if (million > 0) res += convertChunk(million) + " million ";
    if (thousand > 0) res += convertChunk(thousand) + " ming ";
    if (remainder > 0) res += convertChunk(remainder);

    return res.trim();
  }

  numberToRussianWords(n) {
    if (n === 0) return "ноль";
    if (n < 0) return "минус " + this.numberToRussianWords(-n);
    // Soddalashtirilgan ruscha lug'at
    const ones = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять",
                  "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
    const tens = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
    const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];

    if (n < 20) return ones[n];
    if (n < 100) return (tens[Math.floor(n / 10)] + " " + ones[n % 10]).trim();
    if (n < 1000) return (hundreds[Math.floor(n / 100)] + " " + this.numberToRussianWords(n % 100)).trim();
    if (n < 1000000) return (this.numberToRussianWords(Math.floor(n / 1000)) + " тысяч " + this.numberToRussianWords(n % 1000)).trim();
    return n.toString();
  }

  numberToEnglishWords(n) {
    if (n === 0) return "zero";
    if (n < 0) return "minus " + this.numberToEnglishWords(-n);

    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
                  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    if (n < 20) return ones[n];
    if (n < 100) return (tens[Math.floor(n / 10)] + " " + ones[n % 10]).trim();
    if (n < 1000) return (ones[Math.floor(n / 100)] + " hundred " + (n % 100 ? "and " + this.numberToEnglishWords(n % 100) : "")).trim();
    if (n < 1000000) return (this.numberToEnglishWords(Math.floor(n / 1000)) + " thousand " + this.numberToEnglishWords(n % 1000)).trim();
    return n.toString();
  }

  // 111: QR-kod yaratish
  generateQRCode() {
    const text = document.getElementById("qrTextInput")?.value.trim() || "OmniCalc 114";
    const container = document.getElementById("qrCodeContainer");
    if (!container) return;
    container.innerHTML = "";

    if (window.QRCode) {
      new QRCode(container, {
        text: text,
        width: 160,
        height: 160,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    } else {
      // Fallback Canvas QR simulyatsiyasi yoki image
      const img = document.createElement("img");
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(text)}`;
      img.alt = "QR Code";
      container.appendChild(img);
    }
  }

  // 112: Shtrix-kod yaratish (JsBarcode)
  generateBarcode() {
    const text = document.getElementById("barcodeInput")?.value.trim() || "123456789";
    const svgEl = document.getElementById("barcodeSvg");
    if (!svgEl) return;

    if (window.JsBarcode) {
      try {
        JsBarcode(svgEl, text, {
          format: "CODE128",
          lineColor: document.body.getAttribute("data-theme") === "dark" ? "#ffffff" : "#000000",
          width: 2,
          height: 60,
          displayValue: true
        });
      } catch (e) {
        alert("Shtrix kod yaratishda xatolik: " + e.message);
      }
    }
  }

  // 113: Raqamli soat, taymer va sekundomer
  initClock() {
    const update = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("uz-UZ");
      const clockTop = document.getElementById("topDigitalClock");
      const clockWidget = document.getElementById("widgetDigitalClock");
      if (clockTop) clockTop.textContent = timeStr;
      if (clockWidget) clockWidget.textContent = timeStr;
    };
    update();
    setInterval(update, 1000);
  }

  toggleStopwatch() {
    const btn = document.getElementById("swStartBtn");
    if (this.stopwatchRunning) {
      clearInterval(this.stopwatchTimer);
      this.stopwatchRunning = false;
      if (btn) btn.textContent = "Start";
    } else {
      const startTime = Date.now() - this.stopwatchElapsed;
      this.stopwatchTimer = setInterval(() => {
        this.stopwatchElapsed = Date.now() - startTime;
        this.updateStopwatchDisplay();
      }, 50);
      this.stopwatchRunning = true;
      if (btn) btn.textContent = "Pause";
    }
  }

  resetStopwatch() {
    clearInterval(this.stopwatchTimer);
    this.stopwatchRunning = false;
    this.stopwatchElapsed = 0;
    const btn = document.getElementById("swStartBtn");
    if (btn) btn.textContent = "Start";
    this.updateStopwatchDisplay();
  }

  updateStopwatchDisplay() {
    const el = document.getElementById("swDisplay");
    if (!el) return;
    const totalMs = this.stopwatchElapsed;
    const ms = Math.floor((totalMs % 1000) / 10);
    const sec = Math.floor((totalMs / 1000) % 60);
    const min = Math.floor(totalMs / 60000);
    el.textContent = `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
  }

  startTimer() {
    const mins = parseInt(document.getElementById("tmMinutesInput")?.value) || 0;
    const secs = parseInt(document.getElementById("tmSecondsInput")?.value) || 0;
    let totalSec = mins * 60 + secs;

    const display = document.getElementById("tmDisplay");
    if (totalSec <= 0 || !display) return;

    if (this.timerCountdown) clearInterval(this.timerCountdown);

    this.timerCountdown = setInterval(() => {
      totalSec--;
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      display.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;

      if (totalSec <= 0) {
        clearInterval(this.timerCountdown);
        display.textContent = "Vaqt tugadi! 🔔";
        window.AppAudio && window.AppAudio.playAlarm();
        alert("Taymer vaqti tugadi!");
      }
    }, 1000);
  }

  // 114: Mini-Notepad (localStorage bilan doimiy saqlanadi)
  initNotepad() {
    const textarea = document.getElementById("calcNotepad");
    if (!textarea) return;

    textarea.value = localStorage.getItem("omni_notepad_content") || "";
    textarea.addEventListener("input", () => {
      localStorage.setItem("omni_notepad_content", textarea.value);
    });
  }
}

window.AppInnovationAI = new InnovationAIEngine();
