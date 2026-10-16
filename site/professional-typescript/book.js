// book.js — Профессиональный TypeScript: разработка надежных веб-приложений (Борис Черный)
'use strict';

window.BOOK_DATA = {
  "id": "professional-typescript",
  "title": "Профессиональный TypeScript: разработка надежных веб-приложений",
  "author": "Борис Черный",
  "cover": "img/cover.jpg",
  "totalChapters": 12,
  "chapters": [
    {
      "num": 1,
      "title": "Глава 1. Вступление и философия надежности",
      "subtitle": "История появления TypeScript, дилемма динамической и статической типизации, шкала безопасности и предотвращение багов на этапе компиляции.",
      "minutes": 8,
      "contentHtml": `<h2>1. Почему JavaScript нуждается в системе типов</h2>
<p>
  JavaScript был разработан Бренданом Эйхом в 1995 году всего за 10 дней как легкий скриптовый язык для браузера Netscape Navigator. В те годы никто не предполагал, что на нем будут писать распределенные микросервисы, сложные SPA-приложения с миллионами строк кода и ресурсоемкие графические редакторы вроде Figma.
</p>
<p>
  В динамическом языке типа JavaScript все проверки происходят исключительно в момент выполнения программы (runtime). Если в объекте отсутствует поле, опечатка в имени метода обнаружится только тогда, когда пользователь нажмет на кнопку, и в консоли появится печально известный:
</p>
<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript Runtime Error</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>Uncaught TypeError: Cannot read property 'map' of undefined</code></pre>
</div>

<h2>2. Статический анализ против ручного тестирования</h2>
<p>
  Существует распространенное заблуждение, будто модульные (unit) тесты могут полностью заменить статическую систему типов. Борис Черный наглядно доказывает: тесты и типы решают ортогональные задачи.
</p>
<table class="data-table">
  <thead>
    <tr>
      <th>Критерий</th>
      <th>Статическая система типов</th>
      <th>Модульное тестирование</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Охват</strong></td>
      <td>Гарантирует корректность для 100% ветвей кода и типов аргументов.</td>
      <td>Проверяет только явно заданные тест-кейсы и краевые условия.</td>
    </tr>
    <tr>
      <td><strong>Скорость обратной связи</strong></td>
      <td>Мгновенно в IDE во время ввода каждого символа.</td>
      <td>Требует запуска тест-раннера (секунды или минуты).</td>
    </tr>
    <tr>
      <td><strong>Рефакторинг</strong></td>
      <td>Переименование или изменение типа подсвечивает все сломанные места в проекте.</td>
      <td>Тесты могут устаревать или пропускать непредвиденные зависимости.</td>
    </tr>
    <tr>
      <td><strong>Бизнес-логика</strong></td>
      <td>Ограничена выразимостью типов (не проверяет семантику алгоритма).</td>
      <td>Идеально проверяет корректность вычислений и сценариев.</td>
    </tr>
  </tbody>
</table>

<div class="callout tip">
  <div class="callout-title">💡 Шкала типобезопасности</div>
  <p>Цель TypeScript — не просто навесить типы на переменные, а спроектировать архитектуру так, чтобы некорректные состояния стали <em>невыразимыми в коде</em> на уровне компилятора.</p>
</div>`,
      "quiz": [
        {
          "question": "В какой момент времени система типов TypeScript выполняет проверку корректности программ?",
          "options": [
            "Исключительно на этапе статической компиляции (compile time) до исполнения кода.",
            "Во время выполнения кода виртуальной машиной V8 в браузере или Node.js.",
            "В фоновом режиме через Web Worker во время загрузки страницы.",
            "Только при сборке production-бандла вебпаком."
          ],
          "correct": 0,
          "explanation": "TypeScript — это язык со статической типизацией: проверка типов происходит до запуска кода, а после компиляции типы полностью удаляются (type erasure)."
        },
        {
          "question": "Как связаны между собой статическая типизация и модульное тестирование?",
          "options": [
            "Они дополняют друг друга: типы доказывают корректность контрактов, а тесты проверяют бизнес-логику.",
            "Система типов полностью заменяет необходимость писать какие-либо тесты.",
            "Модульные тесты делают статическую типизацию бесполезной тратой времени.",
            "TypeScript запрещает использование Jest и Vitest в проектах."
          ],
          "correct": 0,
          "explanation": "Типы гарантируют соблюдение контрактов структур данных для всех возможных ветвей, а тесты проверяют корректность конкретных сценариев бизнес-логики."
        }
      ]
    },
    {
      "num": 2,
      "title": "Глава 2. TypeScript с высоты птичьего полета",
      "subtitle": "Архитектура компилятора tsc, абстрактное синтаксическое дерево (AST), фазы проверки типов и генерации JavaScript.",
      "minutes": 12,
      "contentHtml": `<h2>1. Как устроен компилятор TypeScript</h2>
<p>
  Традиционный компилятор (например, C++ или Java) берет исходный код, превращает его в абстрактное синтаксическое дерево (AST), проверяет семантику и затем транслирует в машинный код или байт-код для виртуальной машины.
</p>
<p>
  Компилятор TypeScript (<code class="inline-code">tsc</code>) работает иначе: он транслирует TypeScript-код в чистый JavaScript. Этот процесс называется <em>транспиляцией</em> (transpilation).
</p>

<div class="flow-diagram">
  <div class="flow-step">1. Сканер (Tokens)</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step">2. Парсер (AST)</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step">3. Type Checker</div>
  <div class="flow-arrow">→</div>
  <div class="flow-step">4. Эмиттер (JS + .d.ts)</div>
</div>

<h2>2. Двухфазная архитектура компиляции</h2>
<p>
  Архитектуру работы TypeScript можно разделить на две независимые подсистемы:
</p>
<ol>
  <li><strong>Конвейер типов (Type Pipeline):</strong> Парсер строит AST -> Связыватель (Binder) связывает идентификаторы с символами -> Type Checker проверяет соответствие типов и выявляет ошибки.</li>
  <li><strong>Конвейер эмиттера (Emitter Pipeline):</strong> Удаляет все типы, интерфейсы и аннотации (Type Erasure) и генерирует валидный JavaScript-код в соответствии с указанным стандартом ECMAScript (ES5, ES6, ES2022 и т.д.).</li>
</ol>

<div class="callout info">
  <div class="callout-title">⚠️ Стирание типов (Type Erasure)</div>
  <p>В скомпилированном JavaScript-коде <strong>нет ни одного типа TypeScript</strong>. Типы не влияют на скорость выполнения программы в рантайме и не занимают память в браузере.</p>
</div>

<h2>3. Конфигурационный файл tsconfig.json</h2>
<p>
  Сердцем любого проекта на TypeScript является файл <code class="inline-code">tsconfig.json</code>. Он определяет корневые файлы и флаги компилятора:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JSON · tsconfig.json</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какая подсистема компилятора TypeScript отвечает за обнаружение несоответствия типов?",
          "options": [
            "Type Checker (проверяльщик типов).",
            "Scanner (сканер лексем).",
            "Emitter (эмиттер JavaScript).",
            "Web V8 runtime engine."
          ],
          "correct": 0,
          "explanation": "Type Checker обходит AST и сравнивает типы выражений с ожидаемыми типами контрактов."
        },
        {
          "question": "Остаются ли типы TypeScript в результирующем JavaScript-коде после завершения компиляции?",
          "options": [
            "Нет, они полностью стираются (Type Erasure) компилятором.",
            "Да, они оборачиваются в специальные вызовы проверок typeof.",
            "Да, но только если включен флаг emitDecoratorMetadata.",
            "Остаются только интерфейсы и дженерики."
          ],
          "correct": 0,
          "explanation": "TypeScript производит стирание типов: весь синтаксис типов исчезает, оставляя чистый JavaScript."
        }
      ]
    },
    {
      "num": 3,
      "title": "Глава 3. Подробно о типах",
      "subtitle": "Полный атлас типов: unknown vs any, примитивы, объекты, кортежи, never, void и ловушки enums.",
      "minutes": 16,
      "contentHtml": `<h2>1. Иерархия типов в TypeScript</h2>
<p>
  Система типов TypeScript представляет собой решетку (type lattice), в которой есть верхние типы (Top Types) и нижний тип (Bottom Type):
</p>
<ul>
  <li><strong>Top Types (<code class="inline-code">any</code> и <code class="inline-code">unknown</code>):</strong> Множество всех возможных значений в языке. Любое значение можно присвоить переменной типа <code class="inline-code">unknown</code>.</li>
  <li><strong>Bottom Type (<code class="inline-code">never</code>):</strong> Пустое множество значений. Тип функции, которая никогда не возвращает управление (выбрасывает ошибку или содержит бесконечный цикл).</li>
</ul>

<h2>2. Сравнение any и unknown</h2>
<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>// any отключает систему типов вообще:
let a: any = 10;
a.nonExistentMethod(); // Компилируется без ошибок, упадет в рантайме!

// unknown требует обязательного сужения типа (type narrowing):
let u: unknown = 'Hello world';
// u.toUpperCase(); // Ошибка компиляции: Object is of type 'unknown'.

if (typeof u === 'string') {
  console.log(u.toUpperCase()); // Безопасно: тип сужен до string!
}</code></pre>
</div>

<h2>3. Кортежи (Tuples) и элементы только для чтения</h2>
<p>
  Кортеж — это массив фиксированной длины, где тип каждого элемента известен на своей позиции. Мы также можем помечать массивы модификатором <code class="inline-code">readonly</code>:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>// Кортеж с опциональным элементом
type HTTPResponse = [status: number, message: string, payload?: object];

const success: HTTPResponse = [200, 'OK', { user: 'Alice' }];
const notFound: HTTPResponse = [404, 'Not Found'];

// Readonly-массив запрещает любые мутации
const numbers: readonly number[] = [1, 2, 3];
// numbers.push(4); // Ошибка: Property 'push' does not exist on type 'readonly number[]'.</code></pre>
</div>

<div class="callout warning">
  <div class="callout-title">⚠️ Почему стоит избегать числовых Enum</div>
  <p>Числовые <code class="inline-code">enum</code> в TypeScript не обладают полной безопасностью типов: переменной с типом числового enum можно присвоить абсолютно любое число. Вместо них Черный рекомендует использовать объединения строковых литералов или константные объекты <code class="inline-code">as const</code>.</p>
</div>`,
      "quiz": [
        {
          "question": "В чем ключевое отличие типа unknown от any?",
          "options": [
            "unknown заставляет разработчика явно проверить или сузить тип перед вызовом его методов.",
            "unknown может хранить только примитивные значения, а any — объекты.",
            "any быстрее компилируется, чем unknown.",
            "unknown удаляется из языка в режиме strict: false."
          ],
          "correct": 0,
          "explanation": "unknown — это типобезопасный аналог any. Вы не можете вызывать методы у unknown без предшествующего сужения типа через typeof или instanceof."
        },
        {
          "question": "Какое значение имеет тип never в системе типов TypeScript?",
          "options": [
            "Это нижний тип (bottom type), представляющий пустое множество значений.",
            "Это синоним null и undefined.",
            "Это тип, используемый только для асинхронных промисов.",
            "Это тип переменной, значение которой еще не загружено с сервера."
          ],
          "correct": 0,
          "explanation": "never представляет тип значения, которое никогда не может возникнуть (например, результат функции, выбрасывающей исключение)."
        }
      ]
    },
    {
      "num": 4,
      "title": "Глава 4. Функции",
      "subtitle": "Объявление функций, явная типизация this, полиморфизм параметров, перегрузка (overloading) и обобщения (Generics).",
      "minutes": 15,
      "contentHtml": `<h2>1. Сигнатуры вызова и контекст this</h2>
<p>
  В JavaScript ключевое слово <code class="inline-code">this</code> динамически привязывается в момент вызова функции, что является источником десятков распространенных ошибок. В TypeScript можно объявить ожидаемый тип <code class="inline-code">this</code> в качестве первого фиктивного аргумента:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>function fancyDate(this: Date): string {
  return this.toISOString().split('T')[0];
}

// fancyDate(); // Ошибка: The 'this' context of type 'void' is not assignable to method's 'this' of type 'Date'.
fancyDate.call(new Date()); // Корректно!</code></pre>
</div>

<h2>2. Перегрузка функций (Function Overloading)</h2>
<p>
  Когда функция может принимать разные комбинации параметров и возвращать разные типы, используются сигнатуры перегрузки:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>// Сигнатуры перегрузки (видны вызывающему коду)
function reserve(destination: string): void;
function reserve(destination: string, date: Date): void;

// Сигнатура реализации (объединяет все варианты)
function reserve(destination: string, date?: Date): void {
  if (date) {
    console.log('Бронь в ' + destination + ' на ' + date.toDateString());
  } else {
    console.log('Бронь в ' + destination + ' на ближайший рейс');
  }
}</code></pre>
</div>

<h2>3. Полиморфизм и дженерики (Generics)</h2>
<p>
  Дженерики позволяют писать обобщенный код, гарантирующий связь между типами аргументов и типом возвращаемого значения:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>// Ограничение обобщения (Generic Constraint)
function getProperty&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 101, name: 'Alice', active: true };
const userName = getProperty(user, 'name'); // Тип: string
// const invalid = getProperty(user, 'email'); // Ошибка: Argument of type '"email"' is not assignable to keyof...</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какую роль играет параметр 'this' в объявлении функции TypeScript: function foo(this: HTMLElement)?",
          "options": [
            "Это подсказка компилятору о типе контекста вызова; в рантайм-код он не попадает.",
            "Это обязательный первый аргумент, который нужно вручную передавать при обычном вызове foo(element).",
            "Это указатель на глобальный объект window.",
            "Это указание создать изолированный класс с именем foo."
          ],
          "correct": 0,
          "explanation": "Параметр this типизирует контекст вызова метода и полностью удаляется компилятором при трансляции в JavaScript."
        },
        {
          "question": "Что означает выражение K extends keyof T в объявлении обобщенной функции?",
          "options": [
            "Параметр K ограничен только строковыми или символьными ключами, присутствующими в типе T.",
            "Тип K должен наследовать все методы класса T.",
            "K является прототипом объекта T.",
            "K преобразует все свойства T в обязательные."
          ],
          "correct": 0,
          "explanation": "extends keyof T задает generic constraint, требуя, чтобы K являлся одним из допустимых имен ключей объекта T."
        }
      ]
    },
    {
      "num": 5,
      "title": "Глава 5. Классы и интерфейсы",
      "subtitle": "ООП в TypeScript: structural typing, модификаторы private/#private, интерфейсы, полиморфизм, примеси (Mixins) и паттерны.",
      "minutes": 15,
      "contentHtml": `<h2>1. Структурная типизация классов</h2>
<p>
  В отличие от Java или C++, где типизация является номинальной (два класса с одинаковыми полями считаются разными типами), TypeScript использует <em>структурную типизацию</em> (structural subtyping). Если форма двух объектов совпадает, они взаимозаменяемы:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>class Zebra {
  trot() { console.log('Trot-trot'); }
}

class Poodle {
  trot() { console.log('Trot-trot'); }
}

function safari(animal: Zebra) {
  animal.trot();
}

safari(new Poodle()); // Абсолютно валидно в TypeScript!</code></pre>
</div>

<h2>2. Классы объявляют и значения, и типы</h2>
<p>
  При объявлении класса в TypeScript создаются две сущности в разных пространствах имен:
</p>
<ol>
  <li><strong>В пространстве типов:</strong> тип экземпляра (что возвращает <code class="inline-code">new MyClass()</code>).</li>
  <li><strong>В пространстве значений:</strong> функция-конструктор (сам объект класса, у которого есть статические поля).</li>
</ol>

<h2>3. Примеси (Mixins)</h2>
<p>
  TypeScript поддерживает паттерн примесей для расширения функционала классов без жесткого глубокого наследования:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>type ClassConstructor&lt;T = {}&gt; = new (...args: any[]) => T;

function WithTimestamp&lt;TBase extends ClassConstructor&gt;(Base: TBase) {
  return class extends Base {
    timestamp = new Date();
  };
}

class User {
  constructor(public name: string) {}
}

const TimestampedUser = WithTimestamp(User);
const u = new TimestampedUser('Борис');
console.log(u.name, u.timestamp);</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Почему в TypeScript объект класса Poodle можно передать в функцию, ожидающую Zebra, если у них одинаковые публичные методы?",
          "options": [
            "TypeScript использует структурную типизацию: важна совместимость формы объекта, а не имя класса.",
            "Это ошибка компилятора, которую исправляет флаг --strictClassCheck.",
            "Потому что оба класса неявно наследуются от Animal.",
            "Потому что JavaScript автоматически преобразует типы на лету."
          ],
          "correct": 0,
          "explanation": "Система типов TypeScript структурна: если структура двух типов совместима, один может быть использован вместо другого."
        },
        {
          "question": "Что представляет собой фабричная функция примеси (Mixin) в TypeScript?",
          "options": [
            "Функцию, принимающую конструктор базового класса и возвращающую новый класс, расширяющий базовый.",
            "Специальный декоратор с префиксом @mixin.",
            "Объект, клонирующий свойства через Object.assign в рантайме.",
            "Интерфейс, объединяющий два типа через оператор &."
          ],
          "correct": 0,
          "explanation": "Паттерн Mixin в TypeScript реализуется через функцию высшего порядка, принимающую класс-конструктор и возвращающую расширенный анонимный класс."
        }
      ]
    },
    {
      "num": 6,
      "title": "Глава 6. Продвинутые типы",
      "subtitle": "Отношения подтипов, ковариантность и контравариантность, тотальность, отображенные типы, условные типы и брендирование.",
      "minutes": 18,
      "contentHtml": `<h2>1. Ковариантность и контравариантность (Variance)</h2>
<p>
  Пусть тип <code class="inline-code">A</code> является подтипом типа <code class="inline-code">B</code> (обозначается <code class="inline-code">A &lt;: B</code>). Как ведут себя сложные типы, составленные из них?
</p>
<ul>
  <li><strong>Ковариантность (Covariance):</strong> Если <code class="inline-code">A &lt;: B</code>, то и <code class="inline-code">Array&lt;A&gt; &lt;: Array&lt;B&gt;</code>. Свойства объектов и возвращаемые типы функций в TypeScript ковариантны.</li>
  <li><strong>Контравариантность (Contravariance):</strong> Порядок наследования обращается! Параметры функций в режиме <code class="inline-code">strictFunctionTypes: true</code> контравариантны: функция <code class="inline-code">(b: B) =&gt; void</code> может быть безопасно передана туда, где ожидается <code class="inline-code">(a: A) =&gt; void</code>.</li>
</ul>

<h2>2. Условные типы и ключевое слово infer</h2>
<p>
  Условные типы позволяют выражать логику ветвления на уровне системы типов:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>// Извлечение типа разрешенного промиса через infer
type AwaitedType&lt;T&gt; = T extends Promise&lt;infer U&gt; ? U : T;

type Example1 = AwaitedType&lt;Promise&lt;string&gt;&gt;; // string
type Example2 = AwaitedType&lt;number&gt;;          // number</code></pre>
</div>

<h2>3. Имитация номинальных типов (Branded Types)</h2>
<p>
  Поскольку TypeScript структурно типизирован, числа <code class="inline-code">USD</code> и <code class="inline-code">EUR</code> для него неотличимы от обычного <code class="inline-code">number</code>. Чтобы предотвратить случайное сложение долларов с евро, Черный рекомендует использовать брендирование:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>type USD = number & { readonly __brand: unique symbol };
type EUR = number & { readonly __brand: unique symbol };

function makeUSD(n: number): USD { return n as USD; }
function makeEUR(n: number): EUR { return n as EUR; }

const dollars = makeUSD(100);
const euros = makeEUR(100);

// function payBill(amount: USD) { ... }
// payBill(euros); // Ошибка: Type '__brand' is not assignable! Защита от багов на 100%!</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какую проверку включает флаг компилятора strictFunctionTypes?",
          "options": [
            "Строгую контравариантность параметров функций.",
            "Запрет использования стрелочных функций.",
            "Проверку обязательного возврата значения из каждой функции.",
            "Проверку асинхронности всех функций."
          ],
          "correct": 0,
          "explanation": "strictFunctionTypes активирует истинно типобезопасную проверку параметров функций — они проверяются контравариантно, а не бивариантно."
        },
        {
          "question": "Для чего применяется техника брендирования типов (Branded Types)?",
          "options": [
            "Для симуляции номинальной типизации и предотвращения смешивания семантически разных значений с одинаковой структурой.",
            "Для присвоения авторских прав коду библиотеки.",
            "Для оптимизации размера бандла при сборке.",
            "Для ускорения загрузки типов в IDE."
          ],
          "correct": 0,
          "explanation": "Branded types добавляют фиктивный признак (бренд) через уникальный символ, делая одинаковые примитивы несовместимыми между собой."
        }
      ]
    },
    {
      "num": 7,
      "title": "Глава 7. Обработка ошибок",
      "subtitle": "Ограничения throw/try/catch, возврат типизированных исключений, тип Result и функциональный тип Option<T>.",
      "minutes": 14,
      "contentHtml": `<h2>1. Проблема конструкции throw в TypeScript</h2>
<p>
  В TypeScript конструкция <code class="inline-code">throw new Error(...)</code> не отображается в сигнатуре функции. Вызывающий код видит только тип возвращаемого значения и не имеет ни малейшего понятия о том, какие исключения функция способна выбросить.
</p>
<p>
  Более того, в блоке <code class="inline-code">catch (e)</code> тип ошибки в современных версиях TS всегда равен <code class="inline-code">unknown</code>.
</p>

<h2>2. Паттерн Option: избавление от null</h2>
<p>
  Борис Черный предлагает элегантную альтернативу из мира функционального программирования — тип <code class="inline-code">Option&lt;T&gt;</code> (монада Maybe):
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>interface Option&lt;T&gt; {
  flatMap&lt;U&gt;(fn: (value: T) => Option&lt;U&gt;): Option&lt;U&gt;;
  getOrElse(def: T): T;
}

class Some&lt;T&gt; implements Option&lt;T&gt; {
  constructor(private value: T) {}
  flatMap&lt;U&gt;(fn: (value: T) => Option&lt;U&gt;): Option&lt;U&gt; { return fn(this.value); }
  getOrElse(): T { return this.value; }
}

class None implements Option&lt;never&gt; {
  flatMap(): None { return this; }
  getOrElse&lt;T&gt;(def: T): T { return def; }
}

function parseYear(input: string): Option&lt;number&gt; {
  const n = parseInt(input, 10);
  return isNaN(n) ? new None() : new Some(n);
}

const year = parseYear('2026').getOrElse(1970); // 2026! Безопасно и лаконично.</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Почему возврат объектов ошибок или Option/Result надежнее выбрасывания исключений через throw в TypeScript?",
          "options": [
            "Потому что возвращаемые типы ошибок явно отображаются в сигнатуре функции и проверяются компилятором.",
            "Потому что throw запрещен стандартом ECMAScript.",
            "Потому что вызов throw всегда приводит к аварийной остановке всего процесса Node.js.",
            "Потому что try-catch замедляет работу JavaScript в 100 раз."
          ],
          "correct": 0,
          "explanation": "TypeScript не поддерживает checked exceptions в сигнатурах, поэтому только возвращаемые типы заставляют разработчика обработать возможную ошибку."
        },
        {
          "question": "Какое значение возвращает вызов none.getOrElse(fallbackValue)?",
          "options": [
            "Резервное значение fallbackValue.",
            "Выбрасывает исключение NullPointerException.",
            "undefined.",
            "Объект None."
          ],
          "correct": 0,
          "explanation": "Монадический метод getOrElse для None возвращает переданное резервное значение (fallback)."
        }
      ]
    },
    {
      "num": 8,
      "title": "Глава 8. Асинхронность, конкурентность и параллелизм",
      "subtitle": "Цикл событий (Event Loop), промисы, async/await и типобезопасный параллелизм с Web Workers.",
      "minutes": 15,
      "contentHtml": `<h2>1. Цикл событий и микрозадачи</h2>
<p>
  JavaScript однопоточен в рамках одного изолированного контекста исполнения. Все асинхронные операции распределяются между очередью макрозадач (setTimeout, I/O) и очередью микрозадач (Promise.then, queueMicrotask).
</p>

<h2>2. Строгая типизация Web Workers</h2>
<p>
  Web Workers позволяют вынести тяжелые расчеты в параллельные потоки операционной системы. Однако стандартный <code class="inline-code">postMessage</code> принимает <code class="inline-code">any</code>. Черный демонстрирует, как построить полностью типобезопасный RPC-шлюз между потоками:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>// Описание контракта сообщений
type CommandMap = {
  calculateHash: { payload: string; response: string };
  renderMatrix:  { payload: number[][]; response: ImageData };
};

type WorkerMessage&lt;K extends keyof CommandMap&gt; = {
  id: string;
  command: K;
  data: CommandMap[K]['payload'];
};

type WorkerResponse&lt;K extends keyof CommandMap&gt; = {
  id: string;
  result: CommandMap[K]['response'];
};</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какая очередь асинхронных задач имеет наивысший приоритет исполнения перед следующей макрозадачей?",
          "options": [
            "Очередь микрозадач (Microtask Queue: промисы, queueMicrotask).",
            "Очередь таймеров setTimeout.",
            "Очередь рендеринга requestAnimationFrame.",
            "Сетевые коллбэки fetch."
          ],
          "correct": 0,
          "explanation": "Микрозадачи опустошаются до конца сразу после завершения текущей задачи, до перехода к следующей макрозадаче."
        },
        {
          "question": "Как изолирована память между главным потоком и Web Worker в веб-браузере?",
          "options": [
            "Память изолирована полностью (Shared-nothing), данные сериализуются алгоритмом структурированного клонирования.",
            "Потоки делят общую память всех глобальных объектов без блокировок.",
            "Web Worker имеет доступ к DOM-дереву через ссылку window.parent.",
            "Память синхронизируется через localStorage."
          ],
          "correct": 0,
          "explanation": "Web Workers изолированы: данные передаются копированием через structured clone (за исключением SharedArrayBuffer)."
        }
      ]
    },
    {
      "num": 9,
      "title": "Глава 9. Фронтенд- и бэкенд-фреймворки с типобезопасными API",
      "subtitle": "Типизация React-компонентов, хуков, контекста и построение типобезопасных REST и GraphQL контрактов.",
      "minutes": 14,
      "contentHtml": `<h2>1. Типизация компонентов в React</h2>
<p>
  В современном React компоненты описываются как простые функции, принимающие типизированный объект свойств (<code class="inline-code">props</code>):
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TSX · React Component</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>type ButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick: (event: React.MouseEvent&lt;HTMLButtonElement&gt;) => void;
  children?: React.ReactNode;
};

export const CustomButton = ({ label, variant = 'primary', onClick }: ButtonProps) => (
  &lt;button className={'btn btn-' + variant} onClick={onClick}&gt;
    {label}
  &lt;/button&gt;
);</code></pre>
</div>

<h2>2. Сквозная типобезопасность (End-to-End Type Safety)</h2>
<p>
  Главное преимущество TypeScript в fullstack-разработке — возможность разделять типы моделей между бэкендом (Node.js) и фронтендом. Изменение схемы базы данных немедленно приводит к ошибке компиляции в React-компоненте, выводящем устаревшее поле.
</p>`,
      "quiz": [
        {
          "question": "Какой тип наиболее точно описывает любые допустимые дочерние элементы в JSX React?",
          "options": [
            "React.ReactNode",
            "JSX.Element",
            "HTMLElement",
            "object"
          ],
          "correct": 0,
          "explanation": "React.ReactNode включает в себя элементы JSX, строки, числа, фрагменты, порталы, null и boolean."
        },
        {
          "question": "В чем заключается концепция End-to-End Type Safety в стеке TypeScript?",
          "options": [
            "Один и тот же контракт типов используется на клиенте и сервере, гарантируя соответствие схемы API.",
            "Код компилируется в один огромный бинарный файл.",
            "TypeScript автоматически генерирует SQL-таблицы.",
            "Клиентские запросы не шифруются через TLS."
          ],
          "correct": 0,
          "explanation": "Сквозная типизация гарантирует, что контракт API между сервером и клиентом проверяется компилятором на обоих концах."
        }
      ]
    },
    {
      "num": 10,
      "title": "Глава 10. Модули, пространства имен и слияние деклараций",
      "subtitle": "Эволюция модулей в JavaScript, пространства имен (namespace) и слияние деклараций (declaration merging).",
      "minutes": 13,
      "contentHtml": `<h2>1. Слияние деклараций (Declaration Merging)</h2>
<p>
  Уникальная особенность TypeScript: если один и тот же интерфейс объявлен в кодовой базе несколько раз, компилятор автоматически объединяет их поля в одну сущность:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>interface UserProfile {
  id: string;
  name: string;
}

// В другом файле или плагине:
interface UserProfile {
  email: string;
  avatarUrl?: string;
}

// Итоговый тип UserProfile содержит id, name, email и avatarUrl!</code></pre>
</div>

<div class="callout tip">
  <div class="callout-title">💡 Отличие интерфейсов от псевдонимов типов (type)</div>
  <p>Интерфейсы поддерживают открытое слияние деклараций (merging). Псевдонимы типов (<code class="inline-code">type</code>) являются закрытыми и вызовут ошибку дублирования идентификатора.</p>
</div>`,
      "quiz": [
        {
          "question": "Что произойдет, если объявить два интерфейса с одинаковым именем в одной области видимости?",
          "options": [
            "Компилятор объединит их определения в один интерфейс со всеми свойствами (Declaration Merging).",
            "Компилятор выбросит ошибку Duplicate identifier.",
            "Второй интерфейс полностью перезапишет первый.",
            "Код перестанет компилироваться только в режиме strict: true."
          ],
          "correct": 0,
          "explanation": "TypeScript объединяет одноименные интерфейсы — этот механизм лежит в основе расширения типов сторонних библиотек."
        },
        {
          "question": "Поддерживают ли слияние деклараций псевдонимы типов (type alias)?",
          "options": [
            "Нет, повторное объявление type с тем же именем вызовет фатальную ошибку компиляции.",
            "Да, точно так же, как интерфейсы.",
            "Да, но только если используется оператор &.",
            "Только внутри пространств имен namespace."
          ],
          "correct": 0,
          "explanation": "Псевдоним типа (type) уникален в своей области видимости: повторное определение приводит к ошибке компилятора."
        }
      ]
    },
    {
      "num": 11,
      "title": "Глава 11. Взаимодействие с JavaScript и ambient-декларации",
      "subtitle": "Файлы деклараций .d.ts, ключевое слово declare, DefinitelyTyped (@types) и пошаговая миграция кодовой базы.",
      "minutes": 14,
      "contentHtml": `<h2>1. Анатомия файлов деклараций (.d.ts)</h2>
<p>
  Файлы <code class="inline-code">.d.ts</code> содержат исключительно типы и объявления, не порождая никакого исполняемого JavaScript-кода. Они выступают цифровым паспортом для существующего JS-кода:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript · types/legacy-lib.d.ts</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>declare module 'legacy-analytics' {
  export function trackEvent(name: string, payload?: Record&lt;string, unknown&gt;): void;
  export const version: string;
}</code></pre>
</div>

<h2>2. Стратегия пошаговой миграции</h2>
<p>
  Ни в коем случае нельзя пытаться переписать проект на миллион строк за один день. Черный рекомендует 4 шага:
</p>
<ol>
  <li>Включить <code class="inline-code">allowJs: true</code> в <code class="inline-code">tsconfig.json</code>, чтобы компилятор принимал обычные <code class="inline-code">.js</code> файлы.</li>
  <li>Включить <code class="inline-code">checkJs: true</code> для базового статического анализа JS через комментарии JSDoc.</li>
  <li>Поочередно переименовывать файлы из <code class="inline-code">.js</code> в <code class="inline-code">.ts</code>, начиная с независимых утилит (листьев графа зависимостей).</li>
  <li>Постепенно активировать строгие флаги: сначала <code class="inline-code">noImplicitAny</code>, затем <code class="inline-code">strictNullChecks</code>.</li>
</ol>`,
      "quiz": [
        {
          "question": "Что содержит сгенерированный компилятором файл с расширением .d.ts?",
          "options": [
            "Исключительно информацию о типах и интерфейсах (контракты без тел функций и логики).",
            "Оптимизированный ассемблерный код WebAssembly.",
            "Сжатый минифицированный JavaScript для браузера.",
            "Логи профилирования компилятора."
          ],
          "correct": 0,
          "explanation": ".d.ts — это файлы ambient-деклараций типов (type declarations), используемые для статической проверки внешних модулей."
        },
        {
          "question": "Какой флаг tsconfig позволяет TypeScript компилировать одновременно .js и .ts файлы в одном проекте?",
          "options": [
            "allowJs: true",
            "checkJs: false",
            "strict: false",
            "target: 'ES5'"
          ],
          "correct": 0,
          "explanation": "Флаг allowJs разрешает компилятору включать исходные JavaScript-файлы в процесс сборки проекта."
        }
      ]
    },
    {
      "num": 12,
      "title": "Глава 12. Создание, сборка и публикация проектов TypeScript",
      "subtitle": "Организация репозитория, компиляция под Node.js и браузеры, директивы с тремя слешами и публикация в NPM.",
      "minutes": 15,
      "contentHtml": `<h2>1. Структура профессионального проекта</h2>
<p>
  Грамотная структура папок изолирует исходный код, скомпилированные артефакты и декларации типов:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">File Tree</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>my-ts-package/
├── dist/             # Результат компиляции (.js, .d.ts, .d.ts.map)
├── src/              # Исходный код (.ts, .tsx)
│   ├── index.ts      # Публичная точка входа
│   └── internal/
├── tests/            # Тесты (Jest / Vitest)
├── package.json      # main, module, types поля
└── tsconfig.json     # Конфигурация сборки</code></pre>
</div>

<h2>2. Настройка package.json для публикации в NPM</h2>
<p>
  Чтобы библиотека корректно распознавалась и в средах CommonJS, и в ESM, а TypeScript находил файлы типов:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JSON · package.json</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>{
  "name": "my-ultra-lib",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "scripts": {
    "build": "tsc"
  }
}</code></pre>
</div>

<div class="callout tip">
  <div class="callout-title">💡 Директивы с тремя слешами (Triple-Slash Directives)</div>
  <p>Директивы вроде <code class="inline-code">/// &lt;reference types="node" /&gt;</code> указывают компилятору на необходимость включения дополнительных глобальных деклараций типов при сборке отдельного файла.</p>
</div>`,
      "quiz": [
        {
          "question": "Какое поле в package.json указывает компилятору TypeScript путь к корневому файлу деклараций типов при установке пакета из NPM?",
          "options": [
            "types (или typings)",
            "scripts",
            "exports.entry",
            "declarations"
          ],
          "correct": 0,
          "explanation": "Поле types (или его псевдоним typings) указывает на файл .d.ts, экспортирующий типы библиотеки."
        },
        {
          "question": "Какая утилита компилятора генерирует файлы .d.ts на основе файлов .ts?",
          "options": [
            "Компилятор tsc при установленном флаге declaration: true.",
            "npm publish автоматически.",
            "Babel с плагином @babel/preset-typescript.",
            "Браузерная среда исполнения."
          ],
          "correct": 0,
          "explanation": "Флаг compilerOptions.declaration: true заставляет tsc генерировать соответствующие .d.ts файлы для всех исходников."
        }
      ]
    }
  ]
};
