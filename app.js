'use strict';

// Данные напитков для окна выбора и расчёта цены.
let products = [
  {
    "id": "catpuccino",
    "name": "Кот-капучино",
    "category": "КЛАССИКА",
    "filter": "classic",
    "emoji": "☕",
    "badge": "Любимец гостей",
    "price": 290,
    "volume": 300,
    "description": "Нежная молочная пена в форме кошачьей мордочки и сбалансированный эспрессо.",
    "ingredients": "Эспрессо, молоко, молочная пена.",
    "allergens": "Молоко. На растительном молоке возможны следы аллергенов.",
    "milk": "regular"
  },
  {
    "id": "honey-raf",
    "name": "Медовый раф",
    "category": "АВТОРСКОЕ",
    "filter": "signature",
    "emoji": "🍯",
    "badge": "Выбор бариста",
    "price": 340,
    "volume": 300,
    "description": "Сливочный раф с цветочным мёдом и щепоткой корицы — уют в чашке.",
    "ingredients": "Эспрессо, сливки, молоко, цветочный мёд, корица.",
    "allergens": "Молоко и мёд. Сливки остаются в составе при замене молока.",
    "milk": "regular"
  },
  {
    "id": "mocha",
    "name": "Мокко «Барсик»",
    "category": "СЛАДКОЕ",
    "filter": "signature",
    "emoji": "🍫",
    "badge": "",
    "price": 360,
    "volume": 300,
    "description": "Эспрессо, горячий шоколад и взбитые сливки. Для настоящих сладкоежек.",
    "ingredients": "Эспрессо, молоко, шоколад, взбитые сливки.",
    "allergens": "Молоко, соя. Сливки и молочный шоколад остаются при замене молока.",
    "milk": "regular"
  },
  {
    "id": "matcha",
    "name": "Матча-латте",
    "category": "МАТЧА И ЧАЙ",
    "filter": "decaf",
    "emoji": "🍵",
    "badge": "На овсяном молоке",
    "price": 320,
    "volume": 300,
    "description": "Японская матча на овсяном молоке — мягкий вкус и естественная свежесть.",
    "ingredients": "Японская матча, овсяное молоко. Матча содержит кофеин.",
    "allergens": "Возможны следы глютена. Состав зависит от выбранного молока.",
    "milk": "oat"
  },
  {
    "id": "cold-brew",
    "name": "Колд-брю тоник",
    "category": "ХОЛОДНОЕ",
    "filter": "cold",
    "emoji": "🧊",
    "badge": "",
    "price": 310,
    "volume": 350,
    "description": "Освежающий кофе холодного заваривания с тоником, льдом и апельсином.",
    "ingredients": "Кофе холодного заваривания, тоник, лёд, апельсин.",
    "allergens": "Содержит цитрусовые.",
    "milk": null
  },
  {
    "id": "hazelnut",
    "name": "Ореховый латте",
    "category": "ДЛЯ ЦЕНИТЕЛЕЙ",
    "filter": "signature",
    "emoji": "🌰",
    "badge": "",
    "price": 330,
    "volume": 300,
    "description": "Латте с сиропом из фундука и карамельной крошкой — десерт в чашке.",
    "ingredients": "Эспрессо, молоко, сироп из фундука, карамельная крошка.",
    "allergens": "Молоко и орехи. Орехи остаются при замене молока.",
    "milk": "regular"
  },
  {
    "id": "iced-latte",
    "name": "Айс-латте",
    "category": "ХОЛОДНОЕ",
    "filter": "cold",
    "emoji": "🧊",
    "badge": "Новинка",
    "price": 320,
    "volume": 350,
    "sizes": [
      350
    ],
    "description": "Эспрессо и прохладное молоко со льдом. Мягкий кофейный вкус для тёплого дня.",
    "ingredients": "Эспрессо, молоко, лёд.",
    "allergens": "Молоко. Состав зависит от выбранного молока.",
    "milk": "regular",
    "image": "assets/iced-latte.webp",
    "thumbnail": "assets/iced-latte-400.webp"
  },
  {
    "id": "cappuccino",
    "name": "Капучино",
    "category": "КЛАССИКА",
    "filter": "classic",
    "emoji": "☕",
    "badge": "Новинка",
    "price": 280,
    "volume": 300,
    "description": "Классический кофе с воздушной молочной пеной и лёгкой посыпкой какао.",
    "ingredients": "Эспрессо, молоко, молочная пена, какао.",
    "allergens": "Молоко. Состав зависит от выбранного молока.",
    "milk": "regular",
    "image": "assets/cappuccino.webp",
    "thumbnail": "assets/cappuccino-400.webp"
  },
  {
    "id": "latte-art",
    "name": "Латте с рисунком",
    "category": "КЛАССИКА",
    "filter": "classic",
    "emoji": "🤍",
    "badge": "Новинка",
    "price": 300,
    "volume": 300,
    "description": "Мягкий латте с узором на молочной пенке. Для спокойного утра и любимой книги.",
    "ingredients": "Эспрессо, молоко, молочная пена.",
    "allergens": "Молоко. Состав зависит от выбранного молока.",
    "milk": "regular",
    "image": "assets/latte-art.webp",
    "thumbnail": "assets/latte-art-400.webp"
  },
  {
    "id": "americano",
    "name": "Американо",
    "category": "КЛАССИКА",
    "filter": "classic",
    "emoji": "☕",
    "badge": "Новинка",
    "price": 220,
    "volume": 300,
    "sizes": [
      200,
      300,
      400
    ],
    "description": "Чёрный кофе без молока. Чистый кофейный вкус для небольшой паузы.",
    "ingredients": "Эспрессо, горячая вода.",
    "allergens": "В рецепте нет молока и орехов.",
    "milk": null,
    "image": "assets/americano.webp",
    "thumbnail": "assets/americano-400.webp"
  }
];

