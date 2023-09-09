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
const cardSaida = document.querySelector(".OutputValue");
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
    entrada = valor;
    cardEntrada.innerText = valor;
  }
};

const updateGrafico = (nome, tipo, valor) => {
  transacoes.push(nome);
  valores.push(valor);

  backgrounds.push(colors[Math.floor(Math.random() * 5)]);

  grafico.update();
};

// recebi os dados do formulario pela funcao formModal
const addTDHtml = ({ titulo, tipo, valor, data }) => {
  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  tbody.insertAdjacentHTML(
    "beforeend",
    `<tr id="${tbody.childNodes.length}">
    <td class="tittleTD">${titulo}</td>
    <td class="typeTD">${tipo}</td>
    <td class="valueTD">${currency.format(valor)}</td>
    <td class="dataTD">${data}</td>
    <td><i class="far fa-trash-alt"></i></td>
    </tr>`
  );
  updateCard(tipo, valor);
  updateGrafico(titulo, tipo, valor);
};

// pega os dados do formulario
formModal.addEventListener("submit", (event) => {
  event.preventDefault();

  objData = {
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
