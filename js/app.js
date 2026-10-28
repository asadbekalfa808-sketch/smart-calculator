/**
 * OMNI-CALCULATOR 114 — Asosiy drayver va Navigatsiya (App Controller)
 */

// 114 ta barcha funksiyalarning to'liq katalogi (Global Search uchun)
const functionCatalog = [
  // 1-8: Asosiy arifmetika
  { id: 1, title: "Qo'shish (+)", section: "sec-core", keywords: "qoshish plus add summa +" },
  { id: 2, title: "Ayirish (−)", section: "sec-core", keywords: "ayirish minus subtract -" },
  { id: 3, title: "Ko'paytirish (×)", section: "sec-core", keywords: "kopaytirish multiply times *" },
  { id: 4, title: "Bo'lish (÷)", section: "sec-core", keywords: "bolish divide /" },
  { id: 5, title: "Qoldiqni topish (%)", section: "sec-core", keywords: "qoldiq modulo mod %" },
  { id: 6, title: "Qavslar bilan hisoblash", section: "sec-core", keywords: "qavs brackets parentheses ()" },
  { id: 7, title: "Darajaga ko'tarish (xʸ)", section: "sec-core", keywords: "daraja power exponent ^ x^y" },
  { id: 8, title: "Kvadrat ildiz chiqarish (√)", section: "sec-core", keywords: "ildiz kvadrat square root sqrt" },

  // 9-23: Ilmiy kalkulyator
  { id: 9, title: "Sinus (sin)", section: "sec-core", keywords: "sinus sin trigonometriya" },
  { id: 10, title: "Kosinus (cos)", section: "sec-core", keywords: "kosinus cos trigonometriya" },
  { id: 11, title: "Tangens (tan)", section: "sec-core", keywords: "tangens tan" },
  { id: 12, title: "Arksinus, arkkosinus, arktangens", section: "sec-core", keywords: "asin acos atan teskari trigonometriya" },
  { id: 13, title: "O'nlik logarifm (log)", section: "sec-core", keywords: "log log10 onlik logarifm" },
  { id: 14, title: "Natural logarifm (ln)", section: "sec-core", keywords: "ln natural logarifm e" },
  { id: 15, title: "Eksponenta (eˣ)", section: "sec-core", keywords: "eksponenta exp e^x" },
  { id: 16, title: "Faktorial (!)", section: "sec-core", keywords: "faktorial factorial n! !" },
  { id: 17, title: "Pi (π) konstantasi", section: "sec-core", keywords: "pi 3.14159 konstanta" },
  { id: 18, title: "Euler soni (e)", section: "sec-core", keywords: "euler e soni 2.71828" },
  { id: 19, title: "Gradus va radian o'rtasida o'tkazish", section: "sec-core", keywords: "gradus radian deg rad burchak" },
  { id: 20, title: "Giperbolik funksiyalar (sinh, cosh, tanh)", section: "sec-core", keywords: "giperbolik sinh cosh tanh" },
  { id: 21, title: "Modul / absolyut qiymat |x|", section: "sec-core", keywords: "modul absolyut absolute abs |x|" },
  { id: 22, title: "Permutatsiya (nPr)", section: "sec-core", keywords: "permutatsiya nPr orin almashtirish" },
  { id: 23, title: "Kombinatsiya (nCr)", section: "sec-core", keywords: "kombinatsiya nCr guruhlash" },

  // 24-39: O'lchov birliklari
  { id: 24, title: "Uzunlik: mm, cm, m, km", section: "sec-units", keywords: "uzunlik metr santimetr kilometr mm cm m km" },
  { id: 25, title: "Uzunlik: dyuym, fut, yard, mil", section: "sec-units", keywords: "dyuym inch fut ft yard yd mil mi" },
  { id: 26, title: "Og'irlik: mg, g, kg, tonna", section: "sec-units", keywords: "ogirlik gramm kilogramm tonna mg g kg" },
  { id: 27, title: "Og'irlik: unsiya va funt", section: "sec-units", keywords: "unsiya oz funt lb imperial" },
  { id: 28, title: "Harorat: Celsius, Fahrenheit, Kelvin", section: "sec-units", keywords: "harorat celsius gradus fahrenheit kelvin temperatura" },
  { id: 29, title: "Vaqt: sekund, minut, soat, kun", section: "sec-units", keywords: "vaqt sekund minut soat kun time" },
  { id: 30, title: "Tezlik: m/s va km/soat", section: "sec-units", keywords: "tezlik m/s km/h mph knot speed" },
  { id: 31, title: "Yuza: m², km², gektar, akr", section: "sec-units", keywords: "yuza maydon gektar akr kvadrat metr area" },
  { id: 32, title: "Hajm: ml, litr, m³", section: "sec-units", keywords: "hajm litr millilitr kub metr volume" },
  { id: 33, title: "AQSh suyuqlik birliklari: cup, gallon", section: "sec-units", keywords: "cup pinta galon gallon quart suyuqlik" },
  { id: 34, title: "Ma'lumot hajmi: bit, B, KB, MB, GB, TB", section: "sec-units", keywords: "bayt gigabayt megabayt terabayt data" },
  { id: 35, title: "Bosim: Pa, kPa, bar, atm, psi", section: "sec-units", keywords: "bosim paskal bar atmosfera psi mmHg pressure" },
  { id: 36, title: "Quvvat: W, kW, ot kuchi", section: "sec-units", keywords: "quvvat vatt kilovatt ot kuchi horsepower hp power" },
  { id: 37, title: "Energiya: J, kJ, kaloriya, kWh", section: "sec-units", keywords: "energiya joul kaloriya kwh energy" },
  { id: 38, title: "Burchak: gradus va radian", section: "sec-units", keywords: "burchak gradus radian angle" },
  { id: 39, title: "Zichlik: kg/m³ va g/cm³", section: "sec-units", keywords: "zichlik density kg/m3" },

  // 40-51: Moliyaviy kalkulyator
  { id: 40, title: "Kredit summasi va muddatini hisoblash", section: "sec-finance", keywords: "kredit muddat summa jami tolov" },
  { id: 41, title: "Kreditning oylik to'lovini hisoblash", section: "sec-finance", keywords: "oylik tolov annuitet kredit" },
  { id: 42, title: "Oddiy foizli daromad", section: "sec-finance", keywords: "oddiy foiz daromad simple interest" },
  { id: 43, title: "Murakkab foizli daromad", section: "sec-finance", keywords: "murakkab foiz kapitalizatsiya compound" },
  { id: 44, title: "Chegirma va yakuniy narx", section: "sec-finance", keywords: "chegirma discount aksiya narx" },
  { id: 45, title: "Soliq miqdorini hisoblash", section: "sec-finance", keywords: "soliq qqs daromad soligi tax nds" },
  { id: 46, title: "Valyuta konvertori", section: "sec-finance", keywords: "valyuta dollar sum rubl kurs konvertor" },
  { id: 47, title: "Oylik budjet rejalashtirish", section: "sec-finance", keywords: "budjet reja 50/30/20 xarajat oylik" },
  { id: 48, title: "Jamg'arma maqsadi va yetish muddati", section: "sec-finance", keywords: "jamgarma maqsad yigish muddat savings" },
  { id: 49, title: "Investitsiya daromadini hisoblash (ROI)", section: "sec-finance", keywords: "investitsiya daromad roi foyda" },
  { id: 50, title: "Inflyatsiyani hisobga olgan qiymat", section: "sec-finance", keywords: "inflyatsiya qadrsizlanish kelajak xarid qobiliyati" },
  { id: 51, title: "Depozit va lizing hisob-kitobi", section: "sec-finance", keywords: "depozit lizing omonat badal" },

  // 52-61: Dasturchilar uchun
  { id: 52, title: "Ikkilik sanoq tizimi (Binary)", section: "sec-developer", keywords: "binary ikkilik 0b bit bayt" },
  { id: 53, title: "Sakkizlik sanoq tizimi (Octal)", section: "sec-developer", keywords: "octal sakkizlik 0o" },
  { id: 54, title: "O'nlik sanoq tizimi (Decimal)", section: "sec-developer", keywords: "decimal onlik 10" },
  { id: 55, title: "O'n oltilik sanoq tizimi (Hexadecimal)", section: "sec-developer", keywords: "hex hexadecimal on oltilik 0x" },
  { id: 56, title: "AND, OR, XOR va NOT bitli amallari", section: "sec-developer", keywords: "bitwise and or xor not bit amallari" },
  { id: 57, title: "Bitlarni chapga surish (<<)", section: "sec-developer", keywords: "left shift chapga surish <<" },
  { id: 58, title: "Bitlarni o'ngga surish (>>)", section: "sec-developer", keywords: "right shift ongga surish >>" },
  { id: 59, title: "Base64 kodlash va dekodlash", section: "sec-developer", keywords: "base64 encode decode kodlash" },
  { id: 60, title: "IP manzil va subnet kalkulyatori", section: "sec-developer", keywords: "ip manzil subnet cidr mask tarmoq broadcast" },
  { id: 61, title: "ASCII belgilar jadvali va kodi", section: "sec-developer", keywords: "ascii jadval char code belgi" },

  // 62-69: Grafik va jadvallar
  { id: 62, title: "y = f(x) funksiyasi grafigini chizish", section: "sec-graph", keywords: "grafik funksiya chizish plotter y=f(x)" },
  { id: 63, title: "Trigonometrik funksiya grafigi", section: "sec-graph", keywords: "sin cos tan grafik trigonometriya" },
  { id: 64, title: "Oddiy statistik tahlil", section: "sec-graph", keywords: "statistika ortacha mediana moda dispersiya" },
  { id: 65, title: "Kiritilgan ma'lumotlar jadvali", section: "sec-graph", keywords: "jadval data table sonlar" },
  { id: 66, title: "Ma'lumotlar grafigini dinamik yangilash", section: "sec-graph", keywords: "dinamik grafik yangilanish" },
  { id: 67, title: "Arifmetik va geometrik progressiya", section: "sec-graph", keywords: "progressiya arifmetik geometrik an sn" },
  { id: 68, title: "Sonli ketma-ketlikni hisoblash", section: "sec-graph", keywords: "ketma ketlik fibonachchi tub sonlar" },
  { id: 69, title: "Grafikni rasm sifatida yuklab olish", section: "sec-graph", keywords: "grafik yuklab olish rasm png export" },

  // 70-77: Matematika va algebra
  { id: 70, title: "Kvadrat tenglamani yechish", section: "sec-algebra", keywords: "kvadrat tenglama diskriminant ax2+bx+c=0 ildizlar" },
  { id: 71, title: "Kub tenglamaning yechimlarini topish", section: "sec-algebra", keywords: "kub tenglama ax3 kardano ildiz" },
  { id: 72, title: "Chiziqli tenglamalar tizimini yechish", section: "sec-algebra", keywords: "kramer tenglamalar tizimi sistema tenglama" },
  { id: 73, title: "Matritsalarni qo'shish va ko'paytirish", section: "sec-algebra", keywords: "matritsa matrix qoshish kopaytirish 2x2" },
  { id: 74, title: "Matritsa determinanti", section: "sec-algebra", keywords: "matritsa determinanti det determinant" },
  { id: 75, title: "Nisbat va proporsiya", section: "sec-algebra", keywords: "proporsiya nisbat a/b=c/x" },
  { id: 76, title: "Foizga oid masalalar", section: "sec-algebra", keywords: "foiz masalalari qancha foizi ozgarish" },
  { id: 77, title: "Sonli ifodalarni soddalashtirish", section: "sec-algebra", keywords: "soddalashtirish algebraik ifoda" },

  // 78-84: Maxsus hisoblar
  { id: 78, title: "Foiz va promille hisoblash", section: "sec-special", keywords: "promille foiz ‰ %" },
  { id: 79, title: "Aralash sonlar bilan amallar", section: "sec-special", keywords: "aralash son kasr butun qism" },
  { id: 80, title: "Kasrlarni qisqartirish va qo'shish", section: "sec-special", keywords: "kasr qisqartirish oddiy kasr" },
  { id: 81, title: "O'nli kasrni oddiy kasrga aylantirish", section: "sec-special", keywords: "onli kasr oddiy kasrga 0.75 3/4" },
  { id: 82, title: "Eng katta umumiy bo'luvchi (EKUB)", section: "sec-special", keywords: "ekub gcd boluvchi" },
  { id: 83, title: "Eng kichik umumiy karrali (EKUK)", section: "sec-special", keywords: "ekuk lcm karrali" },
  { id: 84, title: "Sonni yaxlitlash va aniqlik", section: "sec-special", keywords: "yaxlitlash round floor ceil aniqlik" },

  // 85-94: Qulaylik va sozlamalar
  { id: 85, title: "Hisoblash tarixini saqlash", section: "sec-settings", keywords: "tarix saqlash history" },
  { id: 86, title: "Natijani nusxalash", section: "sec-settings", keywords: "nusxalash copy clipboard" },
  { id: 87, title: "Klaviatura orqali boshqarish", section: "sec-settings", keywords: "klaviatura keyboard enter backspace" },
  { id: 88, title: "Dark mode / Light mode", section: "sec-settings", keywords: "dark mode light mode tungi kunduzgi tema" },
  { id: 89, title: "Ovozli boshqaruv / O'qish", section: "sec-settings", keywords: "ovoz speech ovozli boshqaruv" },
  { id: 90, title: "O'zbek, rus va ingliz tillari", section: "sec-settings", keywords: "til language uz ru en tarjima" },
  { id: 91, title: "Kalkulyator sozlamalari", section: "sec-settings", keywords: "sozlamalar settings parametr" },
  { id: 92, title: "Xotira amallari: M+, M−, MR, MC", section: "sec-core", keywords: "xotira memory m+ m- mr mc" },
  { id: 93, title: "Natijani PDF yoki CSV eksport qilish", section: "sec-settings", keywords: "pdf csv eksport yuklab olish hisobot" },
  { id: 94, title: "Oxirgi natijadan foydalanish (ANS)", section: "sec-core", keywords: "ans oxirgi natija davom ettirish" },

  // 95-100: Kalendar va vaqt
  { id: 95, title: "Ikki sana orasidagi kunlarni hisoblash", section: "sec-calendar", keywords: "sana kunlar farq date diff" },
  { id: 96, title: "Sana yoki vaqt farqi", section: "sec-calendar", keywords: "vaqt farqi soat daqiqa" },
  { id: 97, title: "Sana bo'yicha hafta kuni", section: "sec-calendar", keywords: "hafta kuni day of week qaysi kun" },
  { id: 98, title: "Yil kabisa yili ekanini aniqlash", section: "sec-calendar", keywords: "kabisa leap year 366 kun fevral" },
  { id: 99, title: "Hafte raqami va oy kunlari", section: "sec-calendar", keywords: "hafta raqami oy kunlari kalendar" },
  { id: 100, title: "Tadbirgacha qolgan vaqt (Countdown)", section: "sec-calendar", keywords: "countdown ortga hisoblash tadbir qolgan vaqt" },

  // 101-106: O'yin va mashqlar
  { id: 101, title: "Sudoku uchun sonlar generatori", section: "sec-games", keywords: "sudoku generator ooyin boshqotirma" },
  { id: 102, title: "Matematik misollar o'yini", section: "sec-games", keywords: "misol oyin quiz viktorina matematika" },
  { id: 103, title: "Tez hisoblash testi (60s)", section: "sec-games", keywords: "tez hisoblash speed math test rekord" },
  { id: 104, title: "Aqliy hisoblash mashqlari", section: "sec-games", keywords: "aqliy hisob sir sirlar miya mashqi" },
  { id: 105, title: "Tasodifiy sonlar generatori", section: "sec-games", keywords: "tasodifiy son rng random" },
  { id: 106, title: "Numerologik hisob-kitob", section: "sec-games", keywords: "numerologiya taqdir raqami tugilgan sana" },

  // 107-114: Innovatsion va AI
  { id: 107, title: "AI yordamchisi: hisoblash usulini tushuntirish", section: "sec-innovation", keywords: "ai yordamchi suniy intellekt tushuntirish gemini" },
  { id: 108, title: "Ovozli kiritilgan ifodani matnga aylantirish", section: "sec-innovation", keywords: "ovozli kiritish speech to text diktovka" },
  { id: 109, title: "Ifodani bosqichma-bosqich yechib ko'rsatish", section: "sec-innovation", keywords: "bosqichma bosqich step by step yechim" },
  { id: 110, title: "Raqamni so'z bilan yozish", section: "sec-innovation", keywords: "raqam soz bilan yozish summa yozuvi" },
  { id: 111, title: "QR-kod yaratish", section: "sec-innovation", keywords: "qr kod yaratish qr code generator" },
  { id: 112, title: "Shtrix-kod yaratish", section: "sec-innovation", keywords: "shtrix kod barcode code128 generator" },
  { id: 113, title: "Raqamli soat va taymer", section: "sec-innovation", keywords: "soat sekundomer taymer raqamli soat" },
  { id: 114, title: "Eslatmalar uchun mini-notepad", section: "sec-innovation", keywords: "notepad bloknot eslatma daftarcha" }
];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Tillarni yuklash
  setLanguage(currentLang);

  // 2. Modullarni boshlash
  window.CoreCalc && window.CoreCalc.init();
  window.AppConverter && window.AppConverter.init();
  window.AppFinance && window.AppFinance.init();
  window.AppDevTools && window.AppDevTools.init();
  window.AppGraphStats && window.AppGraphStats.init();
  window.AppAlgebra && window.AppAlgebra.init();
  window.AppSpecialMath && window.AppSpecialMath.init();
  window.AppTimeDate && window.AppTimeDate.init();
  window.AppGamesPractice && window.AppGamesPractice.init();
  window.AppInnovationAI && window.AppInnovationAI.init();
  window.AppHistory && window.AppHistory.init();

  // 3. Navigatsiya boshqaruvi
  bindNavigation();

  // 4. Qidiruv boshqaruvi
  bindGlobalSearch();

  // 5. Til tanlash o'zgarishi
  const langSelect = document.getElementById("langSelect");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  // 6. Sidebar mobil menyu ochish/yopish
  const toggleBtn = document.getElementById("mobileSidebarToggle");
  const sidebar = document.getElementById("appSidebar");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
    });
  }

  // Nusxa olish tugmalarini ulash
  document.addEventListener("click", (e) => {
    const copyTarget = e.target.closest("[data-copy-target]");
    if (copyTarget) {
      const targetId = copyTarget.getAttribute("data-copy-target");
      const el = document.getElementById(targetId);
      if (el) {
        const text = el.value !== undefined ? el.value : el.textContent;
        window.AppHistory && window.AppHistory.copyToClipboard(text);
      }
    }
  });
});