let milks = {
  "regular": {
    "name": "Обычное",
    "price": 0
  },
  "oat": {
    "name": "Овсяное",
    "price": 50
  },
  "coconut": {
    "name": "Кокосовое",
    "price": 50
  },
  "almond": {
    "name": "Миндальное",
    "price": 50
  }
};

// Небольшие функции для иконок, цен и сохранения данных.
function icon(name) {
  return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
}

function money(amount) {
  return amount.toLocaleString('ru-RU') + ' ₽';
}

function escapeHTML(value) {
  let text = String(value);
  text = text.replaceAll('&', '&amp;');
  text = text.replaceAll('<', '&lt;');
  text = text.replaceAll('>', '&gt;');
  text = text.replaceAll('"', '&quot;');
  text = text.replaceAll("'", '&#39;');
  return text;
}

function readStored(key, fallback) {
  try {
    let value = JSON.parse(localStorage.getItem(key));
    if (value === null) {
      return fallback;
    }
    return value;
  } catch (error) {
    return fallback;
  }
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Если браузер запретил сохранение, сайт продолжит работать.
  }
}

function findProduct(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  return null;
}

// У холодного латте один объём, у горячего кофе можно выбрать чашку.
function productSizes(product) {
  if (product.sizes) {
    return product.sizes;
  }
  if (product.milk === null) {
    return [350];
  }
  return [200, 300, 400];
}

function validSize(product, size) {
  let sizes = productSizes(product);
  return sizes.indexOf(Number(size)) !== -1;
}

function itemPrice(product, size, milk) {
  let price = product.price;
  if (Number(size) === 200) {
    price = price - 40;
  }
  if (Number(size) === 400) {
    price = price + 50;
  }
  if (product.milk !== null) {
    price = price + milks[milk].price - milks[product.milk].price;
  }
  return price;
}

// У новых напитков фотографии в WebP, у старых остаётся JPEG.
function productImage(product) {
  if (product.image) {
    return product.image;
  }
  return 'assets/' + product.id + '.jpg';
}

function productThumbnail(product) {
  if (product.thumbnail) {
    return product.thumbnail;
  }
  return productImage(product);
}

function makeKey(id, size, milk) {
  if (milk === null) {
    milk = 'none';
  }
  return id + ':' + size + ':' + milk;
}

