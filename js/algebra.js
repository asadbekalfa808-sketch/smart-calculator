/**
 * OMNI-CALCULATOR 114 — 6. MATEMATIKA VA ALGEBRA (Funksiyalar 70–77)
 */

class AlgebraEngine {
  constructor() {}

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // 70: Kvadrat tenglama
    const quadBtn = document.getElementById("solveQuadBtn");
    if (quadBtn) quadBtn.addEventListener("click", () => this.solveQuadratic());

    // 71: Kub tenglama
    const cubicBtn = document.getElementById("solveCubicBtn");
    if (cubicBtn) cubicBtn.addEventListener("click", () => this.solveCubic());

    // 72: Kramer tizimi (2x2)
    const kramerBtn = document.getElementById("solveKramerBtn");
    if (kramerBtn) kramerBtn.addEventListener("click", () => this.solveSystem2x2());

    // 73: Matritsa qo'shish va ko'paytirish
    const matAddBtn = document.getElementById("matAddBtn");
    const matMulBtn = document.getElementById("matMulBtn");
    if (matAddBtn) matAddBtn.addEventListener("click", () => this.matrixOperation("add"));
    if (matMulBtn) matMulBtn.addEventListener("click", () => this.matrixOperation("multiply"));

    // 74: Matritsa determinanti
    const matDetBtn = document.getElementById("matDetBtn");
    if (matDetBtn) matDetBtn.addEventListener("click", () => this.calcMatrixDeterminant());

    // 75: Nisbat va proporsiya
    const propBtn = document.getElementById("solvePropBtn");
    if (propBtn) propBtn.addEventListener("click", () => this.solveProportion());

    // 76: Foiz masalalari
    const pctBtn = document.getElementById("solvePctBtn");
    if (pctBtn) pctBtn.addEventListener("click", () => this.solvePercentProblems());

