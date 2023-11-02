const containerModal = document.querySelector(".containerModal");
const buttonCloseModal = document.querySelector(".closeModal");
const buttonNewFinance = document.querySelector(".newFinance");

const closeModal = () => {
  containerModal.classList.toggle("active");
};

const outsideClick = ({ target }) => {
  if (target === containerModal) closeModal();
};

buttonCloseModal.addEventListener("click", closeModal);
buttonNewFinance.addEventListener("click", closeModal);
containerModal.addEventListener("click", outsideClick);

const formModal = document.getElementById("formModal");
const tbody = document.querySelector("tbody");

const cardEntrada = document.querySelector(".EntryValue");
const cardSaida = document.querySelector(".outputValue");
const cardTotal = document.querySelector(".TotalValue");

let entrada = 0;
let saida = 0;
let total = 0;

const transacoes = [];
const valores = [];
const backgrounds = [];
const colors = [
  "rgba(148, 0, 255, 0.4)",
  "rgba(84, 180, 53,.4)",
  "rgba(238, 62, 62,.7)",
  "rgba(112, 145, 245,.4)",
  "rgba(246, 250, 112,.4)",
  "rgba(255, 155, 80,.4)",
  "rgba(255, 161, 245,.4)",
  "rgba(17, 0, 158,.4)",
];

const ctx = document.getElementById("myChart");
const grafico = new Chart(ctx, {
  type: "bar",
  data: {
    labels: transacoes,
    datasets: [
      {
        label: "Suas Transações",
        data: valores,
        borderWidth: 1,
        color: "#000",
        backgroundColor: backgrounds,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      colors: {
        enabled: true,
      },
    },
  },
});

const updateCard = (tipo, valor) => {
  if (tipo === "Entrada") {
    entrada += +valor;
    cardEntrada.innerText = entrada.toFixed(2);
  } else if (tipo === "Saida") {
    saida += +valor;
    cardSaida.innerText = saida.toFixed(2);
  }
  total = entrada - saida;
  cardTotal.innerText = total.toFixed(2);
};

const updateGrafico = (nome, tipo, valor) => {
  transacoes.push(nome);
  valores.push(valor);

  const randomNumber = Math.floor(Math.random() * 7);

  backgrounds.push(colors[randomNumber]);

  grafico.update();
};

const updateLocalStorage = () => {
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

const getFinancesLocalStorage = () => {
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

// procurar transacao
const input = document.getElementById("inputTransaction");
const listTD = tbody.childNodes;

const procurarTransacao = () => {
  if (input.value !== "") {
    for (const tr of listTD) {
      let tittle = tr.querySelector(".tittleTD");

      tittle = tittle.innerText.toLowerCase();
      let textInput = input.value.toLowerCase();

      if (!tittle.includes(textInput)) {
        tr.style.opacity = "0.4";
      } else {
        tr.style.opacity = "1";
      }
    }
  } else {
    for (const tr of listTD) {
      tr.style.opacity = "1";
    }
  }
};

input.addEventListener("input", procurarTransacao);

getFinancesLocalStorage();

function addEventDelete() {
  const deleteButtons = document.querySelectorAll(".far");
  deleteButtons.forEach((item) =>
    item.addEventListener("click", deleteFinance)
  );
}

function deleteFinance({ currentTarget }) {
  const ParentElement = currentTarget.parentElement.parentElement;
  const indexToRemove = +ParentElement.getAttribute("id");

  const FinanceLocalStorage = JSON.parse(localStorage.getItem("Finances"));

  FinanceLocalStorage.splice(indexToRemove, 1);
  transacoes.splice(indexToRemove, 1);
  valores.splice(indexToRemove, 1);

  const tipo = ParentElement.querySelector(".typeTD").innerText;
  let valor = ParentElement.querySelector(".valueTD").innerText;
  valor = parseInt(valor.slice(3).replace(".", ""));

  if (tipo === "Entrada") {
    entrada -= valor;
    cardEntrada.innerText = entrada.toFixed(2);
  } else if (tipo === "Saida") {
    saida -= valor;
    cardSaida.innerText = saida.toFixed(2);
  }
  total = entrada - saida;
  cardTotal.innerText = total.toFixed(2);

  ParentElement.remove();
  grafico.update();
  localStorage.setItem("Finances", JSON.stringify(FinanceLocalStorage));

  console.log(FinanceLocalStorage);
}
