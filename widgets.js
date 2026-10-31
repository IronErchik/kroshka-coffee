'use strict';

// Обе корзины используют один массив cart из app.js.
let previousMiniCount = 0;
let chatStarted = false;
let choosingCoffee = false;

function setWidget(name, open, focusInput) {
  let panel = document.getElementById(name + '-panel');
  let button = document.querySelector('[aria-controls="' + name + '-panel"]');
  panel.hidden = !open;
  button.setAttribute('aria-expanded', String(open));

  // На маленьком экране показываем только одну панель.
  if (open && window.innerWidth <= 700) {
    let other = 'coffee-chat';
    if (name === 'coffee-chat') {
      other = 'mini-cart';
    }
    document.getElementById(other + '-panel').hidden = true;
    document.querySelector('[aria-controls="' + other + '-panel"]').setAttribute('aria-expanded', 'false');
  }
  if (name === 'coffee-chat' && open) {
    startCoffeeChat();
    if (focusInput) {
      document.getElementById('chat-question').focus();
    }
  }
}

function renderMiniCart() {
  let count = 0;
  let html = '';
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let product = findProduct(item.id);
    count += item.quantity;
    let disabled = '';
    if (item.quantity >= 20) {
      disabled = 'disabled';
    }
    html += '<article class="mini-cart-item">';
    html += '<img src="' + productThumbnail(product) + '" alt="" width="44" height="52" decoding="async">';
    html += '<div class="mini-item-info"><h3>' + product.name + '</h3>';
    html += '<p>' + cartDetails(item) + '</p>';
    html += '<div class="mini-item-bottom"><div class="mini-quantity">';
    html += '<button type="button" data-mini-key="' + item.key + '" data-mini-delta="-1" aria-label="Уменьшить количество: ' + product.name + '">−</button>';
    html += '<span>' + item.quantity + '</span>';
    html += '<button type="button" data-mini-key="' + item.key + '" data-mini-delta="1" ' + disabled + ' aria-label="Увеличить количество: ' + product.name + '">+</button>';
    html += '</div><strong>' + money(itemPrice(product, item.size, item.milk) * item.quantity) + '</strong></div></div>';
    html += '<button class="mini-remove" type="button" data-mini-remove="' + item.key + '" aria-label="Удалить ' + product.name + '">×</button></article>';
  }
  if (cart.length === 0) {
    html = '<div class="mini-empty"><span aria-hidden="true">☕</span><h3>Начнём с чашки кофе?</h3><p>Добавьте напиток из меню.<br>Он сразу появится здесь.</p><a href="#menu" data-widget="browse">Выбрать напиток ↗</a></div>';
  }
  document.getElementById('mini-cart-items').innerHTML = html;
  document.getElementById('mini-cart-count').textContent = count;
  document.getElementById('mini-cart-total').textContent = money(cartTotal());
  document.getElementById('mini-cart-checkout').disabled = cart.length === 0;
  document.querySelector('.mini-cart-footer').hidden = cart.length === 0;
  let summary = 'Пока пусто';
  if (count > 0) {
    summary = count + ' шт. · ' + money(cartTotal());
  }
  document.getElementById('mini-cart-summary').textContent = summary;

  // Новый напиток сразу виден, но панель не забирает фокус.
  if (count > previousMiniCount) {
    setWidget('mini-cart', true, false);
  }
  previousMiniCount = count;
}

function addChatMessage(text, sender, productIds) {
  let message = document.createElement('div');
  message.className = 'chat-message chat-message-' + sender;
  let label = document.createElement('span');
  label.className = 'visually-hidden';
  label.textContent = 'Помощник: ';
  if (sender === 'user') {
    label.textContent = 'Вы: ';
  }
  let paragraph = document.createElement('p');
  paragraph.textContent = text;
  message.appendChild(label);
  message.appendChild(paragraph);
  if (productIds) {
    let links = document.createElement('div');
    links.className = 'chat-product-links';
    for (let i = 0; i < productIds.length; i++) {
      let product = findProduct(productIds[i]);
      if (!product) {
        continue;
      }
      let button = document.createElement('button');
      button.type = 'button';
      button.dataset.product = product.id;
      button.textContent = product.name + ' · ' + money(product.price) + ' ↗';
      links.appendChild(button);
    }
    message.appendChild(links);
  }
  let log = document.getElementById('chat-messages');
  log.appendChild(message);
  // Не накапливаем бесконечную переписку в открытой вкладке.
  while (log.children.length > 60) {
    log.firstElementChild.remove();
  }
  log.scrollTop = log.scrollHeight;
}

