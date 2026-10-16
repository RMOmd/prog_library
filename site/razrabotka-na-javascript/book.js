// Auto-generated unified book data for JavaScript Everywhere (Adam D. Scott, O'Reilly)
window.BOOK_DATA = {
  "id": "razrabotka-na-javascript",
  "title": "Разработка на JavaScript",
  "author": "Адам Д. Скотт",
  "cover": "img/cover.jpg",
  "totalChapters": 25,
  "chapters": [
    {
      "num": 1,
      "title": "Глава 1. Среда разработки",
      "subtitle": "Установка инструментов, терминал, Node.js, npm, MongoDB, Git, Prettier и ESLint для создания надежного кроссплатформенного стека.",
      "minutes": 10,
      "contentHtml": `<h2>1. Единый язык для всей экосистемы</h2>
<p>
  JavaScript прошел невероятную эволюцию: от простого скриптового языка для анимации снежинок в браузере Netscape до универсальной платформы, позволяющей инженеру строить высоконагруженные серверные API, сложные веб-клиенты (SPA), десктопные программы для Windows, macOS и Linux, а также нативные мобильные приложения для iOS и Android.
</p>
<p>
  В этой книге строится сквозное приложение — <b>Notedly</b> (сервис для создания заметок, синхронизации и социального взаимодействия), использующее единый JavaScript-стек на всех платформах.
</p>

<div class="schema-box">
  <div class="schema-grid">
    <div class="schema-item amber">
      <strong>Backend API</strong>
      <p>Node.js, Express, Apollo Server, GraphQL, MongoDB & Mongoose, JWT.</p>
    </div>
    <div class="schema-item blue">
      <strong>Web Client</strong>
      <p>React, React Router, Apollo Client, Styled Components.</p>
    </div>
    <div class="schema-item emerald">
      <strong>Desktop App</strong>
      <p>Electron, Chromium, Node.js IPC, обертка веб-клиента.</p>
    </div>
    <div class="schema-item purple">
      <strong>Mobile App</strong>
      <p>React Native, Expo, React Navigation, Apollo Client, SecureStore.</p>
    </div>
  </div>
</div>

<h2>2. Подготовка окружения и линтинг</h2>
<p>
  Для консистентной работы в команде критически важно автоматизировать форматирование и статический анализ кода с помощью ESLint и Prettier:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JSON · package.json скрипты</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "lint": "eslint \"src/**/*.js\"",
    "format": "prettier --write \"src/**/*.{js,json}\""
  }
}</code></pre>
</div>

<div class="callout tip">
  <div class="callout-title">💡 Преимущество единого стека</div>
  <p>Использование одного языка на клиенте и сервере позволяет переиспользовать схемы валидации, утилиты форматирования дат, константы и бизнес-логику между четырьмя совершенно разными платформами.</p>
</div>`,
      "quiz": [
        {
          "question": "Какое главное архитектурное преимущество дает использование стека JavaScript Everywhere (Node + React + React Native + Electron)?",
          "options": [
            "Возможность писать бэкенд, веб, мобильное и десктопное приложение на едином языке с общими библиотеками и утилитами.",
            "Полный отказ от использования баз данных.",
            "Автоматическая публикация в App Store без аккаунта Apple.",
            "Увеличение скорости сети интернет."
          ],
          "correct": 0,
          "explanation": "Единый стек устраняет контекстное переключение между разными языками программирования и снижает стоимость разработки."
        },
        {
          "question": "Для чего в проекте используется утилита nodemon?",
          "options": [
            "Для автоматического перезапуска Node.js процесса при сохранении изменений в исходных файлах.",
            "Для шифрования паролей пользователей.",
            "Для компиляции стилей Sass.",
            "Для подключения к базе данных MongoDB."
          ],
          "correct": 0,
          "explanation": "nodemon отслеживает изменения в файловой системе и мгновенно перезапускает сервер в процессе разработки."
        },
        {
          "question": "Какую роль выполняет связка ESLint + Prettier?",
          "options": [
            "ESLint ищет потенциальные баги и синтаксические проблемы, а Prettier обеспечивает единообразное форматирование кода.",
            "Они заменяют компилятор JavaScript.",
            "Они сжимают изображения перед загрузкой на сервер.",
            "Они выполняют автоматическое тестирование UI компонентов."
          ],
          "correct": 0,
          "explanation": "ESLint отвечает за качество и корректность логики кода, а Prettier — за визуальный стиль и отступы."
        }
      ]
    },
    {
      "num": 2,
      "title": "Глава 2. Введение в API",
      "subtitle": "Архитектурные парадигмы: REST против GraphQL, структура запросов, декларативный язык схем SDL и концепция единственной точки входа.",
      "minutes": 11,
      "contentHtml": `<h2>1. Эволюция веб-API: почему REST уступает место GraphQL</h2>
<p>
  В традиционной архитектуре REST (Representational State Transfer) каждый ресурс доступен по отдельному URL-эндпоинту. Это неизбежно порождает две классические проблемы мобильных и веб-клиентов:
</p>
<ul>
  <li><b>Избыточная выборка (Over-fetching):</b> клиенту требуется только имя пользователя, но сервер REST отдает огромный JSON со 100 полями (аватары, настройки, адреса, даты).</li>
  <li><b>Недостаточная выборка (Under-fetching):</b> чтобы отобразить страницу ленты с заметками и авторами, клиент вынужден делать цепочку запросов: сначала <code class="inline-code">GET /notes</code>, а затем N отдельных запросов <code class="inline-code">GET /users/:id</code>.</li>
</ul>

<div class="schema-box">
  <div class="schema-grid">
    <div class="schema-item blue">
      <strong>REST Архитектура</strong>
      <p>Десятки эндпоинтов (<code class="inline-code">/notes</code>, <code class="inline-code">/users</code>). Множество круглых сетевых пакетов (roundtrips). Фиксированная форма ответа.</p>
    </div>
    <div class="schema-item emerald">
      <strong>GraphQL Архитектура</strong>
      <p>Один эндпоинт (<code class="inline-code">/api</code>). Клиент сам декларативно запрашивает ровно те поля, которые ему нужны, за один HTTP POST запрос.</p>
    </div>
  </div>
</div>

<h2>2. Язык описания схем (Schema Definition Language, SDL)</h2>
<p>
  В GraphQL сервер и клиент заключают строгий контракт с помощью схемы SDL:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">GraphQL SDL · Пример схемы заметок</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>type Note {
  id: ID!
  content: String!
  author: User!
  favoriteCount: Int!
  createdAt: String!
}

type Query {
  notes: [Note!]!
  note(id: ID!): Note
}

type Mutation {
  newNote(content: String!): Note!
  deleteNote(id: ID!): Boolean!
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Что такое проблема избыточной выборки (over-fetching) в традиционных REST API?",
          "options": [
            "Сервер возвращает клиенту значительно больше полей данных, чем требуется конкретному экрану или компоненту.",
            "Клиент отправляет слишком много запросов в секунду и получает 429 Too Many Requests.",
            "База данных перегружена операциями записи.",
            "Браузер кэширует не те страницы."
          ],
          "correct": 0,
          "explanation": "Over-fetching тратит мобильный трафик и ресурсы памяти, загружая ненужные поля объекта."
        },
        {
          "question": "Сколько HTTP-эндпоинтов обычно имеет GraphQL API?",
          "options": [
            "Один общий эндпоинт (обычно /api или /graphql), принимающий POST-запросы с телом запроса.",
            "По одному эндпоинту на каждый тип данных в схеме.",
            "Эндпоинты не используются вообще, связь только через WebSockets.",
            "Минимум 10 эндпоинтов."
          ],
          "correct": 0,
          "explanation": "GraphQL маршрутизирует все операции чтения и мутаций через единый URL-эндпоинт."
        },
        {
          "question": "Что означает восклицательный знак после типа поля в GraphQL SDL (например, content: String!)?",
          "options": [
            "Поле является обязательным (Non-nullable) и никогда не может быть null.",
            "Поле должно быть написано заглавными буквами.",
            "Поле доступно только администраторам.",
            "Поле обновляется в реальном времени."
          ],
          "correct": 0,
          "explanation": "В GraphQL SDL знак '!' гарантирует, что поле не может возвращать значение null."
        }
      ]
    },
    {
      "num": 3,
      "title": "Глава 3. Создание веб-приложения с помощью Node и Express",
      "subtitle": "Настройка веб-сервера Express, middleware цепочки, обработка маршрутов, переменные окружения и запуск сервера.",
      "minutes": 12,
      "contentHtml": `<h2>1. Каркас сервера на Node.js и Express</h2>
<p>
  Фреймворк Express является стандартом де-факто для построения масштабируемых HTTP-серверов в Node.js. Он предоставляет минималистичный слой абстракции над низкоуровневым модулем <code class="inline-code">http</code>:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · src/index.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Базовый тестовый маршрут
app.get('/', (req, res) => {
  res.send('Привет от API Notedly!');
});

app.listen(port, () => {
  console.log(\`Сервер успешно запущен по адресу http://localhost:\${port}\`);
});</code></pre>
</div>

<h2>2. Концепция промежуточного ПО (Middleware)</h2>
<p>
  Вся архитектура Express строится на цепочке промежуточных функций-обработчиков (middleware), которые имеют доступ к объекту запроса (<code class="inline-code">req</code>), объекту ответа (<code class="inline-code">res</code>) и функции перехода <code class="inline-code">next()</code>.
</p>

<div class="callout tip">
  <div class="callout-title">💡 Управление конфигурацией через dotenv</div>
  <p>Никогда не хардкодьте секретные ключи, токены и порты в исходном коде. Всегда выносите их в файл <code class="inline-code">.env</code> и подключайте через библиотеку <code class="inline-code">dotenv</code>, добавляя <code class="inline-code">.env</code> в <code class="inline-code">.gitignore</code>.</p>
</div>`,
      "quiz": [
        {
          "question": "Какую сигнатуру имеет стандартная функция промежуточного ПО (middleware) в Express?",
          "options": [
            "(req, res, next) => { ... }",
            "(data, callback) => { ... }",
            "(event, emit) => { ... }",
            "(input, output) => { ... }"
          ],
          "correct": 0,
          "explanation": "Middleware Express принимает объект запроса req, ответа res и функцию next() для передачи управления следующему обработчику."
        },
        {
          "question": "Почему файл .env необходимо обязательно добавлять в список .gitignore?",
          "options": [
            "Чтобы не скомпрометировать конфиденциальные секретные ключи, пароли баз данных и токены в публичном репозитории.",
            "Чтобы файл не занимал место на жестком диске.",
            "Потому что Git не поддерживает файлы с точкой в начале.",
            "Для ускорения сборки Docker-образа."
          ],
          "correct": 0,
          "explanation": "Файл .env содержит переменные локального окружения и секреты продакшена, которые должны храниться изолированно."
        },
        {
          "question": "С помощью какого метода сервер Express начинает прослушивать входящие HTTP-соединения?",
          "options": [
            "app.listen(port, callback)",
            "app.run(port)",
            "app.serve()",
            "app.bind(port)"
          ],
          "correct": 0,
          "explanation": "Метод app.listen запускает HTTP-сервер на указанном порту."
        }
      ]
    },
    {
      "num": 4,
      "title": "Глава 4. Наш первый GraphQL API",
      "subtitle": "Подключение Apollo Server, интеграция с Express, резолверы запросов и мутаций, и работа с GraphQL Playground.",
      "minutes": 14,
      "contentHtml": `<h2>1. Интеграция Apollo Server с Express</h2>
<p>
  Для реализации GraphQL-слоя в приложении Node.js используется пакет <code class="inline-code">apollo-server-express</code>. Он монтирует маршрут GraphQL в уже существующий Express-сервер:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · Настройка Apollo Server</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Описание схемы типов
const typeDefs = gql\`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String!
    notes: [Note!]!
  }

  type Mutation {
    newNote(content: String!): Note!
  }
\`;

// База данных заметок в оперативной памяти (для старта)
let notes = [
  { id: '1', content: 'Первая заметка', author: 'Адам Скотт' }
];

// Резолверы — функции, возвращающие данные для полей схемы
const resolvers = {
  Query: {
    hello: () => 'Привет, мир GraphQL!',
    notes: () => notes
  },
  Mutation: {
    newNote: (parent, args) => {
      const note = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Аноним'
      };
      notes.push(note);
      return note;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app, path: '/api' });</code></pre>
</div>

<h2>2. Что такое резолверы (Resolvers)?</h2>
<p>
  Схема GraphQL описывает форму данных, но ничего не знает о том, откуда их брать. <b>Резолвер</b> — это функция, которая знает, как получить данные для конкретного поля (из базы данных, стороннего API или микросервиса).
</p>`,
      "quiz": [
        {
          "question": "Какую роль в архитектуре GraphQL выполняют функции-резолверы (resolvers)?",
          "options": [
            "Они содержат исполняемый код, который извлекает или изменяет реальные данные для полей, объявленных в схеме GraphQL.",
            "Они шифруют сетевой трафик между клиентом и сервером.",
            "Они компилируют GraphQL схему в бинарный код.",
            "Они преобразуют SQL-запросы в JSON."
          ],
          "correct": 0,
          "explanation": "Каждое поле схемы связывается с функцией-резолвером, возвращающей данные для этого поля."
        },
        {
          "question": "Какая операция в GraphQL используется для изменения или создания данных на сервере?",
          "options": [
            "Mutation",
            "Query",
            "Subscription",
            "Update"
          ],
          "correct": 0,
          "explanation": "Операции чтения выражаются через Query, а операции записи/изменения — через Mutation."
        },
        {
          "question": "Как называется интерактивная веб-среда в браузере для тестирования GraphQL запросов и просмотра документации схемы?",
          "options": [
            "GraphQL Playground / Apollo Studio",
            "Postman Runner",
            "Swagger UI",
            "Redoc"
          ],
          "correct": 0,
          "explanation": "Apollo Server по умолчанию предоставляет GraphQL Playground/Studio для исследования схемы и выполнения запросов."
        }
      ]
    },
    {
      "num": 5,
      "title": "Глава 5. База данных: интеграция MongoDB и Mongoose",
      "subtitle": "NoSQL базы данных, установка соединения, модели и схемы Mongoose, а также миграция резолверов на базу данных.",
      "minutes": 13,
      "contentHtml": `<h2>1. Почему NoSQL и MongoDB?</h2>
<p>
  Документоориентированная СУБД <b>MongoDB</b> идеально гармонирует со стеком JavaScript: данные в ней хранятся в формате BSON (двоичный аналог JSON). Документ заметки естественно мапится на объект JS без сложного реляционного сопоставления таблиц.
</p>

<h2>2. Определение моделей данных через Mongoose</h2>
<p>
  Библиотека <b>Mongoose</b> предоставляет строгую валидацию схем на уровне приложения и удобный ODM (Object Document Mapper):
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · src/models/note.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Заметка не может быть пустой']
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // Автоматически добавляет createdAt и updatedAt
  }
);

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;</code></pre>
</div>

<h2>3. Подключение базы данных в контекст GraphQL</h2>
<p>
  Для доступа к моделям внутри любых резолверов, объекты моделей Mongoose внедряются в <b>контекст (context)</b> Apollo Server. Это устраняет жесткую связность и облегчает тестирование.
</p>`,
      "quiz": [
        {
          "question": "В каком формате документы хранятся внутри базы данных MongoDB?",
          "options": [
            "BSON (двоичный формат сериализации JSON-документов).",
            "Табличные строки с фиксированными столбцами SQL.",
            "XML-файлы.",
            "Плоские CSV-таблицы."
          ],
          "correct": 0,
          "explanation": "BSON расширяет модель JSON, добавляя типы данных даты, бинарных массивов и ObjectId."
        },
        {
          "question": "Что обеспечивает опция { timestamps: true } в схеме Mongoose?",
          "options": [
            "Автоматическое добавление и обновление полей createdAt и updatedAt в документе при сохранении.",
            "Ограничение времени жизни документа в 24 часа.",
            "Синхронизацию с атомными часами.",
            "Преобразование миллисекунд в секунды."
          ],
          "correct": 0,
          "explanation": "Mongoose автоматически проставляет время создания и последнего редактирования записи."
        },
        {
          "question": "Как принято передавать доступ к моделям базы данных в функции-резолверы Apollo Server?",
          "options": [
            "Через объект контекста (context) Apollo Server, доступный в каждом резолвере третьим аргументом.",
            "Через глобальную переменную window.",
            "Через куки HTTP-запроса.",
            "Через заголовки браузера."
          ],
          "correct": 0,
          "explanation": "Контекст (context) — стандартный механизм Apollo Server для передачи моделей, сессий и пользователя в резолверы."
        }
      ]
    },
    {
      "num": 6,
      "title": "Глава 6. Операции CRUD",
      "subtitle": "Полная реализация Create, Read, Update, Delete для заметок с использованием методов Mongoose и GraphQL мутаций.",
      "minutes": 13,
      "contentHtml": `<h2>1. Реализация полного жизненного цикла заметок</h2>
<p>
  В этой главе сервис Notedly получает полноценную функциональность CRUD (Создание, Чтение, Обновление, Удаление):
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · src/resolvers/mutation.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>module.exports = {
  // Создание
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: 'Адам Скотт'
    });
  },

  // Обновление
  updateNote: async (parent, { id, content }, { models }) => {
    return await models.Note.findOneAndUpdate(
      { _id: id },
      { $set: { content } },
      { new: true } // Вернуть уже обновленный документ
    );
  },

  // Удаление
  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndDelete({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  }
};</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Что означает опция { new: true } при вызове Mongoose-метода findOneAndUpdate?",
          "options": [
            "Метод вернет обновленный документ после применения изменений, а не его старую версию.",
            "Создаст новый документ, если старый не найден.",
            "Удалит старый документ из кэша.",
            "Обновит номер версии схемы."
          ],
          "correct": 0,
          "explanation": "По умолчанию findOneAndUpdate возвращает документ до модификации; флаг new: true возвращает актуальную версию."
        },
        {
          "question": "Какой скалярный тип GraphQL используется для уникальных идентификаторов сущностей (id)?",
          "options": [
            "ID",
            "String",
            "UUID",
            "Hash"
          ],
          "correct": 0,
          "explanation": "Скалярный тип ID сериализуется в строку, но семантически указывает клиенту, что поле является уникальным ключом."
        },
        {
          "question": "Как обработать ошибку отсутствия записи в базе данных внутри резолвера чтения note(id)?",
          "options": [
            "Выбросить исключение ApolloError/UserInputError или вернуть null, если поле в схеме объявлено как nullable.",
            "Перезагрузить процесс Node.js.",
            "Вернуть пустой массив строк.",
            "Отправить код 302 редирект."
          ],
          "correct": 0,
          "explanation": "В GraphQL нормальным способом сигнализировать об отсутствии nullable сущности является возврат null или типизированная ошибка."
        }
      ]
    },
    {
      "num": 7,
      "title": "Глава 7. Учетные записи пользователей и аутентификация",
      "subtitle": "Модели пользователей, хэширование паролей с bcrypt, генерация и проверка токенов JWT, защита резолверов.",
      "minutes": 15,
      "contentHtml": `<h2>1. Безопасность: никаких паролей в открытом виде</h2>
<p>
  Хранить пароли в открытом виде — преступление против безопасности. Мы используем стойкую функцию формирования ключа <b>bcrypt</b> с генерацией соли:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · src/models/user.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Middleware Mongoose: хэшируем пароль перед сохранением
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});</code></pre>
</div>

<h2>2. Авторизация на основе JSON Web Token (JWT)</h2>
<p>
  В мобильных и современных веб-приложениях аутентификация строится без серверных сессий на базе JWT-токенов:
</p>
<ol>
  <li>Клиент отправляет логин и пароль в мутацию <code class="inline-code">signIn</code>.</li>
  <li>Сервер проверяет хэш пароля и возвращает подписанный JWT-токен.</li>
  <li>Клиент передает токен в заголовке <code class="inline-code">Authorization: Bearer &lt;TOKEN&gt;</code> в каждом последующем запросе.</li>
</ol>`,
      "quiz": [
        {
          "question": "Почему для хэширования паролей используется bcrypt с солью, а не обычные хэш-функции вроде MD5 или SHA-256?",
          "options": [
            "bcrypt медленный по дизайну и использует соль, защищая от атак по радужным таблицам и подбора на GPU.",
            "bcrypt автоматически отправляет пароль в базу данных.",
            "SHA-256 запрещен стандартами безопасности веб.",
            "MD5 слишком длинный для строк базы данных."
          ],
          "correct": 0,
          "explanation": "bcrypt спроектирован так, чтобы требовать вычислительных ресурсов, делая брутфорс миллионов паролей невозможным."
        },
        {
          "question": "Из каких трех частей состоит строка токена JSON Web Token (JWT)?",
          "options": [
            "Заголовок (Header), Полезная нагрузка (Payload) и Цифровая подпись (Signature), разделенные точками.",
            "Имя пользователя, пароль и дата.",
            "IP-адрес, токен сессии и куки.",
            "Публичный ключ, приватный ключ и хэш."
          ],
          "correct": 0,
          "explanation": "Формат JWT: Header.Payload.Signature, закодированные в base64url."
        },
        {
          "question": "В каком HTTP-заголовке клиент традиционно передает JWT-токен на сервер?",
          "options": [
            "Authorization: Bearer <TOKEN>",
            "X-JWT-Token: <TOKEN>",
            "Authentication: User <TOKEN>",
            "Cookie: jwt=<TOKEN>"
          ],
          "correct": 0,
          "explanation": "Стандарт RFC 6750 определяет заголовок 'Authorization: Bearer <token>'."
        }
      ]
    },
    {
      "num": 8,
      "title": "Глава 8. Действия пользователя и пагинация",
      "subtitle": "Связывание заметок с пользователем, вложенные резолверы отношений, добавление в избранное и курсорная пагинация.",
      "minutes": 14,
      "contentHtml": `<h2>1. Резолверы полей отношений (Field Resolvers)</h2>
<p>
  GraphQL позволяет описывать связанные графы объектов. Если поле заметки <code class="inline-code">author</code> является типом <code class="inline-code">User</code>, мы описываем вложенный резолвер:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · src/resolvers/note.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>module.exports = {
  // Когда GraphQL запрашивает автора конкретной заметки:
  author: async (note, args, { models }) => {
    return await models.User.findById(note.author);
  },
  // Вычисляемое поле: кто добавил заметку в избранное
  favoritedBy: async (note, args, { models }) => {
    return await models.User.find({ _id: { $in: note.favoritedBy } });
  }
};</code></pre>
</div>

<h2>2. Курсорная пагинация ленты (Cursor-Based Pagination)</h2>
<p>
  Традиционная пагинация по смещению (<code class="inline-code">offset/limit</code>) работает плохо в динамических лентах: при добавлении новых заметок посты дублируются или пропускаются. Мы реализуем <b>курсорную пагинацию</b> по уникальному ID последнего полученного элемента.
</p>`,
      "quiz": [
        {
          "question": "В чем преимущество курсорной пагинации (cursor-based) перед офсетной (offset/limit) в мобильных бесконечных лентах?",
          "options": [
            "Курсор гарантирует стабильность выдачи при добавлении новых постов в начало ленты и эффективно использует индексы базы данных.",
            "Курсорная пагинация автоматически удаляет дублирующиеся заметки из базы.",
            "Офсетная пагинация запрещена в MongoDB.",
            "Курсорная пагинация работает без подключения к интернету."
          ],
          "correct": 0,
          "explanation": "Курсорная пагинация опирается на точный указатель (ID или timestamp), исключая сдвиг элементов ленты."
        },
        {
          "question": "Что представляет собой первый аргумент parent в функции-резолвере GraphQL?",
          "options": [
            "Объект родительского типа, разрешенный предыдущим резолвером в дереве запроса.",
            "Объект глобальной базы данных.",
            "HTTP-запрос от клиента.",
            "Корневой элемент HTML страницы."
          ],
          "correct": 0,
          "explanation": "parent (или root) передает результат разрешения родительского поля во вложенные резолверы."
        },
        {
          "question": "Как предотвратить изменение или удаление чужой заметки пользователем?",
          "options": [
            "В резолвере updateNote проверять соответствие ID автора заметки текущему авторизованному пользователю из context.",
            "Отключить мутацию deleteNote.",
            "Сделать все заметки общедоступными.",
            "Шифровать текст заметки приватным ключом."
          ],
          "correct": 0,
          "explanation": "Проверка авторизации на уровне бизнес-логики резолвера сопоставляет note.author с user.id из токена."
        }
      ]
    },
    {
      "num": 9,
      "title": "Глава 9. Детали архитектуры API",
      "subtitle": "Ограничение сложности запросов, глубина вложенности, защита от DoS, ограничение частоты запросов (rate limiting) и CORS.",
      "minutes": 12,
      "contentHtml": `<h2>1. Уязвимость GraphQL: циклические запросы и атаки глубиной</h2>
<p>
  Поскольку GraphQL позволяет запрашивать вложенные связи, злоумышленник может отправить циклический запрос огромной глубины, который положит базу данных:
</p>
<div class="callout warning">
  <div class="callout-title">⚠️ Опасный циклический запрос</div>
  <p><code class="inline-code">query { user { notes { author { notes { author { notes ... } } } } } }</code></p>
</div>

<h2>2. Защитные механизмы</h2>
<p>
  Для защиты продакшен API подключаются плагины валидации:
</p>
<ul>
  <li><b>graphql-depth-limit:</b> ограничивает максимальную глубину вложенности запроса (например, не глубже 5 уровней).</li>
  <li><b>graphql-validation-complexity:</b> вычисляет «стоимость» запроса по количеству полей и блокирует слишком тяжелые операции.</li>
  <li><b>helmet & cors:</b> обеспечивают базовую безопасность HTTP-заголовков Express.</li>
</ul>`,
      "quiz": [
        {
          "question": "Какую угрозу нейтрализует библиотека graphql-depth-limit?",
          "options": [
            "Блокирует вредоносные циклические запросы с чрезмерной глубиной вложенности, предотвращая исчерпание ресурсов сервера (DoS).",
            "Ограничивает максимальный размер загружаемых файлов до 1 МБ.",
            "Запрещает использовать вложенные массивы в MongoDB.",
            "Блокирует спам-комментарии."
          ],
          "correct": 0,
          "explanation": "Ограничение глубины дерева запроса не позволяет злоумышленникам строить рекурсивные цепочки связей."
        },
        {
          "question": "Для чего в Express используется middleware cors?",
          "options": [
            "Для управления политикой Cross-Origin Resource Sharing, разрешая веб-клиентам с других доменов обращаться к API.",
            "Для сжатия картинок на сервере.",
            "Для кэширования ответов в Redis.",
            "Для автоматического перенаправления на HTTPS."
          ],
          "correct": 0,
          "explanation": "CORS сообщает браузеру, каким внешним источникам (origins) разрешено отправлять запросы к данному API."
        },
        {
          "question": "Какую функцию выполняет пакет helmet в Express приложениях?",
          "options": [
            "Устанавливает защитные HTTP-заголовки (X-Content-Type-Options, X-Frame-Options, CSP) для снижения рисков XSS и кликджекинга.",
            "Шифрует пароли в базе данных.",
            "Защищает процессор от перегрева.",
            "Проверяет типы TypeScript."
          ],
          "correct": 0,
          "explanation": "Helmet настраивает заголовки безопасности HTTP, закрывая распространенные веб-уязвимости."
        }
      ]
    },
    {
      "num": 10,
      "title": "Глава 10. Развертывание API в облачную инфраструктуру",
      "subtitle": "Облачные базы данных MongoDB Atlas, переменные окружения на хостинге, развертывание на Heroku/Render и проверка продакшена.",
      "minutes": 12,
      "contentHtml": `<h2>1. Облачная база данных MongoDB Atlas</h2>
<p>
  В продакшене база данных выносится на специализированный управляемый кластер <b>MongoDB Atlas</b>. Он обеспечивает автоматическое реплицирование, резервное копирование и безопасность по белому списку IP-адресов.
</p>

<h2>2. Подготовка к развертыванию</h2>
<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JSON · Конфигурация запуска для облака</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>{
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "start": "node src/index.js"
  }
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Почему в облачном развертывании (Render, Heroku, Railway) порт сервера задается как process.env.PORT?",
          "options": [
            "Облачный провайдер динамически выделяет свободный порт для контейнера и пробрасывает его в переменную среды PORT.",
            "Порт 4000 заблокирован на уровне межсетевого экрана.",
            "Node.js не поддерживает жестко заданные порты.",
            "Это требование протокола IPv6."
          ],
          "correct": 0,
          "explanation": "Хостинг-платформы маршрутизируют внешний веб-трафик на динамический внутренний порт, указанный в process.env.PORT."
        },
        {
          "question": "Что представляет собой сервис MongoDB Atlas?",
          "options": [
            "Полностью управляемую облачную платформу баз данных MongoDB с кластеризацией и мониторингом.",
            "Локальный графический редактор схем.",
            "Инструмент для резервного копирования на жесткий диск.",
            "Плагин для VS Code."
          ],
          "correct": 0,
          "explanation": "MongoDB Atlas — официальный облачный сервис Database-as-a-Service от создателей MongoDB."
        },
        {
          "question": "Какая секция package.json указывает облачному серверу совместимую версию среды исполнения?",
          "options": [
            "engines: { \"node\": \">=18.0.0\" }",
            "runtime: \"node-18\"",
            "platform: \"linux\"",
            "compatibility: { \"v8\": true }"
          ],
          "correct": 0,
          "explanation": "Секция engines сообщает npm и хостингу, какая версия Node.js требуется при сборке контейнера."
        }
      ]
    },
    {
      "num": 11,
      "title": "Глава 11. Интерфейсы пользователей и философия React",
      "subtitle": "Компонентная модель, декларативный рендеринг, виртуальный DOM, состояние и однонаправленный поток данных.",
      "minutes": 11,
      "contentHtml": `<h2>1. Революция декларативного интерфейса</h2>
<p>
  В императивном подходе (jQuery, чистый DOM) разработчик вручную пишет пошаговые инструкции изменения интерфейса: <code class="inline-code">document.createElement()</code>, <code class="inline-code">element.appendChild()</code>.
  В декларативном подходе <b>React</b> интерфейс является чистой функцией от текущего состояния:
</p>
<div class="callout rule">
  <div class="callout-title">⚖️ Формула React</div>
  <p><code class="inline-code">UI = f(State)</code>. При изменении состояния React сам производит сверку через Virtual DOM и точечно обновляет только изменившиеся узлы реального дерева документа.</p>
</div>`,
      "quiz": [
        {
          "question": "В чем главное преимущество декларативного рендеринга React перед императивными манипуляциями с DOM?",
          "options": [
            "Разработчик описывает, как интерфейс должен выглядеть для заданного состояния, а React сам эффективно обновляет DOM.",
            "React код компилируется в машинный код процессора.",
            "React не использует браузер для отображения.",
            "В React запрещено использовать функции."
          ],
          "correct": 0,
          "explanation": "Декларативность снимает с программиста бремя ручного отслеживания добавлений, удалений и изменений классов в DOM."
        },
        {
          "question": "Что такое синтаксис JSX в экосистеме React?",
          "options": [
            "Синтаксическое расширение JavaScript, позволяющее описывать структуру HTML-подобных тегов прямо внутри JS кода.",
            "Отдельный язык программирования, разработанный Google.",
            "Формат упаковки CSS-стилей.",
            "Библиотека для выполнения сетевых запросов."
          ],
          "correct": 0,
          "explanation": "JSX транспилируется сборщиком в обычные вызовы функций React.createElement()."
        },
        {
          "question": "Как данные передаются между компонентами в React?",
          "options": [
            "Однонаправленно сверху вниз от родительских компонентов к дочерним через пропсы (props).",
            "Снизу вверх через глобальные события DOM.",
            "Случайным образом через шину сообщений.",
            "Через файлы конфигурации."
          ],
          "correct": 0,
          "explanation": "В React действует строгий однонаправленный поток данных (Unidirectional Data Flow)."
        }
      ]
    },
    {
      "num": 12,
      "title": "Глава 12. Построение веб-клиента: роутинг и страницы",
      "subtitle": "Одностраничные приложения (SPA), настройка React Router v5/v6, макеты Layout, навигация и страницы ленты.",
      "minutes": 13,
      "contentHtml": `<h2>1. Архитектура Single Page Application (SPA)</h2>
<p>
  В SPA вся страница загружается один раз. Переходы между экранами происходят без перезагрузки браузера благодаря перехвату History API библиотекой <b>React Router</b>:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JSX · src/pages/index.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/mynotes" component={MyNotes} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/note/:id" component={NotePage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Pages;</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Почему при клике по ссылке Link в приложении React Router браузер не перезагружает страницу?",
          "options": [
            "Link перехватывает клик, предотвращает стандартное поведение браузера (e.preventDefault()) и обновляет URL через HTML5 History API.",
            "Страница кэшируется в Service Worker.",
            "Браузер отключает сетевой стек.",
            "React Router загружает страницы через iframe."
          ],
          "correct": 0,
          "explanation": "Компонент Link использует pushState/replaceState, позволяя React мгновенно подменить активный компонент без перезагрузки."
        },
        {
          "question": "Для чего в веб-приложениях используется общий компонент-макет (Layout)?",
          "options": [
            "Для размещения общих постоянных элементов (шапка, сайдбар, футер) и вывода динамического контента страницы в children.",
            "Для подключения к базе данных.",
            "Для тестирования верстки.",
            "Для генерации favicon."
          ],
          "correct": 0,
          "explanation": "Layout инкапсулирует общую оболочку сайта, переиспользуемую на всех страницах."
        },
        {
          "question": "Как извлечь динамический параметр :id из URL (например, /note/:id) внутри функционального компонента?",
          "options": [
            "С помощью хука useParams().",
            "Через window.location.search.",
            "Через свойство document.id.",
            "С помощью хука useId()."
          ],
          "correct": 0,
          "explanation": "Хук useParams() возвращает объект с парами ключ-значение параметров текущего маршрута."
        }
      ]
    },
    {
      "num": 13,
      "title": "Глава 13. Стилевое оформление приложения с Styled Components",
      "subtitle": "Подход CSS-in-JS, стилизованные компоненты, глобальные стили, темы и адаптивная верстка карточек заметок.",
      "minutes": 12,
      "contentHtml": `<h2>1. Преимущества CSS-in-JS</h2>
<p>
  Библиотека <b>styled-components</b> связывает стили напрямую с компонентами, используя шаблонные литералы JavaScript:
</p>
<ul>
  <li><b>Полная изоляция:</b> уникальные автоматически сгенерированные классы исключают коллизии имен в CSS.</li>
  <li><b>Динамические стили:</b> цвет или отступы могут зависеть от пропсов компонента (<code class="inline-code">props.active ? 'blue' : 'gray'</code>).</li>
  <li><b>Удаление мертвого кода:</b> если компонент удаляется из проекта, его стили автоматически удаляются вместе с ним.</li>
</ul>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · src/components/Button.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>import styled from 'styled-components';

export const Button = styled.button\`
  display: block;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: \${props => (props.danger ? '#ef4444' : '#3b82f6')};
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
\`;</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какую ключевую проблему классического CSS решает подход CSS-in-JS (styled-components)?",
          "options": [
            "Глобальную область видимости селекторов и конфликты имен классов в больших приложениях.",
            "Медленную скорость загрузки шрифтов.",
            "Отсутствие поддержки анимаций в CSS.",
            "Необходимость использования браузера."
          ],
          "correct": 0,
          "explanation": "styled-components генерирует уникальные хэшированные имена классов, полностью изолируя стили компонентов."
        },
        {
          "question": "Как применить глобальные стили сброса (CSS reset) с помощью styled-components?",
          "options": [
            "Использовать функцию createGlobalStyle и вставить полученный компонент в корень приложения.",
            "Подключить глобальный файл style.css через тег link.",
            "Написать стили в объекте window.",
            "Применить стили к тегу html через JavaScript DOM API."
          ],
          "correct": 0,
          "explanation": "createGlobalStyle создает компонент, который внедряет глобальные правила стилей при монтировании."
        },
        {
          "question": "Как изменить цвет стилизованного компонента на основе переданного пропса?",
          "options": [
            "Использовать интерполяцию функции: ${props => props.primary ? 'blue' : 'gray'}",
            "Написать отдельный CSS-класс вручную.",
            "Использовать !important в селекторе.",
            "Пропсы нельзя передавать в стили."
          ],
          "correct": 0,
          "explanation": "Внутри шаблонной строки styled-components можно вызывать функции, получающие текущие props компонента."
        }
      ]
    },
    {
      "num": 14,
      "title": "Глава 14. Работа с Apollo Client",
      "subtitle": "Подключение ApolloProvider, хуки useQuery и useMutation, нормализованный кэш в памяти и обработка состояний загрузки.",
      "minutes": 14,
      "contentHtml": `<h2>1. Подключение Apollo Client к React</h2>
<p>
  <b>Apollo Client</b> — мощная библиотека для работы с GraphQL на фронтенде, включающая интеллектуальный нормализованный кэш:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · src/App.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>
);</code></pre>
</div>

<h2>2. Декларативная выборка данных через хук useQuery</h2>
<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JSX · src/pages/home.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>import React from 'react';
import { useQuery, gql } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';

const GET_NOTES = gql\`
  query GetNotes {
    notes {
      id
      content
      favoriteCount
      author {
        id
        username
      }
    }
  }
\`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_NOTES);

  if (loading) return <p>Загрузка заметок...</p>;
  if (error) return <p>Ошибка получения данных: {error.message}</p>;

  return <NoteFeed notes={data.notes} />;
};</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какие три главных свойства возвращает React-хук useQuery в Apollo Client?",
          "options": [
            "{ data, loading, error }",
            "{ response, status, send }",
            "{ result, done, fail }",
            "{ payload, isPending, reject }"
          ],
          "correct": 0,
          "explanation": "data содержит результат успешного запроса, loading сообщает о статусе ожидания, а error — об ошибках сети или GraphQL."
        },
        {
          "question": "Какую роль выполняет InMemoryCache в Apollo Client?",
          "options": [
            "Нормализует полученные объекты по их ID и сохраняет в оперативной памяти, избавляя от повторных сетевых запросов.",
            "Сохраняет данные на жесткий диск в формате SQLite.",
            "Сжимает HTML-код страницы.",
            "Очищает куки пользователя."
          ],
          "correct": 0,
          "explanation": "Нормализованный кэш связывает обновленные данные с компонентами по уникальному идентификатору (типа Type:id)."
        },
        {
          "question": "Для чего вокруг дерева компонентов монтируется <ApolloProvider client={client}>?",
          "options": [
            "Для предоставления инстанса Apollo Client дочерним компонентам через контекст React.",
            "Для подключения Google Analytics.",
            "Для блокировки спама.",
            "Для инициализации CSS стилей."
          ],
          "correct": 0,
          "explanation": "ApolloProvider использует React Context для передачи экземпляра клиента во все хуки useQuery и useMutation."
        }
      ]
    },
    {
      "num": 15,
      "title": "Глава 15. Аутентификация и состояние веб-клиента",
      "subtitle": "Формы регистрации и входа, сохранение токена в localStorage, заголовок Authorization и локальное состояние кэша.",
      "minutes": 14,
      "contentHtml": `<h2>1. Поток аутентификации на фронтенде</h2>
<p>
  Когда пользователь отправляет форму входа:
</p>
<ol>
  <li>Срабатывает мутация <code class="inline-code">useMutation(SIGNIN_USER)</code>.</li>
  <li>Сервер возвращает JWT-токен.</li>
  <li>Клиент сохраняет токен: <code class="inline-code">localStorage.setItem('token', token)</code>.</li>
  <li>Кэш обновляет локальное состояние: пользователь считается авторизованным.</li>
</ol>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · Автоматическая передача токена</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? \`Bearer \${token}\` : ''
    }
  };
});</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Где в веб-приложении обычно сохраняется полученный от API токен авторизации (JWT)?",
          "options": [
            "В localStorage (или httpOnly Cookie) браузера для сохранения сессии между перезагрузками страницы.",
            "В файле на рабочем столе пользователя.",
            "В истории посещений браузера.",
            "В реестре операционной системы."
          ],
          "correct": 0,
          "explanation": "localStorage позволяет восстанавливать сессию пользователя при открытии новой вкладки."
        },
        {
          "question": "С помощью какой утилиты Apollo Client динамически прикрепляет заголовок Authorization к каждому запросу?",
          "options": [
            "authLink (созданный через setContext).",
            "Хука useEffect в каждом компоненте.",
            "Ручного вызова fetch().",
            "Глобального таймера setInterval()."
          ],
          "correct": 0,
          "explanation": "Apollo Link цепочка middleware (setContext) перехватывает операцию перед отправкой и добавляет заголовок."
        },
        {
          "question": "Что необходимо сделать при выходе пользователя из системы (Sign Out)?",
          "options": [
            "Удалить токен из хранилища (localStorage.removeItem('token')) и сбросить кэш клиента (client.resetStore()).",
            "Удалить браузер.",
            "Перезагрузить операционную систему.",
            "Отправить команду DROP DATABASE."
          ],
          "correct": 0,
          "explanation": "Удаление токена и вызов resetStore() очищает приватные данные из оперативной памяти."
        }
      ]
    },
    {
      "num": 16,
      "title": "Глава 16. Операции CRUD в пользовательском интерфейсе",
      "subtitle": "Создание заметок, форма редактирования, удаление заметок, оптимистичные обновления и инвалидация кэша.",
      "minutes": 13,
      "contentHtml": `<h2>1. Создание и редактирование заметок</h2>
<p>
  При изменении данных через мутации важно своевременно обновить интерфейс. Apollo Client предлагает два подхода:
</p>
<ul>
  <li><b>refetchQueries:</b> принудительно перезапросить список заметок после успешной мутации.</li>
  <li><b>Прямое обновление кэша (cache.modify):</b> мгновенно добавить новую заметку в локальный кэш без дополнительного сетевого запроса.</li>
</ul>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JSX · Редактирование заметки</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>const [editNote] = useMutation(EDIT_NOTE, {
  onCompleted: () => {
    history.push(\`/note/\${id}\`);
  }
});</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Для чего в хуке useMutation используется опция refetchQueries?",
          "options": [
            "Для автоматического повторного выполнения указанных запросов после завершения мутации для обновления данных на экране.",
            "Для отмены сетевого запроса при медленном интернете.",
            "Для перенаправления на главную страницу.",
            "Для очистки истории браузера."
          ],
          "correct": 0,
          "explanation": "refetchQueries перезапрашивает свежие списки с сервера, гарантируя актуальность данных."
        },
        {
          "question": "Что такое оптимистичное обновление интерфейса (Optimistic UI)?",
          "options": [
            "Мгновенное обновление UI еще до получения ответа от сервера в предположении, что мутация завершится успешно.",
            "Показ позитивных анимаций пользователю.",
            "Автоматическое исправление ошибок пользователя.",
            "Игнорирование ошибок сети."
          ],
          "correct": 0,
          "explanation": "Optimistic UI создает ощущение мгновенного отклика приложения: лайк загорается сразу, а запрос уходит в фоне."
        },
        {
          "question": "Как защитить маршрут /new-note от посещения неавторизованными пользователями?",
          "options": [
            "Обернуть Route в кастомный компонент PrivateRoute, проверяющий наличие токена и делающий редирект на /signin.",
            "Удалить кнопку создания заметки из HTML.",
            "Заблокировать порт 4000.",
            "Вывести alert с предупреждением."
          ],
          "correct": 0,
          "explanation": "Компонент PrivateRoute проверяет авторизацию и перенаправляет гостей на страницу входа."
        }
      ]
    },
    {
      "num": 17,
      "title": "Глава 17. Развертывание клиентского веб-приложения",
      "subtitle": "Сборка продакшен бандла, хостинг статики (Netlify, Vercel), настройка правил редиректов для клиентского роутинга.",
      "minutes": 11,
      "contentHtml": `<h2>1. Сборка статических ассетов</h2>
<p>
  Команда сборки (<code class="inline-code">npm run build</code>) компилирует JSX, минифицирует JavaScript и сжимает стили в папку <code class="inline-code">dist</code> или <code class="inline-code">build</code>.
</p>

<h2>2. Подводный камень клиентского роутинга (SPA 404 Problem)</h2>
<p>
  Когда пользователь переходит по ссылке <code class="inline-code">/note/123</code> напрямую или обновляет страницу по F5, веб-сервер ищет физический файл <code class="inline-code">note/123/index.html</code> и отдает ошибку 404.
</p>
<div class="callout warning">
  <div class="callout-title">⚠️ Правило перенаправления для SPA</div>
  <p>Веб-сервер обязан перенаправлять <b>все запросы</b> на главный <code class="inline-code">index.html</code> (например, через файл <code class="inline-code">_redirects</code> на Netlify: <code class="inline-code">/* /index.html 200</code>), чтобы клиентский React Router сам отрисовал нужную страницу.</p>
</div>`,
      "quiz": [
        {
          "question": "Почему при обновлении страницы по прямой ссылке /favorites в SPA может возникнуть ошибка 404 Not Found на обычном веб-сервере?",
          "options": [
            "Сервер ищет физический файл favorites.html на диске вместо того, чтобы отдать index.html и позволить React Router обработать путь.",
            "У пользователя истек токен авторизации.",
            "В браузере отключен JavaScript.",
            "База данных не отвечает."
          ],
          "correct": 0,
          "explanation": "В SPA существует только один физический файл index.html, поэтому все маршруты должны перенаправляться на него."
        },
        {
          "question": "Какую команду запускают для создания оптимизированного минифицированного продакшен-бандла веб-клиента?",
          "options": [
            "npm run build",
            "npm run start",
            "npm install --prod",
            "node bundle.js"
          ],
          "correct": 0,
          "explanation": "Скрипт build собирает, оптимизирует и минифицирует JS/CSS бандл."
        },
        {
          "question": "Какую директиву содержит файл _redirects для хостинга Netlify при публикации SPA?",
          "options": [
            "/* /index.html 200",
            "REDIRECT ALL TO INDEX",
            "rewrite / to /home",
            "fallback: true"
          ],
          "correct": 0,
          "explanation": "Правило '/* /index.html 200' указывает Netlify отдавать index.html со статусом 200 на любой запрос."
        }
      ]
    },
    {
      "num": 18,
      "title": "Глава 18. Создание десктопных приложений с помощью Electron",
      "subtitle": "Архитектура Electron: главный процесс (Main Process) и процесс визуализации (Renderer Process), BrowserWindow и безопасность.",
      "minutes": 12,
      "contentHtml": `<h2>1. Как устроен Electron</h2>
<p>
  Фреймворк <b>Electron</b> объединяет в одном приложении движок отображения <b>Chromium</b> и среду выполнения <b>Node.js</b>. Это позволяет писать десктопные интерфейсы на стандартных веб-технологиях (HTML/CSS/JS), имея при этом доступ к файловой системе и API операционной системы.
</p>

<div class="schema-box">
  <div class="schema-grid">
    <div class="schema-item blue">
      <strong>Главный процесс (Main Process)</strong>
      <p>Один на приложение. Чистый Node.js. Управляет жизненным циклом программы, системным меню, треем и окнами <code class="inline-code">BrowserWindow</code>.</p>
    </div>
    <div class="schema-item emerald">
      <strong>Процесс отрисовки (Renderer)</strong>
      <p>По одному на каждое открытое окно. Рендерит веб-страницу (React/HTML). Не должен иметь прямого доступа к Node.js ради безопасности.</p>
    </div>
  </div>
</div>

<h2>2. Минимальный каркас десктопного приложения</h2>
<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · main.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false, // Безопасность!
      contextIsolation: true
    }
  });

  win.loadURL('http://localhost:1234'); // Или локальный index.html
}

app.whenReady().then(createWindow);</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какие две ключевые технологии лежат в основе платформы Electron?",
          "options": [
            "Chromium (для отображения веб-интерфейса) и Node.js (для доступа к системным ресурсам ОС).",
            "Java Virtual Machine и WebAssembly.",
            "Python и GTK+.",
            "Docker и Nginx."
          ],
          "correct": 0,
          "explanation": "Electron упаковывает веб-браузер Chromium и среду Node.js в единый исполняемый десктопный пакет."
        },
        {
          "question": "В чем разница между Main Process и Renderer Process в Electron?",
          "options": [
            "Main процесс управляет окнами и системными вызовами ОС; Renderer процесс отображает веб-страницу внутри конкретного окна.",
            "Main процесс работает на сервере, а Renderer на клиенте.",
            "Renderer процесс запускается только в Windows.",
            "Main процесс отвечает только за звук."
          ],
          "correct": 0,
          "explanation": "Main процесс координирует все приложение, а Renderer изолированно отрисовывает HTML/JS."
        },
        {
          "question": "Почему настройки { nodeIntegration: false, contextIsolation: true } являются стандартом безопасности в Electron?",
          "options": [
            "Они предотвращают выполнение опасного системного кода злоумышленниками через XSS-уязвимости на загружаемой веб-странице.",
            "Они ускоряют запуск приложения.",
            "Они экономят место на диске.",
            "Без них Electron не скомпилируется."
          ],
          "correct": 0,
          "explanation": "Изоляция контекста защищает ОС от вредоносного JavaScript, не позволяя скриптам страницы вызвать require('fs')."
        }
      ]
    },
    {
      "num": 19,
      "title": "Глава 19. Интеграция веб-приложения и IPC в Electron",
      "subtitle": "Межпроцессное взаимодействие (IPC), мост контекста (contextBridge), предзагрузочные скрипты (preload.js) и нативные меню.",
      "minutes": 13,
      "contentHtml": `<h2>1. Безопасное межпроцессное взаимодействие (IPC)</h2>
<p>
  Для связи между интерфейсом и операционной системой используется механизм <b>Inter-Process Communication (IPC)</b> через предзагрузочный скрипт <code class="inline-code">preload.js</code>:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · preload.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>const { contextBridge, ipcRenderer } = require('electron');

// Безопасно открываем доступ только к определенным методам:
contextBridge.exposeInMainWorld('electronApi', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  onSaveNote: (callback) => ipcRenderer.on('save-note', callback)
});</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Как расшифровывается аббревиатура IPC в Electron и для чего она служит?",
          "options": [
            "Inter-Process Communication — механизм обмена сообщениями между главным процессом (Main) и процессами окон (Renderer).",
            "Internet Protocol Connection.",
            "Internal Package Compiler.",
            "Integrated Program Controller."
          ],
          "correct": 0,
          "explanation": "IPC позволяет безопасно передавать команды и события между изолированными процессами Electron."
        },
        {
          "question": "Для чего используется метод contextBridge.exposeInMainWorld() в preload-скрипте?",
          "options": [
            "Для безопасной передачи ограниченного набора API из Node.js в глобальный объект window веб-страницы.",
            "Для взлома защиты браузера.",
            "Для подключения Google Maps.",
            "Для трансляции экрана в интернет."
          ],
          "correct": 0,
          "explanation": "contextBridge создает защищенный мост, исключая утечку прототипов Node.js в контекст веб-страницы."
        },
        {
          "question": "Какой модуль Electron отвечает за создание нативного верхнего меню окна операционной системы?",
          "options": [
            "Menu (и MenuItem)",
            "SystemBar",
            "TopNav",
            "HeaderManager"
          ],
          "correct": 0,
          "explanation": "Модуль Menu позволяет создавать стандартные системные выпадающие меню ОС (Файл, Правка, Окно)."
        }
      ]
    },
    {
      "num": 20,
      "title": "Глава 20. Сборка, подпись и дистрибуция Electron приложения",
      "subtitle": "Инструмент electron-builder, генерация установщиков (.exe, .dmg, AppImage), цифровая подпись кода и автообновление.",
      "minutes": 11,
      "contentHtml": `<h2>1. Упаковка с помощью electron-builder</h2>
<p>
  Пакет <b>electron-builder</b> автоматически упаковывает ресурсы веб-приложения и исполняемые бинарные файлы в готовые дистрибутивы:
</p>
<ul>
  <li><b>Windows:</b> инсталляторы NSIS (<code class="inline-code">.exe</code>) и переносимые архивы.</li>
  <li><b>macOS:</b> образы <code class="inline-code">.dmg</code> и бандлы <code class="inline-code">.app</code> (требуют нотаризации Apple).</li>
  <li><b>Linux:</b> пакеты <code class="inline-code">.AppImage</code>, <code class="inline-code">.deb</code> и <code class="inline-code">.rpm</code>.</li>
</ul>`,
      "quiz": [
        {
          "question": "Какой инструмент является стандартом для сборки и упаковки дистрибутивов Electron-приложений?",
          "options": [
            "electron-builder (или electron-packager)",
            "Webpack",
            "Gulp",
            "Docker"
          ],
          "correct": 0,
          "explanation": "electron-builder автоматизирует компиляцию, подпись и создание установщиков под все популярные ОС."
        },
        {
          "question": "Зачем необходима цифровая подпись кода (Code Signing) для десктопных приложений?",
          "options": [
            "Чтобы операционные системы (Windows SmartScreen, macOS Gatekeeper) не блокировали запуск программы как неопознанной или вредоносной.",
            "Для шифрования текста заметок.",
            "Чтобы ускорить работу жесткого диска.",
            "Для уменьшения веса программы."
          ],
          "correct": 0,
          "explanation": "Сертификат разработчика подтверждает издателя программы и целостность бинарного файла."
        },
        {
          "question": "Какой формат дистрибутива является самодостаточным исполняемым файлом для большинства дистрибутивов Linux?",
          "options": [
            "AppImage",
            ".msi",
            ".pkg",
            ".apk"
          ],
          "correct": 0,
          "explanation": "Формат AppImage запускается на любом дистрибутиве Linux в один клик без установки системных пакетов."
        }
      ]
    },
    {
      "num": 21,
      "title": "Глава 21. Мобильные приложения на React Native и платформа Expo",
      "subtitle": "Архитектура React Native, виртуальный мост, нативные компоненты View/Text и запуск через Expo CLI.",
      "minutes": 13,
      "contentHtml": `<h2>1. В чем разница между WebView и React Native?</h2>
<p>
  В отличие от гибридных приложений прошлого (Cordova/PhoneGap), которые просто открывали сайт в мобильном браузере:
  <b>React Native рендерит настоящие нативные элементы управления операционной системы!</b>
</p>
<ul>
  <li>Тег <code class="inline-code">&lt;View&gt;</code> компилируется в <code class="inline-code">UIView</code> на iOS и <code class="inline-code">android.view.ViewGroup</code> на Android.</li>
  <li>Тег <code class="inline-code">&lt;Text&gt;</code> превращается в нативный <code class="inline-code">UILabel</code> или <code class="inline-code">TextView</code>.</li>
  <li>Анимации и скролл выполняются с плавностью 60–120 кадров в секунду без лагов веб-страницы.</li>
</ul>

<h2>2. Платформа Expo</h2>
<p>
  <b>Expo</b> — это мощный инструментарий вокруг React Native, который берет на себя компиляцию Xcode/Android Studio и позволяет тестировать приложение на реальном смартфоне через QR-код за считанные секунды.
</p>`,
      "quiz": [
        {
          "question": "Чем рендеринг в React Native отличается от отображения веб-страницы в мобильном браузере?",
          "options": [
            "React Native создает настоящие нативные UI-компоненты iOS (UIKit) и Android, а не эмулирует их внутри HTML WebView.",
            "React Native компилирует интерфейс в PDF файлы.",
            "React Native работает только в офлайн-режиме.",
            "Между ними нет разницы."
          ],
          "correct": 0,
          "explanation": "React Native использует нативные платформенные примитивы отображения, обеспечивая нативную плавность интерфейса."
        },
        {
          "question": "Какую главную задачу решает платформа Expo при мобильной разработке?",
          "options": [
            "Упрощает разработку и тестирование без необходимости локальной установки тяжелых сред Xcode и Android Studio на первых этапах.",
            "Предоставляет бесплатный сервер базы данных.",
            "Удаляет баги в коде.",
            "Создает рекламные кампании."
          ],
          "correct": 0,
          "explanation": "Expo берет на себя рутину нативной сборки и позволяет мгновенно тестировать код через приложение Expo Go."
        },
        {
          "question": "Какой компонент используется в React Native вместо привычного HTML тега <div>?",
          "options": [
            "<View>",
            "<Container>",
            "<Box>",
            "<Section>"
          ],
          "correct": 0,
          "explanation": "Базовым контейнером для разметки и стилизации в React Native является компонент <View>."
        }
      ]
    },
    {
      "num": 22,
      "title": "Глава 22. Оболочка мобильного приложения, табы и навигация",
      "subtitle": "Библиотека React Navigation, стековая навигация, нижняя панель вкладок (Bottom Tabs) и стили StyleSheet.",
      "minutes": 14,
      "contentHtml": `<h2>1. Навигация на смартфонах с React Navigation</h2>
<p>
  Мобильная навигация кардинально отличается от браузерной: здесь экраны накладываются друг на друга в виде стека карточек с плавными жестами смахивания (swipe back):
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JSX · Настройка табов и стека</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from './screens/Feed';
import NoteScreen from './screens/Note';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} options={{ title: 'Лента' }} />
      <Stack.Screen name="Note" component={NoteScreen} options={{ title: 'Заметка' }} />
    </Stack.Navigator>
  );
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Как работает стековая навигация (Stack Navigator) в мобильных приложениях?",
          "options": [
            "Новые экраны помещаются на вершину стека при переходе вперед и снимаются со стека анимацией сдвига при нажатии кнопки 'Назад'.",
            "Экраны перезагружаются через HTTP редирект.",
            "Стек хранит только один экран в памяти, удаляя предыдущие.",
            "Экраны показываются в случайном порядке."
          ],
          "correct": 0,
          "explanation": "Стек моделирует естественное поведение мобильных ОС: push нового экрана и pop при возврате."
        },
        {
          "question": "Как организована стилизация в React Native?",
          "options": [
            "Через объект StyleSheet.create(), использующий свойства Flexbox и CamelCase имена (backgroundColor, fontSize).",
            "Через обычные внешние .css файлы.",
            "Стилей в React Native нет, только цвета ОС.",
            "Через атрибут style='...' в виде строки."
          ],
          "correct": 0,
          "explanation": "StyleSheet.create валидирует правила стилей и передает числовые идентификаторы через мост в нативный слой."
        },
        {
          "question": "Какое главное направление осей Flexbox установлено по умолчанию в React Native (в отличие от веба)?",
          "options": [
            "flexDirection: 'column' (вертикальное расположение сверху вниз)",
            "flexDirection: 'row' (горизонтальное расположение)",
            "flexDirection: 'row-reverse'",
            "flexDirection: 'grid'"
          ],
          "correct": 0,
          "explanation": "На смартфонах ориентация экрана преимущественно вертикальная, поэтому дефолт Flexbox — column."
        }
      ]
    },
    {
      "num": 23,
      "title": "Глава 23. GraphQL и React Native",
      "subtitle": "Оптимизация сетевых запросов, компонент FlatList для производительных списков, pull-to-refresh и индикаторы загрузки.",
      "minutes": 13,
      "contentHtml": `<h2>1. Производительные списки с FlatList</h2>
<p>
  В мобильных приложениях нельзя использовать обычный метод <code class="inline-code">notes.map()</code>, так как рендеринг тысячи карточек одновременно перегрузит оперативную память смартфона.
</p>
<p>
  Компонент <b>FlatList</b> виртуализирует элементы: он рендерит только те карточки, которые видны на экране прямо сейчас, мгновенно утилизируя элементы за пределами зоны видимости:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JSX · Оптимизированная лента заметок</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>import React from 'react';
import { FlatList, View, Text } from 'react-native';

const NoteFeed = ({ notes, onSelectNote, onRefresh, isRefreshing }) => {
  return (
    <FlatList
      data={notes}
      keyExtractor={item => item.id}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      renderItem={({ item }) => (
        <NoteCard note={item} onPress={() => onSelectNote(item.id)} />
      )}
    />
  );
};</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Почему для вывода длинных списков в React Native необходимо использовать FlatList, а не ScrollView + map()?",
          "options": [
            "FlatList виртуализирует список, отображая только видимые на экране элементы и экономя память мобильного устройства.",
            "ScrollView не поддерживает отображение текста.",
            "FlatList автоматически переводит текст на разные языки.",
            "Это требование магазина Google Play."
          ],
          "correct": 0,
          "explanation": "FlatList удаляет невидимые ячейки из памяти, предотвращая зависания и утечки оперативной памяти."
        },
        {
          "question": "Какое свойство FlatList отвечает за функцию обновления списка свайпом сверху вниз (Pull-to-Refresh)?",
          "options": [
            "onRefresh и refreshing",
            "enableSwipeToReload",
            "pullAction",
            "gestureUpdate"
          ],
          "correct": 0,
          "explanation": "Пара свойств onRefresh={handler} и refreshing={boolean} включает нативный спиннер обновления."
        },
        {
          "question": "Для чего в FlatList обязательно указывать prop keyExtractor?",
          "options": [
            "Для извлечения уникального строкового ключа каждого элемента, необходимого для эффективной сверки списка.",
            "Для шифрования данных заметки.",
            "Для сортировки элементов по алфавиту.",
            "Для вычисления высоты экрана."
          ],
          "correct": 0,
          "explanation": "Уникальный ключ позволяет React Native точечно переиспользовать нативные вьюшки."
        }
      ]
    },
    {
      "num": 24,
      "title": "Глава 24. Аутентификация и SecureStore в мобильном приложении",
      "subtitle": "Безопасное аппаратное хранилище токенов Expo SecureStore (Keychain / Keystore), формы авторизации и экраны профиля.",
      "minutes": 14,
      "contentHtml": `<h2>1. Почему на смартфонах нельзя использовать localStorage?</h2>
<p>
  В мобильной ОС нет традиционного веб-хранилища <code class="inline-code">localStorage</code>. Кроме того, обычные текстовые хранилища вроде <code class="inline-code">AsyncStorage</code> не шифруют данные, что позволяет извлечь токены авторизации при физическом доступе к рутованному устройству.
</p>

<h2>2. Аппаратное шифрование через SecureStore</h2>
<p>
  Библиотека <b>expo-secure-store</b> использует нативные средства криптографической защиты смартфона:
</p>
<ul>
  <li><b>iOS:</b> зашифрованная связка ключей <b>Keychain</b>.</li>
  <li><b>Android:</b> аппаратное безопасное хранилище <b>Android Keystore</b>.</li>
</ul>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · Безопасная работа с токеном</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>import * as SecureStore from 'expo-secure-store';

// Сохранение токена
export async function saveToken(token) {
  await SecureStore.setItemAsync('user_token', token);
}

// Извлечение токена
export async function getToken() {
  return await SecureStore.getItemAsync('user_token');
}

// Удаление токена при выходе
export async function deleteToken() {
  await SecureStore.deleteItemAsync('user_token');
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какую технологию использует библиотека expo-secure-store для защиты токенов на iOS?",
          "options": [
            "iOS Keychain Services (аппаратное шифрование связки ключей).",
            "Обычный текстовый файл в папке Downloads.",
            "Куки Safari.",
            "Облачное хранилище iCloud без пароля."
          ],
          "correct": 0,
          "explanation": "Keychain гарантирует шифрование данных на аппаратном уровне Secure Enclave."
        },
        {
          "question": "В чем главное отличие SecureStore от AsyncStorage в мобильной разработке?",
          "options": [
            "SecureStore аппаратно шифрует сохраняемые ключи и значения, а AsyncStorage хранит данные в открытом незашифрованном виде.",
            "AsyncStorage работает только на планшетах.",
            "SecureStore хранит только числа.",
            "AsyncStorage быстрее в 100 раз."
          ],
          "correct": 0,
          "explanation": "Хранение JWT токенов в незашифрованном AsyncStorage считается уязвимостью безопасности."
        },
        {
          "question": "Как переключать состояние интерфейса мобильного приложения между экранами авторизации и главными табами?",
          "options": [
            "Условно рендерить AuthStack или AppTabs в зависимости от наличия загруженного токена в стейте.",
            "Принудительно перезагружать приложение через reloadAsync().",
            "Открывать браузер для каждого входа.",
            "Использовать системные всплывающие окна alert."
          ],
          "correct": 0,
          "explanation": "Паттерн Authentication Flow в React Navigation условно монтирует нужный стек навигаторов."
        }
      ]
    },
    {
      "num": 25,
      "title": "Глава 25. Дистрибуция и публикация мобильного приложения",
      "subtitle": "Сборка релизных бандлов через EAS Build (Expo Application Services), настройка app.json, иконки, splash screen и магазины приложений.",
      "minutes": 12,
      "contentHtml": `<h2>1. Подготовка конфигурации приложения в app.json</h2>
<p>
  Файл <code class="inline-code">app.json</code> содержит паспорт мобильного приложения:
</p>
<ul>
  <li><b>name & slug:</b> имя приложения и URL идентификатор.</li>
  <li><b>version:</b> семантическая версия (<code class="inline-code">1.0.0</code>).</li>
  <li><b>ios.bundleIdentifier:</b> уникальный ID пакета для Apple (<code class="inline-code">com.notedly.app</code>).</li>
  <li><b>android.package:</b> уникальное имя пакета для Google Play.</li>
  <li><b>icon & splash:</b> иконка приложения и стартовый экран загрузки.</li>
</ul>

<h2>2. Облачная сборка через EAS Build</h2>
<p>
  С помощью сервиса <b>Expo Application Services (EAS)</b> вам больше не нужно иметь дорогой компьютер Mac для сборки iOS-приложения: серверы EAS компилируют бинарные пакеты (<code class="inline-code">.ipa</code> для App Store и <code class="inline-code">.aab</code> для Google Play) в облаке.
</p>`,
      "quiz": [
        {
          "question": "В каком файле настраиваются иконки, экраны загрузки (splash screen) и идентификаторы пакетов мобильного приложения Expo?",
          "options": [
            "app.json (или app.config.js)",
            "package.json",
            "index.html",
            "manifest.xml"
          ],
          "correct": 0,
          "explanation": "Файл app.json определяет все нативные параметры сборки для iOS и Android."
        },
        {
          "question": "Какой формат бинарного пакета является обязательным современным стандартом для публикации в магазине Google Play?",
          "options": [
            "Android App Bundle (.aab)",
            "APK (.apk)",
            "JAR (.jar)",
            "ZIP (.zip)"
          ],
          "correct": 0,
          "explanation": "Формат .aab позволяет Google Play динамически генерировать оптимизированный APK под архитектуру устройства пользователя."
        },
        {
          "question": "Какую ключевую возможность предоставляет сервис EAS Build разработчикам без компьютеров Mac?",
          "options": [
            "Сборку готовых iOS-приложений (.ipa) в облачной инфраструктуре без необходимости локального наличия macOS и Xcode.",
            "Бесплатный доступ к ChatGPT.",
            "Автоматическую раскрутку в соцсетях.",
            "Генерацию дизайна иконок."
          ],
          "correct": 0,
          "explanation": "EAS Build компилирует нативные сборки в облачных контейнерах macOS и Linux."
        }
      ]
    }
  ]
};
