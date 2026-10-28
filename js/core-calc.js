/**
 * OMNI-CALCULATOR 114 — 1. ASOSIY VA ILMIY KALKULYATOR (Funksiyalar 1–23)
 */

class CoreCalculator {
  constructor() {
    this.expression = "";
    this.displayValue = "0";
    this.angleMode = "DEG"; // DEG yoki RAD
    this.memoryValue = 0;
    this.ansValue = 0;
    this.isEvaluated = false;
    this.precision = 8;
  }

  init() {
    this.updateScreen();
    this.bindEvents();
  }

  bindEvents() {
    const calcGrid = document.getElementById("coreCalcGrid");
    if (!calcGrid) return;

    calcGrid.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const action = btn.dataset.action;
      const val = btn.dataset.val;

      window.AppAudio && window.AppAudio.playClick();

      if (action) {
        this.handleAction(action, val);
      } else if (val !== undefined) {
        this.inputDigitOrSymbol(val);
      }
    });

    // Angle toggle
    const degBtn = document.getElementById("angleDeg");
    const radBtn = document.getElementById("angleRad");
    if (degBtn && radBtn) {
      degBtn.addEventListener("click", () => {
        this.setAngleMode("DEG");
        degBtn.classList.add("active");
        radBtn.classList.remove("active");
      });
      radBtn.addEventListener("click", () => {
        this.setAngleMode("RAD");
        radBtn.classList.add("active");
        degBtn.classList.remove("active");
      });
    }
  }

  setAngleMode(mode) {
    this.angleMode = mode;
    this.updateScreen();
  }

  inputDigitOrSymbol(val) {
    if (this.isEvaluated && !["+", "-", "*", "/", "^", "%"].includes(val)) {
      this.expression = "";
      this.displayValue = "";
    }
    this.isEvaluated = false;

    if (this.displayValue === "0" && !isNaN(val)) {
      this.displayValue = val;
    } else {
      this.displayValue += val;
    }
    this.expression += val;
    this.updateScreen();
  }

  handleAction(action, val) {
    switch (action) {
      case "clear":
        this.expression = "";
        this.displayValue = "0";
        this.isEvaluated = false;
        break;

      case "backspace":
        if (this.expression.length > 0) {
          this.expression = this.expression.slice(0, -1);
          this.displayValue = this.displayValue.slice(0, -1) || "0";
        }
        break;

      case "evaluate":
        this.evaluate();
        break;

      case "constant":
        if (val === "PI") {
          this.expression += Math.PI.toFixed(8);
          this.displayValue += "π";
        } else if (val === "E") {
          this.expression += Math.E.toFixed(8);
          this.displayValue += "e";
        }
        break;

      case "func":
        this.applyFunction(val);
        break;

      case "memory":
        this.handleMemory(val);
        break;

      case "ans":
        this.expression += this.ansValue;
        this.displayValue += "ANS";
        break;
    }
    this.updateScreen();
  }

  // 1-23 ilmiy va arifmetik amallar
  applyFunction(funcName) {
    try {
      let currentNum = parseFloat(this.displayValue);
      if (isNaN(currentNum)) currentNum = 0;

      let res;
      switch (funcName) {
        // 8. Kvadrat ildiz
        case "sqrt":
          if (currentNum < 0) throw new Error("Ildiz ostida manfiy son!");
          res = Math.sqrt(currentNum);
          this.displayValue = `√(${currentNum})`;
          break;

        // 9. Sinus
        case "sin":
          res = this.angleMode === "DEG" ? Math.sin((currentNum * Math.PI) / 180) : Math.sin(currentNum);
          this.displayValue = `sin(${currentNum})`;
          break;

        // 10. Kosinus
        case "cos":
          res = this.angleMode === "DEG" ? Math.cos((currentNum * Math.PI) / 180) : Math.cos(currentNum);
          this.displayValue = `cos(${currentNum})`;
          break;

        // 11. Tangens
        case "tan":
          const rad = this.angleMode === "DEG" ? (currentNum * Math.PI) / 180 : currentNum;
          if (Math.abs(Math.cos(rad)) < 1e-12) throw new Error("tan aniqlanmagan");
          res = Math.tan(rad);
          this.displayValue = `tan(${currentNum})`;
          break;

        // 12. Arksinus, arkkosinus, arktangens
        case "asin":
          if (currentNum < -1 || currentNum > 1) throw new Error("asin [-1, 1] da");
          res = Math.asin(currentNum);
          if (this.angleMode === "DEG") res = (res * 180) / Math.PI;
          this.displayValue = `asin(${currentNum})`;
          break;

        case "acos":
          if (currentNum < -1 || currentNum > 1) throw new Error("acos [-1, 1] da");
          res = Math.acos(currentNum);
          if (this.angleMode === "DEG") res = (res * 180) / Math.PI;
          this.displayValue = `acos(${currentNum})`;
          break;

        case "atan":
          res = Math.atan(currentNum);
          if (this.angleMode === "DEG") res = (res * 180) / Math.PI;
          this.displayValue = `atan(${currentNum})`;
          break;

        // 13. O'nlik logarifm
        case "log":
          if (currentNum <= 0) throw new Error("log(x) uchun x > 0");
          res = Math.log10(currentNum);
          this.displayValue = `log(${currentNum})`;
          break;

        // 14. Natural logarifm
        case "ln":
          if (currentNum <= 0) throw new Error("ln(x) uchun x > 0");
          res = Math.log(currentNum);
          this.displayValue = `ln(${currentNum})`;
          break;

        // 15. Eksponenta (e^x)
        case "exp":
          res = Math.exp(currentNum);
          this.displayValue = `e^(${currentNum})`;
          break;

        // 16. Faktorial (!)
        case "fact":
          if (currentNum < 0 || !Number.isInteger(currentNum)) throw new Error("n! faqat butun musbat sonlar uchun");
          res = this.factorial(currentNum);
          this.displayValue = `${currentNum}!`;
          break;

        // 20. Giperbolik funksiyalar
        case "sinh":
          res = Math.sinh(currentNum);
          this.displayValue = `sinh(${currentNum})`;
          break;
        case "cosh":
          res = Math.cosh(currentNum);
          this.displayValue = `cosh(${currentNum})`;
          break;
        case "tanh":
          res = Math.tanh(currentNum);
          this.displayValue = `tanh(${currentNum})`;
          break;

        // 21. Modul / Absolyut qiymat |x|
        case "abs":
          res = Math.abs(currentNum);
          this.displayValue = `|${currentNum}|`;
          break;

        // 1/x
        case "reciprocal":
          if (currentNum === 0) throw new Error("0 ga bo'lish mumkin emas");
          res = 1 / currentNum;
          this.displayValue = `1/(${currentNum})`;
          break;

        // x^2
        case "sqr":
          res = Math.pow(currentNum, 2);
          this.displayValue = `sqr(${currentNum})`;
          break;

        // Permutatsiya nPr (misol: nPr kiritish)
        case "nPr":
          const r1 = prompt("n = " + currentNum + ". r qiymatini kiriting (nPr):", "1");
          if (r1 !== null) {
            const rVal = parseInt(r1);
            if (rVal > currentNum || rVal < 0) throw new Error("r <= n va r >= 0 bo'lishi kerak");
            res = this.factorial(currentNum) / this.factorial(currentNum - rVal);
            this.displayValue = `P(${currentNum},${rVal})`;
          } else {
            return;
          }
          break;

        // Kombinatsiya nCr
        case "nCr":
          const r2 = prompt("n = " + currentNum + ". r qiymatini kiriting (nCr):", "1");
          if (r2 !== null) {
            const rVal = parseInt(r2);
            if (rVal > currentNum || rVal < 0) throw new Error("r <= n va r >= 0 bo'lishi kerak");
            res = this.factorial(currentNum) / (this.factorial(rVal) * this.factorial(currentNum - rVal));
            this.displayValue = `C(${currentNum},${rVal})`;
          } else {
            return;
          }
          break;
      }

      if (res !== undefined) {
        res = this.roundNumber(res);
        this.saveHistory(this.displayValue, res);
        this.expression = res.toString();
        this.displayValue = res.toString();
        this.ansValue = res;
        this.isEvaluated = true;
      }
    } catch (err) {
      this.displayValue = "Xato: " + err.message;
      this.expression = "";
      this.isEvaluated = true;
    }
  }

  factorial(n) {
    if (n > 170) return Infinity;
    let val = 1;
    for (let i = 2; i <= n; i++) val *= i;
    return val;
  }

  roundNumber(num) {
    if (!isFinite(num)) return num;
    return parseFloat(num.toFixed(this.precision));
  }

  evaluate() {
    if (!this.expression) return;
    try {
      let sanitized = this.expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**")
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString());

      // Xavfsiz hisoblash
      // Faqat ruxsat etilgan belgilar: raqamlar, amallar, qavslar
      if (/[^0-9\+\-\*\/\.\(\)\%\s\*eE]/.test(sanitized)) {
        throw new Error("Noto'g'ri belgi");
      }

      // Function constructor bilan xavfsiz ifoda bajarish
      const func = new Function(`return (${sanitized});`);
      let result = func();

      if (!isFinite(result)) {
        if (isNaN(result)) throw new Error("Aniqlanmagan natija (NaN)");
        throw new Error("Nolga bo'lish xatosi");
      }

      result = this.roundNumber(result);
      const prevExpr = this.expression;
      this.saveHistory(prevExpr, result);

      this.ansValue = result;
      this.displayValue = result.toString();
      this.expression = result.toString();
      this.isEvaluated = true;
    } catch (err) {
      this.displayValue = "Xato!";
      this.isEvaluated = true;
    }
    this.updateScreen();
  }

  handleMemory(op) {
    const current = parseFloat(this.displayValue) || 0;
    switch (op) {
      case "MC": // Memory Clear
        this.memoryValue = 0;
        window.AppHistory && window.AppHistory.showToast("Xotira tozalandi (MC)");
        break;
      case "MR": // Memory Recall
        this.displayValue = this.memoryValue.toString();
        this.expression += this.memoryValue.toString();
        window.AppHistory && window.AppHistory.showToast("Xotiradan o'qildi: " + this.memoryValue);
        break;
      case "M+": // Memory Add
        this.memoryValue += current;
        window.AppHistory && window.AppHistory.showToast("Xotiraga qo'shildi: " + this.memoryValue);
        break;
      case "M-": // Memory Subtract
        this.memoryValue -= current;
        window.AppHistory && window.AppHistory.showToast("Xotiradan ayirildi: " + this.memoryValue);
        break;
    }
    this.updateMemoryUI();
  }

  updateMemoryUI() {
    const memBadge = document.getElementById("memIndicator");
    if (memBadge) {
      memBadge.style.opacity = this.memoryValue !== 0 ? "1" : "0.3";
      memBadge.title = "M = " + this.memoryValue;
    }
  }

  saveHistory(expr, res) {
    if (window.AppHistory) {
      window.AppHistory.addEntry(expr, res);
    }
  }

  updateScreen() {
    const exprEl = document.getElementById("calcExpression");
    const mainEl = document.getElementById("calcMainDisplay");
    if (exprEl) exprEl.textContent = this.expression || "";
    if (mainEl) mainEl.textContent = this.displayValue || "0";
  }
}

window.CoreCalc = new CoreCalculator();