function chatSuggestions(questions) {
  let container = document.getElementById('chat-suggestions');
  container.replaceChildren();
  for (let i = 0; i < questions.length; i++) {
    let button = document.createElement('button');
    button.type = 'button';
    button.dataset.chatQuestion = questions[i];
    button.textContent = questions[i];
    container.appendChild(button);
  }
}

function defaultChatSuggestions() {
  chatSuggestions(['Сколько ждать заказ?', 'Помоги выбрать кофе', 'Где забрать?', 'Какое есть молоко?']);
}

function startCoffeeChat() {
  if (chatStarted) {
    return;
  }
  chatStarted = true;
  addChatMessage('Привет! Я Крошка, помощник по меню. Подберу кофе по вкусу и расскажу о самовывозе. Что хотите узнать?', 'bot');
  defaultChatSuggestions();
}

function coffeeRecommendation(ids, introduction) {
  let names = [];
  let available = [];
  for (let i = 0; i < ids.length; i++) {
    let product = findProduct(ids[i]);
    if (product) {
      names.push(product.name + ' — ' + money(product.price) + ' / ' + product.volume + ' мл');
      available.push(product.id);
    }
  }
  addChatMessage(introduction + '\n\n' + names.join('\n') + '\n\nНажмите на напиток, чтобы выбрать объём и молоко.', 'bot', available);
  choosingCoffee = false;
  chatSuggestions(['Другой вкус', 'Что без молока?', 'Сколько ждать заказ?']);
}

