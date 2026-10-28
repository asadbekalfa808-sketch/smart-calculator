/**
 * OMNI-CALCULATOR 114 — 8. KALENDAR VA VAQT (Funksiyalar 95–100)
 */

class TimeDateEngine {
  constructor() {
    this.countdownTimer = null;
  }

  init() {
    this.bindEvents();
    this.initDefaultDates();
  }

  initDefaultDates() {
    const today = new Date().toISOString().split("T")[0];
    const d1 = document.getElementById("dateDiff1");
    const d2 = document.getElementById("dateDiff2");
    const dayDate = document.getElementById("dayOfWeekDate");
    const cdDate = document.getElementById("countdownTarget");

    if (d1) d1.value = today;
    if (d2) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 30);
      d2.value = tomorrow.toISOString().split("T")[0];
    }
    if (dayDate) dayDate.value = today;
    if (cdDate) cdDate.value = new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 16);
  }

  bindEvents() {
    // 95: Ikki sana orasidagi kunlar
    const diffBtn = document.getElementById("calcDateDiffBtn");
    if (diffBtn) diffBtn.addEventListener("click", () => this.calcDateDiff());

    // 96: Vaqt farqi (soat, daqiqa)
    const timeDiffBtn = document.getElementById("calcTimeDiffBtn");
    if (timeDiffBtn) timeDiffBtn.addEventListener("click", () => this.calcTimeDiff());

    // 97: Hafta kuni
    const dowBtn = document.getElementById("calcDayOfWeekBtn");
    if (dowBtn) dowBtn.addEventListener("click", () => this.calcDayOfWeek());

    // 98: Kabisa yili
    const leapBtn = document.getElementById("calcLeapYearBtn");
    if (leapBtn) leapBtn.addEventListener("click", () => this.checkLeapYear());

    // 99: Hafta raqami va oy kunlari
    const weekNumBtn = document.getElementById("calcWeekNumBtn");
    if (weekNumBtn) weekNumBtn.addEventListener("click", () => this.calcWeekAndMonthDays());

    // 100: Tadbirgacha ortga hisoblash
    const cdBtn = document.getElementById("startCountdownBtn");
    if (cdBtn) cdBtn.addEventListener("click", () => this.startCountdown());
  }

  // 95: Sana farqi
  calcDateDiff() {
    const val1 = document.getElementById("dateDiff1")?.value;
    const val2 = document.getElementById("dateDiff2")?.value;
    const resEl = document.getElementById("dateDiffResult");

    if (!val1 || !val2) return;

    const d1 = new Date(val1);
    const d2 = new Date(val2);

    const diffMs = Math.abs(d2 - d1);
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const remDays = diffDays % 7;
    const months = (diffDays / 30.4375).toFixed(1);

    if (resEl) {
      resEl.innerHTML = `
        <div>Jami kunlar: <strong>${diffDays} kun</strong></div>
        <div>Hafta va kun: <strong>${weeks} hafta, ${remDays} kun</strong></div>
        <div>Taxminan oylar: <strong>${months} oy</strong></div>
      `;
    }
  }

  // 96: Vaqt farqi
  calcTimeDiff() {
    const t1 = document.getElementById("timeVal1")?.value;
    const t2 = document.getElementById("timeVal2")?.value;
    const resEl = document.getElementById("timeDiffResult");

    if (!t1 || !t2) return;

    const [h1, m1] = t1.split(":").map(Number);
    const [h2, m2] = t2.split(":").map(Number);

    let mins1 = h1 * 60 + m1;
    let mins2 = h2 * 60 + m2;

    let diff = Math.abs(mins2 - mins1);
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;

    if (resEl) {
      resEl.innerHTML = `Farq: <strong>${hours} soat ${mins} daqiqa</strong> (${diff} daqiqa)`;
    }
  }

  // 97: Hafta kuni
  calcDayOfWeek() {
    const val = document.getElementById("dayOfWeekDate")?.value;
    const resEl = document.getElementById("dayOfWeekResult");
    if (!val) return;

    const daysUz = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
    const daysRu = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const d = new Date(val);
    const dayIdx = d.getDay();

    if (resEl) {
      resEl.innerHTML = `
        <div>🇺🇿 Hafta kuni: <strong>${daysUz[dayIdx]}</strong></div>
        <div>🇷🇺 День недели: <strong>${daysRu[dayIdx]}</strong></div>
        <div>🇬🇧 Day of week: <strong>${daysEn[dayIdx]}</strong></div>
      `;
    }
  }

  // 98: Kabisa yili
  checkLeapYear() {
    const yr = parseInt(document.getElementById("leapYearInput")?.value) || new Date().getFullYear();
    const resEl = document.getElementById("leapYearResult");

    // Kabisa yili: 400 ga bo'linadi YOKI (4 ga bo'linadi va 100 ga bo'linmaydi)
    const isLeap = (yr % 4 === 0 && yr % 100 !== 0) || (yr % 400 === 0);

    if (resEl) {
      if (isLeap) {
        resEl.innerHTML = `<span style="color:var(--accent-green); font-weight:bold;">${yr} — KABISA YILI! (366 kun, fevral 29 kun)</span>`;
      } else {
        resEl.innerHTML = `<span style="color:var(--text-secondary);">${yr} — oddiy yil (365 kun, fevral 28 kun)</span>`;
      }
    }
  }

  // 99: Hafta raqami va oy kunlari
  calcWeekAndMonthDays() {
    const dt = new Date(document.getElementById("weekNumDate")?.value || new Date());
    const resEl = document.getElementById("weekNumResult");

    // ISO Hafta raqami
    const d = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

    // Oyda necha kun bor
    const year = dt.getFullYear();
    const month = dt.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    if (resEl) {
      resEl.innerHTML = `
        <div>Yilning <strong>${weekNo}-haftasi</strong></div>
        <div>Ushbu oyda jami: <strong>${daysInMonth} kun</strong> bor</div>
      `;
    }
  }

  // 100: Tadbirgacha ortga hisoblash (Countdown)
  startCountdown() {
    const targetVal = document.getElementById("countdownTarget")?.value;
    const resEl = document.getElementById("countdownResult");
    if (!targetVal) return;

    const targetDate = new Date(targetVal).getTime();

    if (this.countdownTimer) clearInterval(this.countdownTimer);

    const update = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(this.countdownTimer);
        if (resEl) resEl.innerHTML = "<strong style='color:var(--accent-red);'>Tadbir vaqti yetib keldi!</strong>";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (resEl) {
        resEl.innerHTML = `
          <div style="font-size:20px; font-weight:700; color:var(--primary); font-family:monospace;">
            ${days} kun : ${hours.toString().padStart(2, "0")} soat : ${minutes.toString().padStart(2, "0")} daq : ${seconds.toString().padStart(2, "0")} son
          </div>
        `;
      }
    };

    update();
    this.countdownTimer = setInterval(update, 1000);
  }
}

window.AppTimeDate = new TimeDateEngine();