// Восстанавливаем корзину и избранное после обновления страницы.
let cart = [];
let savedCart = readStored('kroshka-cart-v1', []);
if (Array.isArray(savedCart)) {
  for (let i = 0; i < savedCart.length && cart.length < 50; i++) {
    let item = savedCart[i];
    if (!item || typeof item !== 'object') {
      continue;
    }
    let product = findProduct(item.id);
    if (!product || !validSize(product, item.size)) {
      continue;
    }
    if (product.milk !== null && !Object.prototype.hasOwnProperty.call(milks, item.milk)) {
      continue;
    }
    if (product.milk === null && item.milk !== null) {
      continue;
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
      continue;
    }
    cart.push({
      id: item.id,
      size: Number(item.size),
      milk: item.milk,
      quantity: item.quantity,
      key: makeKey(item.id, Number(item.size), item.milk)
    });
  }
}

let favorites = [];
let savedFavorites = readStored('kroshka-favorites-v1', []);
if (Array.isArray(savedFavorites)) {
  for (let i = 0; i < savedFavorites.length; i++) {
    if (findProduct(savedFavorites[i]) && favorites.indexOf(savedFavorites[i]) === -1) {
      favorites.push(savedFavorites[i]);
    }
  }
}

let filter = 'all';
let favoritesOnly = false;
let selectedProduct = null;
let checkoutDraft = {};
let toastTimer;

function toast(message) {
  clearTimeout(toastTimer);
  document.getElementById('toast').textContent = message;
  document.getElementById('toast').classList.add('visible');
  toastTimer = setTimeout(function () {
    document.getElementById('toast').classList.remove('visible');
  }, 2800);
}

// Поиск и фильтры скрывают неподходящие карточки.
function renderProducts() {
  let query = document.getElementById('search').value.trim().toLowerCase().replaceAll('ё', 'е');
  let cards = document.querySelectorAll('.product-card');
  let count = 0;

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    let product = findProduct(card.dataset.id);
    let text = (product.name + ' ' + product.description + ' ' + product.category).toLowerCase().replaceAll('ё', 'е');
    let isFavorite = favorites.indexOf(product.id) !== -1;
    let show = true;

    if (filter !== 'all' && card.dataset.category !== filter) {
      show = false;
    }
    if (favoritesOnly && !isFavorite) {
      show = false;
    }
    if (text.indexOf(query) === -1) {
      show = false;
    }

    card.hidden = !show;
    if (show) {
      count++;
    }

    let button = card.querySelector('.favorite-button');
    button.setAttribute('aria-pressed', isFavorite);
    let label = 'Добавить в избранное: ';
    if (isFavorite) {
      label = 'Убрать из избранного: ';
    }
    button.setAttribute('aria-label', label + product.name);
  }

  document.getElementById('empty-results').hidden = count > 0;
}

function openDialog(dialog) {
  let dialogs = document.querySelectorAll('dialog[open]');
  for (let i = 0; i < dialogs.length; i++) {
    dialogs[i].close();
  }
  dialog.showModal();
  document.body.classList.add('modal-open');
}

function closeDialog(dialog) {
  dialog.close();
}

let dialogs = document.querySelectorAll('dialog');
for (let i = 0; i < dialogs.length; i++) {
  dialogs[i].addEventListener('close', function () {
    if (!document.querySelector('dialog[open]')) {
      document.body.classList.remove('modal-open');
    }
  });
  dialogs[i].addEventListener('click', function (event) {
    let dialog = event.currentTarget;
    let rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) {
      closeDialog(dialog);
    }
  });
}

