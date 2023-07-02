const categoryLink = document.querySelector(".category-item");

categoryLink.addEventListener("click", () => {
  categoryLink.classList.toggle("show-sub-items");
});

// PAGINATION IMPLEMENTATION
document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1; // Current page number
  let totalPages = 10; // Total number of pages

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const paginationContainer = document.querySelector(".pages");
  const container = document.querySelector(".books");

  // call this method to load data in the beginning
  loadDataCategoryBooks(
    "http://localhost:8080/booksale/api/book/category/tieu-thuyet?page=0",
    container
  );

  const updatePage = () => {
    generatePaginationButtons();
    // Perform actions to update the page content based on the current page number
    // You can make an AJAX request, update the URL, or perform any necessary actions
    // For example, you can update the active class on the pagination buttons based on the current page
    const paginationButtons =
      paginationContainer.querySelectorAll(".pagination-btn");
    paginationButtons.forEach((button) => {
      const page = parseInt(button.getAttribute("page"));
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
        buttonMarkup += `<a class="pagination-btn" page="1" path="tieu-thuyet">1</a>`;
      } else {
        buttonMarkup += `<a  class="pagination-btn" page="1" path="tieu-thuyet">1</a><a class="pagination-btn">...</a>`;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttonMarkup += `<a class="pagination-btn${
        i === currentPage ? " active" : ""
      }" page="${i}" path="tieu-thuyet">${i}</a>`;
    }

    if (showEndEllipsis) {
      if (endPage == totalPages - 1) {
        buttonMarkup += `<a  class="pagination-btn" path="tieu-thuyet" page=${totalPages}>${totalPages}</a>`;
      } else {
        buttonMarkup += `<a class="pagination-btn">...</a><a class="pagination-btn" page=${totalPages} path="tieu-thuyet">${totalPages}</a>`;
      }
    }

    paginationContainer.innerHTML = buttonMarkup;

    const btnPaginations = document.querySelectorAll(".pages .pagination-btn");

    btnPaginations.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        const pathVar = event.target.getAttribute("path");
        const page = event.target.getAttribute("page");

        const url = `http://localhost:8080/booksale/api/book/category/${pathVar}?page=${
          page - 1
        }`;

        loadDataCategoryBooks(url, container);
        currentPage = parseInt(page);
        updatePage();
      });
    });
  };

  // Generate pagination buttons initially
  generatePaginationButtons();

  // Function to remove book cards from the container
  const removeBookCards = (container) => {
    const bookCards = container.querySelectorAll(".book-card");
    bookCards.forEach((card) => {
      card.remove();
    });
  };

  // Function to load data for category books
  function loadDataCategoryBooks(url, container) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Update the booksContainer with the retrieved data
        const insertHtml = data.books.map((book) => renderCard(book)).join("");
        removeBookCards(container);
        container.insertAdjacentHTML("beforeend", insertHtml);
        totalPages = data.totalPages;
        updatePage();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // handle prev button click
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadDataCategoryBooks(
        `http://localhost:8080/booksale/api/book/category/tieu-thuyet?page=${
          currentPage - 1
        }`,
        container
      );
    }
  });

  // handle next button click
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      loadDataCategoryBooks(
        `http://localhost:8080/booksale/api/book/category/tieu-thuyet?page=${
          currentPage - 1
        }`,
        container
      );
    }
  });
});
