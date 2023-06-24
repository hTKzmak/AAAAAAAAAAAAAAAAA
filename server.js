// Подключение необходимых пакетов
const express = require('express');
const app = express();
const port_number = 8000;
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Объект со словами и ссылками для них
const linkMap = {
  wiki: [['ссылка на статью про Театр Новиссимо:', 'https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D0%B0%D1%82%D1%80_%D0%9D%D0%BE%D0%B2%D0%B8%D1%81%D1%81%D0%B8%D0%BC%D0%BE'],
  ['ссылка на статью про Apple:', 'https://ru.wikipedia.org/wiki/Apple']],
  coding: [['ссылка на документацию по Rust:', 'https://doc.rust-lang.ru/book/'],
  ['ссылка на документацию по Kotlin:', 'https://kotlinlang.ru/']],
  design: [['ссылка на курсы по Premier Pro:', 'https://cloudlessons.ru/v/380/'],
  ['ссылка на курсы по Figma:', 'https://cloudlessons.ru/v/400/'],
  ['ссылка на курсы по Cinema 4D:', 'https://cloudlessons.ru/v/460/']]
};

const linkWords = ['wiki', 'coding', 'design'];

// Маршрут для добавления данных на страницу
app.post('/', (req, res) => {
  const sentWord = req.body.text;
  if (linkWords.includes(sentWord)) {
    for (let i of Object.entries(linkMap)) {
      if (i[0] == sentWord) {
        res.send({
          'linkList': i[1]
        });
        break;
      }
    }
  } else {
    res.send({
      'linkList': []
    });
  }
});

// Маршрут для получения данных и отображения их на странице
app.post('/linkList', (req, res) => {
  const request = require('request');
  const URL = req.body.text;
  request(URL, (err, resp, body) => {
    if (err) throw err;
    res.send({ "result": body });
  });
});

// Запуск сервера
app.listen(port_number, () => {
  console.log(`Сервер запущен на порту: ${port_number}`);
});
