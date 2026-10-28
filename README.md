# OmniCalc 114 — Ko'p Tarmoqli Universal Kalkulyator

114 ta barcha funksiyaga ega, zamonaviy tushunarli dizaynga (Light va Dark rejimlariga), o'zbek, rus va ingliz tillariga ega universal web-platforma.

## 🚀 Ishga tushirish
Ilovani ishga tushirish uchun hech qanday server yoki o'rnatish talab qilinmaydi:
- `index.html` faylini istalgan zamonaviy brauzerda (Google Chrome, Microsoft Edge, Safari, Firefox) ikki marta bosib ochish kifoya.

## 📁 Loyiha Strukturasi
```
omni-calculator-114/
│
├── index.html                   # Asosiy UI interfeysi va barcha 11 bo'lim
├── css/
│   └── styles.css               # Zamonaviy Light/Dark tema, Neumorphism va responsiv dizayn
└── js/
    ├── translations.js          # O'zbek, Rus va Ingliz tillari lug'ati
    ├── core-calc.js             # 1–23: Asosiy va ilmiy kalkulyator
    ├── converter.js             # 24–39: 16 toifali o'lchov birliklari konvertori
    ├── finance.js               # 40–51: Moliyaviy va iqtisodiy hisob-kitoblar
    ├── dev-tools.js             # 52–61: Sanoq tizimlari, Bitwise, Base64, Subnet, ASCII
    ├── graph-stats.js           # 62–69: Grafiklar chizish, statistika, progressiyalar
    ├── algebra.js               # 70–77: Tenglamalar, Kramer, matritsalar, proporsiya
    ├── special-math.js          # 78–84: Kasrlar, aralash sonlar, EKUB, EKUK, yaxlitlash
    ├── time-date.js             # 95–100: Ikki sana farqi, kabisa yili, orqaga hisoblash
    ├── games-practice.js        # 101–106: Sudoku, tezkor hisoblash, miya mashqi, numerologiya
    ├── innovation-ai.js         # 107–114: AI yordamchi, ovozli kiritish, QR/Shtrix-kod, taymer
    ├── settings-history.js      # 85–94: Tarix, xotira, PDF/CSV eksport, klaviatura, audio
    └── app.js                   # Boshqaruvchi drayver, qidiruv va navigatsiya
```

## 🌟 114 ta funksiyaning to'liq ro'yxati:
1. **Asosiy arifmetik amallar (1–8)**: Qo'shish, Ayirish, Ko'paytirish, Bo'lish, Qoldiq (%), Qavslar, Daraja (xʸ), Kvadrat ildiz (√).
2. **Ilmiy kalkulyator (9–23)**: sin, cos, tan, asin, acos, atan, log, ln, eˣ, Faktorial (!), π, e, DEG/RAD, sinh, cosh, tanh, |x|, Permutatsiya (nPr), Kombinatsiya (nCr).
3. **O'lchov birliklari (24–39)**: Uzunlik (metrik va imperial), Og'irlik, Harorat (°C, °F, K), Vaqt, Tezlik, Maydon, Hajm, AQSh suyuqlik, Ma'lumot (bit-TB), Bosim, Quvvat, Energiya, Burchak, Zichlik.
4. **Moliyaviy kalkulyator (40–51)**: Kredit summasi va muddati, Oylik annuitet to'lov, Oddiy foiz, Murakkab foiz, Chegirma, Soliq (QQS), Valyuta konvertori, 50/30/20 Byudjet, Jamg'arma maqsadi, Investitsiya ROI, Inflyatsiya, Lizing va depozit.
5. **Dasturchilar uchun (52–61)**: Binary, Octal, Decimal, Hexadecimal, Bitwise AND/OR/XOR/NOT, <<, >>, Base64 kodlash/dekodlash, IP Subnet va CIDR, ASCII jadvali.
6. **Grafik va jadvallar (62–69)**: y = f(x) grafigi, Trigonometrik grafik, Statistik tahlil (Mean, Median, Mode, StdDev), Dinamik jadval va nuqtalar, Arifmetik va geometrik progressiya, Fibonachchi va tub sonlar, Grafikni PNG yuklab olish.
7. **Matematika va algebra (70–77)**: Kvadrat tenglama (ax²+bx+c=0), Kub tenglama, 2x2 Kramer tizimi, Matritsa qo'shish/ko'paytirish, Determinant, Nisbat va proporsiya, Foiz masalalari, Soddalashtirish.
8. **Maxsus hisob-kitoblar (78–84)**: Foiz va promille (‰), Aralash sonlar, Kasrlarni qisqartirish va qo'shish, O'nli kasrni oddiy kasrga aylantirish, EKUB, EKUK, Yaxlitlash.
9. **Qulaylik va sozlamalar (85–94)**: Tarixni localStorage da saqlash, Natijani nusxalash (Clipboard), Klaviatura boshqaruvi, Dark/Light rejim, Ovozli o'qish, O'zbek/Rus/Ingliz tillari, Aniqlik sozlamasi, M+/M-/MR/MC, PDF/CSV eksport, ANS oxirgi natija.
10. **Kalendar va vaqt (95–100)**: Ikki sana farqi, Vaqt farqi, Hafta kuni, Kabisa yili, Hafta raqami va oy kunlari, Tadbirgacha countdown.
11. **O'yin va mashqlar (101–106)**: Sudoku generatori, Matematik misollar viktorinasi, 60s Tez hisoblash sinovi, Aqliy hisoblash sirlari, Tasodifiy sonlar (RNG), Numerologiya (Taqdir raqami).
12. **Innovatsion va AI vositalar (107–114)**: AI matematik yordamchi, Ovozli kiritish (Speech-to-Text), Bosqichma-bosqich yechim, Raqamni so'z bilan yozish (UZ/RU/EN), QR-kod yaratish, Shtrix-kod (Code128), Raqamli soat/taymer/sekundomer, Mini-notepad.
