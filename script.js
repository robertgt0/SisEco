function actualizarEtiquetas() {
  const unidad = document.getElementById("tiempoUnidad").value;
  const texto = {
    diario:  ["diaria",  "días"],
    semanal: ["semanal", "semanas"],
    quincenal:["quincenal","quincenas"],
    mensual: ["mensual", "meses"],
    bimestral:["bimestral","bimestres"],
    trimestral:["trimestral","trimestres"],
    semestral:["semestral","semestres"],
    anual:   ["anual",   "años"]
  };
  const iLab = document.getElementById("labelInteres");
  const tLab = document.getElementById("labelTiempo");
  const iInp = document.getElementById("interes");
  const tInp = document.getElementById("periodos");

  if (texto[unidad]) {
    iLab.textContent = `Tasa de Interés (i) % ${texto[unidad][0]}`;
    tLab.textContent = `Tiempo (n) en ${texto[unidad][1]}`;
    iInp.placeholder = iLab.textContent;
    tInp.placeholder = tLab.textContent;
  }
}

function actualizarCampos() {
  const tipo = document.getElementById("tipoCalculo").value;
  const form = document.getElementById("camposFormulario");
  const campos = {
    capital: ["labelCapital", "capital"],
    monto:   ["labelMonto",   "monto"],
    interes: ["labelInteres", "interes"],
    tiempo:  ["labelTiempo",  "periodos"]
  };

  if (!tipo) { form.style.display = "none"; return; }
  form.style.display = "block";

  // Mostrar todo primero
  Object.values(campos).flat().forEach(id => document.getElementById(id).style.display = "block");

  switch (tipo) {
    case "futuro":   // P, i, n
      campos.monto.forEach(id => document.getElementById(id).style.display = "none");
      break;
    case "presente": // F, i, n
      campos.capital.forEach(id => document.getElementById(id).style.display = "none");
      break;
    case "tasa":     // P, F, n
      campos.interes.forEach(id => document.getElementById(id).style.display = "none");
      break;
    case "tiempo":   // P, F, i
      campos.tiempo.forEach(id => document.getElementById(id).style.display = "none");
      break;
  }
}

function calcular() {
  const tipo = document.getElementById("tipoCalculo").value;
  const R = document.getElementById("resultado");
  if (!tipo) { R.textContent = "⚠️ Selecciona un tipo de cálculo."; return; }

  const P  = parseFloat(document.getElementById("capital").value);   // capital inicial
  const F  = parseFloat(document.getElementById("monto").value);     // capital futuro
  const i  = parseFloat(document.getElementById("interes").value)/100;
  const n  = parseFloat(document.getElementById("periodos").value);

  let res;

  switch (tipo) {
    // Capital Futuro
    case "futuro":
      if (isNaN(P)||isNaN(i)||isNaN(n)) {R.textContent="⚠️ Completa P, i y n.";return;}
      res = P * Math.pow(1+i, n);
      R.textContent = `💰 Capital Futuro (F) = ${res.toFixed(2)}`;
      break;

    // Capital Presente
    case "presente":
      if (isNaN(F)||isNaN(i)||isNaN(n)) {R.textContent="⚠️ Completa F, i y n.";return;}
      res = F / Math.pow(1+i, n);
      R.textContent = `💵 Capital Presente (P) = ${res.toFixed(2)}`;
      break;

    // Tasa de interés
    case "tasa":
      if (isNaN(P)||isNaN(F)||isNaN(n)) {R.textContent="⚠️ Completa P, F y n.";return;}
      res = Math.pow(F/P, 1/n) - 1;
      R.textContent = `📈 Tasa (i) = ${(res*100).toFixed(2)}%`;
      break;

    // Tiempo de capitalización
    case "tiempo":
      if (isNaN(P)||isNaN(F)||isNaN(i)) {R.textContent="⚠️ Completa P, F e i.";return;}
      res = Math.log(F/P) / Math.log(1+i);
      R.textContent = `⏳ Tiempo (n) = ${res.toFixed(2)}`;
      break;
  }
}


