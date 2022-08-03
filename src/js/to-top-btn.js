const toTopButton = document.querySelector('.to-top-btn');

toTopButton.addEventListener("click", backToTop);
window.addEventListener("scroll", showToTopButton);

function showToTopButton() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    toTopButton.classList.remove('is-hidden');
  } else {
    toTopButton.classList.add('is-hidden');
  }
}

function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}