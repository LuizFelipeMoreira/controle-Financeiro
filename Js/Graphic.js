export const transacoes = [];
export const valores = [];
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
export const grafico = new Chart(ctx, {
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

export const updateGrafico = (nome, tipo, valor) => {
  transacoes.push(nome);
  valores.push(valor);

  const randomNumber = Math.floor(Math.random() * 7);

  backgrounds.push(colors[randomNumber]);

  grafico.update();
};
