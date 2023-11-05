import { grafico } from "./Graphic.js";
import { transacoes, valores } from "./Graphic.js";
import { cardValues } from "./UptadeCards.js";

const cardEntrada = document.querySelector(".EntryValue");
const cardSaida = document.querySelector(".outputValue");
const cardTotal = document.querySelector(".TotalValue");

let { entrada, saida, total } = cardValues;

export function addEventDelete() {
  const deleteButtons = document.querySelectorAll(".far");

  deleteButtons.forEach((item) =>
    item.addEventListener("click", deleteFinance)
  );
}

export function deleteFinance({ currentTarget }) {
  const ParentElement = currentTarget.parentElement.parentElement;
  const indexToRemove = +ParentElement.getAttribute("id");

  const FinanceLocalStorage = JSON.parse(localStorage.getItem("Finances"));

  FinanceLocalStorage.splice(indexToRemove, 1);
  transacoes.splice(indexToRemove, 1);
  valores.splice(indexToRemove, 1);

  const financeType = ParentElement.querySelector(".typeTD").innerText;
  let valor = ParentElement.querySelector(".valueTD").innerText;
  valor = parseInt(valor.slice(3).replace(".", ""));

  if (financeType === "Entrada") {
    entrada -= valor;
    cardEntrada.innerText = entrada.toFixed(2);
  } else if (financeType === "Saida") {
    saida -= valor;
    cardSaida.innerText = saida.toFixed(2);
  }
  total = entrada - saida;
  cardTotal.innerText = total.toFixed(2);

  ParentElement.remove();
  grafico.update();
  localStorage.setItem("Finances", JSON.stringify(FinanceLocalStorage));
}
