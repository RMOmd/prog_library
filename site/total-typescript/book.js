// Auto-generated unified book data for Total TypeScript (Matt Pocock)
window.BOOK_DATA = {
  "id": "total-typescript",
  "title": "Total TypeScript",
  "author": "Мэтт Покок",
  "cover": "img/cover.jpg",
  "totalChapters": 16,
  "chapters": [
    {
      "num": 1,
      "title": "Глава 1. Настройка рабочего окружения и архитектура TypeScript",
      "subtitle": "Главный миф о назначении языка, архитектура компилятора и настройка современного окружения для максимальной продуктивности.",
      "minutes": 10,
      "contentHtml": "<h2>1. Главный миф: для чего на самом деле был создан TypeScript?</h2>\n<p>\n  В сообществе разработчиков бытует распространенное заблуждение: многие полагают, что главная цель TypeScript — превратить JavaScript в строгий, догматический язык вроде C# или Rust. Однако Мэтт Покок подчеркивает: <b>TypeScript создавался не ради строгости типов самой по себе, а ради непревзойденного инструментария разработчика (Developer Tooling)</b>.\n</p>\n<p>\n  Представьте, что вы создаете современный редактор кода и хотите подсказывать разработчику имена методов объекта или подсвечивать опечатки. В динамическом JavaScript без типов редактор вынужден гадать. Но как только компилятор знает формы (shapes) переменных, параметров и функций, редактор обретает суперсилы: мгновенное автодополнение, безопасный автоматический рефакторинг и вывод ошибок прямо во время набора текста.\n</p>\n\n<div class=\"callout tip\">\n  <div class=\"callout-title\">💡 Философия TypeScript</div>\n  <p>TypeScript дает ровно столько статической типизации, сколько необходимо, чтобы сделать работу с динамическим JavaScript комфортной, предсказуемой и масштабируемой.</p>\n</div>\n\n<h2>2. Архитектура: как работает связка JS и TS</h2>\n<p>\n  В обычном JavaScript-проекте код пишется в файлах <code class=\"inline-code\">.js</code> и напрямую передается в среду исполнения (браузер или Node.js). Если в коде закралась ошибка в имени свойства, вы узнаете о ней только тогда, когда эта строчка выполнится в рантайме.\n</p>\n\n<div class=\"schema-box\">\n  <div class=\"schema-grid\">\n    <div class=\"schema-item blue\">\n      <strong>JavaScript Workflow</strong>\n      <p>Код <code class=\"inline-code\">.js</code> ➔ Исполнение в браузере / Node.js ➔ Ошибки опечаток падают только в рантайме у пользователя.</p>\n    </div>\n    <div class=\"schema-item emerald\">\n      <strong>TypeScript Workflow</strong>\n      <p>Код <code class=\"inline-code\">.ts</code> ➔ Фоновый TS Server непрерывно проверяет типы в IDE ➔ Транспиляция в чистый JS без типов ➔ Безопасный запуск.</p>\n    </div>\n  </div>\n</div>\n\n<h2>3. Инициализация первого проекта</h2>\n<p>\n  Современный стек разработки на TypeScript опирается на быстрые менеджеры пакетов (pnpm или npm) и компилятор <code class=\"inline-code\">tsc</code>. Для развертывания проекта выполните следующие шаги:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">Bash · Терминал</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code># Инициализируем проект и устанавливаем TypeScript как dev-зависимость\npnpm init\npnpm add -D typescript @types/node\n\n# Генерируем базовый файл конфигурации\npnpm tsc --init</code></pre>\n</div>\n\n<h2>4. Сравнение поведения на практике</h2>\n<p>Рассмотрим классический пример опечатки в свойстве объекта конфигурации:</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Статическая защита</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>interface UserProfile {\n  id: string;\n  displayName: string;\n  email: string;\n}\n\nconst user: UserProfile = {\n  id: \"usr_108\",\n  displayName: \"Alex\",\n  email: \"alex@example.com\"\n};\n\n// Ошибка выявляется моментально в редакторе еще ДО сохранения файла:\n// Property 'diplayName' does not exist on type 'UserProfile'. Did you mean 'displayName'?\nconsole.log(user.diplayName);</code></pre>\n</div>\n\n<div class=\"callout warning\">\n  <div class=\"callout-title\">⚠️ Важное правило рантайма</div>\n  <p>Помните: <b>в рантайме типов TypeScript не существует</b>. Все интерфейсы, псевдонимы типов и аннотации полностью стираются при компиляции. Типы защищают вас на этапе написания кода, но не производят проверок данных, поступающих из внешних источников (например, из сети).</p>\n</div>",
      "quiz": [
        {
          "question": "Какова главная первоначальная цель создания языка TypeScript согласно Мэтту Пококу?",
          "options": [
            "Предоставить разработчикам богатый инструментарий в IDE (автодополнение, рефакторинг, подсветку ошибок) за счет понимания формы данных.",
            "Полностью заменить JavaScript в браузерах новым байт-кодом.",
            "Сделать JavaScript строго типизированным языком с проверкой типов исключительно во время выполнения программы.",
            "Ускорить математические расчеты в V8 за счет типизации чисел."
          ],
          "correct": 0,
          "explanation": "TypeScript создавался командой Андерса Хейлсберга в первую очередь как инструмент повышения продуктивности разработки и поддержки огромных кодовых баз в IDE."
        },
        {
          "question": "Что происходит с типами TypeScript (.ts) при их компиляции в рабочий JavaScript (.js)?",
          "options": [
            "Все типы, интерфейсы и аннотации полностью стираются (type erasure), остается только чистый валидный JavaScript.",
            "Типы преобразуются в инструкции рантайм-валидации (подобно zod или joi).",
            "Типы упаковываются в специальный скрытый бинарный мета-блок внутри .js файла.",
            "Компилятор запрещает сборку, если в проекте есть хотя бы один файл без аннотаций."
          ],
          "correct": 0,
          "explanation": "В рантайме типов TS нет. Процесс стирания типов гарантирует, что итоговый JavaScript выполняется с той же скоростью, что и код, написанный вручную."
        },
        {
          "question": "С помощью какой команды создается стандартный конфигурационный файл tsconfig.json?",
          "options": [
            "tsc --init",
            "tsc --create-config",
            "typescript make-config",
            "pnpm ts-setup"
          ],
          "correct": 0,
          "explanation": "Команда tsc --init генерирует файл tsconfig.json с рекомендованными настройками компилятора и подробными комментариями."
        }
      ]
    },
    {
      "num": 2,
      "title": "Глава 2. Суперсилы IDE: автодополнение, навигация и диагностика",
      "subtitle": "Как TypeScript Server превращает редактор кода в мощную среду разработки с контекстными подсказками и рефакторингом.",
      "minutes": 12,
      "contentHtml": "<h2>1. Анатомия TypeScript Server в редакторе</h2>\n<p>\n  Когда вы открываете любой файл <code class=\"inline-code\">.ts</code> в VS Code (или другой современной IDE), в фоновом процессе операционной системы автоматически запускается <b>TypeScript Server (tsserver)</b>. Этот сервер парсит синтаксическое дерево (AST) вашего проекта, отслеживает связи между файлами и по протоколу Language Server Protocol (LSP) передает редактору информацию для подсказок.\n</p>\n\n<h2>2. Автодополнение и горячие клавиши</h2>\n<p>\n  Автодополнение — самая ценная возможность TypeScript при повседневной работе. Даже если вы работаете с незнакомым API браузера, редактор подскажет все допустимые методы и свойства.\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Интеллектуальный ввод</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>const audio = document.createElement(\"audio\");\n\n// При нажатии Ctrl + Пробел внутри кавычек IDE выдает список допустимых событий:\naudio.addEventListener(\"canplaythrough\", (event) => {\n  // event автоматически типизирован как Event!\n  console.log(\"Аудио готово к непрерывному воспроизведению\");\n});</code></pre>\n</div>\n\n<h2>3. Чтение и расшифровка многострочных ошибок</h2>\n<p>\n  Ошибки компилятора TypeScript часто вызывают страх у новичков из-за своей длины. Однако у них есть четкая структура. Рассмотрим типичную диагностику:\n</p>\n\n<div class=\"callout warning\">\n  <div class=\"callout-title\">⚠️ Анатомия сообщения об ошибке</div>\n  <p>\n    <b>Type 'string' is not assignable to type 'number'.</b><br>\n    <i>Что произошло:</i> вы передали значение типа <code class=\"inline-code\">string</code> туда, где ожидался <code class=\"inline-code\">number</code>.<br>\n    <i>Правило чтения:</i> Всегда смотрите на <b>самую последнюю строчку</b> многострочной вложенной ошибки — именно там компилятор указывает конкретное несовпадающее свойство.\n  </p>\n</div>\n\n<h2>4. Обогащение подсказок через JSDoc</h2>\n<p>\n  Вы можете добавлять описания и примеры прямо к вашим функциям и типам с помощью специальных комментариев JSDoc. Редактор отобразит их во всплывающем окне (Hover) при наведении курсора:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · JSDoc документация</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>/**\n * Вычисляет скидку для зарегистрированного покупателя.\n * \n * @param price - Исходная цена товара в рублях\n * @param percent - Процент скидки от 0 до 100\n * @returns Итоговая сумма после применения скидки\n * \n * @example\n * ```ts\n * const total = calculateDiscount(1000, 15); // 850\n * ```\n */\nfunction calculateDiscount(price: number, percent: number): number {\n  return price * (1 - percent / 100);\n}</code></pre>\n</div>\n\n<h2>5. Команды навигации и рефакторинга</h2>\n<ul>\n  <li><b>F12 (Go to Definition):</b> Мгновенный переход к объявлению функции, класса или интерфейса.</li>\n  <li><b>Shift + F12 (Find All References):</b> Показывает все места во всем репозитории, где используется данная переменная или тип.</li>\n  <li><b>F2 (Rename Symbol):</b> Переименовывает переменную или поле во всех файлах проекта с сохранением семантической точности (не затрагивая одноименные строки в других контекстах).</li>\n</ul>",
      "quiz": [
        {
          "question": "Какое сочетание клавиш в VS Code вызывает принудительное контекстное меню автодополнения в текущей позиции курсора?",
          "options": [
            "Ctrl + Space (или Cmd + Space на macOS)",
            "Alt + Enter",
            "Ctrl + Shift + P",
            "F5"
          ],
          "correct": 0,
          "explanation": "Ctrl + Space принудительно запрашивает у TS Server список доступных свойств, литералов и локальных идентификаторов."
        },
        {
          "question": "Какая клавиша в большинстве IDE и VS Code отвечает за безопасное семантическое переименование символа (Rename Symbol) по всему проекту?",
          "options": [
            "F2",
            "Ctrl + R",
            "F8",
            "Shift + Delete"
          ],
          "correct": 0,
          "explanation": "Клавиша F2 вызывает умное переименование: символ меняется только там, где на него действительно ссылается TypeScript AST."
        },
        {
          "question": "Как рекомендуется читать длинные вложенные сообщения об ошибках компилятора TypeScript?",
          "options": [
            "Смотреть в первую очередь на самую последнюю (самую глубокую) строчку вложенного стека ошибки.",
            "Читать только первое слово.",
            "Игнорировать текст ошибки и перезапускать редактор.",
            "Ошибки компилятора всегда указывают на несовпадение в первой строке файла."
          ],
          "correct": 0,
          "explanation": "Компилятор начинает с общего описания несовместимости типов верхнего уровня, а в конце указывает точное свойство и место несовпадения."
        }
      ]
    },
    {
      "num": 3,
      "title": "Глава 3. TypeScript в пайплайне разработки и транспиляция",
      "subtitle": "Почему браузеры не знают о типах, как устроена транспиляция с помощью esbuild, swc и tsc, и роль TypeScript как линтера.",
      "minutes": 11,
      "contentHtml": "<h2>1. Почему браузер не выполняет TypeScript напрямую?</h2>\n<p>\n  Если вы попытаетесь подключить файл <code class=\"inline-code\">app.ts</code> напрямую через тег <code class=\"inline-code\">&lt;script src=\"app.ts\"&gt;</code> в обычном HTML-документе, консоль браузера немедленно выдаст синтаксическую ошибку:\n</p>\n<div class=\"callout warning\">\n  <div class=\"callout-title\">⛔ Ошибка синтаксиса в браузере</div>\n  <p><code class=\"inline-code\">Uncaught SyntaxError: Unexpected token ':'</code></p>\n</div>\n<p>\n  Движок JavaScript (будь то V8 в Chrome, SpiderMonkey в Firefox или JavaScriptCore в Safari) спроектирован по спецификации ECMAScript, где двоеточие <code class=\"inline-code\">: string</code> в объявлении параметров функций является недопустимым синтаксисом.\n</p>\n\n<h2>2. Транспиляция: удаление синтаксиса типов</h2>\n<p>\n  Чтобы код заработал в рантайме, он должен пройти этап <b>транспиляции (transpilation)</b>. Специальный инструмент удаляет все типы и переводит современные конструкции в целевой стандарт JavaScript.\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">Сравнение · Исходный TS ➔ Итоговый JS</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// ДО (TypeScript):\ntype Role = \"admin\" | \"user\";\n\nconst greetUser = (name: string, role: Role): string => {\n  return `Привет, ${name}! Ваша роль: ${role}`;\n};\n\n// ПОСЛЕ (JavaScript, скомпилированный через tsc/esbuild):\nconst greetUser = (name, role) => {\n  return `Привет, ${name}! Ваша роль: ${role}`;\n};</code></pre>\n</div>\n\n<h2>3. Современные сборщики: tsc против esbuild и swc</h2>\n<p>\n  Исторически компилятор <code class=\"inline-code\">tsc</code> выполнял две задачи одновременно: проверял типы и генерировал JS. Однако в масштабных проектах компиляция через <code class=\"inline-code\">tsc</code> может занимать десятки секунд.\n</p>\n<p>\n  Современные инструменты (Vite, Next.js, Turbopack, Bun) разделяют эти обязанности:\n</p>\n<ul>\n  <li><b>Сверхбыстрые транспиляторы (esbuild, swc):</b> Они не проверяют типы вообще! Они просто мгновенно (за миллисекунды) удаляют синтаксис типов из кода, отдавая JS в бандл.</li>\n  <li><b>TypeScript в роли супер-линтера (<code class=\"inline-code\">tsc --noEmit</code>):</b> Проверяет всю систему типов в отдельном фоновом процессе или на сервере непрерывной интеграции (CI/CD).</li>\n</ul>\n\n<div class=\"callout tip\">\n  <div class=\"callout-title\">💡 Режим отслеживания (Watch Mode)</div>\n  <p>Команда <code class=\"inline-code\">tsc --noEmit --watch</code> проверяет проект в фоне при каждом сохранении файла, не производя мусорных файлов сборки и экономя ресурсы машины.</p>\n</div>",
      "quiz": [
        {
          "question": "Почему попытка выполнить обычный файл .ts в браузере приводит к Uncaught SyntaxError: Unexpected token ':'?",
          "options": [
            "Спецификация JavaScript (ECMAScript) не поддерживает синтаксис аннотации типов через двоеточие.",
            "Браузер не подключен к сети интернет.",
            "Требуется указать атрибут type='typescript' у тега script.",
            "В файле отсутствует директива 'use strict'."
          ],
          "correct": 0,
          "explanation": "Движки JS не понимают аннотации типов. Весь код на TypeScript перед выполнением в браузере обязан пройти компиляцию/транспиляцию."
        },
        {
          "question": "Для чего в CI/CD скриптах используется флаг tsc --noEmit?",
          "options": [
            "Для выполнения полной статической проверки всех типов в проекте без генерации выходных .js файлов на диск.",
            "Для запуска юнит-тестов.",
            "Для запрета вывода логов в консоль.",
            "Для минификации файлов стилей."
          ],
          "correct": 0,
          "explanation": "Флаг --noEmit указывает компилятору только проверить типы и вернуть код завершения 0 (успех) или 1 (ошибка), не создавая файлов на диске."
        },
        {
          "question": "Чем современные сборщики вроде esbuild или swc отличаются от стандартного tsc при сборке бандлов?",
          "options": [
            "Они работают в десятки раз быстрее, так как моментально удаляют синтаксис типов без их глубокой проверки.",
            "Они автоматически исправляют логические баги в JavaScript коде.",
            "Они компилируют код напрямую в машинный ассемблер.",
            "Они требуют обязательного наличия декораторов в каждом файле."
          ],
          "correct": 0,
          "explanation": "Инструменты нового поколения фокусируются на скорости сборки: они стирают типы за миллисекунды, перекладывая проверку на фоновый tsc."
        }
      ]
    },
    {
      "num": 4,
      "title": "Глава 4. Базовые типы, аннотации и типизация функций",
      "subtitle": "Примитивные типы, неявный вывод (inference), опциональные поля, массивы, кортежи и сигнатуры функций.",
      "minutes": 14,
      "contentHtml": "<h2>1. Примитивные типы в TypeScript</h2>\n<p>\n  TypeScript включает в себя все примитивные типы языка JavaScript, а также специальные типы для особых значений:\n</p>\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Базовые типы</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>const username: string = \"Danila\";\nconst age: number = 28;\nconst isActive: boolean = true;\nconst id: symbol = Symbol(\"uniqueId\");\nconst bigNumber: bigint = 9007199254740991n;\n\n// null и undefined имеют собственные одноименные типы:\nconst emptyValue: null = null;\nconst notAssigned: undefined = undefined;</code></pre>\n</div>\n\n<h2>2. Аннотации против автоматического вывода (Type Inference)</h2>\n<p>\n  Одно из главных правил опытного разработчика: <b>не пишите избыточные аннотации, если TypeScript может вывести тип самостоятельно</b>.\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Чистый вывод типов</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// ПЛОХО: избыточный шум в коде\nlet count: number = 0; \n\n// ХОРОШО: TypeScript сам идеально выводит тип number\nlet count = 0; </code></pre>\n</div>\n\n<div class=\"callout rule\">\n  <div class=\"callout-title\">⚖️ Золотое правило аннотаций</div>\n  <p>Всегда аннотируйте <b>параметры функций</b>, так как компилятор не может угадать намерения вызывающего кода. Локальные же переменные внутри функций почти всегда выводятся автоматически.</p>\n</div>\n\n<h2>3. Объекты, опциональные поля и Type Aliases</h2>\n<p>\n  Для задания формы объектов используйте псевдонимы типов (<code class=\"inline-code\">type</code>). Знак вопроса (<code class=\"inline-code\">?</code>) указывает, что свойство не обязательно:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Формы объектов</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>type Article = {\n  title: string;\n  wordCount: number;\n  publishedAt?: Date; // Опциональное поле: Date | undefined\n};\n\nconst draft: Article = {\n  title: \"Глубокое погружение в TypeScript\",\n  wordCount: 1450\n  // publishedAt можно опустить без ошибок компилятора\n};</code></pre>\n</div>\n\n<h2>4. Массивы и кортежи (Tuples)</h2>\n<p>\n  Массив хранит произвольное количество элементов одного типа, в то время как <b>кортеж (tuple)</b> задает строгую фиксированную длину и точные типы для каждого индекса:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Массивы и кортежи</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Обычный массив строк произвольной длины:\nconst tags: string[] = [\"typescript\", \"javascript\", \"web\"];\n\n// Кортеж (tuple): строго 2 элемента [координата X, координата Y]\ntype Point2D = [x: number, y: number];\nconst originPoint: Point2D = [0, 0];\n\n// React useState возвращает кортеж [значение, сеттер]:\ntype UseStateReturn = [state: number, setState: (n: number) => void];</code></pre>\n</div>\n\n<h2>5. Типизация функций и возвращаемые значения</h2>\n<p>\n  Если функция не возвращает значения, используйте тип <code class=\"inline-code\">void</code>. В TypeScript <code class=\"inline-code\">void</code> означает: «вызывающий код не должен полагаться на результат работы этой функции»:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Сигнатуры функций</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>type LoggerFn = (message: string, level?: \"info\" | \"error\") => void;\n\nconst appLogger: LoggerFn = (msg, level = \"info\") => {\n  console.log(`[${level.toUpperCase()}] ${msg}`);\n};</code></pre>\n</div>",
      "quiz": [
        {
          "question": "В чем главное отличие кортежа (tuple) от обычного массива (Array) в TypeScript?",
          "options": [
            "Кортеж имеет строго фиксированную длину и четко определенный тип для каждой позиции индекса.",
            "Кортежи могут содержать только числовые значения.",
            "Кортежи компилируются в структуры базы данных, а массивы нет.",
            "Кортежи нельзя перебирать через цикл for."
          ],
          "correct": 0,
          "explanation": "Кортеж вроде [string, number] жестко регламентирует: первый элемент обязан быть строкой, второй — числом, и их ровно два."
        },
        {
          "question": "Что означает тип свойства title?: string в описании типа объекта?",
          "options": [
            "Свойство может отсутствовать, а при наличии его тип должен быть string (эквивалентно string | undefined).",
            "Свойство title обязано быть вопросительным предложением.",
            "Свойство содержит случайную строку.",
            "Свойство доступно только для чтения."
          ],
          "correct": 0,
          "explanation": "Знак '?' делает свойство опциональным, допуская его пропуск в объекте или значение undefined."
        },
        {
          "question": "Какой тип возвращаемого значения следует указывать функции, которая выполняет сайд-эффект и ничего не возвращает?",
          "options": [
            "void",
            "null",
            "never",
            "any"
          ],
          "correct": 0,
          "explanation": "Тип void сообщает TypeScript и вызывающему коду, что возвращаемое значение функции не используется."
        }
      ]
    },
    {
      "num": 5,
      "title": "Глава 5. Объединения (Unions), литералы и техники сужения типов",
      "subtitle": "Оператор |, литеральные типы, сужение через typeof/in/instanceof, unknown vs any, и паттерн Discriminated Unions.",
      "minutes": 15,
      "contentHtml": "<h2>1. Типы-объединения (Union Types)</h2>\n<p>\n  Объединение типов с помощью оператора <code class=\"inline-code\">|</code> моделирует концепцию «или»: значение может принадлежать к типу <code class=\"inline-code\">A</code> либо к типу <code class=\"inline-code\">B</code>.\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Объединение типов</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>type NetworkId = string | number;\n\nfunction formatId(id: NetworkId): string {\n  // На этом этапе компилятор разрешает вызывать ТОЛЬКО общие методы:\n  return id.toString();\n}</code></pre>\n</div>\n\n<h2>2. Литеральные типы: точность до конкретного значения</h2>\n<p>\n  В TypeScript типом может быть не просто абстрактный <code class=\"inline-code\">string</code>, а конкретная строка, например <code class=\"inline-code\">\"success\"</code> или <code class=\"inline-code\">\"failed\"</code>. Комбинация литералов создает мощные безопасные перечисления:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Литеральные объединения</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>type HttpMethod = \"GET\" | \"POST\" | \"PUT\" | \"DELETE\" | \"PATCH\";\n\nfunction sendRequest(url: string, method: HttpMethod) {\n  // Компилятор не позволит передать опечатку вроде \"post\" или \"FETCH\"\n}</code></pre>\n</div>\n\n<h2>3. Техники сужения типов (Narrowing)</h2>\n<p>\n  Когда переменная имеет тип объединения, компилятор не дает вызывать специфические методы до тех пор, пока вы не <b>сузите</b> тип с помощью стандартных условий JavaScript:\n</p>\n<ul>\n  <li><b>Проверка typeof:</b> <code class=\"inline-code\">typeof val === \"string\"</code></li>\n  <li><b>Проверка на null/undefined:</b> <code class=\"inline-code\">val !== null</code> или оператор опциональной последовательности</li>\n  <li><b>Оператор in:</b> проверка наличия ключа в объекте (<code class=\"inline-code\">\"error\" in response</code>)</li>\n  <li><b>Оператор instanceof:</b> проверка класса экземпляра (<code class=\"inline-code\">err instanceof AxiosError</code>)</li>\n</ul>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Безопасное сужение</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>function processInput(input: string | number[]) {\n  if (typeof input === \"string\") {\n    // Внутри этой ветки input гарантированно string!\n    return input.trim().toUpperCase();\n  }\n  // В этой ветке input гарантированно number[]!\n  return input.reduce((acc, n) => acc + n, 0);\n}</code></pre>\n</div>\n\n<h2>4. Дискриминантные объединения (Discriminated Unions)</h2>\n<p>\n  Это <b>главный архитектурный паттерн TypeScript</b>. Объединение нескольких типов объектов, у каждого из которых есть общее литеральное поле (дискриминант), например <code class=\"inline-code\">status</code> или <code class=\"inline-code\">type</code>:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Дискриминантное объединение</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>type AsyncState<T> =\n  | { status: \"loading\" }\n  | { status: \"success\"; data: T }\n  | { status: \"error\"; error: Error };\n\nfunction renderUi(state: AsyncState<string[]>) {\n  switch (state.status) {\n    case \"loading\":\n      return \"Пожалуйста, подождите...\";\n    case \"success\":\n      // Компилятор знает: здесь ЕСТЬ поле data!\n      return `Загружено элементов: ${state.data.length}`;\n    case \"error\":\n      // Здесь ЕСТЬ поле error!\n      return `Ошибка: ${state.error.message}`;\n  }\n}</code></pre>\n</div>\n\n<h2>5. unknown против any и проверка на исчерпаемость (never)</h2>\n<p>\n  <b><code class=\"inline-code\">any</code></b> полностью отключает систему типов. <b><code class=\"inline-code\">unknown</code></b> же заставляет вас сначала проверить тип перед использованием:\n</p>\n\n<div class=\"callout tip\">\n  <div class=\"callout-title\">💡 Исчерпывающая проверка с типом never</div>\n  <p>Если в блоке switch обработаны все варианты объединения, переменная в ветке default получает тип <code class=\"inline-code\">never</code>. Если в будущем кто-то добавит новый статус в объединение, компилятор мгновенно подсветит ошибку в switch!</p>\n</div>",
      "quiz": [
        {
          "question": "Что такое дискриминантное объединение (Discriminated Union) в TypeScript?",
          "options": [
            "Объединение типов объектов, имеющих общее поле с литеральным типом (дискриминант), по которому TypeScript однозначно сужает тип объекта.",
            "Объединение строк и чисел без использования скобок.",
            "Тип, который запрещает использование оператора switch.",
            "Функция, выбрасывающая исключение при неверном типе аргумента."
          ],
          "correct": 0,
          "explanation": "Дискриминантное свойство (например, kind или status) позволяет компилятору мгновенно сузить ветку до конкретного объекта."
        },
        {
          "question": "В чем фундаментальное отличие типа unknown от типа any?",
          "options": [
            "Значение типа unknown нельзя использовать или вызывать у него методы до тех пор, пока его тип не будет сужен проверкой; any отключает проверку вовсе.",
            "unknown работает только с асинхронным кодом.",
            "any запрещен в строгом режиме, а unknown разрешен только в классах.",
            "Между ними нет никакой разницы, это синонимы."
          ],
          "correct": 0,
          "explanation": "unknown — это типобезопасный аналог any. Он заставляет программиста явно проверить тип перед обращением к свойствам."
        },
        {
          "question": "Какой тип в TypeScript представляет значение, которое никогда не может возникнуть (например, недостижимая ветка кода)?",
          "options": [
            "never",
            "void",
            "undefined",
            "null"
          ],
          "correct": 0,
          "explanation": "Тип never представляет пустое множество значений и служит для проверки полноты (exhaustive check) веток switch/case."
        }
      ]
    },
    {
      "num": 6,
      "title": "Глава 6. Работа с объектами, динамические ключи и утилиты",
      "subtitle": "Пересечения типов (&), интерфейсы, динамические словари Record<K, V> и стандартные утилиты Pick, Omit, Partial.",
      "minutes": 14,
      "contentHtml": "<h2>1. Пересечение типов (&) против наследования интерфейсов</h2>\n<p>\n  Оператор <code class=\"inline-code\">&</code> объединяет свойства нескольких типов воедино (логическое «И»). Если <code class=\"inline-code\">|</code> означает «одно из», то <code class=\"inline-code\">&</code> требует наличия свойств обоих типов:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Пересечение типов (&)</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>type BaseEntity = {\n  id: string;\n  createdAt: Date;\n};\n\ntype UserAccount = BaseEntity & {\n  email: string;\n  role: \"admin\" | \"member\";\n};\n\n// Объект обязан содержать и id, и createdAt, и email, и role:\nconst admin: UserAccount = {\n  id: \"usr_42\",\n  createdAt: new Date(),\n  email: \"admin@corp.io\",\n  role: \"admin\"\n};</code></pre>\n</div>\n\n<h2>2. Динамические ключи: Индексные сигнатуры и Record</h2>\n<p>\n  Когда точные имена ключей заранее неизвестны (например, кэш по ID или словарь переводов), TypeScript предлагает два подхода:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Динамические словари</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Подход 1: Индексная сигнатура\ntype SessionCache = {\n  [sessionId: string]: { userId: string; lastSeen: number };\n};\n\n// Подход 2: Встроенная утилита Record<Keys, Value> (предпочтительно):\ntype RolePermissions = Record<\"admin\" | \"user\" | \"guest\", string[]>;\n\nconst permissions: RolePermissions = {\n  admin: [\"read\", \"write\", \"delete\"],\n  user: [\"read\", \"write\"],\n  guest: [\"read\"]\n  // Все ключи обязаны присутствовать!\n};</code></pre>\n</div>\n\n<h2>3. Встроенные утилиты трансформации типов</h2>\n<p>\n  Вместо дублирования типов вручную, TypeScript предоставляет мощные готовые трансформаторы:\n</p>\n\n<div class=\"schema-box\">\n  <div class=\"schema-grid\">\n    <div class=\"schema-item blue\">\n      <strong>Pick&lt;T, Keys&gt;</strong>\n      <p>Выбирает только указанные ключи из типа <code class=\"inline-code\">T</code>.<br><i>Пример:</i> <code class=\"inline-code\">Pick&lt;User, \"id\" | \"email\"&gt;</code></p>\n    </div>\n    <div class=\"schema-item emerald\">\n      <strong>Omit&lt;T, Keys&gt;</strong>\n      <p>Исключает указанные ключи из типа <code class=\"inline-code\">T</code>.<br><i>Пример:</i> <code class=\"inline-code\">Omit&lt;User, \"passwordHash\"&gt;</code></p>\n    </div>\n    <div class=\"schema-item amber\">\n      <strong>Partial&lt;T&gt;</strong>\n      <p>Делает <b>все</b> свойства объекта опциональными.<br>Идеально для операций <code class=\"inline-code\">updateUser(id, patch)</code>.</p>\n    </div>\n    <div class=\"schema-item purple\">\n      <strong>Required&lt;T&gt;</strong>\n      <p>Делает все опциональные поля строго обязательными.</p>\n    </div>\n  </div>\n</div>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Практика с утилитами</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>interface Product {\n  id: string;\n  sku: string;\n  name: string;\n  price: number;\n  description: string;\n}\n\n// Создание DTO без служебного ID для ручки создания:\ntype CreateProductDto = Omit<Product, \"id\">;\n\n// Частичное обновление через PATCH:\ntype UpdateProductDto = Partial<CreateProductDto>;</code></pre>\n</div>",
      "quiz": [
        {
          "question": "Какая стандартная утилита TypeScript создает новый тип, исключая из исходного определенные свойства?",
          "options": [
            "Omit<T, K>",
            "Exclude<T, K>",
            "Remove<T, K>",
            "Pick<T, K>"
          ],
          "correct": 0,
          "explanation": "Omit<T, K> удаляет ключи K из типа объекта T, а Exclude<T, U> удаляет типы из union-объединения."
        },
        {
          "question": "Что вернет тип Partial<{ a: string; b: number }>?",
          "options": [
            "{ a?: string; b?: number } (все поля станут опциональными)",
            "{ a: string } (только часть полей)",
            "{ a: string | null; b: number | null }",
            "any"
          ],
          "correct": 0,
          "explanation": "Утилита Partial обходит все ключи объекта и добавляет к каждому модификатор '?'."
        },
        {
          "question": "В чем разница между оператором | (union) и & (intersection)?",
          "options": [
            "| требует соответствия хотя бы одному из типов; & требует соответствия свойствам обоих типов одновременно.",
            "& используется только в математических формулах.",
            "| работает только с интерфейсами, а & только с классами.",
            "Они полностью взаимозаменяемы."
          ],
          "correct": 0,
          "explanation": "Union (|) объединяет возможные альтернативы, а Intersection (&) сшивает свойства типов вместе."
        }
      ]
    },
    {
      "num": 7,
      "title": "Глава 7. Мутабельность, вывод типов и глубокая неизменяемость с as const",
      "subtitle": "Как let и const влияют на сужение, расширение литералов (widening) и магия оператора as const.",
      "minutes": 12,
      "contentHtml": "<h2>1. Как let и const влияют на вывод типов</h2>\n<p>\n  То, как вы объявляете переменную, напрямую определяет тип, который выведет компилятор:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · let против const</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// const никогда не изменит значение:\n// TypeScript выводит точный литеральный тип \"dark\":\nconst fixedTheme = \"dark\"; \n\n// let может быть переприсвоен другой строкой позже:\n// TypeScript расширяет (widen) тип до общего типа string:\nlet mutableTheme = \"dark\"; \n\ntype AppTheme = \"light\" | \"dark\";\nfunction applyTheme(theme: AppTheme) {}\n\napplyTheme(fixedTheme);   //  УСПЕХ: \"dark\" входит в AppTheme\napplyTheme(mutableTheme); // ❌ ОШИБКА: Argument of type 'string' is not assignable to 'AppTheme'.</code></pre>\n</div>\n\n<h2>2. Проблема мутабельности объектов</h2>\n<p>\n  Даже если объект объявлен через <code class=\"inline-code\">const</code>, в JavaScript его внутренние поля остаются мутабельными. Поэтому TypeScript расширяет типы всех свойств объекта до широких примитивов:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Неожиданное расширение объекта</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>const config = {\n  endpoint: \"https://api.domain.com\",\n  method: \"GET\" // Тип выведен как string, а не литерал \"GET\"!\n};\n\nfunction fetchData(url: string, method: \"GET\" | \"POST\") {}\nfetchData(config.endpoint, config.method); // ❌ Ошибка! string не совместим с \"GET\" | \"POST\"</code></pre>\n</div>\n\n<h2>3. Магия утверждения as const</h2>\n<p>\n  Утверждение <code class=\"inline-code\">as const</code> (const assertion) приказывает компилятору:\n</p>\n<ol>\n  <li>Зафиксировать все литеральные типы без расширения.</li>\n  <li>Сделать все свойства объекта рекурсивно <code class=\"inline-code\">readonly</code>.</li>\n  <li>Превратить обычные массивы в неизменяемые кортежи (<code class=\"inline-code\">readonly [...]</code>).</li>\n</ol>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Решение через as const</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>const secureConfig = {\n  endpoint: \"https://api.domain.com\",\n  method: \"GET\"\n} as const;\n\n// secureConfig.method теперь имеет точный тип: readonly \"GET\"\nfetchData(secureConfig.endpoint, secureConfig.method); //  ИДЕАЛЬНО</code></pre>\n</div>\n\n<h2>4. Извлечение Union типов из массива as const</h2>\n<p>\n  Это один из самых элегантных приемов Мэтта Покока: создавайте массив значений в рантайме, а тип получайте из него автоматически!\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Единый источник правды</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Рантайм-массив опций:\nexport const AVAILABLE_ROLES = [\"admin\", \"editor\", \"viewer\"] as const;\n\n// Тип вычисляется автоматически: \"admin\" | \"editor\" | \"viewer\"\nexport type Role = (typeof AVAILABLE_ROLES)[number];</code></pre>\n</div>",
      "quiz": [
        {
          "question": "Почему переменная let x = 'GET' выводится как string, а const x = 'GET' — как 'GET'?",
          "options": [
            "Переменная let может быть изменена в любой момент, поэтому TS расширяет ее тип до широкого string; const неизменна, поэтому сохраняется точный литерал.",
            "Это баг старых версий компилятора.",
            "const всегда создает глобальную переменную.",
            "let работает только в циклах."
          ],
          "correct": 0,
          "explanation": "TypeScript учитывает потенциальную мутабельность переменной (Literal Widening) при использовании ключевого слова let."
        },
        {
          "question": "Что делает утверждение as const при применении к объекту?",
          "options": [
            "Делает все свойства объекта глубоко readonly и фиксирует точные литеральные типы без их расширения.",
            "Замораживает объект в JavaScript с помощью Object.freeze().",
            "Шифрует объект в оперативной памяти.",
            "Удаляет объект из сборщика мусора."
          ],
          "correct": 0,
          "explanation": "as const действует на уровне системы типов, делая поля неизменяемыми литералами."
        },
        {
          "question": "Как извлечь union-тип всех элементов из массива const ROLES = ['admin', 'user'] as const?",
          "options": [
            "(typeof ROLES)[number]",
            "ROLES.type",
            "keyof ROLES",
            "UnionOf<ROLES>"
          ],
          "correct": 0,
          "explanation": "Синтаксис (typeof ROLES)[number] обращается по числовому индексу ко всем элементам кортежа, образуя их объединение."
        }
      ]
    },
    {
      "num": 8,
      "title": "Глава 8. Классы: свойства, методы и наследование в TS",
      "subtitle": "Конструкторы, модификаторы public/private/protected, приватные поля #field, наследование и реализация интерфейсов.",
      "minutes": 13,
      "contentHtml": "<h2>1. Классы и строгая инициализация свойств</h2>\n<p>\n  В строгом режиме (<code class=\"inline-code\">strict: true</code>) TypeScript требует, чтобы каждое объявленное свойство класса было инициализировано либо по месту объявления, либо внутри конструктора:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Объявление класса</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>class UserAccount {\n  public readonly id: string;\n  public name: string;\n  private passwordHash: string;\n\n  constructor(id: string, name: string, passHash: string) {\n    this.id = id;\n    this.name = name;\n    this.passwordHash = passHash;\n  }\n\n  public verifyPassword(inputHash: string): boolean {\n    return this.passwordHash === inputHash;\n  }\n}</code></pre>\n</div>\n\n<h2>2. Модификаторы видимости в TypeScript против приватных полей JS (#)</h2>\n<p>\n  Важно понимать фундаментальную разницу между ключевыми словами TS и нативными приватными полями ECMAScript:\n</p>\n\n<div class=\"schema-box\">\n  <div class=\"schema-grid\">\n    <div class=\"schema-item blue\">\n      <strong>private в TypeScript</strong>\n      <p>Проверяется <b>только на этапе компиляции</b>. После компиляции в чистый JS поле остается обычным публичным свойством объекта.</p>\n    </div>\n    <div class=\"schema-item purple\">\n      <strong>Приватные поля JS (#privateField)</strong>\n      <p>Настоящая <b>рантайм-изоляция на уровне движка JS</b>. К полю физически невозможно получить доступ снаружи класса даже через рефлексию.</p>\n    </div>\n  </div>\n</div>\n\n<h2>3. Реализация интерфейсов (implements) и полиморфизм</h2>\n<p>\n  Интерфейс служит строгим контрактом, который класс обязуется выполнить:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Контракты классов</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>interface PaymentGateway {\n  charge(amountCents: number): Promise<{ success: boolean; txId: string }>;\n  refund(txId: string): Promise<boolean>;\n}\n\nclass StripeService implements PaymentGateway {\n  async charge(amount: number) {\n    // Реализация вызова Stripe API...\n    return { success: true, txId: \"ch_stripe_889\" };\n  }\n\n  async refund(txId: string) {\n    return true;\n  }\n}</code></pre>\n</div>",
      "quiz": [
        {
          "question": "В чем отличие модификатора private в TypeScript от нативного JS-синтаксиса #поле?",
          "options": [
            "private проверяется только компилятором TS и исчезает в скомпилированном JS; #поле обеспечивает жесткую изоляцию на уровне движка JavaScript в рантайме.",
            "private быстрее работает в памяти.",
            "#поле можно использовать только в браузерах Safari.",
            "private запрещает наследование, а #поле разрешает."
          ],
          "correct": 0,
          "explanation": "Модификатор private существует только на этапе статической проверки, а символ решетки (#) поддерживается самим рантаймом JS."
        },
        {
          "question": "Какое ключевое слово заставляет класс соблюдать сигнатуру интерфейса?",
          "options": [
            "implements",
            "extends",
            "satisfies",
            "inherits"
          ],
          "correct": 0,
          "explanation": "Ключевое слово implements связывает класс с интерфейсом контрактом проверки."
        },
        {
          "question": "Что означает модификатор protected у свойства класса?",
          "options": [
            "Свойство доступно внутри самого класса и во всех производных подклассах (наследниках), но скрыто от внешнего кода.",
            "Свойство доступно только для чтения через протокол HTTPS.",
            "Свойство нельзя изменить после создания экземпляра.",
            "Свойство доступно абсолютно всем модулям."
          ],
          "correct": 0,
          "explanation": "protected открывает доступ наследникам (subclasses), защищая поле от вызова на экземпляре снаружи."
        }
      ]
    },
    {
      "num": 9,
      "title": "Глава 9. Эксклюзивные фичи TypeScript: Enums, Namespaces и стираемый синтаксис",
      "subtitle": "Особенности, генерирующие код в рантайме: parameter properties, подводные камни enums и тренд на стираемый синтаксис.",
      "minutes": 11,
      "contentHtml": "<h2>1. Нестираемый синтаксис (Non-Erasable Syntax)</h2>\n<p>\n  В 95% случаев TypeScript просто стирает типы, не меняя структуру исполняемого JavaScript-кода. Однако в языке есть несколько исторических возможностей, которые <b>генерируют реальный JavaScript код</b> при компиляции:\n</p>\n<ul>\n  <li><b>Parameter Properties:</b> объявление полей прямо в параметрах конструктора.</li>\n  <li><b>Enums:</b> перечисления через ключевое слово <code class=\"inline-code\">enum</code>.</li>\n  <li><b>Namespaces:</b> пространства имен.</li>\n</ul>\n\n<h2>2. Parameter Properties: удобство против прозрачности</h2>\n<p>\n  Если добавить модификатор <code class=\"inline-code\">public</code>, <code class=\"inline-code\">private</code> или <code class=\"inline-code\">readonly</code> перед параметром конструктора, компилятор автоматически создаст и присвоит одноименное свойство экземпляру:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Parameter Properties</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Лаконичная запись:\nclass Rating {\n  constructor(public score: number, private maxScore: number = 5) {}\n}\n\n// Компилируется в JavaScript:\nclass Rating {\n  constructor(score, maxScore = 5) {\n    this.score = score;\n    this.maxScore = maxScore;\n  }\n}</code></pre>\n</div>\n\n<h2>3. Ловушки и проблемы Enums в TypeScript</h2>\n<p>\n  Перечисления (<code class=\"inline-code\">enum</code>) появились в самой первой версии TypeScript, когда в JavaScript еще не было модулей ES6. С числовыми enum связано опасное поведение (обратный маппинг и пропуск любых чисел):\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Проблема числовых enum</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>enum LogLevel {\n  Debug = 0,\n  Info = 1\n}\n\n// В ранних версиях и без строгости компилятор пропускал любые числа:\nconst level: LogLevel = 999; // ❌ Допускает несуществующие уровни!</code></pre>\n</div>\n\n<h2>4. Современная альтернатива: объекты с as const</h2>\n<p>\n  Современная рекомендация Мэтта Покока и TypeScript Core Team: <b>используйте стандартные JS-объекты с <code class=\"inline-code\">as const</code> вместо <code class=\"inline-code\">enum</code></b>. Это 100% валидный JavaScript без сюрпризов транспиляции:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Современный подход</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>export const StatusCode = {\n  Ok: 200,\n  NotFound: 404,\n  ServerError: 500\n} as const;\n\nexport type StatusCode = (typeof StatusCode)[keyof typeof StatusCode]; // 200 | 404 | 500</code></pre>\n</div>",
      "quiz": [
        {
          "question": "Почему многие современные архитекторы и Мэтт Покок рекомендуют предпочитать объекты as const вместо ключевого слова enum?",
          "options": [
            "Объекты as const — это стандартный JavaScript без нестандартного runtime-кода и ловушек обратного маппинга, они идеально работают с любыми бандлерами.",
            "enum запрещены стандартом ECMAScript 2024.",
            "enum занимают в 10 раз больше оперативной памяти.",
            "С объектами нельзя использовать TypeScript."
          ],
          "correct": 0,
          "explanation": "Объекты с 'as const' компилируются в предсказуемый плоский JS и не создают скрытых громоздких функций IIFE."
        },
        {
          "question": "Что произойдет при компиляции конструктора constructor(public id: string) в JavaScript?",
          "options": [
            "Компилятор автоматически сгенерирует строку this.id = id внутри тела конструктора.",
            "Компилятор выдаст ошибку, так как public запрещен в параметрах.",
            "Параметр id будет удален из конструктора.",
            "Создастся глобальная переменная window.id."
          ],
          "correct": 0,
          "explanation": "Parameter Properties — синтаксический сахар TS, который автоматически присваивает аргумент полю this.id."
        },
        {
          "question": "В чем суть предложения TC39 Type Annotations для JavaScript?",
          "options": [
            "Разрешить движкам JS игнорировать синтаксис типов как комментарии, обеспечивая 100% стираемый (erasable) синтаксис без транспиляции.",
            "Заставить браузеры проверять типы на C++ скорости.",
            "Удалить язык TypeScript из веб-стандартов.",
            "Сделать все типы глобальными объектами."
          ],
          "correct": 0,
          "explanation": "Предложение TC39 стремится сделать синтаксис типов нативным для JS, где движки просто пропускают аннотации, не ломая выполнение."
        }
      ]
    },
    {
      "num": 10,
      "title": "Глава 10. Вывод типов: typeof, индексированный доступ и ReturnType",
      "subtitle": "Принцип DRY в типах, оператор typeof в пространстве типов, keyof, Indexed Access и извлечение типов из функций.",
      "minutes": 15,
      "contentHtml": "<h2>1. Принцип DRY (Don't Repeat Yourself) для типов</h2>\n<p>\n  Когда разработчик вручную описывает тип данных, а затем вручную создает объект с теми же полями, он создает две точки синхронизации. Изменение структуры данных требует правок в двух местах.\n</p>\n<p>\n  TypeScript позволяет создавать <b>единый источник правды (Single Source of Truth)</b>: тип может автоматически рождаться из реального значения с помощью оператора <code class=\"inline-code\">typeof</code> в пространстве типов!\n</p>\n\n<h2>2. Оператор typeof в пространстве типов</h2>\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Вывод типа из значения</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>const defaultSettings = {\n  theme: \"dark\",\n  fontSize: 16,\n  autoSave: true,\n  retryAttempts: 3\n};\n\n// Тип AppSettings полностью выведен из существующего объекта!\ntype AppSettings = typeof defaultSettings;</code></pre>\n</div>\n\n<h2>3. Индексированный доступ к типам (Indexed Access)</h2>\n<p>\n  Подобно тому, как в JavaScript вы обращаетесь к значению объекта по ключу через квадратные скобки <code class=\"inline-code\">obj[\"key\"]</code>, в TypeScript можно извлекать тип конкретного свойства:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Индексированный доступ</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>interface ApiUserResponse {\n  id: string;\n  profile: {\n    avatarUrl: string;\n    bio: string;\n  };\n  roles: string[];\n}\n\n// Извлекаем точный тип вложенного профиля:\ntype UserProfile = ApiUserResponse[\"profile\"];\n\n// Извлекаем тип элемента массива (через [number]):\ntype RoleType = ApiUserResponse[\"roles\"][number]; // string</code></pre>\n</div>\n\n<h2>4. Оператор keyof: объединение всех ключей</h2>\n<p>\n  Оператор <code class=\"inline-code\">keyof T</code> возвращает union-тип всех строковых и числовых ключей типа <code class=\"inline-code\">T</code>:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Оператор keyof</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>type UserKeys = keyof ApiUserResponse; // \"id\" | \"profile\" | \"roles\"\n\n// Безопасный геттер свойства:\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}</code></pre>\n</div>\n\n<h2>5. Извлечение типов из функций: ReturnType и Parameters</h2>\n<p>\n  Вам не нужно вручную описывать тип того, что возвращает сторонняя функция. Встроенные утилиты извлекают типы автоматически:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · ReturnType & Parameters</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>function buildServerConfig() {\n  return {\n    host: \"127.0.0.1\",\n    port: 8080,\n    routes: [\"/api/v1\", \"/health\"]\n  };\n}\n\n// Тип возвращаемого значения функции без ее ручного переписывания:\ntype ServerConfig = ReturnType<typeof buildServerConfig>;\n\n// Тип аргументов функции в виде кортежа:\ntype ConfigParams = Parameters<typeof buildServerConfig>;</code></pre>\n</div>",
      "quiz": [
        {
          "question": "Что возвращает оператор keyof { id: number; title: string; done: boolean }?",
          "options": [
            "'id' | 'title' | 'done'",
            "['id', 'title', 'done'] в виде массива",
            "number | string | boolean",
            "string"
          ],
          "correct": 0,
          "explanation": "Оператор keyof возвращает объединение (union) всех названий ключей переданного типа."
        },
        {
          "question": "Какая утилита позволяет автоматически получить тип значения, возвращаемого функцией?",
          "options": [
            "ReturnType<typeof myFunc>",
            "OutputOf<myFunc>",
            "myFunc.returnType",
            "TypeOfReturn<myFunc>"
          ],
          "correct": 0,
          "explanation": "Утилита ReturnType<T> принимает тип функции и извлекает тип ее возвращаемого значения."
        },
        {
          "question": "Как извлечь тип конкретного поля 'avatar' из типа UserProfile?",
          "options": [
            "UserProfile['avatar']",
            "UserProfile.avatar",
            "get<UserProfile, 'avatar'>",
            "typeof UserProfile.avatar"
          ],
          "correct": 0,
          "explanation": "Индексированный доступ к типам (Indexed Access Types) осуществляется строго через квадратные скобки: Type['key']."
        }
      ]
    },
    {
      "num": 11,
      "title": "Глава 11. Аннотации, утверждения (as), satisfies и директивы подавления",
      "subtitle": "Опасность type assertion (as), революционный оператор satisfies, двойное приведение и @ts-expect-error.",
      "minutes": 14,
      "contentHtml": "<h2>1. Аннотация переменной против утверждения типа (as)</h2>\n<p>\n  Когда вы аннотируете переменную (<code class=\"inline-code\">const x: Type = ...</code>), компилятор проверяет значение на строгое соответствие. Когда вы используете утверждение типа (<code class=\"inline-code\">const x = ... as Type</code>), вы говорите компилятору: <i>«Я знаю лучше тебя, заткнись и поверь мне»</i>.\n</p>\n\n<div class=\"callout warning\">\n  <div class=\"callout-title\">⚠️ Почему as опасен в продакшене</div>\n  <p>Оператор <code class=\"inline-code\">as</code> отключает защиту компилятора от отсутствующих полей и опечаток. Если вы напишете <code class=\"inline-code\">const user = {} as User</code>, код скомпилируется без ошибок, но при первом обращении к <code class=\"inline-code\">user.name.toUpperCase()</code> упадет в рантайме!</p>\n</div>\n\n<h2>2. Революционный оператор satisfies (TypeScript 4.9+)</h2>\n<p>\n  До появления <code class=\"inline-code\">satisfies</code> разработчики сталкивались с дилеммой:\n</p>\n<ul>\n  <li>Если аннотировать объект через <code class=\"inline-code\">: Record&lt;string, Color&gt;</code>, TypeScript проверяет валидность полей, но <b>забывает точные имена ключей</b>.</li>\n  <li>Если не аннотировать объект, сохраняются точные ключи, но <b>нет валидации структуры</b>.</li>\n</ul>\n<p>\n  Оператор <code class=\"inline-code\">satisfies</code> решает обе проблемы: он <b>валидирует объект</b> на соответствие типу, но <b>сохраняет самый узкий литеральный тип</b> значения!\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Сила satisfies</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>type RGB = [red: number, green: number, blue: number];\ntype Color = string | RGB;\n\nconst palette = {\n  primary: \"#38bdf8\",\n  accent: [16, 185, 129]\n} satisfies Record<string, Color>;\n\n//  TypeScript знает, что palette.primary — это именно строка:\nconsole.log(palette.primary.toUpperCase());\n\n//  TypeScript знает, что palette.accent — это именно кортеж чисел RGB:\nconsole.log(palette.accent.map(channel => channel * 0.9));</code></pre>\n</div>\n\n<h2>3. Директивы подавления: @ts-expect-error против @ts-ignore</h2>\n<p>\n  Никогда не используйте <code class=\"inline-code\">@ts-ignore</code>. Всегда используйте <b><code class=\"inline-code\">@ts-expect-error</code></b>:\n</p>\n<ul>\n  <li><b>@ts-ignore:</b> Слепо глушит ошибки в следующей строке. Если после рефакторинга код стал правильным, директива остается висеть мертвым грузом навсегда.</li>\n  <li><b>@ts-expect-error:</b> Ожидает ошибку в следующей строке. Если строка <i>перестала вызывать ошибку</i>, TypeScript подсветит саму директиву как неиспользуемую, защищая кодовую базу от устаревших хаков!</li>\n</ul>",
      "quiz": [
        {
          "question": "В чем главное преимущество оператора satisfies перед классической аннотацией переменной через двоеточие?",
          "options": [
            "satisfies проверяет соответствие объекта типу, но сохраняет максимально точные литеральные типы ключей и значений без расширения.",
            "satisfies работает быстрее в 10 раз.",
            "satisfies превращает код в веб-воркер.",
            "satisfies создает автоматические юнит-тесты."
          ],
          "correct": 0,
          "explanation": "Оператор satisfies гарантирует валидность структуры, не стирая информацию об уникальных свойствах конкретного объекта."
        },
        {
          "question": "Почему директива @ts-expect-error считается безопаснее, чем @ts-ignore?",
          "options": [
            "Если ошибка в строке исчезнет (например, после обновления библиотеки или фикса бага), компилятор выдаст предупреждение о ненужности директивы.",
            "@ts-expect-error работает только на сервере.",
            "@ts-ignore удаляет код из итогового бандла.",
            "@ts-expect-error блокирует запуск тестов."
          ],
          "correct": 0,
          "explanation": "@ts-expect-error самоочищается: как только ошибка исчезает, TS сигнализирует, что директиву пора удалить."
        },
        {
          "question": "Что произойдет при коде const u = {} as UserProfile?",
          "options": [
            "TypeScript поверит утверждению разработчика и посчитает объект пустышкой валидным UserProfile, создавая риск падения в рантайме.",
            "Компилятор выбросит ошибку Type Assertion Error.",
            "Объект автоматически заполнится дефолтными значениями.",
            "Произойдет зацикливание компилятора."
          ],
          "correct": 0,
          "explanation": "Оператор 'as' насильственно переопределяет тип, перекладывая всю ответственность на разработчика."
        }
      ]
    },
    {
      "num": 12,
      "title": "Глава 12. Странные и неочевидные места TypeScript",
      "subtitle": "Evolving any, структурная типизация, почему Object.keys() возвращает string[], пустой тип {} и типизация this.",
      "minutes": 16,
      "contentHtml": "<h2>1. Эволюционирующий тип any (Evolving Any)</h2>\n<p>\n  Если объявить переменную через <code class=\"inline-code\">let</code> без начального значения и без явной аннотации типа, компилятор временно присваивает ей тип <code class=\"inline-code\">any</code>. Однако при последующих присваиваниях тип <b>эволюционирует</b>:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Эволюция типов</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>let dynamicValue; // тип: any (временно)\n\ndynamicValue = 42;\n// Теперь dynamicValue имеет тип number!\nconsole.log(dynamicValue.toFixed(2));\n\ndynamicValue = \"hello\";\n// Теперь dynamicValue эволюционировал в string!\nconsole.log(dynamicValue.toUpperCase());</code></pre>\n</div>\n\n<h2>2. Почему Object.keys() возвращает string[], а не (keyof T)[]?</h2>\n<p>\n  Это одна из самых частых загадок для TypeScript-разработчиков. Причина кроется в <b>структурной подтипизации (duck typing)</b>:\n</p>\n<div class=\"callout warning\">\n  <div class=\"callout-title\">💡 Открытая природа типов в TypeScript</div>\n  <p>\n    Тип в TypeScript описывает <i>минимальный гарантированный набор свойств</i>, но не запрещает объекту иметь <b>дополнительные необъявленные свойства</b> в рантайме! Поэтому компилятор не может гарантировать, что в объекте нет других ключей помимо <code class=\"inline-code\">keyof T</code>, и безопасно возвращает <code class=\"inline-code\">string[]</code>.\n  </p>\n</div>\n\n<h2>3. Коварный пустой объект {}</h2>\n<p>\n  Многие ошибочно думают, что тип <code class=\"inline-code\">{}</code> означает «пустой объект». На самом деле в TypeScript <code class=\"inline-code\">{}</code> означает: <b>«любое значение, кроме null и undefined»</b>!\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Сюрпризы типа {}</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Все эти присваивания абсолютно валидны для {}:\nconst a: {} = \"строка\";\nconst b: {} = 123;\nconst c: {} = true;\nconst d: {} = { x: 1 };\n\n// И только null и undefined вызовут ошибку:\nconst err1: {} = null;      // ❌ Ошибка\nconst err2: {} = undefined; // ❌ Ошибка\n\n// Для настоящего пустого объекта используйте:\ntype EmptyObject = Record<string, never>;</code></pre>\n</div>\n\n<h2>4. Явная типизация контекста this в функциях</h2>\n<p>\n  Чтобы типизировать <code class=\"inline-code\">this</code> в обычной функции (не стрелочной), укажите фиктивный первый параметр с именем <code class=\"inline-code\">this</code>. Компилятор сотрет его при сборке:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Типизация this</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>interface ButtonElement {\n  id: string;\n  disable(): void;\n}\n\nfunction handleClick(this: ButtonElement, event: MouseEvent) {\n  console.log(`Нажата кнопка ${this.id}`);\n  this.disable();\n}</code></pre>\n</div>",
      "quiz": [
        {
          "question": "Почему стандартный метод Object.keys(obj) в TypeScript возвращает string[], а не (keyof T)[]?",
          "options": [
            "Из-за структурной подтипизации: реальный объект в рантайме может содержать дополнительные свойства, не описанные в типе T.",
            "В спецификации JavaScript запрещены массивы литералов.",
            "TypeScript не умеет определять ключи объектов.",
            "Это опечатка в стандартной библиотеке lib.d.ts."
          ],
          "correct": 0,
          "explanation": "Объекты в TypeScript 'открыты': тип определяет минимум полей, но в рантайме объект может иметь больше полей, поэтому ключи безопасно выводятся как string[]."
        },
        {
          "question": "Каким значениям разрешено соответствовать типу {} (пустой тип объекта) в TypeScript?",
          "options": [
            "Любому значению, кроме null и undefined (включая числа, строки и булевы значения).",
            "Исключительно объекту без единого свойства {}.",
            "Только объектам, созданным через Object.create(null).",
            "Никаким значениям, это аналог never."
          ],
          "correct": 0,
          "explanation": "Тип {} представляет любой тип, имеющий прототип (все, кроме null и undefined)."
        },
        {
          "question": "Как гарантированно описать тип действительно пустого объекта, в который нельзя добавить свойства?",
          "options": [
            "Record<string, never>",
            "{}",
            "object",
            "null"
          ],
          "correct": 0,
          "explanation": "Record<string, never> говорит компилятору: все возможные строковые ключи имеют тип never (недопустимы)."
        }
      ]
    },
    {
      "num": 13,
      "title": "Глава 13. Модули, скрипты и файлы деклараций (.d.ts)",
      "subtitle": "Различие между модулями и скриптами, declare, глобальная аугментация, DefinitelyTyped и опция skipLibCheck.",
      "minutes": 14,
      "contentHtml": "<h2>1. Модули против скриптов в TypeScript</h2>\n<p>\n  TypeScript классифицирует файлы <code class=\"inline-code\">.ts</code> по фундаментальному правилу:\n</p>\n<ul>\n  <li><b>Модуль:</b> Если файл содержит хотя бы одну инструкцию <code class=\"inline-code\">import</code> или <code class=\"inline-code\">export</code>, он считается изолированным модулем с собственной локальной областью видимости.</li>\n  <li><b>Скрипт:</b> Если в файле нет ни одного <code class=\"inline-code\">import</code> или <code class=\"inline-code\">export</code>, компилятор считает его глобальным скриптом! Все переменные и интерфейсы из него становятся видны абсолютно во всех файлах вашего проекта без импорта, что часто приводит к конфликтам имен.</li>\n</ul>\n\n<div class=\"callout tip\">\n  <div class=\"callout-title\">💡 Превращение скрипта в модуль</div>\n  <p>Чтобы изолировать файл без реальных импортов, достаточно добавить в его начало или конец строчку: <code class=\"inline-code\">export {};</code></p>\n</div>\n\n<h2>2. Файлы деклараций (.d.ts) и ключевое слово declare</h2>\n<p>\n  Файлы деклараций содержат только чистую информацию о типах без какого-либо исполняемого кода. Они описывают форму библиотек, написанных на чистом JavaScript, или глобальных переменных среды (например, <code class=\"inline-code\">process.env</code>):\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · globals.d.ts</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Описываем глобальную переменную, внедренную сборщиком Vite/Webpack:\ndeclare const __APP_VERSION__: string;\n\n// Расширяем глобальный объект Window:\ndeclare global {\n  interface Window {\n    analyticsTracker?: {\n      trackEvent(name: string, payload: Record<string, unknown>): void;\n    };\n  }\n}</code></pre>\n</div>\n\n<h2>3. Аугментация сторонних модулей (Module Augmentation)</h2>\n<p>\n  Если вам нужно добавить кастомное поле в интерфейс популярного фреймворка (например, пользователя в <code class=\"inline-code\">Express.Request</code>), используйте слияние деклараций:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · express-augmentation.d.ts</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>import \"express\";\n\ndeclare module \"express\" {\n  export interface Request {\n    currentUser?: {\n      id: string;\n      role: \"admin\" | \"member\";\n    };\n  }\n}</code></pre>\n</div>",
      "quiz": [
        {
          "question": "По какому признаку TypeScript определяет, что файл .ts является изолированным модулем, а не глобальным скриптом?",
          "options": [
            "Наличие хотя бы одной инструкции import или export внутри файла.",
            "Наличие комментария // @module в первой строке.",
            "Имя файла обязано содержать суффикс .module.ts.",
            "Размер файла должен превышать 1 КБ."
          ],
          "correct": 0,
          "explanation": "Наличие import или export переключает файл из режима глобального скрипта в режим изолированного ES-модуля."
        },
        {
          "question": "Для чего служат файлы с расширением .d.ts?",
          "options": [
            "Они содержат только декларации типов без исполняемого кода для описания формы библиотек и окружения.",
            "Они предназначены для написания документации в формате Markdown.",
            "Они хранят бинарные таблицы виртуальных методов.",
            "Это временные файлы сборщика, которые всегда нужно удалять."
          ],
          "correct": 0,
          "explanation": ".d.ts (Declaration Files) описывают типы сторонних пакетов и глобальных переменных, не порождая исполняемого JS-кода."
        },
        {
          "question": "Что делает опция skipLibCheck: true в tsconfig.json?",
          "options": [
            "Пропускает повторную проверку типов внутри сторонних файлов библиотек (.d.ts в node_modules), значительно ускоряя компиляцию проекта.",
            "Отключает проверку типов во всем проекте.",
            "Удаляет папку node_modules после сборки.",
            "Запрещает импорт любых npm пакетов."
          ],
          "correct": 0,
          "explanation": "skipLibCheck избавляет компилятор от необходимости проверять согласованность чужих .d.ts файлов в node_modules, ускоряя сборку в разы."
        }
      ]
    },
    {
      "num": 14,
      "title": "Глава 14. Тонкая настройка компилятора: tsconfig.json без тайн",
      "subtitle": "Рекомендованный эталон tsconfig.json от Мэтта Покока, флаги strict, noUncheckedIndexedAccess и moduleResolution.",
      "minutes": 13,
      "contentHtml": "<h2>1. Рекомендованный эталон tsconfig.json от Мэтта Покока</h2>\n<p>\n  Файл <code class=\"inline-code\">tsconfig.json</code> содержит десятки устаревших флагов. Мэтт Покок рекомендует лаконичный и бескомпромиссный золотой стандарт конфигурации для современных приложений:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">JSON · Эталонный tsconfig.json</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>{\n  \"compilerOptions\": {\n    /* Базовые параметры окружения */\n    \"target\": \"ES2022\",\n    \"module\": \"ESNext\",\n    \"moduleResolution\": \"Bundler\",\n    \"moduleDetection\": \"force\",\n    \"isolatedModules\": true,\n    \"skipLibCheck\": true,\n    \"esModuleInterop\": true,\n\n    /* Строгость и безопасность */\n    \"strict\": true,\n    \"noUncheckedIndexedAccess\": true,\n\n    /* Сборка */\n    \"noEmit\": true\n  }\n}</code></pre>\n</div>\n\n<h2>2. Скрытое сокровище: noUncheckedIndexedAccess</h2>\n<p>\n  По умолчанию даже при <code class=\"inline-code\">strict: true</code> компилятор TypeScript считает, что доступ к любому элементу массива по индексу всегда возвращает значение:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Опасность дефолтного поведения</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>const users = [\"Alex\", \"Maria\"];\n\n// По умолчанию: тип first выводится как string!\n// Но если массив пуст, там лежит undefined, и вызов toUpperCase() уронит прод!\nconst first = users[999]; \nconsole.log(first.toUpperCase()); // 💥 Uncaught TypeError: Cannot read properties of undefined</code></pre>\n</div>\n\n<p>\n  Флаг <b><code class=\"inline-code\">\"noUncheckedIndexedAccess\": true</code></b> автоматически добавляет <code class=\"inline-code\">| undefined</code> ко всем результатам обращения по индексу массива или динамическому ключу объекта, заставляя разработчика сделать проверку!\n</p>\n\n<h2>3. moduleResolution: \"Bundler\"</h2>\n<p>\n  В TypeScript 5.0+ появился режим <code class=\"inline-code\">\"moduleResolution\": \"Bundler\"</code>. Он разработан специально для проектов, использующих современные сборщики (Vite, Next.js, esbuild, Webpack 5), поддерживая импорты без расширений файлов и поле <code class=\"inline-code\">\"exports\"</code> из <code class=\"inline-code\">package.json</code>.\n</p>",
      "quiz": [
        {
          "question": "За что отвечает флаг noUncheckedIndexedAccess: true в настройках компилятора?",
          "options": [
            "Автоматически добавляет | undefined к результатам чтения элементов массивов по индексу и объектов по динамическому ключу.",
            "Запрещает использовать массивы в проекте.",
            "Блокирует доступ к базе данных.",
            "Удаляет неиспользуемые индексы."
          ],
          "correct": 0,
          "explanation": "Этот флаг страхует от падений из-за undefined, когда индекс выходит за пределы длины массива."
        },
        {
          "question": "Для каких проектов рекомендован параметр moduleResolution: 'Bundler'?",
          "options": [
            "Для проектов, использующих современные сборщики (Vite, Next.js, Webpack, esbuild), где транспиляция выполняется бандлером.",
            "Только для старых версий Node.js до v10.",
            "Исключительно для мобильных приложений на Cordova.",
            "Для проектов без TypeScript."
          ],
          "correct": 0,
          "explanation": "'Bundler' моделирует правила поиска модулей современных инструментов сборки."
        },
        {
          "question": "Что делает опция moduleDetection: 'force'?",
          "options": [
            "Заставляет компилятор считать все файлы .ts изолированными ES-модулями, даже если в них нет операторов import/export.",
            "Принудительно устанавливает ECMAScript 5.",
            "Удаляет глобальные переменные браузера.",
            "Запрещает использовать модули CommonJS."
          ],
          "correct": 0,
          "explanation": "Эта опция навсегда ликвидирует проблему случайных глобальных скриптов в кодовой базе."
        }
      ]
    },
    {
      "num": 15,
      "title": "Глава 15. Проектирование типов: дженерики, шаблонные литералы и сопоставления",
      "subtitle": "Дженерики как функции над типами, условные типы T extends U ? X : Y, магия infer и Mapped Types.",
      "minutes": 18,
      "contentHtml": "<h2>1. Дженерики — функции над типами</h2>\n<p>\n  В то время как обычные функции принимают аргументы-значения и возвращают новые значения, <b>дженерик-типы принимают типы-аргументы и возвращают новые типы</b>!\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Дженерик-обертка ответа</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Обобщенный конверт для API ответов с дефолтным значением:\ntype ApiResponse<TData = unknown> = {\n  status: \"ok\" | \"error\";\n  timestamp: number;\n  data: TData;\n  error?: string;\n};\n\ntype UserListResponse = ApiResponse<{ id: string; name: string }[]>;</code></pre>\n</div>\n\n<h2>2. Шаблонные литеральные типы (Template Literal Types)</h2>\n<p>\n  TypeScript позволяет склеивать строковые литералы подобно шаблонным строкам JavaScript:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Шаблонные типы событий</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>type Entity = \"user\" | \"order\" | \"invoice\";\ntype Action = \"create\" | \"update\" | \"delete\";\n\n// Автоматически генерирует 9 уникальных строковых типов:\n// \"user_create\" | \"user_update\" | ... | \"invoice_delete\"\ntype EventName = `${Entity}_${Action}`;\n\ntype EventHandler = `on${Capitalize<EventName>}`; // \"onUser_create\" | ...</code></pre>\n</div>\n\n<h2>3. Условные типы и ключевое слово infer</h2>\n<p>\n  Условный тип действует как тернарный оператор в пространстве типов: <code class=\"inline-code\">T extends Condition ? TrueBranch : FalseBranch</code>.\n  С помощью ключевого слова <b><code class=\"inline-code\">infer</code></b> компилятор может «вытащить» вложенный тип из любой сложной структуры:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Извлечение Promise типа с infer</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Извлекаем тип T из Promise<T>:\ntype AwaitedType<T> = T extends Promise<infer InnerType> ? InnerType : T;\n\ntype Result = AwaitedType<Promise<{ token: string }>>; // { token: string }</code></pre>\n</div>\n\n<h2>4. Сопоставленные типы (Mapped Types)</h2>\n<p>\n  Сопоставленный тип обходит ключи исходного типа с помощью синтаксиса <code class=\"inline-code\">[K in keyof T]</code> и может трансформировать их:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Собственный DeepReadonly</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>type DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];\n};</code></pre>\n</div>",
      "quiz": [
        {
          "question": "Какую роль выполняет ключевое слово infer внутри условных типов (Conditional Types)?",
          "options": [
            "Объявляет переменную типа для автоматического вывода и извлечения вложенного типа внутри условия проверки.",
            "Указывает компилятору запустить инференс на сервере.",
            "Запрещает использование дженериков.",
            "Преобразует строку в число."
          ],
          "correct": 0,
          "explanation": "'infer R' просит TypeScript самостоятельно сопоставить паттерн и поместить внутренний тип в переменную R."
        },
        {
          "question": "Что сгенерирует шаблонный тип `${'top' | 'bottom'}-${'left' | 'right'}`?",
          "options": [
            "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
            "['top-left', 'bottom-right']",
            "string",
            "Ошибку синтаксиса"
          ],
          "correct": 0,
          "explanation": "Шаблонные литеральные типы вычисляют декартово произведение всех строковых членов объединения."
        },
        {
          "question": "Как в сопоставленном типе (Mapped Type) удалить модификатор опциональности '?' со всех полей?",
          "options": [
            "Использовать префикс -?: [K in keyof T]-?: T[K]",
            "Удалить вопросительный знак вручную.",
            "Использовать Required<T> = false",
            "В TypeScript это невозможно."
          ],
          "correct": 0,
          "explanation": "Синтаксис '-?' явно удаляет модификатор опциональности у каждого ключа при итерации."
        }
      ]
    },
    {
      "num": 16,
      "title": "Глава 16. Создание мощных общих утилит: предикаты, assert-функции и перегрузки",
      "subtitle": "Архитектура папки /utils, предикаты типов (value is T), assertion functions и перегрузка функций.",
      "minutes": 17,
      "contentHtml": "<h2>1. Третий уровень сложности: архитектура папки /utils</h2>\n<p>\n  Большинство разработчиков считают, что продвинутые трюки TypeScript нужны только авторам библиотек. Однако в любой растущей кодовой базе есть папка <code class=\"inline-code\">/utils</code> с функциями, которые вызываются в сотнях мест проекта. Грамотное проектирование этих функций экономит недели работы всей команды.\n</p>\n\n<h2>2. Пользовательские предикаты типов (Type Predicates)</h2>\n<p>\n  Классическая проблема: при фильтрации массива через <code class=\"inline-code\">.filter(Boolean)</code> компилятор не убирает <code class=\"inline-code\">undefined</code> и <code class=\"inline-code\">null</code> из типа массива.\n  Решение — функция с предикатом типа <code class=\"inline-code\">val is T</code>:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Идеальный фильтр элементов</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Предикат типа сообщает компилятору: если функция вернула true, val точно не null/undefined!\nexport function isDefined<T>(value: T | null | undefined): value is T {\n  return value !== null && value !== undefined;\n}\n\nconst mixedList: (string | null | undefined)[] = [\"alpha\", null, \"beta\", undefined];\n\n// cleanList имеет чистый тип string[] без null и undefined!\nconst cleanList = mixedList.filter(isDefined);</code></pre>\n</div>\n\n<h2>3. Функции утверждения (Assertion Functions)</h2>\n<p>\n  Используйте синтаксис <code class=\"inline-code\">asserts condition</code> для функций валидации инвариантов. Если функция не выбросила исключение, компилятор автоматически сужает тип переменной дальше по коду:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Функция утверждения</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>function assertNonNullable<T>(val: T, message?: string): asserts val is NonNullable<T> {\n  if (val === null || val === undefined) {\n    throw new Error(message || \"Значение не должно быть null или undefined!\");\n  }\n}\n\nfunction processOrder(orderId?: string) {\n  assertNonNullable(orderId, \"ID заказа обязателен для обработки\");\n\n  // После этой строчки orderId ГАРАНТИРОВАННО имеет тип string!\n  console.log(orderId.toUpperCase());\n}</code></pre>\n</div>\n\n<h2>4. Перегрузка функций (Function Overloads)</h2>\n<p>\n  Перегрузки позволяют описать несколько разных вариантов вызова одной и той же функции с соответствующими возвращаемыми типами:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Перегрузки функций</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Сигнатура перегрузки 1: если передан числовой ID, возвращаем один элемент:\nfunction fetchResource(id: number): Promise<Resource>;\n\n// Сигнатура перегрузки 2: если передан массив ID, возвращаем массив:\nfunction fetchResource(ids: number[]): Promise<Resource[]>;\n\n// Сигнатура реализации:\nfunction fetchResource(idOrIds: number | number[]): Promise<Resource | Resource[]> {\n  if (Array.isArray(idOrIds)) {\n    return Promise.resolve(idOrIds.map(id => ({ id, name: \"Item \" + id })));\n  }\n  return Promise.resolve({ id: idOrIds, name: \"Item \" + idOrIds });\n}</code></pre>\n</div>",
      "quiz": [
        {
          "question": "Что сообщает компилятору синтаксис возвращаемого значения function isUser(val: unknown): val is User?",
          "options": [
            "Это предикат типа: если функция возвращает true, компилятор гарантированно сужает тип переменной val до User.",
            "Функция компилируется в проверку instanceof User.",
            "Функция возвращает булеву строку 'true' или 'false'.",
            "Это декоратор безопасности."
          ],
          "correct": 0,
          "explanation": "Type Predicate (val is T) учит компилятор пользовательским проверкам типов."
        },
        {
          "question": "В чем особенность сигнатуры function assert(c: boolean): asserts c?",
          "options": [
            "Это функция утверждения: если она завершилась без исключения, компилятор считает условие c истинным в последующих строках кода.",
            "Функция всегда падает с ошибкой.",
            "Функция возвращает промис.",
            "Она заменяет оператор return."
          ],
          "correct": 0,
          "explanation": "Синтаксис asserts сообщает компилятору об инварианте: успешный выход из функции сужает типы дальше по потоку выполнения."
        },
        {
          "question": "Как работают перегрузки функций (Function Overloads) в TypeScript?",
          "options": [
            "Задаются несколько сигнатур вызова подряд, а затем одна общая сигнатура реализации, скрытая от конечных потребителей.",
            "Создаются несколько отдельных функций с одинаковыми именами в рантайме.",
            "Перегрузки доступны только для конструкторов классов.",
            "В TypeScript перегрузки запрещены."
          ],
          "correct": 0,
          "explanation": "Клиенты функции видят только открытые сигнатуры перегрузок, а реализация объединяет их в одном месте."
        }
      ]
    }
  ]
};
