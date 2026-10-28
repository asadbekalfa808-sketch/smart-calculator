/**
 * OMNI-CALCULATOR 114 — 2. O'LCHOV BIRLIKLARINI AYLANTIRISH (Funksiyalar 24–39)
 */

class UnitConverter {
  constructor() {
    this.categories = {
      // 24 & 25: Uzunlik (Metrik va Imperial)
      length: {
        name: "Uzunlik (Length)",
        base: "m",
        units: {
          mm: { name: "Millimetr (mm)", factor: 0.001 },
          cm: { name: "Santimetr (cm)", factor: 0.01 },
          m: { name: "Metr (m)", factor: 1 },
          km: { name: "Kilometr (km)", factor: 1000 },
          inch: { name: "Dyuym (in)", factor: 0.0254 },
          ft: { name: "Fut (ft)", factor: 0.3048 },
          yd: { name: "Yard (yd)", factor: 0.9144 },
          mi: { name: "Mil (mi)", factor: 1609.344 }
        }
      },

      // 26 & 27: Og'irlik (Metrik va Imperial)
      weight: {
        name: "Og'irlik (Weight / Mass)",
        base: "kg",
        units: {
          mg: { name: "Milligramm (mg)", factor: 0.000001 },
          g: { name: "Gramm (g)", factor: 0.001 },
          kg: { name: "Kilogramm (kg)", factor: 1 },
          ton: { name: "Tonna (t)", factor: 1000 },
          oz: { name: "Unsiya (oz)", factor: 0.0283495 },
          lb: { name: "Funt (lb)", factor: 0.45359237 }
        }
      },

      // 28: Harorat (Celsius, Fahrenheit, Kelvin)
      temperature: {
        name: "Harorat (Temperature)",
        isCustom: true,
        units: {
          c: { name: "Celsius (°C)" },
          f: { name: "Fahrenheit (°F)" },
          k: { name: "Kelvin (K)" }
        }
      },

      // 29: Vaqt (Time)
      time: {
        name: "Vaqt (Time)",
        base: "s",
        units: {
          ms: { name: "Millisekund (ms)", factor: 0.001 },
          s: { name: "Sekund (s)", factor: 1 },
          min: { name: "Daqiqa (min)", factor: 60 },
          h: { name: "Soat (h)", factor: 3600 },
          d: { name: "Kun (d)", factor: 86400 },
          week: { name: "Hafta", factor: 604800 },
          year: { name: "Yil (365 kun)", factor: 31536000 }
        }
      },

      // 30: Tezlik (Speed)
      speed: {
        name: "Tezlik (Speed)",
        base: "mps",
        units: {
          mps: { name: "Metr/sekund (m/s)", factor: 1 },
          kmh: { name: "Kilometr/soat (km/h)", factor: 1 / 3.6 },
          mph: { name: "Mil/soat (mph)", factor: 0.44704 },
          knot: { name: "Tugun (Knot)", factor: 0.514444 }
        }
      },

      // 31: Yuza / Maydon (Area)
      area: {
        name: "Yuza / Maydon (Area)",
        base: "sqm",
        units: {
          sqmm: { name: "Kvadrat mm (mm²)", factor: 0.000001 },
          sqcm: { name: "Kvadrat sm (sm²)", factor: 0.0001 },
          sqm: { name: "Kvadrat metr (m²)", factor: 1 },
          ha: { name: "Gektar (ha)", factor: 10000 },
          sqkm: { name: "Kvadrat km (km²)", factor: 1000000 },
          sqft: { name: "Kvadrat fut (ft²)", factor: 0.092903 },
          acre: { name: "Akr (acre)", factor: 4046.86 }
        }
      },

      // 32 & 33: Hajm va AQSh suyuqlik birliklari (Volume & US Liquid)
      volume: {
        name: "Hajm va Suyuqlik (Volume)",
        base: "l",
        units: {
          ml: { name: "Millilitr (ml)", factor: 0.001 },
          l: { name: "Litr (L)", factor: 1 },
          cbm: { name: "Kubometr (m³)", factor: 1000 },
          cbcm: { name: "Kub santimetr (cm³)", factor: 0.001 },
          cup: { name: "AQSh stakan (Cup)", factor: 0.236588 },
          pint: { name: "AQSh pinta (Pint)", factor: 0.473176 },
          quart: { name: "AQSh kvarta (Quart)", factor: 0.946353 },
          gallon: { name: "AQSh gallon (Gal)", factor: 3.78541 }
        }
      },

      // 34: Ma'lumot hajmi (Data Storage)
      data: {
        name: "Ma’lumot hajmi (Data)",
        base: "B",
        units: {
          bit: { name: "Bit (b)", factor: 1 / 8 },
          B: { name: "Bayt (B)", factor: 1 },
          KB: { name: "Kilobayt (KB)", factor: 1024 },
          MB: { name: "Megabayt (MB)", factor: 1024 * 1024 },
          GB: { name: "Gigabayt (GB)", factor: Math.pow(1024, 3) },
          TB: { name: "Terabayt (TB)", factor: Math.pow(1024, 4) },
          PB: { name: "Petabayt (PB)", factor: Math.pow(1024, 5) }
        }
      },

      // 35: Bosim (Pressure)
      pressure: {
        name: "Bosim (Pressure)",
        base: "Pa",
        units: {
          Pa: { name: "Paskal (Pa)", factor: 1 },
          kPa: { name: "Kilopaskal (kPa)", factor: 1000 },
          bar: { name: "Bar", factor: 100000 },
          atm: { name: "Atmosfera (atm)", factor: 101325 },
          psi: { name: "PSI (lbf/in²)", factor: 6894.76 },
          mmHg: { name: "Simob ustuni (mmHg)", factor: 133.322 }
        }
      },

      // 36: Quvvat (Power)
      power: {
        name: "Quvvat (Power)",
        base: "W",
        units: {
          W: { name: "Vatt (W)", factor: 1 },
          kW: { name: "Kilovatt (kW)", factor: 1000 },
          hp: { name: "Ot kuchi (HP / ot kuchi)", factor: 745.7 }
        }
      },

      // 37: Energiya (Energy)
      energy: {
        name: "Energiya (Energy)",
        base: "J",
        units: {
          J: { name: "Joul (J)", factor: 1 },
          kJ: { name: "Kilojoul (kJ)", factor: 1000 },
          cal: { name: "Kaloriya (cal)", factor: 4.184 },
          kcal: { name: "Kilokaloriya (kcal)", factor: 4184 },
          kWh: { name: "Kilovatt-soat (kWh)", factor: 3600000 },
          eV: { name: "Elektronvolt (eV)", factor: 1.602176634e-19 }
        }
      },

      // 38: Burchak (Angle)
      angle: {
        name: "Burchak (Angle)",
        base: "deg",
        units: {
          deg: { name: "Gradus (°)", factor: 1 },
          rad: { name: "Radian (rad)", factor: 180 / Math.PI },
          grad: { name: "Grad (grad)", factor: 0.9 }
        }
      },

      // 39: Zichlik (Density)
      density: {
        name: "Zichlik (Density)",
        base: "kgm3",
        units: {
          kgm3: { name: "kg/m³", factor: 1 },
          gcm3: { name: "g/cm³", factor: 1000 },
          lbft3: { name: "lb/ft³", factor: 16.0185 }
        }
      }
    };
  }