function showProduct(id) {
  let product = findProduct(id);
  if (!product) {
    return;
  }
  selectedProduct = product;
  let sizes = productSizes(product);
  let sizeOptions = '';
  for (let i = 0; i < sizes.length; i++) {
    let size = sizes[i];
    let checked = '';
    let label = 'побольше';
    if (size === product.volume) {
      checked = 'checked';
      label = 'как на фото';
    } else if (size < product.volume) {
      label = 'поменьше';
    }
    sizeOptions += '<div class="option-choice">';
    sizeOptions += '<input type="radio" name="size" id="size-' + size + '" value="' + size + '" ' + checked + '>';
    sizeOptions += '<label for="size-' + size + '">' + size + ' мл<small>' + label + '</small></label></div>';
  }

  let milkOptions = '';
  if (product.milk !== null) {
    milkOptions = '<fieldset class="option-group"><legend>На каком молоке?</legend><div class="milk-options">';
    for (let key in milks) {
      let checked = '';
      if (key === product.milk) {
        checked = 'checked';
      }
      let difference = milks[key].price - milks[product.milk].price;
      let label = 'в цене';
      if (difference > 0) {
        label = '+' + difference + ' ₽';
      } else if (difference < 0) {
        label = '−' + Math.abs(difference) + ' ₽';
      }
      milkOptions += '<div class="option-choice">';
      milkOptions += '<input type="radio" name="milk" id="milk-' + key + '" value="' + key + '" ' + checked + '>';
      milkOptions += '<label for="milk-' + key + '">' + milks[key].name + '<small>' + label + '</small></label></div>';
    }
    milkOptions += '</div></fieldset>';
  }

  document.getElementById('product-dialog-content').innerHTML = `<div class="product-dialog-layout">
      <img class="dialog-product-photo" src="${productImage(product)}" alt="${product.name}" width="800" height="600">
      <form class="product-config" id="product-form">
    <p class="eyebrow">${product.category}</p>
      <h2 id="config-title">${product.name}</h2>
      <p class="config-description">${product.description}</p>
      <p class="config-note">${product.ingredients}</p>
    <fieldset class="option-group">
      <legend>Объём чашки</legend>
      <div class="option-row">${sizeOptions}</div>
      </fieldset>
    ${milkOptions}
    <p class="config-allergens">Аллергены: ${product.allergens}</p>
    <button type="submit" class="primary-button config-add">
      <span>Добавить в корзину</span>
      <strong id="config-price">${money(product.price)}</strong>
      </button>
    </form>
      </div>`;
  openDialog(document.getElementById('product-dialog'));
}

function selectedConfiguration() {
  let size = Number(document.querySelector('#product-form input[name="size"]:checked').value);
  let milk = null;
  if (selectedProduct.milk !== null) {
    milk = document.querySelector('#product-form input[name="milk"]:checked').value;
  }
  return { size: size, milk: milk };
}

function updateConfigPrice() {
  let choice = selectedConfiguration();
  document.getElementById('config-price').textContent = money(itemPrice(selectedProduct, choice.size, choice.milk));
}

function updateCart() {
  writeStored('kroshka-cart-v1', cart);
  if (typeof renderMiniCart === 'function') {
    renderMiniCart();
  }
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count += cart[i].quantity;
  }
  document.getElementById('cart-count').textContent = count;
  document.getElementById('drawer-count').textContent = count;
  document.querySelector('.cart-button').setAttribute('aria-label', 'Открыть корзину: ' + count + ' шт.');
}

function cartTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let product = findProduct(item.id);
    total += itemPrice(product, item.size, item.milk) * item.quantity;
  }
  return total;
}

function cartDetails(item) {
  let text = item.size + ' мл';
  if (item.milk !== null) {
    text += ' · ' + milks[item.milk].name.toLowerCase() + ' молоко';
  } else {
    text += ' · без молока';
  }
  if (findProduct(item.id).filter === 'cold') {
    text += ' · со льдом';
  }
  return text;
}

