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