function calcular() {
  const tipo = document.getElementById("tipoCalculo").value;
  const R = document.getElementById("resultado");

  if (!tipo) {
    R.textContent = "⚠️ Por favor, selecciona un tipo de cálculo.";
    return;
  }

  // Obtener valores de entrada
  const P = parseFloat(document.getElementById("capital").value);    // Capital inicial
  const F = parseFloat(document.getElementById("monto").value);      // Capital futuro
  const i = parseFloat(document.getElementById("interes").value) / 100; // Tasa en decimal
  const n = parseFloat(document.getElementById("periodos").value);   // Número de periodos

  let res = null;

  switch (tipo) {
    // ================================================
    // 1. Calcular Capital Futuro (F)
    // Fórmula: F = P * (1 + i)^n
    // ================================================
    case "futuro":
      if (isNaN(P) || isNaN(i) || isNaN(n)) {
        R.textContent = "⚠️ Completa P, i y n antes de calcular.";
        return;
      }
      res = P * Math.pow(1 + i, n);
      R.innerHTML = `💰 <strong>Capital Futuro (F)</strong><br>
        F = P(1 + i)<sup>n</sup> = ${P.toFixed(2)} × (1 + ${i.toFixed(4)})<sup>${n}</sup><br>
        <strong>F = ${res.toFixed(2)}</strong>`;
      break;

    // ================================================
    // 2. Calcular Capital Presente (P)
    // Fórmula: P = F / (1 + i)^n
    // ================================================
    case "presente":
      if (isNaN(F) || isNaN(i) || isNaN(n)) {
        R.textContent = "⚠️ Completa F, i y n antes de calcular.";
        return;
      }
      res = F / Math.pow(1 + i, n);
      R.innerHTML = `💵 <strong>Capital Presente (P)</strong><br>
        P = F / (1 + i)<sup>n</sup> = ${F.toFixed(2)} / (1 + ${i.toFixed(4)})<sup>${n}</sup><br>
        <strong>P = ${res.toFixed(2)}</strong>`;
      break;

    // ================================================
    // 3. Calcular Tasa de Interés (i)
    // Fórmula: i = (F / P)^(1/n) - 1
    // ================================================
    case "tasa":
      if (isNaN(P) || isNaN(F) || isNaN(n)) {
        R.textContent = "⚠️ Completa P, F y n antes de calcular.";
        return;
      }
      res = Math.pow(F / P, 1 / n) - 1;
      R.innerHTML = `📈 <strong>Tasa de Interés (i)</strong><br>
        i = (F / P)<sup>1/n</sup> - 1 = (${F.toFixed(2)} / ${P.toFixed(2)})<sup>1/${n}</sup> - 1<br>
        <strong>i = ${(res * 100).toFixed(2)} %</strong>`;
      break;

    // ================================================
    // 4. Calcular Tiempo de Capitalización (n)
    // Fórmula: n = log(F / P) / log(1 + i)
    // ================================================
    case "tiempo":
      if (isNaN(P) || isNaN(F) || isNaN(i)) {
        R.textContent = "⚠️ Completa P, F e i antes de calcular.";
        return;
      }
      res = Math.log(F / P) / Math.log(1 + i);
      R.innerHTML = `⏳ <strong>Tiempo de Capitalización (n)</strong><br>
        n = log(F / P) / log(1 + i) = log(${F.toFixed(2)} / ${P.toFixed(2)}) / log(1 + ${i.toFixed(4)})<br>
        <strong>n = ${res.toFixed(2)} periodos</strong>`;
      break;

    default:
      R.textContent = "❌ Tipo de cálculo no reconocido.";
  }
}
function mostrarEjemplos() {
  const ejemplos = document.getElementById("ejemplosContenido");
  ejemplos.style.display = ejemplos.style.display === "none" ? "block" : "none";
}

function mostrarAyuda() {
  const ayuda = document.getElementById("ayudaContenido");
  ayuda.style.display = ayuda.style.display === "none" ? "block" : "none";
}
