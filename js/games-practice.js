/**
 * OMNI-CALCULATOR 114 — 9. O'YIN VA MASHQ FUNKSIYALARI (Funksiyalar 101–106)
 */

class GamesPracticeEngine {
  constructor() {
    this.speedTimer = null;
    this.speedTimeLeft = 60;
    this.speedScore = 0;
    this.currentQuizAnswer = null;
    this.speedAnswer = null;
  }

  init() {
    this.bindEvents();
    this.generateQuizQuestion();
  }

  bindEvents() {
    // 101: Sudoku Generator
    const sudokuBtn = document.getElementById("genSudokuBtn");
    if (sudokuBtn) sudokuBtn.addEventListener("click", () => this.generateSudoku());

    // 102: Matematik o'yin
    const checkQuizBtn = document.getElementById("checkQuizBtn");
    const newQuizBtn = document.getElementById("newQuizBtn");
    if (checkQuizBtn) checkQuizBtn.addEventListener("click", () => this.checkQuizAnswer());
    if (newQuizBtn) newQuizBtn.addEventListener("click", () => this.generateQuizQuestion());

    // 103: Tez hisoblash testi (60s)
    const startSpeedBtn = document.getElementById("startSpeedBtn");
    const speedSubmitBtn = document.getElementById("speedSubmitBtn");
    const speedInput = document.getElementById("speedInput");

    if (startSpeedBtn) startSpeedBtn.addEventListener("click", () => this.startSpeedTest());
    if (speedSubmitBtn) speedSubmitBtn.addEventListener("click", () => this.checkSpeedAnswer());
    if (speedInput) {
      speedInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.checkSpeedAnswer();
      });
    }

    // 104: Aqliy mashq
    const mentalBtn = document.getElementById("mentalPracticeBtn");
    if (mentalBtn) mentalBtn.addEventListener("click", () => this.generateMentalPractice());

    // 105: Tasodifiy sonlar generatori (RNG)
    const rngBtn = document.getElementById("genRngBtn");
    if (rngBtn) rngBtn.addEventListener("click", () => this.generateRNG());

    // 106: Numerologiya
    const numBtn = document.getElementById("calcNumerologyBtn");
    if (numBtn) numBtn.addEventListener("click", () => this.calcNumerology());
  }

  // 101: Sudoku generatori
  generateSudoku() {
    const gridEl = document.getElementById("sudokuGrid");
    if (!gridEl) return;
    gridEl.innerHTML = "";

    // Baza shablon
    const base = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    // Tasodifiy sonlar bilan almashtirish (1-9 permutatsiya)
    const map = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);

    gridEl.style.display = "grid";
    gridEl.style.gridTemplateColumns = "repeat(9, 1fr)";
    gridEl.style.gap = "2px";
    gridEl.style.maxWidth = "360px";
    gridEl.style.margin = "0 auto";
    gridEl.style.background = "#94a3b8";
    gridEl.style.padding = "2px";
    gridEl.style.borderRadius = "8px";

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const cell = document.createElement("input");
        cell.type = "text";
        cell.maxLength = 1;
        cell.style.width = "100%";
        cell.style.aspectRatio = "1";
        cell.style.textAlign = "center";
        cell.style.fontWeight = "bold";
        cell.style.fontSize = "16px";
        cell.style.border = "none";
        cell.style.outline = "none";
        cell.style.background = "var(--bg-secondary)";
        cell.style.color = "var(--text-primary)";

        const val = base[r][c];
        if (val !== 0) {
          const newVal = map[val - 1];
          cell.value = newVal;
          cell.readOnly = true;
          cell.style.background = "var(--bg-tertiary)";
          cell.style.color = "var(--primary)";
        }
        gridEl.appendChild(cell);
      }
    }

    const note = document.getElementById("sudokuNote");
    if (note) note.textContent = "Yangi Sudoku yaratildi! Bo'sh katakchalarni 1 dan 9 gacha to'ldiring.";
  }

  // 102: Matematik misollar o'yini
  generateQuizQuestion() {
    const diff = document.getElementById("quizDifficulty")?.value || "easy";
    let max = 20;
    if (diff === "medium") max = 100;
    if (diff === "hard") max = 500;

    const ops = ["+", "-", "*"];
    const op = ops[Math.floor(Math.random() * (diff === "easy" ? 2 : 3))];

    let a = Math.floor(Math.random() * max) + 1;
    let b = Math.floor(Math.random() * (op === "*" ? (diff === "hard" ? 25 : 12) : max)) + 1;

    if (op === "-" && a < b) {
      const temp = a; a = b; b = temp;
    }

    if (op === "+") this.currentQuizAnswer = a + b;
    if (op === "-") this.currentQuizAnswer = a - b;
    if (op === "*") this.currentQuizAnswer = a * b;

    const qEl = document.getElementById("quizQuestion");
    const inputEl = document.getElementById("quizAnswerInput");
    const resEl = document.getElementById("quizResult");

    if (qEl) qEl.textContent = `${a} ${op} ${b} = ?`;
    if (inputEl) {
      inputEl.value = "";
      inputEl.focus();
    }
    if (resEl) resEl.textContent = "";
  }

  checkQuizAnswer() {
    const userVal = parseFloat(document.getElementById("quizAnswerInput")?.value);
    const resEl = document.getElementById("quizResult");
    if (isNaN(userVal)) return;

    if (userVal === this.currentQuizAnswer) {
      resEl.innerHTML = `<span style="color:var(--accent-green); font-weight:bold;">To'g'ri! Barakalla! 🎉</span>`;
      window.AppAudio && window.AppAudio.playSuccess();
      setTimeout(() => this.generateQuizQuestion(), 1200);
    } else {
      resEl.innerHTML = `<span style="color:var(--accent-red); font-weight:bold;">Noto'g'ri. Qayta urinib ko'ring! (To'g'ri javob: ${this.currentQuizAnswer})</span>`;
    }
  }

  // 103: Tez hisoblash testi (Speed Challenge - 60s)
  startSpeedTest() {
    this.speedScore = 0;
    this.speedTimeLeft = 60;
    document.getElementById("speedScore").textContent = "0";
    document.getElementById("speedInput").disabled = false;
    document.getElementById("speedInput").value = "";
    document.getElementById("speedInput").focus();

    if (this.speedTimer) clearInterval(this.speedTimer);

    this.nextSpeedQuestion();

    this.speedTimer = setInterval(() => {
      this.speedTimeLeft--;
      document.getElementById("speedTimerDisplay").textContent = `${this.speedTimeLeft} soniya`;

      if (this.speedTimeLeft <= 0) {
        clearInterval(this.speedTimer);
        document.getElementById("speedInput").disabled = true;
        document.getElementById("speedQuestion").textContent = "Vaqt tugadi!";
        alert(`Vaqt tugadi! Sizning natijangiz: ${this.speedScore} ball!`);
      }
    }, 1000);
  }

  nextSpeedQuestion() {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const isAdd = Math.random() > 0.5;

    this.speedAnswer = isAdd ? a + b : Math.abs(a - b);
    const larger = Math.max(a, b);
    const smaller = Math.min(a, b);

    document.getElementById("speedQuestion").textContent = isAdd ? `${a} + ${b} = ?` : `${larger} - ${smaller} = ?`;
  }

  checkSpeedAnswer() {
    const val = parseInt(document.getElementById("speedInput")?.value);
    if (isNaN(val)) return;

    if (val === this.speedAnswer) {
      this.speedScore++;
      document.getElementById("speedScore").textContent = this.speedScore;
      document.getElementById("speedInput").value = "";
      this.nextSpeedQuestion();
    } else {
      document.getElementById("speedInput").value = "";
    }
  }

  // 104: Aqliy hisoblash mashqi
  generateMentalPractice() {
    const tips = [
      "💡 25 ga ko'paytirish: Sonni 4 ga bo'ling va 100 ga ko'paytiring! (Masalan: 36 × 25 = 9 × 100 = 900)",
      "💡 11 ga 2 xonali sonni ko'paytirish: Raqamlarini qo'shib o'rtasiga qo'ying! (Masalan: 35 × 11 -> 3 [3+5] 5 = 385)",
      "💡 5 ga tugaydigan sonlar kvadrati: Birinchi raqamni o'zidan keyingi raqamga ko'paytiring va oxiriga 25 qo'shing! (Masalan: 65² -> 6×7=42 -> 4225)",
      "💡 9 ga ko'paytirish: Sonni 10 ga ko'paytirib, o'zini ayirib tashlang! (Masalan: 48 × 9 = 480 - 48 = 432)",
      "💡 Foiz topish: 15% topish uchun avval 10% ini, keyin uning yarmini (5%) qo'shing!"
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    const el = document.getElementById("mentalTipBox");
    if (el) el.innerHTML = `<strong>Aqliy hisoblash siri:</strong><br>${randomTip}`;
  }

  // 105: Tasodifiy sonlar generatori (RNG)
  generateRNG() {
    const min = parseInt(document.getElementById("rngMin")?.value) || 1;
    const max = parseInt(document.getElementById("rngMax")?.value) || 100;
    const count = parseInt(document.getElementById("rngCount")?.value) || 5;
    const unique = document.getElementById("rngUnique")?.checked;
    const resEl = document.getElementById("rngResult");

    if (min >= max) {
      if (resEl) resEl.textContent = "Min Max dan kichik bo'lishi kerak!";
      return;
    }

    if (unique && count > (max - min + 1)) {
      if (resEl) resEl.textContent = "Bu oraliqda buncha takrorlanmas son yo'q!";
      return;
    }

    let results = [];
    if (unique) {
      const set = new Set();
      while (set.size < count) {
        set.add(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      results = Array.from(set);
    } else {
      for (let i = 0; i < count; i++) {
        results.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
    }

    if (resEl) {
      resEl.innerHTML = `<strong>Tasodifiy sonlar:</strong><br><span style="font-size:18px; color:var(--primary); font-weight:bold;">${results.join(", ")}</span>`;
    }
  }

  // 106: Numerologiya (Taqdir raqami)
  calcNumerology() {
    const dateVal = document.getElementById("numBirthDate")?.value;
    const resEl = document.getElementById("numResult");
    if (!dateVal) return;

    // Kun, oy, yil raqamlarini bir xonali songacha qo'shish
    const digits = dateVal.replace(/\D/g, "");
    let sum = digits.split("").reduce((acc, d) => acc + parseInt(d), 0);

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split("").reduce((acc, d) => acc + parseInt(d), 0);
    }

    const meanings = {
      1: "Yetakchi, mustaqil, ijodkor, maqsad sari dadil boruvchi shaxs.",
      2: "Diplomat, hamkorlikni sevuvchi, sezgir, tinchlikparvar inson.",
      3: "Xarizmatik, notiq, optimistik, ijodiy ilhomga boy qalb.",
      4: "Mehnatkash, tartibli, ishonchli, mustahkam poydevor quruvchi.",
      5: "Erkinlikni sevuvchi, sayohatchi, qiziquvchan va yangilikka ochiq.",
      6: "G'amxo'r, mehrli, oilaparvar, adolat va mas'uliyat timsoli.",
      7: "Donishmand, tahlilchi, falsafiy fikrlovchi, ichki dunyosi boy.",
      8: "Tadbirkor, moliyaviy muvaffaqiyatga intiluvchi, qudratli strateg.",
      9: "Saxovatpesha, gumanist, san'atkor, keng qamrovli dunyoqarash egasi.",
      11: "Master-son: Kuchli sezgi, ruhiy yetakchilik va yuksak tafakkur.",
      22: "Master-quruvchi: Ulkan g'oyalarni amalda ro'yobga chiqaruvchi qudrat."
    };

    if (resEl) {
      resEl.innerHTML = `
        <div style="font-size:18px; font-weight:bold; color:var(--primary); margin-bottom:6px;">Sizning Taqdir raqamingiz: ${sum}</div>
        <div>${meanings[sum] || "Noyob va o'ziga xos qobiliyatlar sohibi."}</div>
      `;
    }
  }
}

window.AppGamesPractice = new GamesPracticeEngine();
