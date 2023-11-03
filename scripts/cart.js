document.addEventListener("DOMContentLoaded", () => {
  const btnDecreases = document.querySelectorAll(".btn-decrease");
  const btnIncreases = document.querySelectorAll(".btn-increase");
  const checkboxes = document.querySelectorAll(".checkbox");
  const totalPriceElement = document.querySelector(".total .money");
  const originPriceElement = document.querySelector(".subtotal .money");
  const dicountPriceElement = document.querySelector(".discount .money");
  const shippingFeeElement = document.querySelector(".shipping .money");

  // Initialize total price
  let totalPrice = 0;
  let totalOriginPrice = 0;
  let discountPrice = 0;
  let shippingFee = parseFloat(shippingFeeElement.textContent);

  // Function to update the total price based on the checkbox state
  const updateTotalPrice = () => {
    totalPrice = 0;
    totalOriginPrice = 0;
    discountPrice = 0;
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        const quantityInput = checkbox
          .closest(".cart-book__form")
          .querySelector(".quantity-box input");
        const originPriceTag = checkbox
          .closest(".cart-book__form")
          .querySelector(".price-tag__origin");
        const salePriceElement = checkbox
          .closest(".cart-book__form")
          .querySelector(".price-tag__sale");
        const quantity = parseInt(quantityInput.value);
        const salePrice = parseFloat(salePriceElement.textContent);
        const originPriceValue = parseFloat(originPriceTag.textContent);
        const itemTotal = quantity * salePrice;
        const itemTotalOriginPrice = quantity * originPriceValue;
        totalPrice += itemTotal;
        totalOriginPrice += itemTotalOriginPrice;
      }
    });
    totalPriceElement.textContent = (totalPrice + shippingFee).toFixed(3);
    originPriceElement.textContent = totalOriginPrice.toFixed(3);
    dicountPriceElement.textContent = (totalPrice - totalOriginPrice).toFixed(
      3
    );
  };

  // Add change event listeners to checkboxes
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateTotalPrice);
  });

  // Add click event listeners to decrease and increase buttons
  btnDecreases.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const input = e.target.parentElement.querySelector(".quantity-box input");
      const currentValue = parseInt(input.value);
      if (currentValue > 1) {
        input.value = currentValue - 1;
      }
      updateTotalPrice();
    });
  });

  btnIncreases.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const input = e.target.parentElement.querySelector(".quantity-box input");
      const currentValue = parseInt(input.value);
      input.value = currentValue + 1;
      updateTotalPrice();
    });
  });

  // Initial update of total price
  updateTotalPrice();
});
