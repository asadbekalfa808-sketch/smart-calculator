/**
 * OMNI-CALCULATOR 114 — 4. DASTURCHILAR UCHUN (Funksiyalar 52–61)
 */

class DeveloperTools {
  constructor() {}

  init() {
    this.bindRadixConverter();
    this.bindBitwise();
    this.bindBase64();
    this.bindSubnet();
    this.initAsciiTable();
  }

  // 52, 53, 54, 55: Sanoq tizimlari (Bin, Oct, Dec, Hex)
  bindRadixConverter() {
    const decInput = document.getElementById("radixDec");
    const binInput = document.getElementById("radixBin");
    const octInput = document.getElementById("radixOct");
    const hexInput = document.getElementById("radixHex");

    if (!decInput) return;

    decInput.addEventListener("input", () => {
      const val = parseInt(decInput.value, 10);
      if (!isNaN(val)) {
        binInput.value = (val >>> 0).toString(2);
        octInput.value = (val >>> 0).toString(8);
        hexInput.value = (val >>> 0).toString(16).toUpperCase();
      } else {
        binInput.value = "";
        octInput.value = "";
        hexInput.value = "";
      }
    });

    binInput.addEventListener("input", () => {
      const val = parseInt(binInput.value, 2);
      if (!isNaN(val)) {
        decInput.value = val;
        octInput.value = val.toString(8);
        hexInput.value = val.toString(16).toUpperCase();
      }
    });

    octInput.addEventListener("input", () => {
      const val = parseInt(octInput.value, 8);
      if (!isNaN(val)) {
        decInput.value = val;
        binInput.value = (val >>> 0).toString(2);
        hexInput.value = val.toString(16).toUpperCase();
      }
    });

    hexInput.addEventListener("input", () => {
      const val = parseInt(hexInput.value, 16);
      if (!isNaN(val)) {
        decInput.value = val;
        binInput.value = (val >>> 0).toString(2);
        octInput.value = val.toString(8);
      }
    });
  }

  // 56, 57, 58: Bitwise AND, OR, XOR, NOT, <<, >>
  bindBitwise() {
    const calcBtn = document.getElementById("calcBitwiseBtn");
    if (!calcBtn) return;

    calcBtn.addEventListener("click", () => {
      const a = parseInt(document.getElementById("bitA").value) || 0;
      const b = parseInt(document.getElementById("bitB").value) || 0;
      const op = document.getElementById("bitOp").value;

      let res = 0;
      let expr = "";

      switch (op) {
        case "AND":
          res = a & b;
          expr = `${a} & ${b}`;
          break;
        case "OR":
          res = a | b;
          expr = `${a} | ${b}`;
          break;
        case "XOR":
          res = a ^ b;
          expr = `${a} ^ ${b}`;
          break;
        case "NOT":
          res = ~a;
          expr = `~${a}`;
          break;
        case "LSHIFT":
          res = a << b;
          expr = `${a} << ${b}`;
          break;
        case "RSHIFT":
          res = a >> b;
          expr = `${a} >> ${b}`;
          break;
        case "URSHIFT":
          res = a >>> b;
          expr = `${a} >>> ${b}`;
          break;
      }

      const resDec = document.getElementById("bitResultDec");
      const resBin = document.getElementById("bitResultBin");
      const resHex = document.getElementById("bitResultHex");

      if (resDec) resDec.textContent = res;
      if (resBin) resBin.textContent = (res >>> 0).toString(2).padStart(8, "0");
      if (resHex) resHex.textContent = "0x" + (res >>> 0).toString(16).toUpperCase();
    });
  }

