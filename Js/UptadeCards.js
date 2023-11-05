const cardEntrada = document.querySelector(".EntryValue");
const cardSaida = document.querySelector(".outputValue");
const cardTotal = document.querySelector(".TotalValue");

let entrada = 0;
let saida = 0;
let total = 0;

export const cardValues = {
  entrada,
  saida,
  total,
};

export default function updateCard(tipo, valor) {
  if (tipo === "Entrada") {
    entrada += +valor;
    cardEntrada.innerText = entrada.toFixed(2);
  } else if (tipo === "Saida") {
    saida += +valor;
    cardSaida.innerText = saida.toFixed(2);
  }
  total = entrada - saida;
  cardTotal.innerText = total.toFixed(2);
}