function bindNavigation() {
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSec = item.getAttribute("data-section");
      switchSection(targetSec);

      // Mobilda sidebar yopilishi
      const sidebar = document.getElementById("appSidebar");
      if (sidebar) sidebar.classList.remove("mobile-open");
    });
  });
}

function switchSection(sectionId) {
  // Menyuni yangilash
  document.querySelectorAll(".menu-item").forEach(el => {
    if (el.getAttribute("data-section") === sectionId) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });

  // Panellarni almashtirish
  document.querySelectorAll(".section-pane").forEach(pane => {
    if (pane.id === sectionId) {
      pane.classList.add("active");
    } else {
      pane.classList.remove("active");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindGlobalSearch() {
  const input = document.getElementById("globalSearchInput");
  const dropdown = document.getElementById("searchDropdown");

  if (!input || !dropdown) return;

  input.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      dropdown.classList.remove("active");
      dropdown.innerHTML = "";
      return;
    }

    const matches = functionCatalog.filter(f => {
      return (
        f.id.toString() === query ||
        f.title.toLowerCase().includes(query) ||
        f.keywords.toLowerCase().includes(query)
      );
    });

    if (matches.length === 0) {
      dropdown.innerHTML = `<div style="padding:12px; color:var(--text-muted); font-size:13px; text-align:center;">Funksiya topilmadi</div>`;
      dropdown.classList.add("active");
      return;
    }

    dropdown.innerHTML = "";
    matches.slice(0, 10).forEach(item => {
      const resItem = document.createElement("div");
      resItem.className = "search-result-item";
      resItem.innerHTML = `
        <div>
          <span class="fn-badge" style="margin-right:6px;">#${item.id}</span>
          <span style="font-weight:600; font-size:13.5px;">${item.title}</span>
        </div>
        <span style="font-size:11px; color:var(--text-muted);">Bo'limga o'tish →</span>
      `;
      resItem.addEventListener("click", () => {
        switchSection(item.section);
        input.value = "";
        dropdown.classList.remove("active");
      });
      dropdown.appendChild(resItem);
    });

    dropdown.classList.add("active");
  });

  // Tashqariga bosilganda dropdown yopilishi
  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
}
