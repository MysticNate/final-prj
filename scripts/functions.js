import { items } from "./db/items.db";
import Item from "./model/item.model";

export function showItems() {
  let html = '';

  items.forEach((item) => {
    html += `
      <div class="item">
        <img src="${item.image}" />
        <h2>${item.name} <span>(${item.stock} במלאי)</span></h2>
        <h3>
          <del>${item.price} ש"ח</del>
          <span>${item.salePrice} ש"ח</span>
        </h3>
        <p>${item.description}</p>
      </div>
    `
  });

  document.querySelector('#items').innerHTML = html;
}

export function addItem(event) {
  event.preventDefault(); // disable page reload

  let name = document.querySelector('#name').value;
  let description = document.querySelector('#description').value;
  let image = document.querySelector('#image').value;
  let price = document.querySelector('#price').value;
  let salePrice = document.querySelector('#salePrice').value;
  let stock = document.querySelector('#stock').value;

  let item = new Item(name, description, image, price, salePrice, stock);
  items.push(item);
  showItems();

  localStorage.setItem('items', JSON.stringify(items));

}

export function registerSubmit(event) {
  event.preventDefault(); // disable page reload
  console.log(event);

  let msgDiv = document.querySelector('#msg');
  console.log('Updating msgDiv:', msgDiv);
  msgDiv.classList.add('success');
  msgDiv.textContent = 'ההרשמה בוצעה בהצלחה';
} 

export function showSearchResults() {
  let q = location.search.split('=')[1];
  let search_term = decodeURI(q); //המרה לשפה במקום קוד
  let results = items.filter(item => item.description.includes(search_term));
  let html = '';
  results.forEach((item) => {
    html += `
      <div class="item">
        <img src="${item.image}" />
        <h2>${item.name} <span>(${item.stock} במלאי)</span></h2>
        <h3>
          <del>${item.price} ש"ח</del>
          <span>${item.salePrice} ש"ח</span>
        </h3>
        <p>${item.description}</p>
      </div>
    `
  });

  document.querySelector('#items').innerHTML = html;
}
