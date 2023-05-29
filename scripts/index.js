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

// handle btn mobile
const btnMobile = document.querySelector(".btn-mobile-nav");

btnMobile.addEventListener("click", () => {
  const nav = document.querySelector(".navigation").parentElement;
  nav.classList.toggle("nav-open");
});
