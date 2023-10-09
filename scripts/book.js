import { stickyHeader, renderCard } from "./utils.js";

const categoryLink = document.querySelector(".category-item");
const sibebarCutPoint = document.querySelector(".sidebar");
stickyHeader(sibebarCutPoint);

categoryLink.addEventListener("click", () => {
  categoryLink.classList.toggle("show-sub-items");
});

document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1; // Current page number
  let totalPages = 10; // Total number of pages

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const paginationContainer = document.querySelector(".pages");
  const container = document.querySelector(".books");

  const path = prevButton.getAttribute("path");

  loadDataCategoryBooks(
    `http://localhost:8080/booksale/api/book/category/${path}?page=0`,
    container
  );

  const updatePage = () => {
    generatePaginationButtons();
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
        buttonMarkup += `<a class="pagination-btn" page="1" path="${path}">1</a>`;
      } else {
        buttonMarkup += `<a class="pagination-btn" page="1" path="${path}">1</a><a class="pagination-btn">...</a>`;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttonMarkup += `<a class="pagination-btn${
        i === currentPage ? " active" : ""
      }" page="${i}" path="${path}">${i}</a>`;
    }

    if (showEndEllipsis) {
      if (endPage == totalPages - 1) {
        buttonMarkup += `<a class="pagination-btn" page="${totalPages}" path="${path}">${totalPages}</a>`;
      } else {
        buttonMarkup += `<a class="pagination-btn">...</a><a class="pagination-btn" page="${totalPages}" path="${path}">${totalPages}</a>`;
      }
    }

    paginationContainer.innerHTML = buttonMarkup;

    const btnPaginations = document.querySelectorAll(".pages .pagination-btn");

    btnPaginations.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        const page = event.target.getAttribute("page");
        const url = `http://localhost:8080/booksale/api/book/category/${path}?page=${
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

  const removeBookCards = (container) => {
    const bookCards = container.querySelectorAll(".book-card");
    bookCards.forEach((card) => {
      card.remove();
    });
  };

  function loadDataCategoryBooks(url, container) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
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

  prevButton.addEventListener("click", (event) => {
    if (currentPage > 1) {
      currentPage--;
      loadDataCategoryBooks(
        `http://localhost:8080/booksale/api/book/category/${path}?page=${
          currentPage - 1
        }`,
        container
      );
    }
  });

  nextButton.addEventListener("click", (event) => {
    if (currentPage < totalPages) {
      currentPage++;
      loadDataCategoryBooks(
        `http://localhost:8080/booksale/api/book/category/${path}?page=${
          currentPage - 1
        }`,
        container
      );
    }
  });
});