  init() {
    this.populateCategorySelect();
    this.bindEvents();
    this.onCategoryChange();
  }

  populateCategorySelect() {
    const sel = document.getElementById("unitCategorySelect");
    if (!sel) return;
    sel.innerHTML = "";
    Object.keys(this.categories).forEach(catKey => {
      const opt = document.createElement("option");
      opt.value = catKey;
      opt.textContent = this.categories[catKey].name;
      sel.appendChild(opt);
    });
  }

  bindEvents() {
    const catSelect = document.getElementById("unitCategorySelect");
    const fromInput = document.getElementById("unitFromValue");
    const fromUnit = document.getElementById("unitFromUnit");
    const toUnit = document.getElementById("unitToUnit");
    const swapBtn = document.getElementById("unitSwapBtn");

    if (catSelect) catSelect.addEventListener("change", () => this.onCategoryChange());
    if (fromInput) fromInput.addEventListener("input", () => this.convert());
    if (fromUnit) fromUnit.addEventListener("change", () => this.convert());
    if (toUnit) toUnit.addEventListener("change", () => this.convert());

    if (swapBtn) {
      swapBtn.addEventListener("click", () => {
        const temp = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = temp;
        this.convert();
      });
    }
  }

  onCategoryChange() {
    const catKey = document.getElementById("unitCategorySelect").value;
    const cat = this.categories[catKey];
    if (!cat) return;

    const fromUnit = document.getElementById("unitFromUnit");
    const toUnit = document.getElementById("unitToUnit");
    if (!fromUnit || !toUnit) return;

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    const unitKeys = Object.keys(cat.units);
    unitKeys.forEach((uk, idx) => {
      const opt1 = document.createElement("option");
      opt1.value = uk;
      opt1.textContent = cat.units[uk].name;
      fromUnit.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = uk;
      opt2.textContent = cat.units[uk].name;
      toUnit.appendChild(opt2);
    });

    if (unitKeys.length > 1) {
      toUnit.selectedIndex = 1;
    }

    this.convert();
  }

  convert() {
    const catKey = document.getElementById("unitCategorySelect").value;
    const cat = this.categories[catKey];
    const val = parseFloat(document.getElementById("unitFromValue").value);
    const fromU = document.getElementById("unitFromUnit").value;
    const toU = document.getElementById("unitToUnit").value;
    const resEl = document.getElementById("unitToValue");
    const formulaEl = document.getElementById("unitFormulaDetail");

    if (isNaN(val)) {
      if (resEl) resEl.value = "";
      if (formulaEl) formulaEl.textContent = "";
      return;
    }

    let result = 0;

    // Harorat maxsus
    if (cat.isCustom && catKey === "temperature") {
      result = this.convertTemperature(val, fromU, toU);
    } else {
      // Standart nisbiy konvertatsiya
      const baseVal = val * cat.units[fromU].factor;
      result = baseVal / cat.units[toU].factor;
    }

    // Formatlash
    const rounded = parseFloat(result.toPrecision(8));
    if (resEl) resEl.value = rounded;

    if (formulaEl) {
      formulaEl.textContent = `${val} ${cat.units[fromU].name} = ${rounded} ${cat.units[toU].name}`;
    }
  }

  convertTemperature(val, from, to) {
    if (from === to) return val;
    // Avval Celsius ga
    let c = 0;
    if (from === "c") c = val;
    else if (from === "f") c = (val - 32) * (5 / 9);
    else if (from === "k") c = val - 273.15;

    // Celsius dan nishonga
    if (to === "c") return c;
    if (to === "f") return (c * 9) / 5 + 32;
    if (to === "k") return c + 273.15;
    return c;
  }
}

window.AppConverter = new UnitConverter();
