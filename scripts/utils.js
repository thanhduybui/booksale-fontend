export const stickyHeader = (element) => {
  const obs = new IntersectionObserver(
    (entries) => {
      const ent = entries[0];

      if (!ent.isIntersecting) {
        document.querySelector("header").classList.add("sticky");
      }
      if (ent.isIntersecting) {
        document.querySelector("header").classList.remove("sticky");
      }
    },
    {
      // in the viewport
      root: null,
      threshold: 0,
      rootMargin: "-180px",
    }
  );
  obs.observe(element);
};

// slider
export const sliderHandler = function () {
  const slides = document.querySelectorAll(".slide");
  const btnPrev = document.querySelector(".btn-left");
  const btnNext = document.querySelector(".btn-right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="dot" data-slide="${i}"></div>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dot")
      .forEach((dot) => dot.classList.remove("dot--current"));

    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add("dot--current");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);
};

export function renderCard(book) {
  return `<div class="book-card">
              <a href="http://localhost:8080/booksale/book/${book.bookId}" class="book-link">
                <span class="discount-tag">-${book.discount}%</span>
                <div class="img-container">
                  <img
                    src=${book.mainImg}
                    alt="Book Cover"
                    class="card-img"
                  />
                </div>
                <div class="card-body">
                  <p class="card-title">${book.title}</p>
                  <div class="rating" class="card-rating">
                    <span class="rating-number">4.8</span
                    ><span><ion-icon name="star"></ion-icon></span
                    ><span class="rating-text">Đã bán 200</span>
                  </div>
                  <div class="card-prices">
                    <span class="card-discount">${book.finalPrice}đ</span>
                    <span class="card-price">${book.price}đ</span>
                  </div>
                </div>
              </a>
            </div>`;
}