function renderCart() {
  updateCart();
  if (!cart.length) {
    document.getElementById('cart-content').innerHTML = `<div class="empty-cart">${icon('bag')}<h3>Здесь скоро будет<br>ваш любимый кофе</h3>
      <p>Начните с маленькой радости —<br>выберите напиток по душе.</p>
      <button class="primary-button" data-action="back-to-menu">Посмотреть меню ${icon('arrow')}</button>
      </div>`;
    return;
  }
  let itemsHTML = '';
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let product = findProduct(item.id);
    let disabled = '';
    if (item.quantity >= 20) {
      disabled = 'disabled';
    }
    itemsHTML += `<article class="cart-item">
      <img src="${productThumbnail(product)}" alt="${product.name}" width="75" height="84">
      <div class="cart-item-info">
      <h3>${product.name}</h3>
      <p class="cart-item-details">${cartDetails(item)}</p>
      <div class="cart-item-bottom">
      <div class="quantity-control">
      <button data-quantity="${item.key}" data-delta="-1" aria-label="Уменьшить количество: ${product.name}">−</button>
      <span aria-label="Количество">${item.quantity}</span>
      <button data-quantity="${item.key}" data-delta="1" ${disabled} aria-label="Увеличить количество: ${product.name}">+</button>
      </div>
      <span class="cart-item-price">${money(itemPrice(product, item.size, item.milk) * item.quantity)}</span>
      </div>
      </div>
      <button class="remove-item" data-remove="${item.key}" aria-label="Удалить ${product.name}">${icon('close')}</button>
      </article>`;
  }
  document.getElementById('cart-content').innerHTML = `<div class="cart-items">${itemsHTML}</div>
      <div class="cart-summary">
      <div class="cart-total">
      <span>Итого</span>
      <strong>${money(cartTotal())}</strong>
      </div>
      <p class="cart-pickup">${icon('pin')} Самовывоз · Крошка на Покровке</p>
      <button class="primary-button cart-checkout" data-action="checkout">Перейти к оформлению ${icon('arrow')}</button>
      <p class="demo-notice">Демо-заказ: можно пройти все шаги оформления. Заказ в кофейню не отправляется, деньги не списываются.</p>
      </div>`;
}

function showCheckout() {
  if (cart.length === 0) {
    renderCart();
    return;
  }
  document.getElementById('cart-content').innerHTML = `<div class="checkout-heading">
      <h3>Почти готово</h3>
      <button class="text-button" data-action="cart-back">← К корзине</button>
      </div>
      <form id="checkout-form" class="checkout-form">
    <label class="field">Как к вам обращаться?<input name="customer" autocomplete="given-name" placeholder="Ваше имя" required maxlength="50" value="${escapeHTML(checkoutDraft.customer || '')}">
      </label>
    <label class="field">Телефон для связи<input name="phone" type="tel" autocomplete="tel" placeholder="+7 (999) 123-45-67" required maxlength="24" value="${escapeHTML(checkoutDraft.phone || '')}">
      </label>
    <label class="field">Когда будете?<select name="pickup">
      <option value="soon">Как можно скорее · через 7–10 минут</option>
      <option value="15">Через 15 минут</option>
      <option value="30">Через 30 минут</option>
      <option value="60">Через час</option>
      </select>
      </label>
    <label class="field">Что-нибудь ещё? <span class="field-optional">Необязательно</span>
      <textarea name="comment" maxlength="300" placeholder="Например, приготовьте не очень горячим">${escapeHTML(checkoutDraft.comment || '')}</textarea>
      </label>
    <div class="form-payment">${icon('cup')} С собой · оплата при получении</div>
      <div class="cart-total">
      <span>Итого</span>
      <strong>${money(cartTotal())}</strong>
      </div>
      <p class="demo-notice">Это демонстрация. Заказ не поступит бариста, оплата не требуется.</p>
      <button class="primary-button" type="submit">
      <span>Оформить демо-заказ</span>${icon('arrow')}</button>
      </form>`;
  if (checkoutDraft.pickup) document.querySelector('#checkout-form select').value = checkoutDraft.pickup;
  document.getElementById('cart-content').scrollTop = 0;
  document.querySelector('#checkout-form input').focus();
}

