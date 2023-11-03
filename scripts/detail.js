document.addEventListener("DOMContentLoaded", () => {
  // DOM ojects for mofidy quantity of selected book
  const btnDecrease = document.querySelector(".btn-decrease");
  const btnIncrease = document.querySelector(".btn-increase");
  const quantityBox = document.querySelector(".quantity-box input");
  // DOM objects for add to cart and buy now
  const btnAddToCart = document.querySelector(".btn-add-to-cart");
  const btnBuyNow = document.querySelector(".btn-buy");
  // for toggle between show more and show less
  const showMore = document.querySelector(".more");
  const bookDescriptionBox = document.querySelector(".book-description");
  // Get the modal and buttons
  const modal = document.querySelector(".modal");
  const closeModal = document.querySelector(".close");
  const modalCloseButton = document.querySelector("#modalCloseButton");

  // decrease quantity of selected book
  btnDecrease.addEventListener("click", (event) => {
    event.preventDefault();
    let currentQuantity = +quantityBox.value;
    if (currentQuantity > 1) {
      currentQuantity--;
    }
    quantityBox.value = "" + currentQuantity;
    btnDecrease.blur();
  });
  // increase quantity of selected book
  btnIncrease.addEventListener("click", (event) => {
    event.preventDefault();
    let currentQuantity = +quantityBox.value;
    currentQuantity++;
    quantityBox.value = "" + currentQuantity;
    btnIncrease.blur();
  });
  // show more or show less
  showMore.addEventListener("click", () => {
    bookDescriptionBox.classList.toggle("show-more");
    if (bookDescriptionBox.classList.contains("show-more")) {
      showMore.textContent = "Thu gọn";
    } else {
      showMore.textContent = "Xem thêm";
    }
  });

  btnAddToCart.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  // Close the modal when the close button (×) is clicked
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close the modal when the OK button is clicked
  modalCloseButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close the modal if the user clicks outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
