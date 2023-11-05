const containerModal = document.querySelector(".containerModal");
const buttonCloseModal = document.querySelector(".closeModal");
const buttonNewFinance = document.querySelector(".newFinance");

export const closeModal = () => {
  containerModal.classList.toggle("active");
};

const outsideClick = ({ target }) => {
  if (target === containerModal) closeModal();
};

buttonCloseModal.addEventListener("click", closeModal);
buttonNewFinance.addEventListener("click", closeModal);
containerModal.addEventListener("click", outsideClick);
