// Auto-generated unified book data for javascript-definitive-guide
window.BOOK_DATA = {
  "id": "javascript-definitive-guide",
  "title": "JavaScript. Подробное руководство (7-е издание)",
  "author": "Дэвид Флэнаган",
  "cover": "img/cover.jpg",
  "totalChapters": 17,
  "chapters": [
    {
      "num": 1,
      "title": "Глава 1. Введение в JavaScript",
      "subtitle": "Эволюция самого популярного языка в мире: от браузерных скриптов до универсальной платформы",
      "minutes": 8,
      "contentHtml": "<h2>1. Что такое современный JavaScript?</h2>\r\n<p>JavaScript — высокоуровневый, динамический, интерпретируемый язык программирования с первоклассными функциями (first-class functions). Созданный в 1995 году Бренданом Эйхом за 10 дней, язык прошел путь от простого скрипта анимации веб-страниц до универсального стандарта, на котором работает весь современный веб, серверы (Node.js) и мобильные приложения.</p>\r\n<div class=\"callout tip\">\r\n  <div class=\"callout-title\">💡 Стандарт ECMAScript</div>\r\n  <p>Официальной спецификацией языка является <b>ECMAScript</b> (TC39). С 2015 года (ES6 / ES2015) комитет перешел на ежегодный цикл обновлений (ES2016..ES2023), непрерывно обогащая язык современным синтаксисом.</p>\r\n</div>\r\n<h2>2. Быстрый тур по возможностям</h2>\r\n<p>Главные столпы языка — динамическая типизация, поддержка ООП на прототипах и богатая функциональная модель:</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">javascript</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>// Современный синтаксис ES2020+\r\nconst book = {\r\n  title: \"JavaScript. Подробное руководство\",\r\n  author: \"David Flanagan\",\r\n  edition: 7,\r\n  topics: [\"DOM\", \"Async\", \"Node.js\"]\r\n};\r\n\r\n// Деструктуризация и шаблонные строки\r\nconst { title, author, topics } = book;\r\nconsole.log(`${title} автора ${author} охватывает ${topics.length} ключевых темы.`);</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Какой комитет отвечает за стандартизацию и развитие языка JavaScript (ECMAScript)?",
          "options": [
            "TC39 (Technical Committee 39 в рамках организации ECMA International).",
            "W3C Consortium.",
            "Команда разработчиков браузера Google Chrome.",
            "Институт инженеров электротехники и электроники (IEEE)."
          ],
          "correct": 0,
          "explanation": "Развитием спецификации ECMAScript занимается технический комитет TC39, включающий ведущих инженеров браузеров и веб-сообщества."
        }
      ]
    },
    {
      "num": 2,
      "title": "Глава 2. Лексическая структура",
      "subtitle": "Регистр символов, Unicode, комментарии, литералы и автоматическая расстановка точек с запятой (ASI)",
      "minutes": 7,
      "contentHtml": "<h2>1. Чувствительность к регистру и Unicode</h2>\r\n<p>JavaScript строго чувствителен к регистру: переменные <code class=\"inline-code\">online</code>, <code class=\"inline-code\">Online</code> и <code class=\"inline-code\">ONLINE</code> — это три совершенно разные переменные. Исходный код пишется в кодировке <b>Unicode</b>, что позволяет использовать любые символы в строках и даже идентификаторах (хотя на практике идентификаторы пишут на латинице в стиле camelCase).</p>\r\n<h2>2. Автоматическая расстановка точек с запятой (ASI)</h2>\r\n<p>В JavaScript точки с запятой (<code class=\"inline-code\">;</code>) разделяют инструкции. Однако интерпретатор использует механизм <i>Automatic Semicolon Insertion (ASI)</i>, пытаясь подставить точку с запятой при переносе строки, если без нее синтаксис некорректен.</p>\r\n<div class=\"callout tip\">\r\n  <div class=\"callout-title\">⚠️ Классическая ловушка ASI</div>\r\n  <p>Никогда не ставьте перенос строки сразу после ключевого слова <code class=\"inline-code\">return</code>! Код вернет <code class=\"inline-code\">undefined</code>, так как интерпретатор вставит точку с запятой сразу после <code class=\"inline-code\">return</code>.</p>\r\n</div>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">javascript</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>// ОШИБКА: вернет undefined из-за автоматической вставки точки с запятой!\r\nfunction getData() {\r\n  return\r\n  {\r\n    status: \"ok\"\r\n  };\r\n}\r\n\r\n// ПРАВИЛЬНО: фигурная скобка на той же строке\r\nfunction getDataCorrect() {\r\n  return {\r\n    status: \"ok\"\r\n  };\r\n}</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Что вернет вызов функции, в которой сразу после оператора 'return' следует перенос строки на следующую?",
          "options": [
            "undefined (интерпретатор вставит точку с запятой сразу после return по правилу ASI).",
            "Объект или значение со следующей строки.",
            "Ошибку компиляции SyntaxError.",
            "Значение null."
          ],
          "correct": 0,
          "explanation": "Из-за механизма ASI перенос строки после return воспринимается как завершение инструкции, превращаясь в return;."
        }
      ]
    },
    {
      "num": 3,
      "title": "Глава 3. Типы, значения и переменные",
      "subtitle": "Примитивы, объекты, неизменяемость, BigInt, Symbol, let/const и деструктурирующее присваивание",
      "minutes": 12,
      "contentHtml": "<h2>1. Система типов в JavaScript</h2>\r\n<p>В JavaScript все типы делятся на две категории:</p>\r\n<ul>\r\n  <li><b>Примитивные типы (Primitives)</b>: числа (<code class=\"inline-code\">number</code>), строки (<code class=\"inline-code\">string</code>), булевы (<code class=\"inline-code\">boolean</code>), <code class=\"inline-code\">null</code>, <code class=\"inline-code\">undefined</code>, символы (<code class=\"inline-code\">symbol</code>) и большие целые (<code class=\"inline-code\">bigint</code>). Примитивы неизменяемы (immutable) и сравниваются <b>по значению</b>.</li>\r\n  <li><b>Объектные типы (Objects)</b>: обычные объекты, массивы (<code class=\"inline-code\">Array</code>), функции (<code class=\"inline-code\">Function</code>), коллекции (<code class=\"inline-code\">Map</code>, <code class=\"inline-code\">Set</code>). Объекты мутабельны и сравниваются <b>по ссылке</b>.</li>\r\n</ul>\r\n<h2>2. Объявление переменных: let, const и var</h2>\r\n<p>В современном JavaScript ключевое слово <code class=\"inline-code\">var</code> устарело. Всегда используйте <code class=\"inline-code\">const</code> по умолчанию, и только если переменная будет переприсваиваться — <code class=\"inline-code\">let</code>. Оба ключевых слова имеют <i>блочную область видимости</i> и защищены от случайного использования до объявления (Temporal Dead Zone, TDZ).</p>",
      "quiz": [
        {
          "question": "Каков результат сравнения двух разных объектов с одинаковыми свойствами: { a: 1 } === { a: 1 }?",
          "options": [
            "false (объекты в JavaScript сравниваются по ссылке в памяти, а не по значениям полей).",
            "true (поскольку значения свойств идентичны).",
            "TypeError.",
            "NaN."
          ],
          "correct": 0,
          "explanation": "В отличие от примитивов, объекты равны по операции === только тогда, когда они ссылаются на один и тот же участок памяти."
        }
      ]
    },
    {
      "num": 4,
      "title": "Глава 4. Выражения и операции",
      "subtitle": "Операции равенства, приоритеты, опциональная цепочка (?.) и слияние с null (??)",
      "minutes": 11,
      "contentHtml": "<h2>1. Строгое равенство (===) vs Нестрогое (==)</h2>\r\n<p>Операция нестрогого равенства (<code class=\"inline-code\">==</code>) выполняет неявное приведение типов с неочевидными правилами (<code class=\"inline-code\">0 == false</code>, <code class=\"inline-code\">\"\" == 0</code>). В профессиональном коде всегда используется <b>строгое равенство (<code class=\"inline-code\">===</code>)</b>, не выполняющее приведений типов.</p>\r\n<h2>2. Новые операторы: ?. и ??</h2>\r\n<p>В стандарте ES2020 появились два мощнейших оператора:</p>\r\n<ul>\r\n  <li><b>Опциональная цепочка (<code class=\"inline-code\">?.</code>)</b>: позволяет безопасно обращаться к свойствам вложенных объектов без ошибок <code class=\"inline-code\">Cannot read property of undefined</code>.</li>\r\n  <li><b>Оператор слияния с null (<code class=\"inline-code\">??</code>)</b>: возвращает правый операнд только тогда, когда левый равен <code class=\"inline-code\">null</code> или <code class=\"inline-code\">undefined</code> (в отличие от <code class=\"inline-code\">||</code>, который срабатывает и на <code class=\"inline-code\">0</code>, и на пустую строку).</li>\r\n</ul>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">javascript</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>const user = { profile: { name: \"Алексей\" } };\r\n\r\n// Безопасное чтение глубоких свойств\r\nconst city = user?.address?.city ?? \"Город не указан\";\r\n\r\nconst count = 0;\r\nconst a = count || 10; // 10 (так как 0 - falsy!)\r\nconst b = count ?? 10; // 0  (так как 0 не равен null/undefined!)</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "В чем главное отличие оператора слияния с null (??) от логического ИЛИ (||)?",
          "options": [
            "?? считает ложными только null и undefined, тогда как || срабатывает на любые falsy-значения (0, false, пустая строка).",
            "?? может использоваться только в TypeScript.",
            "|| сравнивает типы данных, а ?? — только числа.",
            "Между ними нет никакой разницы."
          ],
          "correct": 0,
          "explanation": "Оператор ?? (nullish coalescing) идеален для стандартных значений, когда 0 или пустая строка являются валидными данными."
        }
      ]
    },
    {
      "num": 5,
      "title": "Глава 5. Инструкции и операторы",
      "subtitle": "Условные ветвления, циклы for..of vs for..in, метки, исключения try/catch/finally",
      "minutes": 10,
      "contentHtml": "<h2>1. Циклы: for..of против for..in</h2>\r\n<p>Главное различие, в котором часто путаются начинающие:</p>\r\n<ul>\r\n  <li><code class=\"inline-code\">for (const item of iterable)</code> — обходит <b>значения</b> итерируемого объекта (массива, строки, Set, Map).</li>\r\n  <li><code class=\"inline-code\">for (const key in object)</code> — обходит перечислимые <b>имена свойств (ключи)</b> объекта. Для массивов использовать <code class=\"inline-code\">for..in</code> не рекомендуется, так как порядок обхода не гарантируется и перечисляются нечисловые свойства.</li>\r\n</ul>\r\n<h2>2. Блок finally</h2>\r\n<p>Секция <code class=\"inline-code\">finally</code> в конструкции <code class=\"inline-code\">try/catch/finally</code> выполняется <b>всегда</b>, независимо от того, возникло ли исключение и был ли выполнен оператор <code class=\"inline-code\">return</code> внутри блока <code class=\"inline-code\">try</code>. Это ключевой инструмент освобождения ресурсов (закрытие сокетов, снятие локов).</p>",
      "quiz": [
        {
          "question": "Какой цикл в современном JavaScript предназначен для перебора значений элементов массива или коллекции Set?",
          "options": [
            "for..of",
            "for..in",
            "switch..case",
            "while..goto"
          ],
          "correct": 0,
          "explanation": "Цикл for..of перебирает значения итерируемых объектов, тогда как for..in обходит имена ключей объекта."
        }
      ]
    },
    {
      "num": 6,
      "title": "Глава 6. Объекты",
      "subtitle": "Прототипы, Object.create, дескрипторы свойств, вычисляемые свойства и spread-оператор",
      "minutes": 14,
      "contentHtml": "<h2>1. Прототипное наследование</h2>\r\n<p>Каждый объект в JavaScript имеет скрытую ссылку на свой <b>прототип</b> (<code class=\"inline-code\">[[Prototype]]</code>, доступный через <code class=\"inline-code\">Object.getPrototypeOf(obj)</code>). Если свойство не найдено в самом объекте, поиск продолжается вверх по цепочке прототипов вплоть до <code class=\"inline-code\">Object.prototype</code>.</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">javascript</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>const proto = { greeting: \"Привет\" };\r\n// Создаем объект с явным прототипом\r\nconst user = Object.create(proto);\r\nuser.name = \"Мария\";\r\n\r\nconsole.log(user.name);     // \"Мария\" (собственное свойство)\r\nconsole.log(user.greeting); // \"Привет\" (унаследовано из прототипа!)</code></pre>\r\n</div>\r\n<h2>2. Расширенный синтаксис объектных литералов</h2>\r\n<p>Современный стандарт позволяет сокращать запись свойств (<code class=\"inline-code\">{ x, y }</code> вместо <code class=\"inline-code\">{ x: x, y: y }</code>), использовать вычисляемые имена свойств в квадратных скобках (<code class=\"inline-code\">{ [prefix + \"id\"]: 10 }</code>) и объединять объекты оператором расширения (<code class=\"inline-code\">const copy = { ...orig, extra: true }</code>).</p>",
      "quiz": [
        {
          "question": "Что произойдет при попытке чтения свойства, которого нет в самом объекте, но оно определено в его прототипе?",
          "options": [
            "Значение будет успешно получено из цепочки прототипов.",
            "Выбросится исключение ReferenceError.",
            "Свойство автоматически создастся в объекте со значением null.",
            "Будет возвращен пустой массив."
          ],
          "correct": 0,
          "explanation": "JavaScript просматривает цепочку прототипов снизу вверх, возвращая значение из ближайшего объекта прототипа."
        }
      ]
    },
    {
      "num": 7,
      "title": "Глава 7. Массивы",
      "subtitle": "Методы высшего порядка (map, filter, reduce, flatMap), поиск, мутирующие операции и TypedArrays",
      "minutes": 13,
      "contentHtml": "<h2>1. Функциональные методы массивов</h2>\r\n<p>Вместо ручных циклов <code class=\"inline-code\">for</code> функциональные методы делают код декларативным, чистым и легко читаемым:</p>\r\n<ul>\r\n  <li><code class=\"inline-code\">map(fn)</code> — трансформирует каждый элемент и возвращает новый массив той же длины.</li>\r\n  <li><code class=\"inline-code\">filter(fn)</code> — оставляет только элементы, для которых функция вернула <code class=\"inline-code\">true</code>.</li>\r\n  <li><code class=\"inline-code\">reduce(fn, init)</code> — свертывает массив в единое значение (сумму, словарь, агрегат).</li>\r\n  <li><code class=\"inline-code\">flatMap(fn)</code> — отображает элементы и сглаживает вложенные массивы на 1 уровень.</li>\r\n</ul>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">javascript</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>const orders = [\r\n  { id: 1, total: 120, status: \"completed\" },\r\n  { id: 2, total: 350, status: \"pending\" },\r\n  { id: 3, total: 490, status: \"completed\" }\r\n];\r\n\r\n// Цепочка декларативных трансформаций:\r\nconst revenue = orders\r\n  .filter(o => o.status === \"completed\")\r\n  .map(o => o.total)\r\n  .reduce((sum, val) => sum + val, 0);\r\n\r\nconsole.log(revenue); // 610</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Какой метод массива возвращает единое агрегированное значение, последовательно сворачивая элементы?",
          "options": [
            "reduce()",
            "filter()",
            "forEach()",
            "slice()"
          ],
          "correct": 0,
          "explanation": "Метод reduce() накапливает результат обхода всех элементов массива в единое итоговое значение (аккумулятор)."
        }
      ]
    },
    {
      "num": 8,
      "title": "Глава 8. Функции",
      "subtitle": "Стрелочные функции, контекст this, замыкания (Closures), каррирование и методы call/apply/bind",
      "minutes": 15,
      "contentHtml": "<h2>1. Стрелочные функции и лексический this</h2>\r\n<p>В обычных функциях значение <code class=\"inline-code\">this</code> определяется способом вызова функции (динамический <code class=\"inline-code\">this</code>). В <b>стрелочных функциях (<code class=\"inline-code\">() => {}</code>)</b> значение <code class=\"inline-code\">this</code> наследуется из окружающей лексической области видимости, в которой была определена стрелочная функция. У стрелочных функций нет собственного <code class=\"inline-code\">this</code>, <code class=\"inline-code\">arguments</code> и они не могут использоваться как конструкторы.</p>\r\n<h2>2. Замыкания (Closures)</h2>\r\n<p><b>Замыкание</b> — это комбинация функции и лексического окружения, в котором эта функция была создана. Функция «помнит» переменные из своей родительской области видимости даже после того, как родительская функция завершила выполнение.</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">javascript</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>function createCounter() {\r\n  let count = 0; // Приватное состояние внутри замыкания\r\n  return {\r\n    increment: () => ++count,\r\n    getValue: () => count\r\n  };\r\n}\r\n\r\nconst counter = createCounter();\r\nconsole.log(counter.increment()); // 1\r\nconsole.log(counter.increment()); // 2\r\nconsole.log(counter.count);       // undefined (инкапсуляция!)</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Как определяется значение ключевого слова 'this' внутри стрелочной функции (arrow function)?",
          "options": [
            "Лексически: наследуется из окружающего контекста в момент определения функции.",
            "Всегда равно глобальному объекту window.",
            "Динамически: зависит от того, как вызвана функция.",
            "Всегда равно null."
          ],
          "correct": 0,
          "explanation": "Стрелочные функции не имеют собственного контекста this — они захватывают this из того места, где были объявлены."
        }
      ]
    },
    {
      "num": 9,
      "title": "Глава 9. Классы",
      "subtitle": "Синтаксис class, статические свойства, приватные поля (#field), наследование extends и super",
      "minutes": 14,
      "contentHtml": "<h2>1. Классы в ES6+</h2>\r\n<p>Хотя под капотом классов в JavaScript по-прежнему лежит прототипное наследование, синтаксис <code class=\"inline-code\">class</code> значительно упростил структуру кода и сделал её чище:</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">javascript</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>class Account {\r\n  #balance = 0; // Приватное поле (Private Field с символом #)\r\n\r\n  constructor(owner, initialDeposit = 0) {\r\n    this.owner = owner;\r\n    this.#balance = initialDeposit;\r\n  }\r\n\r\n  deposit(amount) {\r\n    if (amount <= 0) throw new Error(\"Неверная сумма\");\r\n    this.#balance += amount;\r\n  }\r\n\r\n  get balance() {\r\n    return this.#balance;\r\n  }\r\n}\r\n\r\nconst acc = new Account(\"Иван\", 500);\r\nacc.deposit(200);\r\nconsole.log(acc.balance); // 700\r\n// acc.#balance = 0;     // SyntaxError: Private field '#balance' must be declared</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Как в современном стандарте JavaScript объявляется истинно приватное поле класса, недоступное снаружи?",
          "options": [
            "С префиксом решетки: #fieldName",
            "С ключевым словом private",
            "С нижним подчеркиванием: _fieldName",
            "Через директиву @sealed"
          ],
          "correct": 0,
          "explanation": "Приватные поля классов в ES2022+ обозначаются символом # (хэш) в начале имени и защищаются на уровне движка V8."
        }
      ]
    },
    {
      "num": 10,
      "title": "Глава 10. Модули",
      "subtitle": "Стандарт ES Modules: статический импорт, экспорт по умолчанию, реэкспорт и динамический import()",
      "minutes": 10,
      "contentHtml": "<h2>1. ES Modules (ESM) против CommonJS (CJS)</h2>\r\n<p>Долгое время экосистема JavaScript была расколота: Node.js использовал <code class=\"inline-code\">require()</code> и <code class=\"inline-code\">module.exports</code> (CommonJS), а браузеры не имели встроенных модулей. С появлением <b>ES Modules</b> язык получил единый официальный стандарт.</p>\r\n<ul>\r\n  <li>ES-модули статичны: дерево зависимостей анализируется до выполнения кода (что позволяет сборщикам делать <i>Tree-Shaking</i> — удаление мертвого неиспользуемого кода).</li>\r\n  <li>В ES-модулях всегда включен строгий режим (<code class=\"inline-code\">use strict</code>).</li>\r\n  <li>Для ленивой загрузки тяжелых модулей используется асинхронный <code class=\"inline-code\">import(\"./module.js\")</code>, возвращающий Promise.</li>\r\n</ul>",
      "quiz": [
        {
          "question": "Какое ключевое преимущество дает статический синтаксис импортов (import/export) современным сборщикам (Webpack, Vite, Rollup)?",
          "options": [
            "Позволяет выполнять Tree-Shaking: анализ графа зависимостей и удаление мертвого неиспользуемого кода.",
            "Ускоряет загрузку картинок на сайте.",
            "Шифрует код от просмотра в консоли разработчика.",
            "Отключает сборку мусора в памяти."
          ],
          "correct": 0,
          "explanation": "Статический характер ESM позволяет компилятору точно знать используемые функции еще до запуска программы и вырезать неиспользуемый код."
        }
      ]
    },
    {
      "num": 11,
      "title": "Глава 11. Стандартная библиотека JavaScript",
      "subtitle": "Коллекции Set и Map, слабые ссылки WeakMap/WeakSet, регулярные выражения RegExp, Date и Intl",
      "minutes": 14,
      "contentHtml": "<h2>1. Коллекции Map и Set</h2>\r\n<p>До ES6 для хранения ассоциативных данных использовались обычные объекты. Однако объекты поддерживают в качестве ключей только строки и символы. Коллекция <code class=\"inline-code\">Map</code> позволяет использовать в качестве ключа <b>любой тип данных, включая другие объекты и функции</b>!</p>\r\n<p>Коллекция <code class=\"inline-code\">Set</code> хранит только уникальные значения и идеальна для мгновенного удаления дубликатов из массива: <code class=\"inline-code\">[...new Set(array)]</code>.</p>\r\n<h2>2. WeakMap и WeakSet для предотвращения утечек памяти</h2>\r\n<p><code class=\"inline-code\">WeakMap</code> хранит ключи в виде «слабых ссылок». Если на объект-ключ больше нет ссылок в приложении, сборщик мусора автоматически удалит этот объект и связанное с ним значение из <code class=\"inline-code\">WeakMap</code>, предотвращая утечки памяти.</p>",
      "quiz": [
        {
          "question": "Как в одну строку получить массив только уникальных элементов из существующего массива arr?",
          "options": [
            "[...new Set(arr)]",
            "arr.unique()",
            "Object.keys(arr)",
            "arr.filter(Boolean)"
          ],
          "correct": 0,
          "explanation": "Коллекция Set отсеивает все дубликаты, а оператор расширения [...] разворачивает ее обратно в новый массив."
        }
      ]
    },
    {
      "num": 12,
      "title": "Глава 12. Итераторы и генераторы",
      "subtitle": "Протокол перебора Symbol.iterator, функции-генераторы function* и ленивые вычисления с yield",
      "minutes": 12,
      "contentHtml": "<h2>1. Протокол итерации</h2>\r\n<p>Любой объект считается итерируемым (iterable), если у него определен метод с ключом <code class=\"inline-code\">[Symbol.iterator]()</code>, возвращающий итератор — объект с методом <code class=\"inline-code\">next()</code>, возвращающим <code class=\"inline-code\">{ value, done }</code>.</p>\r\n<h2>2. Функции-генераторы (function*)</h2>\r\n<p>Генератор — это функция, выполнение которой можно приостанавливать с помощью оператора <code class=\"inline-code\">yield</code> и возобновлять в дальнейшем. Это позволяет генерировать потенциально бесконечные последовательности данных с нулевым расходом памяти (ленивые вычисления):</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">javascript</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>// Бесконечный генератор чисел Фибоначчи\r\nfunction* fibonacci() {\r\n  let [prev, curr] = [0, 1];\r\n  while (true) {\r\n    yield curr;\r\n    [prev, curr] = [curr, prev + curr];\r\n  }\r\n}\r\n\r\nfor (const n of fibonacci()) {\r\n  if (n > 50) break;\r\n  console.log(n); // 1, 1, 2, 3, 5, 8, 13, 21, 34\r\n}</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Какой оператор используется внутри функции-генератора для приостановки выполнения и возврата очередного значения?",
          "options": [
            "yield",
            "pause",
            "await",
            "return"
          ],
          "correct": 0,
          "explanation": "Оператор yield приостанавливает выполнение функции-генератора, сохраняя ее внутреннее состояние до следующего вызова .next()."
        }
      ]
    },
    {
      "num": 13,
      "title": "Глава 13. Асинхронный JavaScript",
      "subtitle": "Event Loop, Промисы (Promises), обработка ошибок и синтаксис async/await",
      "minutes": 16,
      "contentHtml": "<h2>1. Однопоточность и Event Loop</h2>\r\n<p>JavaScript выполняется в одном потоке. Чтобы интерфейс не зависал при сетевых запросах, браузер и Node.js используют <b>Event Loop (цикл событий)</b>: стек вызовов (Call Stack), очередь микрозадач (Microtask Queue: промисы) и очередь макрозадач (Macrotask Queue: таймеры, события ввода-вывода).</p>\r\n<h2>2. От Коллбэков к async/await</h2>\r\n<p>Раньше асинхронный код страдал от «ада обратных вызовов» (Callback Hell). Появление <code class=\"inline-code\">Promise</code> и синтаксиса <code class=\"inline-code\">async/await</code> позволило писать асинхронный код так же просто и понятно, как синхронный:</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">javascript</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>async function fetchUserData(userId) {\r\n  try {\r\n    const res = await fetch(`/api/users/${userId}`);\r\n    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);\r\n    const data = await res.json();\r\n    return data;\r\n  } catch (error) {\r\n    console.error(\"Сбой загрузки пользователя:\", error);\r\n    throw error;\r\n  }\r\n}</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "В какую очередь цикла событий (Event Loop) попадают коллбэки разрешившихся промисов (.then / await)?",
          "options": [
            "В очередь микрозадач (Microtask Queue), которая выполняется сразу после текущего синхронного кода перед макрозадачами.",
            "В очередь макрозадач (Macrotask Queue).",
            "Напрямую в стек процессора.",
            "В локальное хранилище LocalStorage."
          ],
          "correct": 0,
          "explanation": "Промисы используют очередь микрозадач (Microtask Queue), имеющую наивысший приоритет исполнения перед таймерами setTimeout и рендерингом."
        }
      ]
    },
    {
      "num": 14,
      "title": "Глава 14. Метапрограммирование",
      "subtitle": "Перехват операций через Proxy, объект Reflect и дескрипторы свойств",
      "minutes": 13,
      "contentHtml": "<h2>1. Паттерн Proxy (Прокси)</h2>\r\n<p>Объект <code class=\"inline-code\">Proxy</code> позволяет перехватывать и переопределять фундаментальные операции над объектами: чтение свойств (<code class=\"inline-code\">get</code>), запись (<code class=\"inline-code\">set</code>), проверку наличия (<code class=\"inline-code\">has</code>) и вызов функций (<code class=\"inline-code\">apply</code>). Именно на Proxy построена реактивность во Vue.js 3 и MobX!</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">javascript</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>const target = { name: \"Анна\" };\r\n\r\nconst reactive = new Proxy(target, {\r\n  get(obj, prop) {\r\n    console.log(`Чтение свойства: ${prop}`);\r\n    return Reflect.get(obj, prop);\r\n  },\r\n  set(obj, prop, value) {\r\n    console.log(`Запись свойства ${prop} = ${value}`);\r\n    return Reflect.set(obj, prop, value);\r\n  }\r\n});\r\n\r\nreactive.age = 25; // Выведет: \"Запись свойства age = 25\"</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Для чего используется объект Proxy в современном JavaScript?",
          "options": [
            "Для перехвата и кастомизации низкоуровневых операций над объектом (чтение, запись свойств, удаление и вызов).",
            "Для проксирования сетевого трафика через анонимный сервер.",
            "Для сжатия файлов в архив zip.",
            "Для ускорения вычислений на видеокарте."
          ],
          "correct": 0,
          "explanation": "Proxy оборачивает целевой объект и позволяет перехватывать базовые операции (traps), реализуя валидацию, логирование или реактивность."
        }
      ]
    },
    {
      "num": 15,
      "title": "Глава 15. JavaScript в веб-браузерах",
      "subtitle": "DOM, события, селекторы querySelector, стили CSS, Fetch API и безопасность Web",
      "minutes": 18,
      "contentHtml": "<h2>1. Объектная модель документа (DOM)</h2>\r\n<p>DOM представляет структуру HTML-документа в виде дерева узлов. Современные методы <code class=\"inline-code\">document.querySelector()</code> и <code class=\"inline-code\">querySelectorAll()</code> принимают стандартные CSS-селекторы, избавляя от устаревших громоздких функций.</p>\r\n<h2>2. Модель событий: фазы перехвата и всплытия</h2>\r\n<p>Когда пользователь кликает по кнопке внутри <code class=\"inline-code\">&lt;div&gt;</code>, событие проходит три фазы:</p>\r\n<ol>\r\n  <li><b>Фаза перехвата (Capturing)</b> — событие спускается от <code class=\"inline-code\">window</code> до целевого элемента.</li>\r\n  <li><b>Фаза цели (Target)</b> — событие достигает кнопки.</li>\r\n  <li><b>Фаза всплытия (Bubbling)</b> — событие поднимается обратно вверх по родительским элементам к <code class=\"inline-code\">document</code>.</li>\r\n</ol>\r\n<p>Благодаря всплытию можно использовать <b>делегирование событий</b>: повесить один слушатель на родительский список вместо сотен обработчиков на каждую строчку!</p>",
      "quiz": [
        {
          "question": "В чем главное преимущество паттерна «делегирование событий» в веб-интерфейсах?",
          "options": [
            "Один обработчик на общем родительском элементе обрабатывает события всех дочерних элементов благодаря всплытию событий.",
            "События начинают обрабатываться в фоновом потоке воркера.",
            "Браузер отключает анимации CSS для экономии батареи.",
            "Кнопки начинают нажиматься быстрее."
          ],
          "correct": 0,
          "explanation": "Делегирование событий использует фазу всплытия (bubbling): один слушатель на родителе перехватывает клики всех детей, экономя оперативную память."
        }
      ]
    },
    {
      "num": 16,
      "title": "Глава 16. Серверный JavaScript на платформе Node",
      "subtitle": "Архитектура Node.js, неблокирующий ввод-вывод, модули fs, Stream и создание HTTP-сервера",
      "minutes": 15,
      "contentHtml": "<h2>1. Архитектура Node.js</h2>\r\n<p>Платформа Node.js объединяет движок Google V8 и системную библиотеку асинхронного ввода-вывода <code class=\"inline-code\">libuv</code>. Все операции с диском и сетью выполняются асинхронно без блокировки основного потока выполнения.</p>\r\n<h2>2. Потоки данных (Streams)</h2>\r\n<p>Потоки позволяют обрабатывать гигабайтные файлы кусочками (чанками), не загружая весь файл целиком в оперативную память сервера. Метод <code class=\"inline-code\">pipe()</code> или конвейер <code class=\"inline-code\">pipeline</code> соединяет источник чтения и целевой поток записи:</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">javascript</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>import http from \"node:http\";\r\nimport fs from \"node:fs\";\r\n\r\n// Создание легковесного стримингового HTTP-сервера\r\nconst server = http.createServer((req, res) => {\r\n  const stream = fs.createReadStream(\"big-video.mp4\");\r\n  res.writeHead(200, { \"Content-Type\": \"video/mp4\" });\r\n  stream.pipe(res); // Передача данных чанками без переполнения памяти!\r\n});\r\n\r\nserver.listen(3000, () => console.log(\"Сервер слушает порт 3000\"));</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Почему использование потоков данных (Streams) в Node.js является стандартом для работы с большими файлами?",
          "options": [
            "Они обрабатывают данные порциями (чанками), удерживая потребление оперативной памяти минимальным независимо от размера файла.",
            "Они сжимают файлы в формат zip автоматически.",
            "Потоки отключают протокол HTTP.",
            "Они компилируют код в C++."
          ],
          "correct": 0,
          "explanation": "Потоки (Streams) читают и отправляют данные небольшими порциями, предотвращая переполнение памяти (Out of Memory) даже при обработке многогигабайтных файлов."
        }
      ]
    },
    {
      "num": 17,
      "title": "Глава 17. Инструменты и расширения JavaScript",
      "subtitle": "Линтинг с ESLint, форматирование Prettier, тесты Jest, пакетный менеджер npm и бандлеры",
      "minutes": 12,
      "contentHtml": "<h2>1. Современный тулинг (Tooling)</h2>\r\n<p>Профессиональная разработка на JavaScript немыслима без инструментов автоматизации качества:</p>\r\n<ul>\r\n  <li><b>ESLint</b> — статический анализатор кода, выявляющий скрытые баги, утечки переменных и нарушение код-стайла.</li>\r\n  <li><b>Prettier</b> — бескомпромиссный автоформатер кода, устраняющий споры о расстановке пробелов и переносов строк.</li>\r\n  <li><b>Jest / Vitest</b> — современные фреймворки модульного тестирования с моками и снимками (snapshots).</li>\r\n  <li><b>Babel / SWC / esbuild</b> — компиляторы и транспиляторы новейшего синтаксиса в совместимый JavaScript.</li>\r\n</ul>\r\n<div class=\"callout tip\">\r\n  <div class=\"callout-title\">🎉 Поздравляем!</div>\r\n  <p>Вы завершили изучение 17 глав фундаментального руководства Дэвида Флэнагана по JavaScript. Теперь вы обладаете глубоким пониманием синтаксиса, движка, браузерной среды и серверной платформы Node.js!</p>\r\n</div>",
      "quiz": [
        {
          "question": "Какую ключевую роль выполняет инструмент ESLint в проектах на JavaScript?",
          "options": [
            "Выполняет статический анализ исходного кода, обнаруживая потенциальные баги, синтаксические ошибки и несоответствия стандартам качества.",
            "Сжимает изображения WebP.",
            "Устанавливает операционную систему на сервер.",
            "Заменяет базу данных MongoDB."
          ],
          "correct": 0,
          "explanation": "ESLint анализирует код без его запуска, предупреждая о забытых переменных, неверных областях видимости и стилевых ошибках."
        }
      ]
    }
  ]
};
