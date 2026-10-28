/**
 * OMNI-CALCULATOR 114 — 3. MOLIYAVIY KALKULYATOR (Funksiyalar 40–51)
 */

class FinanceCalculator {
  constructor() {
    this.rates = {
      UZS: 1,
      USD: 12850,
      EUR: 13950,
      RUB: 135,
      GBP: 16400,
      CNY: 1780
    };
  }

  init() {
    this.bindEvents();
    this.initCurrencyRates();
  }

  formatCurrency(num, suffix = " so'm") {
    if (isNaN(num) || !isFinite(num)) return "0" + suffix;
    return new Intl.NumberFormat("uz-UZ", { maximumFractionDigits: 2 }).format(num) + suffix;
  }

  bindEvents() {
    // 40 & 41: Kredit kalkulyatori
    const loanBtn = document.getElementById("calcLoanBtn");
    if (loanBtn) {
      loanBtn.addEventListener("click", () => this.calculateLoan());
    }

    // 42: Oddiy foiz
    const simpleIntBtn = document.getElementById("calcSimpleIntBtn");
    if (simpleIntBtn) {
      simpleIntBtn.addEventListener("click", () => this.calculateSimpleInterest());
    }

    // 43: Murakkab foiz
    const compIntBtn = document.getElementById("calcCompIntBtn");
    if (compIntBtn) {
      compIntBtn.addEventListener("click", () => this.calculateCompoundInterest());
    }

    // 44: Chegirma
    const discountBtn = document.getElementById("calcDiscountBtn");
    if (discountBtn) {
      discountBtn.addEventListener("click", () => this.calculateDiscount());
    }

    // 45: Soliq
    const taxBtn = document.getElementById("calcTaxBtn");
    if (taxBtn) {
      taxBtn.addEventListener("click", () => this.calculateTax());
    }

    // 46: Valyuta konvertori
    const currFromVal = document.getElementById("currFromVal");
    const currFromSel = document.getElementById("currFromSel");
    const currToSel = document.getElementById("currToSel");
    const customRate = document.getElementById("currCustomRate");

    if (currFromVal) currFromVal.addEventListener("input", () => this.convertCurrency());
    if (currFromSel) currFromSel.addEventListener("change", () => this.convertCurrency());
    if (currToSel) currToSel.addEventListener("change", () => this.convertCurrency());
    if (customRate) customRate.addEventListener("input", () => this.convertCurrency());

    // 47: Oylik budjet (50/30/20)
    const budgetBtn = document.getElementById("calcBudgetBtn");
    if (budgetBtn) {
      budgetBtn.addEventListener("click", () => this.calculateBudget());
    }

    // 48: Jamg'arma maqsadi
    const goalBtn = document.getElementById("calcGoalBtn");
    if (goalBtn) {
      goalBtn.addEventListener("click", () => this.calculateSavingsGoal());
    }

    // 49: ROI Investitsiya daromadi
    const roiBtn = document.getElementById("calcRoiBtn");
    if (roiBtn) {
      roiBtn.addEventListener("click", () => this.calculateROI());
    }

    // 50: Inflyatsiya
    const infBtn = document.getElementById("calcInfBtn");
    if (infBtn) {
      infBtn.addEventListener("click", () => this.calculateInflation());
    }

    // 51: Depozit va Lizing
    const depBtn = document.getElementById("calcDepBtn");
    if (depBtn) {
      depBtn.addEventListener("click", () => this.calculateDepositLease());
    }
  }

