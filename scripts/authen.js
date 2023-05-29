const navLinks = document.querySelectorAll(".authen-nav__link");
const navItems = document.querySelectorAll(".authen-nav__item");
const loginSection = document.querySelector(".authen-body__login");
const registerSection = document.querySelector(".authen-body__register");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Remove "open" class from all nav items
    navItems.forEach((item) => {
      item.classList.remove("open");
    });

    // Add "open" class to clicked nav item
    link.parentElement.classList.add("open");

    //change body
    const classes = link.classList;
    console.log(classes);
    if (classes.contains("login")) {
      loginSection.style.display = "flex";
      registerSection.style.display = "none";
    } else {
      loginSection.style.display = "none";
      registerSection.style.display = "flex";
    }
  });
});
