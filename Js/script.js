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

const ctx = document.getElementById("myChart");

const grafico = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "hdd"],
    datasets: [
      {
        label: "# transacao",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        color: "#000",
        backgroundColor: [
          "rgba(1, 106, 112,.6)",
          "rgba(238, 62, 62,.7)",
          "rgba(84, 180, 53,.6)",
          "rgba(84, 18, 53,.6)",
        ],
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
grafico.update();

const formModal = document.getElementById("formModal");

const tbody = document.querySelector("tbody");

// faz um loop pelos item da tabela e salva as informacooes na tabela
const updateLocalStorage = () => {
  const tdList = tbody.childNodes;

  const listLocalStorage = [...tdList].map((tr) => {
    const tittle = tr.querySelector(".tittleTD").innerText;
    const type = tr.querySelector(".typeTD").innerText;
    const value = tr.querySelector(".valueTD").innerText;
    const data = tr.querySelector(".dataTD").innerText;
    const id = tr.getAttribute("id");
    return { id, tittle, type, value, data };
  });
  localStorage.setItem("FinancesList", JSON.stringify(listLocalStorage));
};

// pega os dados do local storage e poe no html
const refreshTaskLocalStorageHTML = () => {
  const arrayFinances = JSON.parse(localStorage.getItem("FinancesList"));

  if (!arrayFinances) return;

  for (const finance of arrayFinances) {
    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr id="${finance.id}">
      <td class="tittleTD">${finance.tittle}</td>
      <td class="typeTD">${finance.type}</td>
      <td class="valueTD">${finance.value}</td>
      <td class="dataTD">${finance.data}</td>
      <td><i class="fa fa-trash-alt"></i></td>
      </tr>`
    );
  }
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
    <td><i class="fa fa-trash-alt"></i></td>
    </tr>`
  );
  updateLocalStorage();
};

refreshTaskLocalStorageHTML();

let objData = {};

// pega os dados do formulario
formModal.addEventListener("submit", (event) => {
  event.preventDefault();

  objData = {
    titulo: formModal.titulo.value,
    tipo: formModal.type.value,
    valor: formModal.valor.value,
    data: formModal.data.value,
  };
  addTDHtml(objData);
  closeModal();
});

// const carEntry = document.querySelector(".Entry");
// const carOutput = document.querySelector(".Output");
// const cardTotal = document.querySelector(".Total");
