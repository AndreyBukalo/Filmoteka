import Notiflix from "notiflix";

function mainAuthorizedOnly() {
  const libLink = document.querySelector('[lib-link]')
  if (localStorage.getItem('auth') === null) {
    libLink.classList.add('pointer-none')
    console.log('+')
  }
  else if (JSON.parse(localStorage.getItem('auth')).auth != true) {
    libLink.classList.add('pointer-none')
    console.log('+')
  }
  else {
    libLink.classList.remove('pointer-none')
  }
}

mainAuthorizedOnly()

document.querySelector('[lib-item]').addEventListener('click', (event) => {
  if (localStorage.getItem('auth') === null) {
    Notiflix.Notify.warning(`Library for authorized users only`)
  }
  else if (JSON.parse(localStorage.getItem('auth')).auth != true) {
    Notiflix.Notify.warning(`Library for authorized users only`)
  }
})