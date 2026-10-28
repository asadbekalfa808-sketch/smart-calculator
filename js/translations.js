/**
 * OMNI-CALCULATOR 114 — Tarjimalar va ko'p tilli tizim (UZ, RU, EN)
 */

const translations = {
  uz: {
    app_title: "OmniCalc 114",
    app_subtitle: "114 ta funksiyali universal kalkulyator",
    search_placeholder: "114 ta funksiyadan qidirish (nomi yoki raqami)...",
    
    // Menyu bo'limlari
    menu_cat_calc: "Kalkulyatorlar",
    menu_cat_science: "Ilm-fan & Matematika",
    menu_cat_tools: "Foydali Vositalar",
    menu_cat_extras: "Qo'shimchalar",

    sec_core: "Asosiy & Ilmiy",
    sec_units: "O'lchov birliklari",
    sec_finance: "Moliya & Iqtisod",
    sec_developer: "Dasturchilar uchun",
    sec_graph: "Grafik & Jadvallar",
    sec_algebra: "Algebra & Tenglamalar",
    sec_special: "Maxsus hisoblar",
    sec_calendar: "Kalendar & Vaqt",
    sec_games: "O'yinlar & Mashqlar",
    sec_innovation: "Innovatsiya & AI",
    sec_settings: "Sozlamalar & Tarix",

    // Bo'lim sarlavhalari
    desc_core: "1–23: Arifmetika, darajalar, ildizlar va ilmiy funksiyalar",
    desc_units: "24–39: 16 xil o'lchov birliklarini o'zaro konvertatsiya qilish",
    desc_finance: "40–51: Kredit, foizlar, soliq, byudjet, lizing va investitsiyalar",
    desc_developer: "52–61: Binary, Octal, Hex, Bitwise amallar, Base64, Subnet, ASCII",
    desc_graph: "62–69: Funksiya grafiki, statistika, progressiya va eksport",
    desc_algebra: "70–77: Kvadrat va kub tenglamalar, Kramer tizimi, matritsalar",
    desc_special: "78–84: Kasrlar, aralash sonlar, EKUB, EKUK, promille va yaxlitlash",
    desc_calendar: "95–100: Ikki sana farqi, hafta kuni, kabisa yili, orqaga hisoblash",
    desc_games: "101–106: Sudoku, tezkor matematika, xotira mashqlari, numerologiya",
    desc_innovation: "107–114: AI tushuntiruvchi, ovozli kiritish, QR/Shtrix-kod, taymer",
    desc_settings: "85–94: Tarix, xotira, PDF/CSV eksport, sozlamalar va til",

    // UI tugmalari
    calculate: "Hisoblash",
    clear: "Tozalash",
    copy: "Nusxa olish",
    copied: "Nusxalandi!",
    result: "Natija",
    step_by_step: "Qadamma-qadam yechim",
    details: "Tafsilotlar",
    export_pdf: "PDF yuklab olish",
    export_csv: "CSV yuklab olish",
    history: "Tarix",
    memory: "Xotira",
    empty_history: "Hisoblash tarixi bo'sh",
    empty_memory: "Xotira bo'sh (M+, M- tugmalaridan foydalaning)",

    // Sozlamalar
    settings_title: "Ilova Sozlamalari",
    setting_precision: "Sonlar aniqligi (kasr xonasi)",
    setting_sound: "Tugmalar ovozi",
    setting_angle: "Burchak o'lchovi birligi",
    setting_theme: "Mavzu rejimi",
    theme_light: "Kunduzgi (Light)",
    theme_dark: "Tungi (Dark)",
    theme_auto: "Tizimga mos",

    // AI & Innovatsiya
    ai_ask_placeholder: "Masalan: Nega 2 ning 10-darajasi 1024 ga teng? Yoki ifodani tushuntiring...",
    ai_ask_btn: "AI dan so'rash",
    ai_loading: "AI tahlil qilmoqda...",
    speech_start: "Ovozli kiritishni boshlash",
    speech_listening: "Eshitilmoqda... gapiring",
    speech_stop: "To'xtatish",
    speech_speak_res: "Natijani ovozda o'qish"
  },
  ru: {
    app_title: "OmniCalc 114",
    app_subtitle: "Универсальный калькулятор на 114 функций",
    search_placeholder: "Поиск среди 114 функций (название или номер)...",

    menu_cat_calc: "Калькуляторы",
    menu_cat_science: "Наука и Математика",
    menu_cat_tools: "Инструменты",
    menu_cat_extras: "Дополнительно",

    sec_core: "Базовый и Научный",
    sec_units: "Конвертер единиц",
    sec_finance: "Финансы и Экономика",
    sec_developer: "Для разработчиков",
    sec_graph: "Графики и Таблицы",
    sec_algebra: "Алгебра и Уравнения",
    sec_special: "Специальные расчеты",
    sec_calendar: "Календарь и Время",
    sec_games: "Игры и Тренажеры",
    sec_innovation: "Инновации и ИИ",
    sec_settings: "Настройки и История",

    desc_core: "1–23: Арифметика, степени, корни и научные функции",
    desc_units: "24–39: Конвертация 16 категорий физических величин",
    desc_finance: "40–51: Кредиты, проценты, налоги, бюджет, лизинг и инвестиции",
    desc_developer: "52–61: Binary, Octal, Hex, Побитовые операции, Base64, Subnet, ASCII",
    desc_graph: "62–69: Графики функций, статистика, прогрессии и экспорт",
    desc_algebra: "70–77: Квадратные и кубические уравнения, метод Крамера, матрицы",
    desc_special: "78–84: Дроби, смешанные числа, НОД, НОК, промилле и округление",
    desc_calendar: "95–100: Разница дат, день недели, високосный год, обратный отсчет",
    desc_games: "101–106: Судоку, быстрый счет, тренировка памяти, нумерология",
    desc_innovation: "107–114: ИИ-помощник, голосовой ввод, QR/Штрих-код, таймер",
    desc_settings: "85–94: История, память, экспорт в PDF/CSV, настройки и язык",

    calculate: "Рассчитать",
    clear: "Очистить",
    copy: "Копировать",
    copied: "Скопировано!",
    result: "Результат",
    step_by_step: "Пошаговое решение",
    details: "Подробности",
    export_pdf: "Скачать PDF",
    export_csv: "Скачать CSV",
    history: "История",
    memory: "Память",
    empty_history: "История вычислений пуста",
    empty_memory: "Память пуста (используйте M+, M-)",

    settings_title: "Настройки приложения",
    setting_precision: "Точность (знаков после запятой)",
    setting_sound: "Звук нажатия клавиш",
    setting_angle: "Единица измерения углов",
    setting_theme: "Тема оформления",
    theme_light: "Светлая",
    theme_dark: "Темная",
    theme_auto: "Системная",

    ai_ask_placeholder: "Например: Объясни, как найти корень квадратный или формулу...",
    ai_ask_btn: "Спросить у ИИ",
    ai_loading: "ИИ анализирует...",
    speech_start: "Начать голосовой ввод",
    speech_listening: "Слушаю... говорите",
    speech_stop: "Остановить",
    speech_speak_res: "Озвучить результат"
  },
  en: {
    app_title: "OmniCalc 114",
    app_subtitle: "Multi-purpose 114-function calculator",
    search_placeholder: "Search 114 functions by name or number...",

    menu_cat_calc: "Calculators",
    menu_cat_science: "Science & Math",
    menu_cat_tools: "Tools & Converters",
    menu_cat_extras: "Extras & AI",

    sec_core: "Core & Scientific",
    sec_units: "Unit Converter",
    sec_finance: "Finance & Economy",
    sec_developer: "Developer Tools",
    sec_graph: "Graphs & Statistics",
    sec_algebra: "Algebra & Equations",
    sec_special: "Special Math",
    sec_calendar: "Calendar & Time",
    sec_games: "Games & Practice",
    sec_innovation: "Innovation & AI",
    sec_settings: "Settings & History",

    desc_core: "1–23: Arithmetic, powers, roots, trigonometry & scientific math",
    desc_units: "24–39: 16 multi-category unit converters",
    desc_finance: "40–51: Loans, interest, taxes, budget, leasing & investments",
    desc_developer: "52–61: Binary, Octal, Hex, Bitwise, Base64, IP Subnet, ASCII",
    desc_graph: "62–69: Function plotter, statistics, progressions & chart export",
    desc_algebra: "70–77: Quadratic & cubic equations, Cramer's rule, matrices",
    desc_special: "78–84: Fractions, mixed numbers, GCD, LCM, permille & rounding",
    desc_calendar: "95–100: Date difference, day of week, leap year, event countdown",
    desc_games: "101–106: Sudoku generator, speed math test, brain workout, numerology",
    desc_innovation: "107–114: AI explainer, speech recognition, QR/Barcode, timer",
    desc_settings: "85–94: History, memory, PDF/CSV export, settings & multi-language",

    calculate: "Calculate",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied!",
    result: "Result",
    step_by_step: "Step-by-step solution",
    details: "Details",
    export_pdf: "Export PDF",
    export_csv: "Export CSV",
    history: "History",
    memory: "Memory",
    empty_history: "Calculation history is empty",
    empty_memory: "Memory is empty (use M+, M-)",

    settings_title: "App Settings",
    setting_precision: "Precision (decimal places)",
    setting_sound: "Button click sound",
    setting_angle: "Angle unit",
    setting_theme: "Theme mode",
    theme_light: "Light",
    theme_dark: "Dark",
    theme_auto: "System",

    ai_ask_placeholder: "E.g., Explain Pythagorean theorem or quadratic formula...",
    ai_ask_btn: "Ask AI",
    ai_loading: "AI is thinking...",
    speech_start: "Start voice input",
    speech_listening: "Listening... speak now",
    speech_stop: "Stop",
    speech_speak_res: "Read aloud"
  }
};

let currentLang = localStorage.getItem("omni_lang") || "uz";

function setLanguage(lang) {
  if (!translations[lang]) lang = "uz";
  currentLang = lang;
  localStorage.setItem("omni_lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (translations[lang][key]) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });

  const langSelect = document.getElementById("langSelect");
  if (langSelect) langSelect.value = lang;
}

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}