  // 40 & 41: Kredit va Annuitet oylik to'lov
  calculateLoan() {
    const amount = parseFloat(document.getElementById("loanAmount").value) || 0;
    const annualRate = parseFloat(document.getElementById("loanRate").value) || 0;
    const months = parseInt(document.getElementById("loanMonths").value) || 0;

    const resMonthly = document.getElementById("loanMonthlyPayment");
    const resTotal = document.getElementById("loanTotalPayment");
    const resInterest = document.getElementById("loanTotalInterest");

    if (amount <= 0 || months <= 0) return;

    const monthlyRate = annualRate / 100 / 12;
    let monthlyPayment = 0;

    if (monthlyRate === 0) {
      monthlyPayment = amount / months;
    } else {
      // Annuitet formulasi: A = P * [r(1+r)^n] / [(1+r)^n - 1]
      monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;

    if (resMonthly) resMonthly.textContent = this.formatCurrency(monthlyPayment);
    if (resTotal) resTotal.textContent = this.formatCurrency(totalPayment);
    if (resInterest) resInterest.textContent = this.formatCurrency(totalInterest);
  }

  // 42: Oddiy foizli daromad: I = P * r * t
  calculateSimpleInterest() {
    const p = parseFloat(document.getElementById("simpPrincipal").value) || 0;
    const r = (parseFloat(document.getElementById("simpRate").value) || 0) / 100;
    const t = parseFloat(document.getElementById("simpYears").value) || 0;

    const interest = p * r * t;
    const total = p + interest;

    const resEl = document.getElementById("simpResult");
    if (resEl) {
      resEl.innerHTML = `Foiz daromadi: <strong>${this.formatCurrency(interest)}</strong><br>Yakuniy summa: <strong>${this.formatCurrency(total)}</strong>`;
    }
  }

  // 43: Murakkab foizli daromad: A = P * (1 + r/n)^(n*t)
  calculateCompoundInterest() {
    const p = parseFloat(document.getElementById("compPrincipal").value) || 0;
    const r = (parseFloat(document.getElementById("compRate").value) || 0) / 100;
    const t = parseFloat(document.getElementById("compYears").value) || 0;
    const n = parseInt(document.getElementById("compFrequency").value) || 12;

    const amount = p * Math.pow(1 + r / n, n * t);
    const profit = amount - p;

    const resEl = document.getElementById("compResult");
    if (resEl) {
      resEl.innerHTML = `Yakuniy summa: <strong>${this.formatCurrency(amount)}</strong><br>Sof foiz foydasi: <strong>${this.formatCurrency(profit)}</strong>`;
    }
  }

  // 44: Chegirma va yakuniy narx
  calculateDiscount() {
    const price = parseFloat(document.getElementById("discPrice").value) || 0;
    const discount = parseFloat(document.getElementById("discPercent").value) || 0;

    const saved = price * (discount / 100);
    const finalPrice = price - saved;

    const resEl = document.getElementById("discResult");
    if (resEl) {
      resEl.innerHTML = `Tejalgan mablag': <strong>${this.formatCurrency(saved)}</strong><br>To'lanadigan narx: <strong>${this.formatCurrency(finalPrice)}</strong>`;
    }
  }

  // 45: Soliq miqdori (QQS, Daromad solig'i)
  calculateTax() {
    const amount = parseFloat(document.getElementById("taxAmount").value) || 0;
    const rate = parseFloat(document.getElementById("taxRate").value) || 12;
    const mode = document.getElementById("taxMode").value; // 'add' yoki 'include'

    let tax = 0;
    let net = 0;
    let total = 0;

    if (mode === "add") {
      tax = amount * (rate / 100);
      total = amount + tax;
      net = amount;
    } else {
      // Soliq ichida bo'lsa
      total = amount;
      net = amount / (1 + rate / 100);
      tax = total - net;
    }

    const resEl = document.getElementById("taxResult");
    if (resEl) {
      resEl.innerHTML = `Soliq miqdori (${rate}%): <strong>${this.formatCurrency(tax)}</strong><br>Asosiy summa: <strong>${this.formatCurrency(net)}</strong><br>Jami summa: <strong>${this.formatCurrency(total)}</strong>`;
    }
  }

  // 46: Valyuta konvertori
  initCurrencyRates() {
    const customRate = document.getElementById("currCustomRate");
    if (customRate) {
      customRate.value = this.rates.USD;
    }
    this.convertCurrency();
  }

  convertCurrency() {
    const amount = parseFloat(document.getElementById("currFromVal")?.value) || 0;
    const from = document.getElementById("currFromSel")?.value || "USD";
    const to = document.getElementById("currToSel")?.value || "UZS";
    const custom = parseFloat(document.getElementById("currCustomRate")?.value);

    let fromRate = this.rates[from] || 1;
    let toRate = this.rates[to] || 1;

    // Agar foydalanuvchi maxsus kurs kiritgan bo'lsa va USD-UZS juftligi bo'lsa
    if (!isNaN(custom) && custom > 0) {
      if (from === "USD") fromRate = custom;
      if (to === "USD") toRate = custom;
    }

    // UZS ga aylantirib keyin To ga
    const inUZS = amount * fromRate;
    const result = inUZS / toRate;

    const resEl = document.getElementById("currResult");
    if (resEl) {
      resEl.textContent = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(result) + " " + to;
    }
  }

  // 47: Oylik budjet (50/30/20 qoidasi)
  calculateBudget() {
    const income = parseFloat(document.getElementById("budgetIncome").value) || 0;
    const needs = income * 0.50;    // 50% Zaruriy ehtiyojlar
    const wants = income * 0.30;    // 30% Istaklar, ko'ngilochar
    const savings = income * 0.20;  // 20% Jamg'arma va qarz to'lash

    const resEl = document.getElementById("budgetResult");
    if (resEl) {
      resEl.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:6px;">
          <div>Zaruriy xarajatlar (50%): <strong>${this.formatCurrency(needs)}</strong></div>
          <div>Shaxsiy istaklar (30%): <strong>${this.formatCurrency(wants)}</strong></div>
          <div>Jamg'arma va investitsiya (20%): <strong>${this.formatCurrency(savings)}</strong></div>
        </div>
      `;
    }
  }

  // 48: Jamg'arma maqsadi va yetish muddati
  calculateSavingsGoal() {
    const target = parseFloat(document.getElementById("goalTarget").value) || 0;
    const current = parseFloat(document.getElementById("goalCurrent").value) || 0;
    const monthly = parseFloat(document.getElementById("goalMonthly").value) || 0;

    const resEl = document.getElementById("goalResult");
    if (monthly <= 0 || target <= current) {
      if (resEl) resEl.textContent = "To'g'ri qiymatlarni kiriting.";
      return;
    }

    const needed = target - current;
    const months = Math.ceil(needed / monthly);
    const years = (months / 12).toFixed(1);

    if (resEl) {
      resEl.innerHTML = `Yetish uchun <strong>${months} oy</strong> (${years} yil) kerak.<br>Qolgan summa: <strong>${this.formatCurrency(needed)}</strong>`;
    }
  }

  // 49: ROI (Return on Investment)
  calculateROI() {
    const invested = parseFloat(document.getElementById("roiInvested").value) || 0;
    const returned = parseFloat(document.getElementById("roiReturned").value) || 0;

    if (invested <= 0) return;
    const profit = returned - invested;
    const roiPercent = (profit / invested) * 100;

    const resEl = document.getElementById("roiResult");
    if (resEl) {
      const color = roiPercent >= 0 ? "var(--accent-green)" : "var(--accent-red)";
      resEl.innerHTML = `Sof foyda/zarar: <strong>${this.formatCurrency(profit)}</strong><br>ROI: <strong style="color:${color};">${roiPercent.toFixed(2)}%</strong>`;
    }
  }

  // 50: Inflyatsiyani hisobga olgan qiymat
  calculateInflation() {
    const amount = parseFloat(document.getElementById("infAmount").value) || 0;
    const rate = (parseFloat(document.getElementById("infRate").value) || 0) / 100;
    const years = parseFloat(document.getElementById("infYears").value) || 0;

    // Kelajakdagi xarid qobiliyati: Real Value = P / (1 + r)^t
    const futurePower = amount / Math.pow(1 + rate, years);
    // Xuddi shu tovarni sotib olish uchun kerak bo'ladigan summa: P * (1 + r)^t
    const futurePrice = amount * Math.pow(1 + rate, years);

    const resEl = document.getElementById("infResult");
    if (resEl) {
      resEl.innerHTML = `
        ${years} yildan keyingi xarid qobiliyati: <strong>${this.formatCurrency(futurePower)}</strong><br>
        Hozirgi tovar kelajakda turadigan narx: <strong>${this.formatCurrency(futurePrice)}</strong>
      `;
    }
  }

  // 51: Depozit va lizing hisob-kitobi
  calculateDepositLease() {
    const type = document.getElementById("depLeaseType").value;
    const amount = parseFloat(document.getElementById("depLeaseAmount").value) || 0;
    const rate = parseFloat(document.getElementById("depLeaseRate").value) || 0;
    const months = parseInt(document.getElementById("depLeaseMonths").value) || 12;

    const resEl = document.getElementById("depLeaseResult");

    if (type === "deposit") {
      // Depozit daromadi
      const annualProfit = amount * (rate / 100);
      const totalProfit = annualProfit * (months / 12);
      const monthlyProfit = totalProfit / months;
      if (resEl) {
        resEl.innerHTML = `Depozit jami foiz foydasi: <strong>${this.formatCurrency(totalProfit)}</strong><br>Oylik daromad: <strong>${this.formatCurrency(monthlyProfit)}</strong>`;
      }
    } else {
      // Lizing oylik badali (annuitet yoki teng ulush)
      const mRate = rate / 100 / 12;
      const monthly = mRate > 0 
        ? (amount * mRate * Math.pow(1 + mRate, months)) / (Math.pow(1 + mRate, months) - 1)
        : amount / months;
      const total = monthly * months;
      if (resEl) {
        resEl.innerHTML = `Lizing oylik to'lovi: <strong>${this.formatCurrency(monthly)}</strong><br>Jami to'lov: <strong>${this.formatCurrency(total)}</strong>`;
      }
    }
  }
}

window.AppFinance = new FinanceCalculator();