function submitCheckout(form) {
  let customer = form.elements.customer.value.trim();
  let phone = form.elements.phone.value.replace(/\D/g, '');
  let nameInput = form.elements.customer;
  let phoneInput = form.elements.phone;
  nameInput.setCustomValidity('');
  phoneInput.setCustomValidity('');
  if (customer === '') {
    nameInput.setCustomValidity('Пожалуйста, укажите имя.');
  }
  if (phone.length < 10 || phone.length > 15) {
    phoneInput.setCustomValidity('Введите номер телефона: от 10 до 15 цифр.');
  }
  if (!form.reportValidity()) {
    return;
  }
  let order = {
    number: String(Date.now()).slice(-4),
    customer: customer,
    phone: form.elements.phone.value,
    pickup: form.elements.pickup.value,
    comment: form.elements.comment.value.trim(),
    items: cart.slice(),
    total: cartTotal(),
    createdAt: new Date().toISOString(),
    demo: true
  };
  // Сохраняем чек без имени, телефона и комментария.
  let receipt = {
    number: order.number,
    pickup: order.pickup,
    items: order.items,
    total: order.total,
    createdAt: order.createdAt,
    demo: true
  };
  writeStored('kroshka-last-order-v1', receipt);
  cart = [];
  checkoutDraft = {};
  updateCart();
  let pickupText = { soon: 'Через 7–10 минут', 15: 'Через 15 минут', 30: 'Через 30 минут', 60: 'Через час' }[order.pickup];
  let receiptLines = '';
  for (let i = 0; i < order.items.length; i++) {
    let item = order.items[i];
    receiptLines += `<div class="receipt-line">
      <span>${findProduct(item.id).name} × ${item.quantity}<br>
      <span class="cart-item-details">${cartDetails(item)}</span>
      </span>
      <span>${money(itemPrice(findProduct(item.id), item.size, item.milk) * item.quantity)}</span>
      </div>`;
  }
  let commentHTML = '';
  if (order.comment !== '') {
    commentHTML = '<p class="demo-notice">Комментарий: ' + escapeHTML(order.comment) + '</p>';
  }
  document.getElementById('cart-content').innerHTML = `<div class="receipt">
      <span class="receipt-mark">${icon('check')}</span>
      <h3>${escapeHTML(customer)},<br>ваша чашка счастья собрана!</h3>
      <p>Так будет выглядеть ваш заказ.<br>Это демо — он не отправлен в кофейню.</p>
      <div class="receipt-number">№ ${order.number}</div>
      <p>Крошка на Покровке · ${pickupText}</p>
      <div class="receipt-lines">${receiptLines}</div>
      <div class="cart-total">
      <span>Итого</span>
      <strong>${money(order.total)}</strong>
      </div>${commentHTML}<button class="primary-button" data-action="back-to-menu">Вернуться за ещё одной радостью ${icon('heart')}</button>
      </div>`;
  document.getElementById('cart-content').scrollTop = 0;
  document.querySelector('#cart-content .primary-button').focus();
}

// Находим позицию в корзине по напитку, объёму и молоку.
function findCartItem(key) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].key === key) {
      return cart[i];
    }
  }
  return null;
}

function removeCartItem(key) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].key === key) {
      cart.splice(i, 1);
      return;
    }
  }
}

function updateFilterButtons() {
  let buttons = document.querySelectorAll('[data-filter]');
  for (let i = 0; i < buttons.length; i++) {
    let active = buttons[i].dataset.filter === filter;
    buttons[i].classList.toggle('active', active);
    buttons[i].setAttribute('aria-pressed', active);
  }
}

function focusCartButton() {
  let button = document.querySelector('#cart-content button');
  if (!button) {
    button = document.querySelector('#cart-dialog [data-close]');
  }
  button.focus();
}

