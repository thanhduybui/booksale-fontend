const categoryLink = document.querySelector(".category-item");

categoryLink.addEventListener("click", () => {
  categoryLink.classList.toggle("show-sub-items");
});

// PAGINATION IMPLEMENTATION

document.addEventListener("DOMContentLoaded", () => {
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentPage = 1; // Current page number
  const totalPages = 10; // Total number of pages
  const paginationContainer = document.querySelector(".pages");

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      generatePaginationButtons(); // Decrement the current page number
      updatePage(); // Call a function to update the page content or perform any desired actions
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      generatePaginationButtons(); // Increment the current page number
      updatePage(); // Call a function to update the page content or perform any desired actions
    }
  });

  const updatePage = () => {
    // Perform actions to update the page content based on the current page number
    // You can make an AJAX request, update the URL, or perform any necessary actions
    // For example, you can update the active class on the pagination buttons based on the current page
    const paginationButtons =
      paginationContainer.querySelectorAll(".pagination-btn");
    paginationButtons.forEach((button) => {
      const page = parseInt(button.innerText);
      if (page === currentPage) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  };

  const generatePaginationButtons = () => {
    let buttonMarkup = "";
    const threshold = 2; // Number of pages to show on either side of the current page
    const startPage = Math.max(1, currentPage - threshold);
    const endPage = Math.min(totalPages, currentPage + threshold);
    const showStartEllipsis = startPage > 1;
    const showEndEllipsis = endPage < totalPages;

    if (showStartEllipsis) {
      if (startPage == 2) {
        buttonMarkup += `<a href="#" class="pagination-btn">1</a>`;
      } else {
        buttonMarkup += `<a href="#" class="pagination-btn">1</a><a class="pagination-btn">...</a>`;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttonMarkup += `<a href="#" class="pagination-btn${
        i === currentPage ? " active" : ""
      }">${i}</a>`;
    }

    if (showEndEllipsis) {
      if (endPage == totalPages - 1) {
        buttonMarkup += `<a href="#" class="pagination-btn">${totalPages}</a>`;
      } else {
        buttonMarkup += `<a class="pagination-btn">...</a><a href="#" class="pagination-btn">${totalPages}</a>`;
      }
    }

    paginationContainer.innerHTML = buttonMarkup;
  };

  // Generate pagination buttons initially
  generatePaginationButtons();
});
