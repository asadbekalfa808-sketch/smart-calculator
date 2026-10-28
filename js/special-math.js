/**
 * OMNI-CALCULATOR 114 — 7. MAXSUS HISOB-KITOBLAR (Funksiyalar 78–84)
 */

class SpecialMathEngine {
  constructor() {}

  init() {
    this.bindEvents();
  }

  // Evklid algoritmi (EKUB / GCD)
  gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  // EKUK / LCM
  lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs((a * b) / this.gcd(a, b));
  }

  bindEvents() {
    // 78: Promille
    const promilleBtn = document.getElementById("calcPromilleBtn");
    if (promilleBtn) promilleBtn.addEventListener("click", () => this.calcPromille());

    // 79: Aralash sonlar
    const mixedBtn = document.getElementById("calcMixedBtn");
    if (mixedBtn) mixedBtn.addEventListener("click", () => this.calcMixedNumbers());

    // 80: Kasrlarni qisqartirish va qo'shish
    const fracBtn = document.getElementById("calcFracBtn");
    if (fracBtn) fracBtn.addEventListener("click", () => this.calcFractions());

    // 81: O'nli kasrni oddiy kasrga aylantirish
    const decToFracBtn = document.getElementById("calcDecToFracBtn");
    if (decToFracBtn) decToFracBtn.addEventListener("click", () => this.decimalToFraction());

    // 82 & 83: EKUB va EKUK
    const gcdLcmBtn = document.getElementById("calcGcdLcmBtn");
    if (gcdLcmBtn) gcdLcmBtn.addEventListener("click", () => this.calcGcdAndLcm());

    // 84: Sonni yaxlitlash
    const roundBtn = document.getElementById("calcRoundBtn");
    if (roundBtn) roundBtn.addEventListener("click", () => this.roundNumberTool());
  }

  // 78: Foiz va promille (‰)
  calcPromille() {
    const val = parseFloat(document.getElementById("promilleBase").value) || 0;
    const rate = parseFloat(document.getElementById("promilleRate").value) || 0;
    const type = document.getElementById("promilleType").value; // 'percent' yoki 'promille'
    const resEl = document.getElementById("promilleResult");

    if (type === "percent") {
      const part = (val * rate) / 100;
      const promilleEq = rate * 10;
      if (resEl) {
        resEl.innerHTML = `${val} ning ${rate}% qismi: <strong>${part}</strong> (${promilleEq} ‰)`;
      }
    } else {
      const part = (val * rate) / 1000;
      const pctEq = rate / 10;
      if (resEl) {
        resEl.innerHTML = `${val} ning ${rate} ‰ (promille) qismi: <strong>${part}</strong> (${pctEq} %)`;
      }
    }
  }

  // 79: Aralash sonlar (Whole Numerator/Denominator)
  calcMixedNumbers() {
    const w1 = parseInt(document.getElementById("mixW1").value) || 0;
    const n1 = parseInt(document.getElementById("mixN1").value) || 0;
    const d1 = parseInt(document.getElementById("mixD1").value) || 1;

    const op = document.getElementById("mixOp").value;

    const w2 = parseInt(document.getElementById("mixW2").value) || 0;
    const n2 = parseInt(document.getElementById("mixN2").value) || 0;
    const d2 = parseInt(document.getElementById("mixD2").value) || 1;

    const resEl = document.getElementById("mixResult");

    // Noto'g'ri kasrga aylantirish
    const improperN1 = (Math.abs(w1) * d1 + n1) * (w1 < 0 ? -1 : 1);
    const improperN2 = (Math.abs(w2) * d2 + n2) * (w2 < 0 ? -1 : 1);

    let resNum = 0;
    let resDen = 1;

    if (op === "+") {
      resNum = improperN1 * d2 + improperN2 * d1;
      resDen = d1 * d2;
    } else if (op === "-") {
      resNum = improperN1 * d2 - improperN2 * d1;
      resDen = d1 * d2;
    } else if (op === "*") {
      resNum = improperN1 * improperN2;
      resDen = d1 * d2;
    } else if (op === "/") {
      resNum = improperN1 * d2;
      resDen = d1 * improperN2;
    }

    if (resDen === 0) {
      if (resEl) resEl.textContent = "Nolga bo'lish mumkin emas!";
      return;
    }

    const g = this.gcd(resNum, resDen);
    let simpNum = resNum / g;
    let simpDen = resDen / g;

    if (simpDen < 0) {
      simpNum = -simpNum;
      simpDen = -simpDen;
    }

    const whole = Math.trunc(simpNum / simpDen);
    const rem = Math.abs(simpNum % simpDen);

    let formatted = "";
    if (rem === 0) {
      formatted = `${whole}`;
    } else if (whole !== 0) {
      formatted = `${whole} butun ${rem}/${simpDen} (yoki ${simpNum}/${simpDen})`;
    } else {
      formatted = `${simpNum}/${simpDen}`;
    }

    if (resEl) {
      resEl.innerHTML = `Natija: <strong>${formatted}</strong> (≈ ${(simpNum / simpDen).toFixed(4)})`;
    }
  }

  // 80: Kasrlarni qisqartirish va qo'shish
  calcFractions() {
    const n1 = parseInt(document.getElementById("fracN1").value) || 0;
    const d1 = parseInt(document.getElementById("fracD1").value) || 1;
    const op = document.getElementById("fracOp").value;
    const n2 = parseInt(document.getElementById("fracN2").value) || 0;
    const d2 = parseInt(document.getElementById("fracD2").value) || 1;

    const resEl = document.getElementById("fracResult");

    if (d1 === 0 || d2 === 0) {
      if (resEl) resEl.textContent = "Maxraj nol bo'lishi mumkin emas!";
      return;
    }

    let rN = 0, rD = 1;
    if (op === "+") {
      rN = n1 * d2 + n2 * d1;
      rD = d1 * d2;
    } else if (op === "-") {
      rN = n1 * d2 - n2 * d1;
      rD = d1 * d2;
    } else if (op === "*") {
      rN = n1 * n2;
      rD = d1 * d2;
    } else if (op === "/") {
      rN = n1 * d2;
      rD = d1 * n2;
    }

    const g = this.gcd(rN, rD);
    rN /= g;
    rD /= g;

    if (rD < 0) {
      rN = -rN;
      rD = -rD;
    }

    if (resEl) {
      resEl.innerHTML = `Qisqartirilgan natija: <strong>${rN}/${rD}</strong> (≈ ${(rN / rD).toFixed(4)})`;
    }
  }

  // 81: O'nli kasrni oddiy kasrga aylantirish (0.125 -> 1/8)
  decimalToFraction() {
    const dec = parseFloat(document.getElementById("decInput").value);
    const resEl = document.getElementById("decResult");
    if (isNaN(dec)) return;

    const str = dec.toString();
    const parts = str.split(".");
    if (parts.length === 1) {
      if (resEl) resEl.innerHTML = `Oddiy kasr: <strong>${dec} / 1</strong>`;
      return;
    }

    const decLen = parts[1].length;
    const den = Math.pow(10, decLen);
    const num = Math.round(dec * den);

    const g = this.gcd(num, den);
    const simpNum = num / g;
    const simpDen = den / g;

    if (resEl) {
      resEl.innerHTML = `${dec} = <strong>${simpNum} / ${simpDen}</strong>`;
    }
  }

  // 82 & 83: EKUB va EKUK
  calcGcdAndLcm() {
    const raw = document.getElementById("gcdNumbersInput")?.value || "";
    const nums = raw
      .split(/[\s,;]+/)
      .map(Number)
      .filter(n => !isNaN(n) && n > 0);

    const resEl = document.getElementById("gcdLcmResult");
    if (nums.length < 2) {
      if (resEl) resEl.textContent = "Kamida 2 ta musbat butun son kiriting (masalan: 24, 36, 60)";
      return;
    }

    let g = nums[0];
    let l = nums[0];

    for (let i = 1; i < nums.length; i++) {
      g = this.gcd(g, nums[i]);
      l = this.lcm(l, nums[i]);
    }

    if (resEl) {
      resEl.innerHTML = `
        <div>Sonlar: <strong>${nums.join(", ")}</strong></div>
        <div style="margin-top:4px;">Eng katta umumiy bo'luvchi (EKUB / GCD): <strong>${g}</strong></div>
        <div>Eng kichik umumiy karrali (EKUK / LCM): <strong>${l}</strong></div>
      `;
    }
  }

  // 84: Sonni yaxlitlash va aniqlik
  roundNumberTool() {
    const num = parseFloat(document.getElementById("roundNumInput").value);
    const digits = parseInt(document.getElementById("roundDigits").value) || 0;
    const mode = document.getElementById("roundMode").value;
    const resEl = document.getElementById("roundResult");

    if (isNaN(num)) return;

    let res = 0;
    const factor = Math.pow(10, digits);

    if (mode === "round") {
      res = Math.round(num * factor) / factor;
    } else if (mode === "floor") {
      res = Math.floor(num * factor) / factor;
    } else if (mode === "ceil") {
      res = Math.ceil(num * factor) / factor;
    } else if (mode === "trunc") {
      res = Math.trunc(num * factor) / factor;
    }

    if (resEl) {
      resEl.innerHTML = `Yaxlitlangan qiymat: <strong>${res.toFixed(digits)}</strong>`;
    }
  }
}

window.AppSpecialMath = new SpecialMathEngine();
