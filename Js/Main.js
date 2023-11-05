import { closeModal } from "./modal.js";
import updateCard from "./UptadeCards.js";
import { updateLocalStorage, getFinancesLocalStorage } from "./LocalStorage.js";
import { updateGrafico } from "./Graphic.js";
import { addEventDelete } from "./DeleteFunction.js";
import { procurarTransacao } from "./SearchFinance.js";

const formModal = document.getElementById("formModal");
const tbody = document.querySelector("tbody");

// recebi os dados do formulario pela funcao formModal
const addTDHtml = ({ titulo, tipo, valor, data }) => {
  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  const id = tbody.childNodes.length;

  tbody.insertAdjacentHTML(
    "beforeend",
    `<tr id="${id}">
    <td class="tittleTD">${titulo}</td>
    <td class="typeTD">${tipo}</td>
    <td class="valueTD">${currency.format(valor)}</td>
    <td class="dataTD">${data}</td>
    <td><i class="far fa-trash-alt"></i></td>
    </tr>`
  );
  updateLocalStorage();
  updateCard(tipo, valor);
  updateGrafico(titulo, tipo, valor);
  addEventDelete();
};

// pega os dados do formulario
formModal.addEventListener("submit", (event) => {
  event.preventDefault();

  let objData = {
    titulo: formModal.titulo.value,
    tipo: formModal.type.value,
    valor: formModal.valor.value,
    data: formModal.data.value,
  };

  formModal.titulo.value = "";
  formModal.valor.value = "";
  formModal.type.value = "";
  formModal.data.value = "";

  addTDHtml(objData);
  closeModal();
});

getFinancesLocalStorage();