function answerCoffeeQuestion(question) {
  let text = question.trim().toLowerCase().replaceAll('ё', 'е');
  if (text === '') {
    return;
  }
  addChatMessage(question.trim(), 'user');

  // Правила простые: ищем слова в вопросе и отвечаем по данным меню.
  if (/аллерг|неперенос|лактоз|без молока|безлактоз|веган|растительн/.test(text)) {
    let message = 'Есть овсяное, кокосовое и миндальное молоко. Обычно замена стоит +50 ₽; у матча-латте овсяное уже включено. В медовом рафе, мокко и ореховом латте остаются другие ингредиенты с аллергенами даже после замены молока. При аллергии проверьте состав в карточке и уточните возможность приготовления у бариста: отсутствие следов аллергенов сайт не гарантирует.';
    addChatMessage(message, 'bot', ['cold-brew', 'americano', 'matcha']);
    choosingCoffee = false;
  } else if (/без кофеин|декоф|кофеин|без эспрессо/.test(text)) {
    addChatMessage('Без эспрессо в меню есть матча-латте, но матча тоже содержит кофеин. Полностью бескофеиновые напитки и декаф в текущем меню не заявлены. Точное количество кофеина не указано.', 'bot', ['matcha']);
    choosingCoffee = false;
  } else if (/статус|где мой|номер заказа|готов ли|отмен.*заказ|возврат/.test(text)) {
    addChatMessage('Это учебный сайт: демо-заказ не отправляется в кофейню. Я не отслеживаю заказы и не связываюсь с бариста. Пока вы в корзине, можно менять количество и удалять напитки.', 'bot');
    choosingCoffee = false;
  } else if (/ждать|долго|минут|готовит|время.*заказ|когда.*готов|скор.*заказ/.test(text)) {
    addChatMessage('По информации сайта кофе готовят за 7–10 минут. В форме можно выбрать «как можно скорее», через 15, 30 минут или через час. Это демонстрация: фактическое время сайт не подтверждает, заказ в кофейню не отправляется.', 'bot');
    choosingCoffee = false;
  } else if (/час.*работ|работает|работаете|открыт|закрыт|расписан|режим|до скольки|со скольки/.test(text)) {
    let hours = document.querySelectorAll('#location-dialog .location-detail span')[1];
    addChatMessage('На сайте указано: ' + hours.textContent.trim() + '. Часы работы демонстрационные.', 'bot');
    choosingCoffee = false;
  } else if (/адрес|забрать|самовывоз|где.*(вы|кофейн|находит)|как.*(найти|добрать)|покровк/.test(text)) {
    let address = document.querySelector('#location-dialog .location-detail span').textContent.trim();
    addChatMessage('Самовывоз из кофейни «Крошка»: ' + address + '. Адрес также указан в разделе «Как забрать» и в окне кофейни. На сайте используются демонстрационные данные.', 'bot');
    choosingCoffee = false;
  } else if (/достав|курьер/.test(text)) {
    addChatMessage('В этом меню доступен только самовывоз. Доставка и вызов курьера на сайте не предусмотрены.', 'bot');
    choosingCoffee = false;
  } else if (/оплат|платеж|картой|наличн|списан|настоящ|демо/.test(text)) {
    addChatMessage('В форме указана оплата при получении, но сайт учебный: заказ демонстрационный, деньги не списываются и онлайн-оплаты нет.', 'bot');
    choosingCoffee = false;
  } else if (/сахар|сироп|горяч|температур|пожелан/.test(text)) {
    addChatMessage('Пожелания вроде «без сахара» или «не очень горячий» можно написать в комментарии при оформлении. В рафе уже есть мёд, в мокко — шоколад, в ореховом латте — сироп. Изменение рецепта и наличие добавок сайт не подтверждает.', 'bot');
    choosingCoffee = false;
  } else if (/молок/.test(text)) {
    addChatMessage('Можно выбрать обычное, овсяное, кокосовое или миндальное молоко. Растительное обычно добавляет 50 ₽. У матча-латте овсяное включено в цену; переход на обычное уменьшит её на 50 ₽. Доступные варианты и итоговая цена есть в карточке напитка.', 'bot', ['matcha']);
    choosingCoffee = false;
  } else if (/объем|размер|миллилитр|чашк/.test(text) && !/выбр|посовет/.test(text)) {
    addChatMessage('Объём зависит от напитка. У большинства горячих напитков есть 200, 300 и 400 мл, у холодных — 350 мл. Откройте карточку: там показаны доступные размеры и цена выбранной чашки.', 'bot');
    choosingCoffee = false;
  } else if (/цен|стоит|стоим|дешев|бюджет|дорог/.test(text)) {
    let requested = null;
    for (let i = 0; i < products.length; i++) {
      if (text.includes(products[i].name.toLowerCase().replaceAll('ё', 'е'))) {
        requested = products[i];
        break;
      }
    }
    if (!requested) {
      let aliases = [['раф', 'honey-raf'], ['мокко', 'mocha'], ['матча', 'matcha'], ['капучино', 'cappuccino'], ['колд', 'cold-brew'], ['айс', 'iced-latte'], ['орех', 'hazelnut'], ['латте', 'latte-art']];
      for (let i = 0; i < aliases.length; i++) {
        if (text.includes(aliases[i][0])) {
          requested = findProduct(aliases[i][1]);
          break;
        }
      }
    }
    if (requested) {
      addChatMessage(requested.name + ' стоит ' + money(requested.price) + ' за ' + requested.volume + ' мл. Объём и молоко могут изменить цену — в карточке она пересчитывается сразу.', 'bot', [requested.id]);
      choosingCoffee = false;
      defaultChatSuggestions();
      return;
    }
    let cheapest = products[0];
    for (let i = 1; i < products.length; i++) {
      if (products[i].price < cheapest.price) {
        cheapest = products[i];
      }
    }
    addChatMessage('Самая низкая цена за стандартный объём в меню: ' + cheapest.name + ' — ' + money(cheapest.price) + ' / ' + cheapest.volume + ' мл. Выбор объёма и молока может изменить цену. Точная сумма видна перед добавлением в корзину.', 'bot', [cheapest.id]);
    choosingCoffee = false;
  } else if (/слад|десерт|шоколад|медов|орех/.test(text)) {
    coffeeRecommendation(['honey-raf', 'mocha', 'hazelnut'], 'Если хочется чего-то сладкого, попробуйте эти напитки. Раф — с мёдом, мокко — с шоколадом, латте — с ореховым сиропом.');
    return;
  } else if (/холод|освеж|лед|айс|жарк/.test(text)) {
    coffeeRecommendation(['iced-latte', 'cold-brew'], 'Для прохладной паузы: айс-латте мягче и молочнее, колд-брю тоник — с тоником и апельсином.');
    return;
  } else if (/креп|черн|бодр|насыщ/.test(text)) {
    coffeeRecommendation(['americano', 'cold-brew'], 'Если предпочитаете чёрный кофе, попробуйте американо. Для холодного варианта — колд-брю тоник. Крепость по фотографии и названию точно не сравнить: содержание кофеина в меню не указано.');
    return;
  } else if (/нежн|мягк|сливоч|латте|капуч/.test(text)) {
    coffeeRecommendation(['catpuccino', 'cappuccino', 'latte-art'], 'Для мягкого вкуса подойдут молочные напитки. Капучино — с воздушной пеной, латте — для любителей молочного вкуса.');
    return;
  } else if (/оформ|добав|корзин|заказат/.test(text) && !/како|лучше|посовет|выбр/.test(text)) {
    addChatMessage('Нажмите «+» у напитка, выберите объём и молоко, затем добавьте его в корзину. Слева снизу сразу появится состав заказа. Там можно менять количество, удалять напитки и перейти к оформлению.', 'bot');
    choosingCoffee = false;
  } else if (/выбр|посовет|рекоменд|лучше|вкус|другой|не знаю|хочу кофе/.test(text) || choosingCoffee) {
    choosingCoffee = true;
    addChatMessage('Давайте подберём по вкусу. Какой кофе вам больше нравится?', 'bot');
    chatSuggestions(['Нежный и мягкий', 'Сладкий, как десерт', 'Покрепче, чёрный', 'Холодный и освежающий', 'Без эспрессо']);
    return;
  } else if (/привет|здравств|добрый|доброе/.test(text)) {
    addChatMessage('Привет! Помогу выбрать кофе, узнать состав, время приготовления и условия самовывоза. С чего начнём?', 'bot');
  } else if (/спасибо|благодар/.test(text)) {
    addChatMessage('Всегда пожалуйста! Пусть ваша кофейная пауза будет приятной ☕', 'bot');
  } else {
    addChatMessage('Пока не нашёл ответ на такой вопрос. Я умею подбирать кофе по вкусу и рассказывать о меню, молоке, цене, времени приготовления, адресе и оформлении. Попробуйте один из вопросов ниже.', 'bot');
    choosingCoffee = false;
  }
  defaultChatSuggestions();
}

