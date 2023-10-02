document.addEventListener("DOMContentLoaded", () => {
  const btnDecreases = document.querySelectorAll(".btn-decrease");
  const btnIncreases = document.querySelectorAll(".btn-increase");

  updateData = (id, quantity) => {
    const data = {
      id: id,
      quantity: quantity,
    };
    fetch("http://localhost:3000/cart/update-quantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
    });
  };

  // Function to get the book ID
  function getBookId(element) {
    const hiddenInput = element.parentElement.querySelector(".book-id");
    return hiddenInput.value;
  }

  btnDecreases.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const input = e.target.parentElement.querySelector(".quantity-box input");
      const currentValue = parseInt(input.value);
      if (currentValue > 1) {
        input.value = currentValue - 1;
      }

      const id = getBookId(e.target.parentElement);
      const quantity = input.value;
      updateData(id, quantity);
    });
  });

  btnIncreases.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const input = e.target.parentElement.querySelector(".quantity-box input");
      const currentValue = parseInt(input.value);
      input.value = currentValue + 1;

      const id = getBookId(e.target.parentElement);
      const quantity = input.value;
      updateData(id, quantity);
    });
  });
});
