// Поиск элементов на странице
const showLinks = document.querySelector('#showLinks');
const showSite = document.querySelector('#showSite');

const input = document.querySelector('#input-text');
const button = document.querySelector('#button');

// Добавление прослушивателя событий на кнопку
button.addEventListener('click', () => {

  // Очистка содержимого div с классом showLinks
  showLinks.innerHTML = '';

  // Задание настроек для метода fetch
  const url = 'http://127.0.0.1:8000/';
  const data = {
    text: input.value
  };
  const customHeaders = {
    "Content-Type": "application/json",
  };

  // Отправка запроса с помощью метода fetch
  fetch(url, {
    method: "POST",
    headers: customHeaders,
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(data => {
    // Обработка полученных данных и создание элементов на странице
    data.linkList.forEach(link => {
      // Создание div с классом "element" и содержимым внутри
      const element = document.createElement('div');
      element.classList.add('element');
      element.innerText = link[0];

      // Создание кнопки и присвоение ей текста
      const linkButton = document.createElement('a');
      linkButton.innerText = 'Открыть сайт';

      // Добавление прослушивателя событий на кнопку
      linkButton.addEventListener('click', () => {
        const linkData = { text: link[1] };

        // Отправка запроса на сервер с помощью метода fetch для получения данных
        fetch('http://127.0.0.1:8000/linkList', {
          method: "POST",
          headers: customHeaders,
          body: JSON.stringify(linkData),
        }).then(res => res.json())
          .then(data => {
            // Сохранение данных в локальном хранилище браузера
            localStorage.setItem('data', data.result);
            // Заполнение содержимого div с классом showSite данными из локального хранилища
            showSite.innerHTML = localStorage.getItem('data');
          });
      });

      // Добавление кнопки внутрь элемента div с классом "element"
      element.appendChild(linkButton);
      // Добавление элемента на страницу внутрь div с классом showLinks
      showLinks.appendChild(element);
    });
  }); 
});

// Добавление прослушивателя событий на кнопку внутри div с классом showSite
showSite.addEventListener('click', () => {
  // Получение данных из div с классом showSite
  const data = showSite.innerHTML;
  // Открытие нового окна браузера и отображение в нем данных из div с классом showSite
  const win = window.open('', 'window', 'width=600,height=400');
  win.document.body.innerHTML = data;
});