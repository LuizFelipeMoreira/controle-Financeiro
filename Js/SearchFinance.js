const financesList = document.querySelector("tbody").childNodes;

export const procurarTransacao = () => {
  if (input.value !== "") {
    for (const tr of financesList) {
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
    for (const tr of financesList) {
      tr.style.opacity = "1";
    }
  }
};

const input = document.getElementById("inputTransaction");

input.addEventListener("input", procurarTransacao);