// closest находит кнопку, даже если нажали на иконку внутри неё.
document.addEventListener('click', function (event) {
  let button = event.target.closest('[data-close]');
  if (button) {
    closeDialog(button.closest('dialog'));
    return;
  }

  button = event.target.closest('[data-product]');
  if (button) {
    showProduct(button.dataset.product);
    return;
  }

  button = event.target.closest('[data-favorite]');
  if (button) {
    let id = button.dataset.favorite;
    let index = favorites.indexOf(id);
    if (index === -1) {
      favorites.push(id);
    } else {
      favorites.splice(index, 1);
    }
    writeStored('kroshka-favorites-v1', favorites);
    renderProducts();
    return;
  }

  button = event.target.closest('[data-filter]');
  if (button) {
    filter = button.dataset.filter;
    updateFilterButtons();
    renderProducts();
    return;
  }

  button = event.target.closest('[data-quantity]');
  if (button) {
    let item = findCartItem(button.dataset.quantity);
    if (!item) {
      return;
    }
    let quantity = item.quantity + Number(button.dataset.delta);
    if (quantity > 20) {
      toast('Не больше 20 одинаковых напитков в одном заказе');
      return;
    }
    item.quantity = quantity;
    if (quantity === 0) {
      removeCartItem(item.key);
    }
    renderCart();
    let buttons = document.querySelectorAll('[data-quantity]');
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].dataset.quantity === button.dataset.quantity && buttons[i].dataset.delta === button.dataset.delta && !buttons[i].disabled) {
        buttons[i].focus();
        return;
      }
    }
    focusCartButton();
    return;
  }

  button = event.target.closest('[data-remove]');
  if (button) {
    removeCartItem(button.dataset.remove);
    renderCart();
    focusCartButton();
    return;
  }

  button = event.target.closest('[data-action]');
  if (!button) {
    return;
  }
  let action = button.dataset.action;
  if (action === 'cart') {
    renderCart();
    openDialog(document.getElementById('cart-dialog'));
  } else if (action === 'location') {
    openDialog(document.getElementById('location-dialog'));
  } else if (action === 'favorites') {
    favoritesOnly = !favoritesOnly;
    button.setAttribute('aria-pressed', favoritesOnly);
    if (favoritesOnly) {
      button.setAttribute('aria-label', 'Показать все напитки');
    } else {
      button.setAttribute('aria-label', 'Показать избранное');
    }
    renderProducts();
  } else if (action === 'reset-filters') {
    filter = 'all';
    favoritesOnly = false;
    document.getElementById('search').value = '';
    updateFilterButtons();
    let favoritesButton = document.querySelector('.favorites-toggle');
    favoritesButton.setAttribute('aria-pressed', 'false');
    favoritesButton.setAttribute('aria-label', 'Показать избранное');
    renderProducts();
  } else if (action === 'checkout') {
    showCheckout();
  } else if (action === 'cart-back') {
    renderCart();
    document.getElementById('cart-content').scrollTop = 0;
  } else if (action === 'back-to-menu') {
    closeDialog(document.getElementById('cart-dialog'));
    document.getElementById('menu').scrollIntoView();
  }
});

document.addEventListener('change', function (event) {
  if (event.target.closest('#product-form')) {
    updateConfigPrice();
  }
});

document.addEventListener('input', function (event) {
  if (event.target.id === 'search') {
    renderProducts();
  }
  let form = event.target.closest('#checkout-form');
  if (form) {
    if (event.target.setCustomValidity) {
      event.target.setCustomValidity('');
    }
    checkoutDraft = {
      customer: form.elements.customer.value,
      phone: form.elements.phone.value,
      pickup: form.elements.pickup.value,
      comment: form.elements.comment.value
    };
  }
});

document.addEventListener('submit', function (event) {
  if (event.target.id === 'product-form') {
    event.preventDefault();
    let choice = selectedConfiguration();
    let key = makeKey(selectedProduct.id, choice.size, choice.milk);
    let item = findCartItem(key);
    if (item && item.quantity >= 20) {
      toast('Не больше 20 одинаковых напитков в одном заказе');
      return;
    }
    if (!item && cart.length >= 50) {
      toast('В корзине уже 50 вариантов напитков');
      return;
    }
    if (item) {
      item.quantity++;
    } else {
      cart.push({
        id: selectedProduct.id,
        key: key,
        size: choice.size,
        milk: choice.milk,
        quantity: 1
      });
    }
    updateCart();
    closeDialog(document.getElementById('product-dialog'));
    toast(selectedProduct.name + ' добавлен в корзину · ' + money(itemPrice(selectedProduct, choice.size, choice.milk)));
  } else if (event.target.id === 'checkout-form') {
    event.preventDefault();
    submitCheckout(event.target);
  }
});

renderProducts();
updateCart();