document.addEventListener('click', function (event) {
  let quickQuestion = event.target.closest('[data-chat-question]');
  if (quickQuestion) {
    answerCoffeeQuestion(quickQuestion.dataset.chatQuestion);
    return;
  }
  let quantity = event.target.closest('[data-mini-key]');
  let remove = event.target.closest('[data-mini-remove]');
  if (quantity || remove) {
    let key = remove ? remove.dataset.miniRemove : quantity.dataset.miniKey;
    let item = findCartItem(key);
    if (!item) {
      return;
    }
    if (remove) {
      removeCartItem(key);
    } else {
      item.quantity += Number(quantity.dataset.miniDelta);
      if (item.quantity <= 0) {
        removeCartItem(key);
      }
    }
    updateCart();
    let next = null;
    if (quantity) {
      let buttons = document.querySelectorAll('[data-mini-key]');
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].dataset.miniKey === key && buttons[i].dataset.miniDelta === quantity.dataset.miniDelta && !buttons[i].disabled) {
          next = buttons[i];
          break;
        }
      }
    }
    if (!next) {
      next = document.querySelector('[data-widget="toggle-cart"]');
    }
    next.focus();
    return;
  }
  let button = event.target.closest('[data-widget]');
  if (!button) {
    return;
  }
  let action = button.dataset.widget;
  if (action === 'toggle-cart') {
    setWidget('mini-cart', document.getElementById('mini-cart-panel').hidden, false);
  } else if (action === 'close-cart' || action === 'browse') {
    setWidget('mini-cart', false, false);
    if (action === 'close-cart') {
      document.querySelector('[data-widget="toggle-cart"]').focus();
    }
  } else if (action === 'toggle-chat') {
    setWidget('coffee-chat', document.getElementById('coffee-chat-panel').hidden, true);
  } else if (action === 'close-chat') {
    setWidget('coffee-chat', false, false);
    document.querySelector('[data-widget="toggle-chat"]').focus();
  } else if (action === 'checkout' && cart.length > 0) {
    renderCart();
    openDialog(document.getElementById('cart-dialog'));
    showCheckout();
  }
});

document.getElementById('coffee-chat-form').addEventListener('submit', function (event) {
  event.preventDefault();
  let input = document.getElementById('chat-question');
  let question = input.value.trim();
  if (!question) {
    return;
  }
  input.value = '';
  answerCoffeeQuestion(question);
  input.focus();
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || document.querySelector('dialog[open]')) {
    return;
  }
  let inChat = document.querySelector('.coffee-chat-widget').contains(document.activeElement);
  setWidget('coffee-chat', false, false);
  setWidget('mini-cart', false, false);
  if (inChat) {
    document.querySelector('[data-widget="toggle-chat"]').focus();
  }
});

window.matchMedia('(max-width: 700px)').addEventListener('change', function (event) {
  if (event.matches && !document.getElementById('coffee-chat-panel').hidden) {
    setWidget('mini-cart', false, false);
  }
});

renderMiniCart();
