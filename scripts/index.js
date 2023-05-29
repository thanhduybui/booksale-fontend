// for dropdown menu
const dropdownEls = document.querySelectorAll(".dropdown");

dropdownEls.forEach((el) => {
  el.addEventListener("mouseover", () => {
    el.classList.add("drop");
  });
});

dropdownEls.forEach((el) => {
  el.addEventListener("mouseout", () => {
    el.classList.remove("drop");
  });
});