  // 59: Base64 kodlash va dekodlash (UTF-8 qo'llab-quvvatlanadi)
  bindBase64() {
    const encBtn = document.getElementById("b64EncodeBtn");
    const decBtn = document.getElementById("b64DecodeBtn");
    const input = document.getElementById("b64Input");
    const output = document.getElementById("b64Output");

    if (encBtn && input && output) {
      encBtn.addEventListener("click", () => {
        try {
          const encoded = btoa(unescape(encodeURIComponent(input.value)));
          output.value = encoded;
        } catch (e) {
          output.value = "Kodlash xatosi: " + e.message;
        }
      });
    }

    if (decBtn && input && output) {
      decBtn.addEventListener("click", () => {
        try {
          const decoded = decodeURIComponent(escape(atob(input.value)));
          output.value = decoded;
        } catch (e) {
          output.value = "Dekodlash xatosi (Noto'g'ri Base64 string)";
        }
      });
    }
  }

  // 60: IP manzil va Subnet kalkulyatori
  bindSubnet() {
    const btn = document.getElementById("calcSubnetBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const ipStr = document.getElementById("subnetIp").value.trim();
      const cidr = parseInt(document.getElementById("subnetCidr").value);

      const parts = ipStr.split(".").map(Number);
      if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255) || isNaN(cidr) || cidr < 0 || cidr > 32) {
        alert("Noto'g'ri IP manzil yoki CIDR maskasi!");
        return;
      }

      const ipInt = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
      const maskInt = cidr === 0 ? 0 : (-1 << (32 - cidr));
      const netInt = ipInt & maskInt;
      const bcastInt = netInt | (~maskInt);

      const toIpStr = (num) => [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
      ].join(".");

      const totalHosts = Math.pow(2, 32 - cidr);
      const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

      const firstHost = cidr >= 31 ? toIpStr(netInt) : toIpStr(netInt + 1);
      const lastHost = cidr >= 31 ? toIpStr(bcastInt) : toIpStr(bcastInt - 1);

      const resEl = document.getElementById("subnetResult");
      if (resEl) {
        resEl.innerHTML = `
          <div>Tarmoq manzili (Network): <strong>${toIpStr(netInt)}</strong></div>
          <div>Subnet mask: <strong>${toIpStr(maskInt)}</strong></div>
          <div>Broadcast manzili: <strong>${toIpStr(bcastInt)}</strong></div>
          <div>Mavjud hostlar soni: <strong>${usableHosts.toLocaleString()}</strong></div>
          <div>Hostlar oralig'i: <strong>${firstHost} - ${lastHost}</strong></div>
        `;
      }
    });
  }

  // 61: ASCII belgilar jadvali va kodini ko'rsatish
  initAsciiTable() {
    const tableBody = document.getElementById("asciiTableBody");
    const searchInput = document.getElementById("asciiSearch");
    if (!tableBody) return;

    const generateRows = (filter = "") => {
      tableBody.innerHTML = "";
      filter = filter.toLowerCase();

      for (let i = 0; i < 128; i++) {
        let charName = "";
        if (i === 0) charName = "NUL (null)";
        else if (i === 9) charName = "TAB (horizontal tab)";
        else if (i === 10) charName = "LF (line feed)";
        else if (i === 13) charName = "CR (carriage return)";
        else if (i === 32) charName = "SPACE (bo'sh joy)";
        else charName = String.fromCharCode(i);

        const dec = i.toString();
        const hex = "0x" + i.toString(16).toUpperCase().padStart(2, "0");
        const bin = i.toString(2).padStart(8, "0");

        if (!filter || dec.includes(filter) || hex.toLowerCase().includes(filter) || charName.toLowerCase().includes(filter)) {
          const row = document.createElement("tr");
          row.style.borderBottom = "1px solid var(--border-color)";
          row.innerHTML = `
            <td style="padding:6px 10px;">${dec}</td>
            <td style="padding:6px 10px; font-family:monospace;">${hex}</td>
            <td style="padding:6px 10px; font-family:monospace;">${bin}</td>
            <td style="padding:6px 10px; font-weight:bold;">${charName}</td>
          `;
          tableBody.appendChild(row);
        }
      }
    };

    generateRows();

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        generateRows(e.target.value.trim());
      });
    }
  }
}

window.AppDevTools = new DeveloperTools();
