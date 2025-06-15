function actualizarCampos() {
  const tipo = document.getElementById("tipoCalculo").value;
  const campos = {
    capital: ["campoCapitalLabel", "capital"],
    interes: ["labelInteres", "interes"],
    tiempo: ["labelTiempo", "periodos"],
    monto: ["campoMontoLabel", "monto"]
  };
  for (const ids of Object.values(campos)) {
    ids.forEach(id => document.getElementById(id).style.display = "block");
  }
  if (tipo === "futuro") {
    campos.monto.forEach(id => document.getElementById(id).style.display = "none");
  } else if (tipo === "presente") {
    campos.capital.forEach(id => document.getElementById(id).style.display = "none");
  } else if (tipo === "tasa") {
    campos.interes.forEach(id => document.getElementById(id).style.display = "none");
  } else if (tipo === "tiempo") {
    campos.tiempo.forEach(id => document.getElementById(id).style.display = "none");
  }
}

function actualizarEtiquetas() {
  const unidad = document.getElementById("tiempoUnidad").value;
  const textoUnidad = {
    diario: ["diaria", "días"],
    semanal: ["semanal", "semanas"],
    quincenal: ["quincenal", "quincenas"],
    mensual: ["mensual", "meses"],
    bimestral: ["bimestral", "bimestres"],
    trimestral: ["trimestral", "trimestres"],
    semestral: ["semestral", "semestres"],
    anual: ["anual", "años"]
  };
  const interesLabel = document.getElementById("labelInteres");
  const tiempoLabel = document.getElementById("labelTiempo");
  if (textoUnidad[unidad]) {
    interesLabel.textContent = `Tasa de Interés (i) % ${textoUnidad[unidad][0]}`;
    tiempoLabel.textContent = `Tiempo (n) en ${textoUnidad[unidad][1]}`;
  }
}

function calcular() {
  const tipo = document.getElementById("tipoCalculo").value;
  const P = parseFloat(document.getElementById("capital").value);
  const i = parseFloat(document.getElementById("interes").value) / 100;
  const n = parseFloat(document.getElementById("periodos").value);
  const M = parseFloat(document.getElementById("monto").value);
  let resultado = "";
  if (tipo === "futuro") {
    resultado = isNaN(P) || isNaN(i) || isNaN(n)
      ? "Completa todos los campos."
      : `Monto final (M) = ${(P * Math.pow(1 + i, n)).toFixed(2)} Bs`;
  } else if (tipo === "presente") {
    resultado = isNaN(M) || isNaN(i) || isNaN(n)
      ? "Completa todos los campos."
      : `Capital inicial (P) = ${(M / Math.pow(1 + i, n)).toFixed(2)} Bs`;
  } else if (tipo === "tasa") {
    resultado = isNaN(P) || isNaN(M) || isNaN(n)
      ? "Completa todos los campos."
      : `Tasa (i) = ${((Math.pow(M / P, 1 / n) - 1) * 100).toFixed(4)} %`;
  } else if (tipo === "tiempo") {
    resultado = isNaN(P) || isNaN(M) || isNaN(i)
      ? "Completa todos los campos."
      : `Tiempo (n) = ${(Math.log(M / P) / Math.log(1 + i)).toFixed(2)} periodos`;
  }
  document.getElementById("resultado").innerText = resultado;
}

function mostrarEjemplos() {
  alert("Aquí irían ejemplos prácticos.");
}

function mostrarAyuda() {
  alert("Aquí iría la ayuda o documentación.");
}

window.onload = function () {
  actualizarCampos();
  actualizarEtiquetas();
};
