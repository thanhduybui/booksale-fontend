document.addEventListener("DOMContentLoaded", () => {
  const btnDecreases = document.querySelectorAll(".btn-decrease");
  const btnIncreases = document.querySelectorAll(".btn-increase");

  btnDecreases.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log("click", e);
      e.preventDefault();
      const input = e.target.parentElement.querySelector(".quantity-box input");
      const currentValue = parseInt(input.value);
      if (currentValue > 1) {
        input.value = currentValue - 1;
      }
    });
  });

  btnIncreases.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const input = e.target.parentElement.querySelector(".quantity-box input");
      const currentValue = parseInt(input.value);
      input.value = currentValue + 1;
    });
  });
});
