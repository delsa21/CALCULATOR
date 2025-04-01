let fullOperation = '';
let arr = [];

function addNumber(number) {
  if (fullOperation === '' && number.toString() === '0') return;
  if (isOperator(fullOperation.slice(-1)) && isOperator(number.toString())) return;

  if (number === "=") {
    calculate();
    return;
  }

  fullOperation += number.toString();
  showNumber();
}

function isOperator(char) {
  return ['+', '-', '*', '/', '^'].includes(char); // Reemplaza `**` por `^`
}

function calculate() {
  try {
    let expression = fullOperation.replace(/\^/g, "**"); // Convierte `^` en `**` para exponentes
    let result = Function(`'use strict'; return (${expression})`)().toString();

    arr.unshift(`${fullOperation} = ${result}`); // Guarda en el historial (última operación arriba)
    if (arr.length > 5) arr.pop(); // Limita historial a 5 operaciones

    fullOperation = result;
  } catch {
    fullOperation = 'Error';
  }
  showNumber();
  showList(); // Muestra historial actualizado
}

function clearLast() {
  fullOperation = fullOperation.slice(0, -1);
  showNumber();
}

function clearAll() {
  fullOperation = '';
  showNumber();
}

function showNumber() {
  document.getElementById('operation').innerHTML = fullOperation || '0'; // Evita que quede vacío
}

function showList() {
  let historyHTML = arr.map(item => `<li>${item}</li>`).join("");
  document.getElementById("history").innerHTML = `<ul>${historyHTML}</ul>`;
}