    // 77: Ifodalarni soddalashtirish
    const simpBtn = document.getElementById("solveSimplifyBtn");
    if (simpBtn) simpBtn.addEventListener("click", () => this.simplifyExpression());
  }

  // 70: Kvadrat tenglama ax² + bx + c = 0
  solveQuadratic() {
    const a = parseFloat(document.getElementById("quadA").value);
    const b = parseFloat(document.getElementById("quadB").value);
    const c = parseFloat(document.getElementById("quadC").value);
    const resEl = document.getElementById("quadResult");

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      if (resEl) resEl.textContent = "Barcha koeffitsientlarni kiriting!";
      return;
    }

    if (a === 0) {
      if (b === 0) {
        resEl.textContent = c === 0 ? "Cheksiz ko'p yechim (0 = 0)" : "Yechim yo'q";
      } else {
        const x = -c / b;
        resEl.innerHTML = `Chiziqli tenglama: <strong>x = ${x.toFixed(4)}</strong>`;
      }
      return;
    }

    const D = b * b - 4 * a * c;
    let explanation = `Tenglama: <strong>${a}x² + (${b})x + (${c}) = 0</strong><br>`;
    explanation += `Diskriminant: <strong>D = b² - 4ac = (${b})² - 4·(${a})·(${c}) = ${D}</strong><br>`;

    if (D > 0) {
      const x1 = (-b + Math.sqrt(D)) / (2 * a);
      const x2 = (-b - Math.sqrt(D)) / (2 * a);
      explanation += `D > 0: 2 ta haqiqiy ildiz mavjud:<br>`;
      explanation += `<strong>x₁ = ${x1.toFixed(4)}</strong><br>`;
      explanation += `<strong>x₂ = ${x2.toFixed(4)}</strong>`;
    } else if (D === 0) {
      const x = -b / (2 * a);
      explanation += `D = 0: 1 ta karrali ildiz mavjud:<br>`;
      explanation += `<strong>x₁ = x₂ = ${x.toFixed(4)}</strong>`;
    } else {
      const real = (-b / (2 * a)).toFixed(4);
      const imag = (Math.sqrt(-D) / (2 * a)).toFixed(4);
      explanation += `D < 0: Haqiqiy ildizlar yo'q. Kompleks ildizlar:<br>`;
      explanation += `<strong>x₁ = ${real} + ${imag}i</strong><br>`;
      explanation += `<strong>x₂ = ${real} - ${imag}i</strong>`;
    }

    if (resEl) resEl.innerHTML = explanation;
  }

  // 71: Kub tenglama ax³ + bx² + cx + d = 0 (Kardano usuli)
  solveCubic() {
    const a = parseFloat(document.getElementById("cubA").value);
    const b = parseFloat(document.getElementById("cubB").value);
    const c = parseFloat(document.getElementById("cubC").value);
    const d = parseFloat(document.getElementById("cubD").value);
    const resEl = document.getElementById("cubResult");

    if (isNaN(a) || a === 0) {
      if (resEl) resEl.textContent = "a ≠ 0 bo'lishi kerak!";
      return;
    }

    // Normalizatsiya: x³ + Ax² + Bx + C = 0
    const A = b / a;
    const B = c / a;
    const C = d / a;

    // x = y - A/3 almashtirish -> y³ + py + q = 0
    const p = B - (A * A) / 3;
    const q = (2 * A * A * A) / 27 - (A * B) / 3 + C;
    const delta = (q * q) / 4 + (p * p * p) / 27;

    let roots = [];

    if (delta > 0) {
      // 1 ta haqiqiy, 2 ta kompleks
      const u = Math.cbrt(-q / 2 + Math.sqrt(delta));
      const v = Math.cbrt(-q / 2 - Math.sqrt(delta));
      const y1 = u + v;
      const x1 = y1 - A / 3;
      roots.push(`x₁ = ${x1.toFixed(4)} (Haqiqiy ildiz)`);
    } else if (delta === 0) {
      const u = Math.cbrt(-q / 2);
      const x1 = 2 * u - A / 3;
      const x2 = -u - A / 3;
      roots.push(`x₁ = ${x1.toFixed(4)}`);
      roots.push(`x₂ = x₃ = ${x2.toFixed(4)}`);
    } else {
      // 3 ta haqiqiy ildiz (trigonometrik usul)
      const phi = Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))));
      const r = 2 * Math.sqrt(-p / 3);
      const x1 = r * Math.cos(phi / 3) - A / 3;
      const x2 = r * Math.cos((phi + 2 * Math.PI) / 3) - A / 3;
      const x3 = r * Math.cos((phi + 4 * Math.PI) / 3) - A / 3;
      roots.push(`x₁ = ${x1.toFixed(4)}`);
      roots.push(`x₂ = ${x2.toFixed(4)}`);
      roots.push(`x₃ = ${x3.toFixed(4)}`);
    }

    if (resEl) {
      resEl.innerHTML = `<strong>Tenglama ildizlari:</strong><br>${roots.join("<br>")}`;
    }
  }

  // 72: Chiziqli tenglamalar tizimi (Kramer qoidasi 2x2)
  solveSystem2x2() {
    const a1 = parseFloat(document.getElementById("kramA1").value) || 0;
    const b1 = parseFloat(document.getElementById("kramB1").value) || 0;
    const c1 = parseFloat(document.getElementById("kramC1").value) || 0;

    const a2 = parseFloat(document.getElementById("kramA2").value) || 0;
    const b2 = parseFloat(document.getElementById("kramB2").value) || 0;
    const c2 = parseFloat(document.getElementById("kramC2").value) || 0;

    const resEl = document.getElementById("kramResult");

    const Delta = a1 * b2 - a2 * b1;
    const DeltaX = c1 * b2 - c2 * b1;
    const DeltaY = a1 * c2 - a2 * c1;

    let out = `Asosiy determinant: <strong>Δ = ${Delta}</strong><br>`;
    if (Delta !== 0) {
      const x = DeltaX / Delta;
      const y = DeltaY / Delta;
      out += `Δx = ${DeltaX}, Δy = ${DeltaY}<br>`;
      out += `<strong>x = Δx / Δ = ${x.toFixed(4)}</strong><br>`;
      out += `<strong>y = Δy / Δ = ${y.toFixed(4)}</strong>`;
    } else {
      if (DeltaX === 0 && DeltaY === 0) {
        out += "Tizim cheksiz ko'p yechimga ega.";
      } else {
        out += "Tizim yechimga ega emas (chiziqlar parallel).";
      }
    }

    if (resEl) resEl.innerHTML = out;
  }

  // 73: Matritsalar qo'shish va ko'paytirish (2x2)
  matrixOperation(op) {
    const a11 = parseFloat(document.getElementById("m1_11").value) || 0;
    const a12 = parseFloat(document.getElementById("m1_12").value) || 0;
    const a21 = parseFloat(document.getElementById("m1_21").value) || 0;
    const a22 = parseFloat(document.getElementById("m1_22").value) || 0;

    const b11 = parseFloat(document.getElementById("m2_11").value) || 0;
    const b12 = parseFloat(document.getElementById("m2_12").value) || 0;
    const b21 = parseFloat(document.getElementById("m2_21").value) || 0;
    const b22 = parseFloat(document.getElementById("m2_22").value) || 0;

    const resEl = document.getElementById("matrixResult");
    let c11, c12, c21, c22;

    if (op === "add") {
      c11 = a11 + b11;
      c12 = a12 + b12;
      c21 = a21 + b21;
      c22 = a22 + b22;
    } else {
      c11 = a11 * b11 + a12 * b21;
      c12 = a11 * b12 + a12 * b22;
      c21 = a21 * b11 + a22 * b21;
      c22 = a21 * b12 + a22 * b22;
    }

    if (resEl) {
      resEl.innerHTML = `
        <div style="font-weight:bold; margin-bottom:6px;">Natija matritsa (C = A ${op === 'add' ? '+' : '×'} B):</div>
        <div style="display:inline-block; border-left:2px solid; border-right:2px solid; padding:4px 8px; font-family:monospace;">
          <div>[ ${c11} , ${c12} ]</div>
          <div>[ ${c21} , ${c22} ]</div>
        </div>
      `;
    }
  }

  // 74: Matritsa determinanti
  calcMatrixDeterminant() {
    const a11 = parseFloat(document.getElementById("m1_11").value) || 0;
    const a12 = parseFloat(document.getElementById("m1_12").value) || 0;
    const a21 = parseFloat(document.getElementById("m1_21").value) || 0;
    const a22 = parseFloat(document.getElementById("m1_22").value) || 0;

    const detA = a11 * a22 - a12 * a21;
    const resEl = document.getElementById("matrixResult");

    if (resEl) {
      resEl.innerHTML = `
        <div>det(A) = (${a11} · ${a22}) - (${a12} · ${a21})</div>
        <div style="font-size:18px; font-weight:bold; color:var(--primary); margin-top:4px;">det(A) = ${detA}</div>
      `;
    }
  }

  // 75: Nisbat va proporsiya A : B = C : X
  solveProportion() {
    const a = parseFloat(document.getElementById("propA").value);
    const b = parseFloat(document.getElementById("propB").value);
    const c = parseFloat(document.getElementById("propC").value);
    const resEl = document.getElementById("propResult");

    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
      if (resEl) resEl.textContent = "A ≠ 0 va barcha sonlar kiritilgan bo'lishi kerak";
      return;
    }

    const x = (b * c) / a;
    if (resEl) {
      resEl.innerHTML = `X = (B · C) / A = (${b} · ${c}) / ${a} = <strong>${x.toFixed(4)}</strong>`;
    }
  }

  // 76: Foizga oid masalalar
  solvePercentProblems() {
    const val1 = parseFloat(document.getElementById("pctVal1").value) || 0;
    const val2 = parseFloat(document.getElementById("pctVal2").value) || 0;
    const type = document.getElementById("pctProblemType").value;
    const resEl = document.getElementById("pctResult");

    let text = "";
    if (type === "of") {
      // val1 ning val2 foizi
      const ans = (val1 * val2) / 100;
      text = `${val1} sonining ${val2}% qiymati: <strong>${ans}</strong>`;
    } else if (type === "is_what_pct") {
      // val1 soni val2 ning necha foizi
      if (val2 === 0) text = "Nolga bo'lish mumkin emas";
      else {
        const pct = (val1 / val2) * 100;
        text = `${val1} soni ${val2} ning <strong>${pct.toFixed(2)}%</strong> qismini tashkil qiladi`;
      }
    } else if (type === "change") {
      // val1 dan val2 ga o'zgarish %
      if (val1 === 0) text = "Boshlang'ich son 0 bo'lmasligi kerak";
      else {
        const change = ((val2 - val1) / val1) * 100;
        const sign = change >= 0 ? "+" : "";
        text = `O'zgarish darajasi: <strong>${sign}${change.toFixed(2)}%</strong> (${val2 >= val1 ? "O'sish" : "Kamayish"})`;
      }
    }

    if (resEl) resEl.innerHTML = text;
  }

  // 77: Sonli ifodalarni soddalashtirish
  simplifyExpression() {
    const raw = document.getElementById("simplifyInput")?.value || "";
    const resEl = document.getElementById("simplifyResult");
    if (!resEl) return;

    try {
      // Oddiy algebraik amallarni bajarish va hisoblash
      let sanitized = raw.replace(/\^/g, "**");
      const val = eval(sanitized);
      resEl.innerHTML = `Soddalashtirilgan qiymat: <strong>${val}</strong>`;
    } catch (e) {
      resEl.textContent = "Ifodani hisoblashda xatolik: " + e.message;
    }
  }
}

window.AppAlgebra = new AlgebraEngine();
