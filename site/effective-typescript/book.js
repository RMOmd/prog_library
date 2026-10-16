// Auto-generated unified book data for Effective TypeScript (Dan Vanderkam)
window.BOOK_DATA = {
  "id": "effective-typescript",
  "title": "Эффективный TypeScript",
  "author": "Дэн Вандеркам",
  "cover": "img/cover.jpg",
  "totalChapters": 8,
  "chapters": [
    {
      "num": 1,
      "title": "Глава 1. Знакомство с TypeScript: фундамент и ловушки (Правила 1–5)",
      "subtitle": "Отношения между JS и TS, опции компилятора, независимость генерации кода от типов, структурная подтипизация и ограничение any.",
      "minutes": 12,
      "contentHtml": "<h2>1. Правило 1: TypeScript — строгое надмножество JavaScript</h2>\n<p>\n  Каждая корректная программа на JavaScript является валидной программой на TypeScript. Обратное, однако, неверно: TypeScript добавляет синтаксис аннотаций, который не поддерживается движками JS. Главная цель компилятора — найти несоответствия формы данных и намерений разработчика еще до запуска кода в продакшене.\n</p>\n\n<div class=\"callout tip\">\n  <div class=\"callout-title\">💡 Суть правила 1</div>\n  <p>TypeScript не меняет рантайм-семантику JavaScript. Если ваш код JavaScript содержит скрытую ошибку логики, превращение файла в <code class=\"inline-code\">.ts</code> подсветит проблему, но сам по себе TypeScript не сделает плохой алгоритм хорошим.</p>\n</div>\n\n<h2>2. Правило 2: Выбирайте правильные настройки компилятора</h2>\n<p>\n  Поведение TypeScript кардинально зависит от настроек в <code class=\"inline-code\">tsconfig.json</code>. Дэн Вандеркам формулирует четкое руководство:\n</p>\n<ul>\n  <li><b>noImplicitAny: true</b> — запрещает неявный вывод типа <code class=\"inline-code\">any</code> для параметров функций и переменных, заставляя явно описывать типы.</li>\n  <li><b>strictNullChecks: true</b> — запрещает неявное присваивание <code class=\"inline-code\">null</code> и <code class=\"inline-code\">undefined</code> обычным типам (предотвращает пресловутый «миллиардный баг» <code class=\"inline-code\">undefined is not a function</code>).</li>\n  <li><b>strict: true</b> — включает полный пакет строгих проверок компилятора. Начинайте любой новый проект только со <code class=\"inline-code\">strict: true</code>!</li>\n</ul>\n\n<h2>3. Правило 3: Генерация кода полностью независима от типов</h2>\n<p>\n  Компилятор <code class=\"inline-code\">tsc</code> выполняет две совершенно не связанные между собой операции:\n</p>\n<ol>\n  <li>Удаление (стирание) всех типов, интерфейсов и аннотаций.</li>\n  <li>Транспиляция современного синтаксиса JS в целевую версию ECMAScript.</li>\n</ol>\n\n<div class=\"callout warning\">\n  <div class=\"callout-title\">⚠️ Следствия независимости генерации от типов</div>\n  <p>\n    • <b>Ошибки типов не препятствуют сборке:</b> по умолчанию <code class=\"inline-code\">tsc</code> сгенерирует JS-код, даже если в типах есть ошибки (если не включен флаг <code class=\"inline-code\">noEmitOnError: true</code>).<br>\n    • <b>Нельзя проверить тип интерфейса в рантайме:</b> конструкция <code class=\"inline-code\">if (val instanceof UserInterface)</code> вызовет фатальную ошибку в JS, так как интерфейс стерт при сборке!<br>\n    • <b>Типы никак не влияют на производительность выполнения программы.</b>\n  </p>\n</div>\n\n<h2>4. Правило 4: Привыкайте к структурной типизации (Duck Typing)</h2>\n<p>\n  JavaScript исторически работает по принципу «утиной типизации»: если что-то плавает как утка и крякает как утка, то это утка. TypeScript моделирует именно это поведение: типы <b>структурны, а не номинальны</b>.\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Структурная подтипизация</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>interface Vector2D {\n  x: number;\n  y: number;\n}\n\nfunction calculateLength(v: Vector2D): number {\n  return Math.sqrt(v.x * v.x + v.y * v.y);\n}\n\n// 3D-вектор имеет x, y, а также дополнительное поле z:\ninterface Vector3D {\n  x: number;\n  y: number;\n  z: number;\n}\n\nconst v3: Vector3D = { x: 3, y: 4, z: 5 };\n\n//  УСПЕХ: Vector3D совместим с Vector2D, так как содержит необходимые x и y!\nconsole.log(calculateLength(v3)); // 5</code></pre>\n</div>\n\n<div class=\"callout rule\">\n  <div class=\"callout-title\">⚖️ Правило открытости типов</div>\n  <p>Типы в TypeScript открыты: значение, соответствующее интерфейсу, может иметь <b>больше свойств</b>, чем указано в типе, но никогда не меньше.</p>\n</div>\n\n<h2>5. Правило 5: Ограничьте применение типа any</h2>\n<p>\n  Тип <code class=\"inline-code\">any</code> отключает проверку типов и автодополнение в IDE, маскирует баги в сигнатурах функций и делает рефакторинг крайне опасным. Используйте его только как крайнее временное средство при миграции.\n</p>",
      "quiz": [
        {
          "question": "Что произойдет при попытке выполнить код if (arg instanceof MyInterface) в JavaScript?",
          "options": [
            "Выбросится исключение ReferenceError в рантайме, так как интерфейсы полностью стираются при сборке и не существуют в JS.",
            "Код вернет true, если arg реализует MyInterface.",
            "TypeScript заменит интерфейс на скрытую функцию-валидатор.",
            "Код вернет false."
          ],
          "correct": 0,
          "explanation": "Интерфейсы — порождение мира типов. В исполняемом JS их нет, поэтому оператор instanceof неприменим к интерфейсам и псевдонимам типов."
        },
        {
          "question": "В чем заключается суть структурной типизации (structural typing) в TypeScript?",
          "options": [
            "Совместимость типов определяется совпадением их внутренней структуры (набора и типов полей), а не их именами или декларацией наследования.",
            "Все типы должны наследоваться от одного общего базового класса Object.",
            "Типы определяются исключительно через структуру базы данных SQL.",
            "Переменные могут хранить только плоские структуры данных без вложенности."
          ],
          "correct": 0,
          "explanation": "Если объект содержит все свойства, требуемые интерфейсом, он признается совместимым с ним, независимо от того, как этот объект был создан."
        },
        {
          "question": "Какой флаг в tsconfig.json предотвращает появление выходных .js файлов при наличии хотя бы одной ошибки компиляции типов?",
          "options": [
            "noEmitOnError: true",
            "strict: true",
            "skipLibCheck: true",
            "stopOnFirstError: true"
          ],
          "correct": 0,
          "explanation": "По умолчанию tsc генерирует JS даже с ошибками. Флаг noEmitOnError останавливает эмиссию файлов при ошибках типов."
        }
      ]
    },
    {
      "num": 2,
      "title": "Глава 2. Система типов в действии: типы как множества значений (Правила 6–18)",
      "subtitle": "Типы как множества значений, пространства типов и значений, объявление vs утверждение, type vs interface и отображенные типы.",
      "minutes": 16,
      "contentHtml": "<h2>1. Правило 7: Воспринимайте типы как множества значений</h2>\n<p>\n  Дэн Вандеркам предлагает идеальную математическую ментальную модель: <b>тип — это просто множество допустимых значений</b>.\n</p>\n<div class=\"schema-box\">\n  <div class=\"schema-grid\">\n    <div class=\"schema-item blue\">\n      <strong>Множество never</strong>\n      <p>Пустое множество (Ø). Ни одно значение не может принадлежать типу <code class=\"inline-code\">never</code>.</p>\n    </div>\n    <div class=\"schema-item emerald\">\n      <strong>Литеральные типы</strong>\n      <p>Множества из одного элемента: <code class=\"inline-code\">\"A\"</code> содержит только строку <code class=\"inline-code\">\"A\"</code>.</p>\n    </div>\n    <div class=\"schema-item amber\">\n      <strong>Объединение (Union |)</strong>\n      <p>Объединение множеств: <code class=\"inline-code\">A | B</code> содержит элементы множества A и множества B.</p>\n    </div>\n    <div class=\"schema-item purple\">\n      <strong>Пересечение (Intersection &)</strong>\n      <p>Пересечение множеств: <code class=\"inline-code\">A & B</code> содержит только те значения, которые входят и в A, и в B.</p>\n    </div>\n  </div>\n</div>\n<p>\n  Ключевое слово <code class=\"inline-code\">extends</code> в дженериках означает «является ли подмножеством»: <code class=\"inline-code\">T extends U</code> истинно, если все значения из множества <code class=\"inline-code\">T</code> принадлежат множеству <code class=\"inline-code\">U</code>.\n</p>\n\n<h2>2. Правило 8: Различайте пространство типов и пространство значений</h2>\n<p>\n  Один и тот же идентификатор может одновременно существовать в двух параллельных мирах:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Пространства символов</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Класс User существует в обоих пространствах:\nclass User {\n  constructor(public id: string) {}\n}\n\n// В пространстве типов (после двоеточия):\nconst u: User = new User(\"usr_1\"); // User здесь — это ТИП\n\n// В пространстве значений:\nconst factory = User; // User здесь — это ФУНКЦИЯ-КОНСТРУКТОР\n\n// typeof ведет себя по-разному в зависимости от контекста:\ntype UserType = typeof u;         // В пространстве типов: тип User\nconst runtimeType = typeof u;     // В пространстве значений: строка \"object\"</code></pre>\n</div>\n\n<h2>3. Правило 9: Объявление типа лучше его утверждения</h2>\n<p>\n  Всегда предпочитайте объявление типа (<code class=\"inline-code\">const x: Person = ...</code>) утверждению типа (<code class=\"inline-code\">const x = ... as Person</code>). При утверждении компилятор отключает проверку забытых обязательных полей и опечаток.\n</p>\n\n<h2>4. Правило 10: Избегайте оберточных типов (String, Number, Boolean)</h2>\n<p>\n  Никогда не используйте типы с заглавной буквы: <code class=\"inline-code\">String</code>, <code class=\"inline-code\">Number</code>, <code class=\"inline-code\">Boolean</code>. Это тяжелые объекты-обертки из раннего JavaScript. Всегда используйте примитивы: <code class=\"inline-code\">string</code>, <code class=\"inline-code\">number</code>, <code class=\"inline-code\">boolean</code>, <code class=\"inline-code\">symbol</code>, <code class=\"inline-code\">bigint</code>.\n</p>\n\n<h2>5. Правило 13: Знайте разницу между type и interface</h2>\n<p>\n  И <code class=\"inline-code\">type</code>, и <code class=\"inline-code\">interface</code> могут описывать сложные объекты и функции. Однако у них есть фундаментальные различия:\n</p>\n<ul>\n  <li><b>Интерфейсы поддерживают декларационное слияние (Declaration Merging):</b> если объявить <code class=\"inline-code\">interface Window</code> в двух разных файлах, их поля объединятся. Это незаменимо для библиотек и расширения глобальных объектов.</li>\n  <li><b>Type Aliases могут выражать объединения (Unions), примитивы, кортежи и отображенные типы:</b> интерфейсы этого делать не умеют.</li>\n</ul>\n\n<h2>6. Правило 17: Используйте readonly для защиты от мутаций</h2>\n<p>\n  Модификатор <code class=\"inline-code\">readonly T[]</code> запрещает вызов мутирующих методов (<code class=\"inline-code\">push</code>, <code class=\"inline-code\">pop</code>, <code class=\"inline-code\">splice</code>) и предотвращает коварные баги, когда утилита случайно меняет переданный ей массив.\n</p>",
      "quiz": [
        {
          "question": "Что в теории множеств TypeScript означает выражение T extends U в определении дженерика?",
          "options": [
            "Множество значений типа T является подмножеством множества значений типа U (любое значение T удовлетворяет U).",
            "Класс T обязан наследоваться от класса U через ключевое слово extends в JavaScript.",
            "Тип T должен иметь больше свойств, чем тип U.",
            "T расширяет оперативную память для U."
          ],
          "correct": 0,
          "explanation": "В системе типов TypeScript 'T extends U' проверяет, входит ли множество допустимых значений T в множество допустимых значений U."
        },
        {
          "question": "Почему рекомендуется избегать использования типа String (с заглавной буквы) в аннотациях?",
          "options": [
            "String — это объект-обертка JavaScript (new String()), а не примитивный тип string, что ведет к трудноуловимым ошибкам несовместимости типов.",
            "String запрещен в стандарте ECMAScript 2020.",
            "String занимает в памяти в 10 раз больше места.",
            "Компилятор не поддерживает заглавные буквы."
          ],
          "correct": 0,
          "explanation": "Примитивный строковый литерал 'hello' имеет тип string. Попытка передать его в функцию, ожидающую объект String, приводит к ошибкам."
        },
        {
          "question": "Какая ключевая возможность есть у interface, которой принципиально нет у type alias?",
          "options": [
            "Декларационное слияние (Declaration Merging) при повторном объявлении с тем же именем.",
            "Возможность задавать опциональные поля.",
            "Наследование через ключевое слово extends.",
            "Возможность типизировать методы объекта."
          ],
          "correct": 0,
          "explanation": "Несколько объявлений interface с одинаковым именем объединяют свои поля. Псевдоним type с повторяющимся именем вызовет ошибку дублирования."
        }
      ]
    },
    {
      "num": 3,
      "title": "Глава 3. Вывод типов и техники сужения (Правила 19–27)",
      "subtitle": "Чистота аннотаций, создание объектов за один шаг, контроль расширения типов, сужение и асинхронный код.",
      "minutes": 15,
      "contentHtml": "<h2>1. Правило 19: Не засоряйте код ненужными аннотациями</h2>\n<p>\n  Компилятор TypeScript обладает великолепным движком вывода типов. Избыточные аннотации загромождают код и создают ложное ощущение безопасности:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Правило чистоты аннотаций</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// ПЛОХО: избыточный шум\nconst x: number = 10;\nconst names: string[] = [\"Alex\", \"Maria\"];\n\n// ХОРОШО: чистый идиоматический TypeScript\nconst x = 10;\nconst names = [\"Alex\", \"Maria\"];</code></pre>\n</div>\n\n<p>\n  <b>Когда аннотации действительно необходимы:</b>\n</p>\n<ol>\n  <li>Параметры функций (компилятор не может угадать намерения вызывающего кода).</li>\n  <li>Явный тип возвращаемого значения для публичных API библиотек (предотвращает непреднамеренное изменение контракта).</li>\n  <li>Объектные литералы, чтобы выявлять опечатки по месту объявления, а не там, где объект используется.</li>\n</ol>\n\n<h2>2. Правило 20: Для разных типов — разные переменные</h2>\n<p>\n  В динамическом JavaScript разработчики часто используют одну и ту же переменную для разных целей (например, сначала в ней лежит числовой ID, а затем строковое имя). В TypeScript переменная получает тип при первом присваивании. <b>Разделяйте концепции на отдельные именованные переменные</b> — это снижает когнитивную нагрузку и исключает баги.\n</p>\n\n<h2>3. Правило 22: Старайтесь сужать типы грамотно</h2>\n<p>\n  Сужение (narrowing) переводит широкий тип в более узкий с помощью рантайм-проверок:\n</p>\n<ul>\n  <li><b>typeof:</b> для примитивов (<code class=\"inline-code\">typeof x === \"string\"</code>).</li>\n  <li><b>instanceof:</b> для классов (<code class=\"inline-code\">x instanceof Date</code>).</li>\n  <li><b>оператор in:</b> для проверки наличия свойства в объекте (<code class=\"inline-code\">\"role\" in user</code>).</li>\n  <li><b>Дискриминантные теги:</b> проверка поля <code class=\"inline-code\">kind</code> или <code class=\"inline-code\">type</code> в объединениях.</li>\n  <li><b>Пользовательские предикаты:</b> функции с возвращаемым типом <code class=\"inline-code\">x is TargetType</code>.</li>\n</ul>\n\n<h2>4. Правило 23: Создавайте объекты целиком за один шаг</h2>\n<p>\n  Никогда не создавайте пустой объект <code class=\"inline-code\">const pt = {}</code> с последующим добавлением полей <code class=\"inline-code\">pt.x = 3; pt.y = 4;</code>. Это заставляет TypeScript ругаться на отсутствие свойств в пустом объекте.\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Сборка объектов</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// ПЛОХО:\nconst point = {};\npoint.x = 10; // ❌ Property 'x' does not exist on type '{}'\n\n// ХОРОШО: создаем объект целиком\nconst point = { x: 10, y: 20 };\n\n// Если требуется условная сборка — используйте оператор расширения (spread):\nconst hasAuth = true;\nconst session = {\n  id: \"sess_108\",\n  ...(hasAuth ? { token: \"secret_jwt_xyz\" } : {})\n};</code></pre>\n</div>\n\n<h2>5. Правило 25: Всегда используйте async/await вместо коллбэков</h2>\n<p>\n  Асинхронные функции <code class=\"inline-code\">async</code> всегда возвращают строго типизированный <code class=\"inline-code\">Promise&lt;T&gt;</code>. Компилятор контролирует, чтобы результат никогда не был возвращен синхронно, и гарантирует корректную передачу ошибок через <code class=\"inline-code\">try/catch</code>.\n</p>",
      "quiz": [
        {
          "question": "Почему создание объекта через const obj = {}; obj.a = 1; вызывает ошибку компилятора в строгом режиме?",
          "options": [
            "TypeScript выводит тип obj как {} (пустой объект) по месту инициализации и запрещает добавление необъявленных свойств.",
            "В TypeScript запрещены числа в качестве значений свойств.",
            "Объекты обязаны создаваться только через фабрику классов.",
            "Это ограничение стандарта ES5."
          ],
          "correct": 0,
          "explanation": "Тип объекта фиксируется при создании. Создавайте объекты целиком или используйте оператор расширения (spread)."
        },
        {
          "question": "В каких случаях явная аннотация типа возвращаемого значения функции считается хорошей практикой?",
          "options": [
            "Для функций публичного экспортируемого API, чтобы компилятор сразу сигнализировал о нарушении контракта при рефакторинге.",
            "Во всех без исключения стрелочных функциях.",
            "Только в функциях с ключевым словом generator.",
            "Никогда, TypeScript всегда выводит типы безошибочно."
          ],
          "correct": 0,
          "explanation": "Явная аннотация возвращаемого типа служит контрактом: компилятор не позволит случайно изменить тип, возвращаемый клиентам библиотеки."
        },
        {
          "question": "Какое преимущество дает использование async/await перед традиционными коллбэками с точки зрения типов?",
          "options": [
            "Функция гарантированно возвращает Promise<T>, код типизируется линейно без пирамиды коллбэков, а исключения ловятся в едином блоке try/catch.",
            "async код выполняется в 10 раз быстрее в многопоточном режиме Node.js.",
            "async отключает сборку мусора.",
            "С коллбэками нельзя использовать TypeScript."
          ],
          "correct": 0,
          "explanation": "async/await стандартизирует движение типов через Promise, предотвращая рассинхронизацию типов ошибок и ответов."
        }
      ]
    },
    {
      "num": 4,
      "title": "Глава 4. Архитектура и проектирование типов (Правила 28–37)",
      "subtitle": "Недопустимые состояния недопустимы, закон Постела, вынос null на периферию и номинальное брендирование типов.",
      "minutes": 17,
      "contentHtml": "<h2>1. Правило 28: Делайте недопустимые состояния невыразимыми</h2>\n<p>\n  Это <b>самое важное правило проектирования систем</b> от Дэна Вандеркама: <i>«Never model invalid states»</i>. Если система типов допускает состояние, которое в реальности невозможно или противоречиво, в коде неизбежно возникнут баги.\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Плохая архитектура состояний</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// ПЛОХО: 4 независимых поля допускают нелепые комбинации:\n// isLoading = true И isError = true ОДНОВРЕМЕННО? data есть, но isError = true?\ninterface PageState {\n  isLoading: boolean;\n  isError: boolean;\n  data?: string[];\n  errorMessage?: string;\n}</code></pre>\n</div>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Идеальная архитектура состояний</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// ХОРОШО: Дискриминантное объединение делает некорректные состояния физически невозможными:\ntype PageState =\n  | { status: \"loading\" }\n  | { status: \"error\"; error: string }\n  | { status: \"success\"; data: string[] };</code></pre>\n</div>\n\n<h2>2. Правило 29: Будьте либеральны на входе, но строги на выходе (Закон Постела)</h2>\n<p>\n  Функции должны быть гибкими и удобными для вызывающего кода при приеме аргументов, но их возвращаемый результат должен быть максимально точным, узким и однозначным:\n</p>\n<ul>\n  <li><b>На вход:</b> допускайте гибкие форматы (например, дату в виде <code class=\"inline-code\">Date | string | number</code>).</li>\n  <li><b>На выход:</b> возвращайте строгий нормализованный объект с предсказуемой структурой без лишних объединений.</li>\n</ul>\n\n<h2>3. Правило 31: Смещайте нулевые значения на периферию типов</h2>\n<p>\n  Избегайте структур, где множество полей по отдельности могут быть <code class=\"inline-code\">null</code>. Гораздо чище сделать так, чтобы либо <b>весь объект был null</b>, либо <b>все поля были гарантированно заполнены</b>:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Периферия null</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// ПЛОХО: заставляет проверять каждое поле на null отдельно:\ntype UserCoords = {\n  latitude: number | null;\n  longitude: number | null;\n};\n\n// ХОРОШО: координаты либо вычислены целиком, либо их нет вовсе:\ntype Location = {\n  coords: { latitude: number; longitude: number } | null;\n};</code></pre>\n</div>\n\n<h2>4. Правило 37: Номинальное брендирование типов (Branded Types)</h2>\n<p>\n  Поскольку TypeScript использует структурную типизацию, вы можете случайно перепутать путь к файлу в абсолютном и относительном формате или передать рубли вместо долларов:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Брендирование типов (Branding)</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Создаем уникальные бренды через фиктивное свойство:\ntype AbsolutePath = string & { readonly _brand: unique symbol };\ntype RelativePath = string & { readonly _brand: unique symbol };\n\nfunction toAbsolutePath(path: string): AbsolutePath {\n  return path as AbsolutePath;\n}\n\nfunction readFile(path: AbsolutePath) {\n  // Гарантированно абсолютный путь!\n}\n\nconst rel = \"src/index.ts\" as RelativePath;\nreadFile(rel); // ❌ ОШИБКА компилятора: RelativePath не совместим с AbsolutePath!</code></pre>\n</div>",
      "quiz": [
        {
          "question": "В чем суть архитектурного принципа 'Make Invalid States Unrepresentable' (Недопустимые состояния невыразимы)?",
          "options": [
            "Проектировать типы данных через дискриминантные объединения так, чтобы система типов физически не позволяла описать логически несовместимые состояния объекта.",
            "Выбрасывать ошибку 500 на любой непредвиденный запрос.",
            "Шифровать состояние в формате base64.",
            "Запретить использование оператора if в коде."
          ],
          "correct": 0,
          "explanation": "Если структура данных не позволяет выразить противоречие (например, loading и error одновременно), весь последующий код освобождается от десятков проверок."
        },
        {
          "question": "Что такое брендирование типов (Branded Types / Nominal Typing) в TypeScript?",
          "options": [
            "Техника пересечения примитивного типа (например, string или number) с уникальным фиктивным свойством-меткой для эмуляции номинальной типизации.",
            "Добавление логотипа компании в JSDoc комментарии.",
            "Регистрация торговой марки на название интерфейса.",
            "Экспорт типов через ключевое слово brand."
          ],
          "correct": 0,
          "explanation": "Брендирование позволяет компилятору различать структурно идентичные типы (например, Рубли и Доллары, или ID пользователя и ID заказа)."
        },
        {
          "question": "В чем заключается закон Постела (Правило 29) применительно к сигнатурам функций в TypeScript?",
          "options": [
            "Принимать широкий диапазон допустимых входных форматов, но возвращать строго определенный, нормализованный и предсказуемый тип.",
            "Все параметры должны быть обязательными.",
            "Функция обязана возвращать строку.",
            "Все входящие аргументы должны сериализоваться в JSON."
          ],
          "correct": 0,
          "explanation": "Либеральность на входе делает вызов функции удобным, а строгость на выходе защищает вызывающий код от ветвления проверок."
        }
      ]
    },
    {
      "num": 5,
      "title": "Глава 5. Эффективное и безопасное применение any (Правила 38–44)",
      "subtitle": "Минимизация зоны поражения any, сокрытие утверждений, unknown как безопасная альтернатива и аугментация типов.",
      "minutes": 14,
      "contentHtml": "<h2>1. Правило 38: Используйте максимально узкий диапазон any</h2>\n<p>\n  Если вам неизбежно требуется обойти проверку компилятора, локализуйте утверждение до одного аргумента или конкретного свойства, но никогда не делайте <code class=\"inline-code\">any</code> всю переменную или возвращаемый тип функции!\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Минимизация any</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>interface Config {\n  path: string;\n  options: { timeout: number };\n}\n\n// ПЛОХО: вся переменная заражается any, и все последующие обращения к ней небезопасны:\nconst badConfig: any = getRawData();\n\n// ХОРОШО: any применен точечно к одному невалидному аргументу:\nconst goodConfig: Config = {\n  path: \"/api\",\n  options: (getLegacyOptions() as any) // Зона any изолирована!\n};</code></pre>\n</div>\n\n<h2>2. Правило 40: Инкапсулируйте небезопасные утверждения внутри функций</h2>\n<p>\n  Иногда чистый JavaScript-код внутри функции делает манипуляции, которые компилятор TypeScript не в состоянии доказать математически. В таких случаях <b>скрывайте небезопасный код внутри функции, предоставляя наружу идеальную, строгую сигнатуру типов</b>:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Инкапсуляция утверждений</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// Наружная сигнатура безупречна и безопасна:\nfunction shallowEqual<T extends object>(a: T, b: T): boolean {\n  for (const [k, aVal] of Object.entries(a)) {\n    // Внутри используется as any, чтобы обойти ограничения индексации:\n    if (!(k in b) || aVal !== (b as any)[k]) {\n      return false;\n    }\n  }\n  return Object.keys(a).length === Object.keys(b).length;\n}</code></pre>\n</div>\n\n<h2>3. Правило 42: Используйте unknown вместо any для неизвестных данных</h2>\n<p>\n  Данные, приходящие из внешнего мира (парсинг JSON, ответы HTTP API, ввод пользователя), принципиально неизвестны во время компиляции.\n</p>\n<div class=\"callout tip\">\n  <div class=\"callout-title\">💡 Принцип безопасности unknown</div>\n  <p>Значение типа <code class=\"inline-code\">any</code> позволяет вызвать метод <code class=\"inline-code\">val.foo()</code> без проверки, что приведет к краху программы. Значение типа <code class=\"inline-code\">unknown</code> <b>запрещает любые обращения к свойствам</b> до тех пор, пока вы явно не проверите тип через <code class=\"inline-code\">typeof</code>, <code class=\"inline-code\">instanceof</code> или парсер Zod.</p>\n</div>\n\n<h2>4. Правило 43: Типобезопасность вместо обезьяньих патчей (Monkey Patching)</h2>\n<p>\n  В старом JavaScript было популярно прикреплять кастомные свойства к глобальным объектам: <code class=\"inline-code\">window._user = ...</code> или <code class=\"inline-code\">document.specialData = ...</code>. В TypeScript это вызывает ошибки типов.\n</p>\n<p>\n  Вместо грязного патчинга используйте <b>Module Augmentation</b> (добавление типов в существующие интерфейсы) или <code class=\"inline-code\">WeakMap</code> для безопасного связывания данных с DOM-элементами.\n</p>",
      "quiz": [
        {
          "question": "Почему при парсинге JSON (например, JSON.parse) безопаснее типизировать результат как unknown, а не any?",
          "options": [
            "unknown заставляет разработчика провести проверку формы данных перед их использованием, защищая от падений в рантайме при получении неожиданного JSON.",
            "unknown автоматически валидирует JSON по схеме базы данных.",
            "any замедляет работу движка V8.",
            "JSON.parse не умеет возвращать any."
          ],
          "correct": 0,
          "explanation": "any создает иллюзию безопасности и пропускает неверные вызовы методов. unknown блокирует доступ до подтверждения типа."
        },
        {
          "question": "Как согласно Правилу 38 следует применять type assertion as any, если его невозможно избежать?",
          "options": [
            "Сузить область действия any до минимально возможного фрагмента (отдельного параметра функции или одного поля).",
            "Аннотировать как any весь файл через // @ts-nocheck.",
            "Сделать возвращаемое значение функции any.",
            "Присвоить any всем переменным в блоке try/catch."
          ],
          "correct": 0,
          "explanation": "Чем уже зона any, тем меньше радиус поражения системы типов и тем выше надежность остального кода."
        },
        {
          "question": "Что такое Type Coverage (зона охвата типов) и почему за ней следят в продакшен проектах?",
          "options": [
            "Процент кода и выражений в проекте, которые строго типизированы и не деградировали в тип any.",
            "Процент строк кода, покрытых юнит-тестами Jest.",
            "Количество файлов .d.ts в node_modules.",
            "Объем оперативной памяти, занятый компилятором."
          ],
          "correct": 0,
          "explanation": "Type Coverage метрика показывает, насколько проект свободен от 'дыр' в типизации, вызванных неявным или явным any."
        }
      ]
    },
    {
      "num": 6,
      "title": "Глава 6. Декларации типов и экосистема @types (Правила 45–52)",
      "subtitle": "Управление зависимостями в devDependencies, версионирование типов, TSDoc, условные типы вместо перегрузок и зеркалирование.",
      "minutes": 15,
      "contentHtml": "<h2>1. Правило 45: Размещайте TypeScript и @types в devDependencies</h2>\n<p>\n  Поскольку TypeScript компилируется в чистый JavaScript и стирается перед исполнением, сам пакет <code class=\"inline-code\">typescript</code> и все пакеты типов из DefinitelyTyped (<code class=\"inline-code\">@types/*</code>) никогда не должны попадать в секцию <code class=\"inline-code\">dependencies</code> вашего <code class=\"inline-code\">package.json</code>. Они нужны только разработчикам и сборщикам.\n</p>\n\n<h2>2. Правило 46: Координация трех версий типов</h2>\n<p>\n  При работе с экосистемой npm вы всегда координируете три независимые версии:\n</p>\n<ol>\n  <li>Версия библиотеки (например, <code class=\"inline-code\">lodash@4.17.21</code>).</li>\n  <li>Версия деклараций типов (например, <code class=\"inline-code\">@types/lodash@4.14.x</code>).</li>\n  <li>Версия компилятора TypeScript в проекте.</li>\n</ol>\n<p>\n  Следите за тем, чтобы мажорная и минорная версии типов соответствовали реальной версии установленной библиотеки!\n</p>\n\n<h2>3. Правило 50: Предпочитайте условные типы перегруженным декларациям</h2>\n<p>\n  Перегрузки функций часто ведут к комбинаторному взрыву и проблемам при передаче объединений. Условные типы решают задачу гораздо элегантнее:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Перегрузки vs Условные типы</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>// ГРОМОЗДКО: Несколько сигнатур перегрузки\nfunction double(x: number): number;\nfunction double(x: string): string;\nfunction double(x: any): any { return x + x; }\n\n// ЭЛЕГАНТНО И СТРОГО: Одна сигнатура с условным типом:\nfunction doubleSmart<T extends number | string>(x: T): T extends string ? string : number {\n  return (x + (x as any)) as any;\n}\n\n// doubleSmart идеально сохраняет точный литерал и работает с объединениями!</code></pre>\n</div>\n\n<h2>4. Правило 51: Зеркалируйте типы для разрыва тяжелых зависимостей (Type Mirroring)</h2>\n<p>\n  Если вы пишете небольшую библиотеку и хотите поддержать типы из стороннего тяжелого пакета (например, <code class=\"inline-code\">@types/node</code> ради одного типа <code class=\"inline-code\">Buffer</code>):\n  <b>не заставляйте всех ваших пользователей устанавливать @types/node в зависимости!</b>\n</p>\n<p>\n  Вместо этого объявите локальный интерфейс-зеркало, описывающий ровно те методы, которые вам реально нужны. Благодаря структурной типизации любой нативный объект Buffer идеально подойдет!\n</p>",
      "quiz": [
        {
          "question": "В какую секцию файла package.json следует устанавливать компилятор TypeScript и пакеты @types/*?",
          "options": [
            "devDependencies, так как они необходимы только на этапе сборки и разработки, а в продакшен рантайме типы стерты.",
            "dependencies, иначе сервер упадет при старте.",
            "peerDependencies.",
            "optionalDependencies."
          ],
          "correct": 0,
          "explanation": "Типы — инструмент времени сборки. В продакшен-бандле JS типов нет, поэтому они должны быть в devDependencies."
        },
        {
          "question": "В чем заключается техника зеркалирования типов (Type Mirroring) по Правилу 51?",
          "options": [
            "Объявление минимального структурного интерфейса внутри своей библиотеки вместо добавления тяжелого внешнего пакета типов в зависимости.",
            "Создание зеркала репозитория DefinitelyTyped.",
            "Дублирование типов в формате JSON Schema.",
            "Зеркальное отображение порядка аргументов функции."
          ],
          "correct": 0,
          "explanation": "Зеркалирование избавляет пользователей библиотеки от необходимости скачивать ненужные транзитивные зависимости типов."
        },
        {
          "question": "Почему экспорт всех типов, используемых в публичных сигнатурах функций библиотеки, обязателен (Правило 47)?",
          "options": [
            "Если тип не экспортирован, потребители библиотеки вынуждены прибегать к сложным утилитам вроде ReturnType или Parameters, чтобы именовать возвращаемые структуры.",
            "Компилятор TypeScript откажется собирать проект.",
            "Неэкспортированные типы вызывают утечку памяти.",
            "Это требование стандарта CommonJS."
          ],
          "correct": 0,
          "explanation": "Потребители вашей библиотеки должны иметь возможность легко ссылаться на возвращаемые типы и типы аргументов."
        }
      ]
    },
    {
      "num": 7,
      "title": "Глава 7. Написание и выполнение кода: ловушки рантайма (Правила 53–57)",
      "subtitle": "Отказ от нестандартного синтаксиса, итерация по объектам, иерархия DOM, иллюзия private и карты кода Source Maps.",
      "minutes": 13,
      "contentHtml": "<h2>1. Правило 53: Используйте возможности ECMAScript, а не синтаксис TypeScript</h2>\n<p>\n  В ранние годы (2012–2014) TypeScript пытался заполнить пробелы стандарта JavaScript и добавил собственные runtime-конструкции: <code class=\"inline-code\">enum</code>, <code class=\"inline-code\">parameter properties</code>, <code class=\"inline-code\">namespaces</code>.\n</p>\n<p>\n  Дэн Вандеркам категорически предостерегает от их использования в новом коде:\n</p>\n<ul>\n  <li>Они конфликтуют со стандартами ECMAScript.</li>\n  <li>Они ломают изолированную транспиляцию в современных быстрых сборщиках (esbuild, swc, Babel).</li>\n  <li>Вместо <code class=\"inline-code\">enum</code> всегда используйте обычные объекты с <code class=\"inline-code\">as const</code>.</li>\n</ul>\n\n<h2>2. Правило 54: Грамотная итерация по объектам</h2>\n<p>\n  При переборе объекта через <code class=\"inline-code\">for (const k in obj)</code> переменная <code class=\"inline-code\">k</code> имеет тип <code class=\"inline-code\">string</code>, а не <code class=\"inline-code\">keyof T</code>. Попытка обратиться <code class=\"inline-code\">obj[k]</code> вызывает ошибку компилятора:\n</p>\n\n<div class=\"code-container\">\n  <div class=\"code-header\">\n    <span class=\"code-lang-tag\">TypeScript · Безопасный перебор полей</span>\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n  </div>\n  <pre class=\"code-body\"><code>interface UserStats {\n  views: number;\n  likes: number;\n}\n\nconst stats: UserStats = { views: 1200, likes: 350 };\n\n// ПЛОХО: k имеет тип string, obj[k] выдает ошибку\n// for (const k in stats) { stats[k]; } \n\n// ХОРОШО: Object.entries() дает четкие кортежи [ключ, значение]:\nfor (const [key, value] of Object.entries(stats)) {\n  console.log(`${key}: ${value}`);\n}</code></pre>\n</div>\n\n<h2>3. Правило 55: Понимайте иерархию типов DOM</h2>\n<p>\n  Браузерное окружение в TypeScript описывается строгой иерархией наследования:\n</p>\n<div class=\"schema-box\">\n  <div class=\"schema-grid\">\n    <div class=\"schema-item blue\">\n      <strong>EventTarget</strong>\n      <p>Базовый интерфейс для всего, что может слушать события (Window, Document, XMLHttpRequest, Node).</p>\n    </div>\n    <div class=\"schema-item emerald\">\n      <strong>Node ➔ Element ➔ HTMLElement</strong>\n      <p>Текстовые узлы, комментарии, SVG-элементы и стандартные HTML-теги.</p>\n    </div>\n    <div class=\"schema-item purple\">\n      <strong>HTMLInputElement</strong>\n      <p>Специфический интерфейс конкретного тега <code class=\"inline-code\">&lt;input&gt;</code> с полями <code class=\"inline-code\">value</code>, <code class=\"inline-code\">checked</code>, <code class=\"inline-code\">focus()</code>.</p>\n    </div>\n  </div>\n</div>\n\n<h2>4. Правило 56: Не полагайтесь на private для сокрытия секретов</h2>\n<p>\n  Ключевое слово <code class=\"inline-code\">private</code> существует исключительно на этапе проверки типов. В рантайме свойство ничем не защищено: любой код может прочитать его через <code class=\"inline-code\">obj[\"secretKey\"]</code>. Для истинной рантайм-приватности используйте приватные поля ECMAScript с решеткой: <code class=\"inline-code\">#secretKey</code>.\n</p>",
      "quiz": [
        {
          "question": "Почему ключевое слово private в TypeScript не защищает данные от чтения в рантайме?",
          "options": [
            "private проверяется только компилятором tsc и полностью удаляется при сборке в JavaScript, оставляя поле открытым.",
            "В браузерах отключена криптография.",
            "Все private свойства автоматически логируются в консоль.",
            "Это особенность только компилятора Babel."
          ],
          "correct": 0,
          "explanation": "Модификаторы доступа в TypeScript не имеют рантайм-эквивалента. Для реальной изоляции нужны нативные поля JS (#privateField)."
        },
        {
          "question": "Какой тип вернет выражение document.getElementById('my-input') без явного сужения?",
          "options": [
            "HTMLElement | null",
            "HTMLInputElement",
            "Node",
            "Element"
          ],
          "correct": 0,
          "explanation": "getElementById возвращает общий HTMLElement | null. Для доступа к .value input-элемента требуется проверка instanceof HTMLInputElement."
        },
        {
          "question": "Какую проблему решает использование карт кода (Source Maps) в продакшен отладке (Правило 57)?",
          "options": [
            "Они связывают скомпилированный минифицированный JavaScript код браузера с исходными строками TypeScript в отладчике.",
            "Они оптимизируют размер бандла.",
            "Они шифруют исходный код от конкурентов.",
            "Они запускают код на GPU."
          ],
          "correct": 0,
          "explanation": "Source Maps сопоставляют стеки ошибок и точки останова в рантайме с реальными строками ваших .ts файлов."
        }
      ]
    },
    {
      "num": 8,
      "title": "Глава 8. Стратегия переноса проектов на TypeScript (Правила 58–62)",
      "subtitle": "Современный JavaScript, allowJs, постепенная миграция снизу вверх по графу AST и победа над noImplicitAny.",
      "minutes": 14,
      "contentHtml": "<h2>1. Правило 58: Начните с современного JavaScript</h2>\n<p>\n  Первый шаг к успешной миграции — не переименование файлов в <code class=\"inline-code\">.ts</code>, а модернизация JavaScript:\n</p>\n<ul>\n  <li>Замена устаревших <code class=\"inline-code\">var</code> на <code class=\"inline-code\">const</code> и <code class=\"inline-code\">let</code>.</li>\n  <li>Переход с синтаксиса прототипов на классы ES2015+.</li>\n  <li>Замена коллбэков на нативный <code class=\"inline-code\">async/await</code>.</li>\n  <li>Использование стандартных модулей ES (<code class=\"inline-code\">import/export</code>) вместо <code class=\"inline-code\">require()</code>.</li>\n</ul>\n\n<h2>2. Правило 59: Используйте // @ts-check и JSDoc</h2>\n<p>\n  Вы можете получать подсказки и проверки TypeScript в существующих файлах <code class=\"inline-code\">.js</code> еще до официальной миграции! Добавьте в начало файла директиву <code class=\"inline-code\">// @ts-check</code> и описывайте типы в комментариях JSDoc (<code class=\"inline-code\">/** @param {string} id */</code>).\n</p>\n\n<h2>3. Правило 60: Опция allowJs для плавного гибридного переходного периода</h2>\n<p>\n  Включение флага <code class=\"inline-code\">\"allowJs\": true</code> в <code class=\"inline-code\">tsconfig.json</code> позволяет файлам <code class=\"inline-code\">.ts</code> и <code class=\"inline-code\">.js</code> сосуществовать и импортировать друг друга в рамках единого проекта. Вы можете переносить проект по одному файлу за спринт, не останавливая продуктовую разработку.\n</p>\n\n<h2>4. Правило 61: Конвертируйте модули снизу вверх по графу зависимостей (Bottom-Up)</h2>\n<p>\n  Это <b>ключевая инженерная стратегия</b> миграции:\n</p>\n<div class=\"schema-box\">\n  <div class=\"schema-grid\">\n    <div class=\"schema-item emerald\">\n      <strong>Шаг 1: Листья графа (Leaves)</strong>\n      <p>Конвертируйте утилиты, константы и базовые модели данных, которые сами ничего не импортируют. У них нет зависимостей — их типизировать проще всего.</p>\n    </div>\n    <div class=\"schema-item blue\">\n      <strong>Шаг 2: Промежуточные сервисы</strong>\n      <p>Переносите сервисы бизнес-логики, опирающиеся на уже типизированные листья первого шага.</p>\n    </div>\n    <div class=\"schema-item purple\">\n      <strong>Шаг 3: Корень приложения (Root)</strong>\n      <p>В самую последнюю очередь переименовывайте входные точки приложения (<code class=\"inline-code\">index.js</code>, роутеры, UI-компоненты).</p>\n    </div>\n  </div>\n</div>\n\n<h2>5. Правило 62: Не считайте миграцию завершенной без noImplicitAny</h2>\n<p>\n  Пока в конфигурации выключен флаг <code class=\"inline-code\">noImplicitAny</code>, проект лишь притворяется написанным на TypeScript. Настоящая безопасность типов начинается тогда, когда компилятор жестко блокирует нетипизированный код на уровне всего репозитория.\n</p>",
      "quiz": [
        {
          "question": "В каком порядке Дэн Вандеркам рекомендует мигрировать файлы проекта на TypeScript (Правило 61)?",
          "options": [
            "Снизу вверх по дереву зависимостей (bottom-up): сначала утилиты и модели-листья без зависимостей, затем сервисы, и в конце корень приложения.",
            "Сверху вниз (top-down): начать с главного index.js.",
            "В алфавитном порядке имен файлов.",
            "Случайным образом по 5 файлов в день."
          ],
          "correct": 0,
          "explanation": "Миграция от листьев графа гарантирует, что при типизации каждого следующего модуля все его зависимости уже строго типизированы."
        },
        {
          "question": "Для чего служит опция allowJs: true при миграции кодовой базы?",
          "options": [
            "Она разрешает совместное сосуществование и взаимный импорт файлов .js и .ts в одном проекте на период постепенного перехода.",
            "Она отключает TypeScript и превращает проект в чистый JS.",
            "Она конвертирует весь код в машинные инструкции.",
            "Она запрещает использовать npm пакеты."
          ],
          "correct": 0,
          "explanation": "allowJs делает возможной инкрементальную миграцию без необходимости единовременной перезаписи всего репозитория."
        },
        {
          "question": "Почему включение noImplicitAny: true является главным критерием завершенности миграции?",
          "options": [
            "Без этого флага нетипизированные параметры получают тип any, скрывая ошибки типов и создавая лишь видимость типобезопасности.",
            "С этим флагом код компилируется в бинарный файл .exe.",
            "Это требование для публикации пакета на npm.",
            "noImplicitAny блокирует запуск тестов."
          ],
          "correct": 0,
          "explanation": "noImplicitAny ликвидирует неявные дыры в типизации, гарантируя реальную защиту компилятором всех функций проекта."
        }
      ]
    }
  ]
};
