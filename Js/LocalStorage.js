import updateCard from "./UptadeCards.js";
import { updateGrafico } from "./Graphic.js";
import { addEventDelete } from "./DeleteFunction.js";

const tbody = document.querySelector("tbody");

export const getFinancesLocalStorage = () => {
  const FinancesLocalStorage = JSON.parse(localStorage.getItem("Finances"));

  if (!FinancesLocalStorage.length) return;

  for (const finance of FinancesLocalStorage) {
    let numberClear = parseInt(finance.valor.slice(3).replace(".", ""));

    const id = tbody.childNodes.length;

    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr id="${id}">
         <td class="tittleTD">${finance.titulo}</td>
         <td class="typeTD">${finance.tipo}</td>
         <td class="valueTD">${finance.valor}</td>
         <td class="dataTD">${finance.data}</td>
         <td><i class="far fa-trash-alt"></i></td>
         </tr>`
    );
    updateCard(finance.tipo, numberClear);
    updateGrafico(finance.titulo, finance.tipo, numberClear);
  }
  addEventDelete();
};

export const updateLocalStorage = () => {
  const listFinances = tbody.childNodes;
  const FinanceLocalStorage = [...listFinances].map((tr) => {
    return {
      titulo: tr.querySelector(".tittleTD").innerText,
      tipo: tr.querySelector(".typeTD").innerText,
      valor: tr.querySelector(".valueTD").innerText,
      data: tr.querySelector(".dataTD").innerText,
    };
  });

  localStorage.setItem("Finances", JSON.stringify(FinanceLocalStorage));
};
