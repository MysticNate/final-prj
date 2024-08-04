import { registerSubmit, showItems, addItem, showSearchResults  } from './functions';

//דף הבית
if (location.pathname == 'index.html' || location.pathname == '/') {
  showItems();
  document.querySelector('#add form').addEventListener('submit', addItem);
}

//דף הרשמה
if (location.pathname.includes('register.html')) {
  document.querySelector('form').addEventListener('submit', registerSubmit);
}

//דף חיפוש
if (location.pathname.includes('search.html')) {
  showSearchResults()
}

