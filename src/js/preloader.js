window.addEventListener('DOMContentLoaded', onWindowLoad);

function onWindowLoad() {
  showLoader();
  document.body.onload = () => {
    hideLoader();
  };
}

export function showLoader() {
  const preloader = document.getElementById('page-preload');
  preloader.classList.add('preloader');
  if (preloader.classList.contains('preloader')) {
    preloader.classList.remove('done');
    preloader.classList.add('preloader');
  }
}

export function hideLoader() {
  const preloader = document.getElementById('page-preload');
  if (!preloader.classList.contains('done')) {
    preloader.classList.add('done');
    preloader.classList.remove('preloader');
  }
}
