import '../index.js';
import { LsTheme } from '../js/localstorage';

const bodyRef = document.querySelector('body');
const toggleRef = document.querySelector('#theme-switch-toggle');
const footerDarktheme = document.querySelector('.footer');

if (LsTheme.get() === 'dark-theme') {
  bodyRef.classList.add('dark-theme');
  footerDarktheme.classList.add('dark-theme');
  toggleRef.setAttribute('checked', true);
} else {
  bodyRef.classList.add('light-theme');
  footerDarktheme.classList.add('light-theme');
}

toggleRef.addEventListener('change', event => {
  if (bodyRef.classList.contains('dark-theme')) {
    LsTheme.set('light-theme');
    bodyRef.classList.remove('dark-theme');
    bodyRef.classList.add('light-theme');
    footerDarktheme.classList.remove('dark-theme');
  } else {
    LsTheme.set('dark-theme');
    bodyRef.classList.remove('light-theme');
    bodyRef.classList.add('dark-theme');
    footerDarktheme.classList.add('dark-theme');
  }
});

export { bodyRef, toggleRef, footerDarktheme };
