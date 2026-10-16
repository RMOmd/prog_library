// book.js — TypeScript быстро (Яков Файн, Антон Моисеев)
'use strict';

window.BOOK_DATA = {
  "id": "typescript-quickly",
  "title": "TypeScript быстро",
  "author": "Яков Файн, Антон Моисеев",
  "cover": "img/cover.jpg",
  "totalChapters": 16,
  "chapters": [
    {
      "num": 1,
      "title": "Глава 1. Знакомство с TypeScript и рабочий процесс",
      "subtitle": "Почему TypeScript победил в веб-индустрии, компилятор tsc, настройка рабочего окружения в VS Code и конфигурация tsconfig.json.",
      "minutes": 10,
      "contentHtml": `<h2>1. Почему TypeScript стал стандартом индустрии</h2>
<p>
  JavaScript создавался как язык сценариев для небольших интерактивных элементов на веб-страницах. С развитием браузерных технологий кодовые базы веб-приложений выросли до сотен тысяч строк. Написание крупных корпоративных проектов на нетипизированном JavaScript сопряжено с колоссальным риском непредвиденных рантайм-сбоев из-за опечаток, неверных аргументов функций и мутаций данных.
</p>
<p>
  TypeScript решает эту проблему за счет <em>статического анализа</em>: ошибки выявляются непосредственно в процессе написания кода в редакторе (VS Code), задолго до запуска в браузере или Node.js.
</p>

<h2>2. Рабочий процесс компилятора tsc</h2>
<p>
  TypeScript является надмножеством JavaScript: любой валидный код JavaScript является валидным кодом TypeScript. Процесс компиляции заключается в проверке типов и последующей трансляции (транспиляции) исходного кода в стандартный ECMAScript:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">Bash / Terminal</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code># Глобальная установка компилятора TypeScript
npm install -g typescript

# Компиляция отдельного файла в JavaScript
tsc main.ts

# Компиляция в режиме непрерывного отслеживания изменений (watch mode)
tsc -w</code></pre>
</div>

<h2>3. Конфигурационный файл tsconfig.json</h2>
<p>
  Для управления параметрами сборки используется файл <code class="inline-code">tsconfig.json</code>. Он определяет целевую версию JavaScript, модульную систему и строгость проверок:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JSON · tsconfig.json</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>{
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "strict": true,
    "noImplicitAny": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Каково основное назначение компилятора TypeScript (tsc)?",
          "options": [
            "Выполнить статическую проверку типов и транслировать TypeScript-код в стандартный JavaScript.",
            "Напрямую компилировать TypeScript в бинарный машинный код для процессора x86.",
            "Запустить виртуальную машину в браузере для выполнения типов в реальном времени.",
            "Сжать картинки и стили проекта."
          ],
          "correct": 0,
          "explanation": "tsc проверяет корректность типов во время сборки и удаляет их, генерируя чистый JavaScript, понятный любому браузеру и Node.js."
        },
        {
          "question": "Что обеспечивает флаг sourceMap: true в tsconfig.json?",
          "options": [
            "Генерацию карт соответствия исходного кода .ts и собранного .js для удобной отладки в браузере.",
            "Автоматическую загрузку спутниковых карт Google Maps.",
            "Запрет использования сторонних библиотек.",
            "Шифрование исходного кода от копирования."
          ],
          "correct": 0,
          "explanation": "Файлы Source Map (.js.map) связывают строки скомпилированного JavaScript с исходными строками TypeScript в отладчике браузера или VS Code."
        }
      ]
    },
    {
      "num": 2,
      "title": "Глава 2. Базовые, пользовательские типы и Type Guards",
      "subtitle": "Аннотации примитивных типов, псевдонимы type, интерфейсы, структурная типизация, any vs unknown и защитники типов.",
      "minutes": 14,
      "contentHtml": `<h2>1. Базовые типы данных и объединения (Unions)</h2>
<p>
  TypeScript поддерживает все стандартные примитивы JavaScript: <code class="inline-code">number</code>, <code class="inline-code">string</code>, <code class="inline-code">boolean</code>, <code class="inline-code">symbol</code>, <code class="inline-code">bigint</code>. Кроме того, поддерживаются объединения типов (Union Types):
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>// Объединенный тип (Union): значение может быть строкой или числом
let accountId: string | number;
accountId = 'ACC-9481'; // Корректно
accountId = 1049281;    // Корректно
// accountId = true;    // Ошибка компиляции: Type 'boolean' is not assignable!</code></pre>
</div>

<h2>2. Пользовательские типы: type против interface</h2>
<p>
  Для описания сложных структур данных используются ключевые слова <code class="inline-code">type</code> и <code class="inline-code">interface</code>:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>// Определение через type
type Coordinates = {
  lat: number;
  lng: number;
};

// Определение через interface
interface Device {
  id: string;
  name: string;
  location?: Coordinates; // Опциональное свойство
}</code></pre>
</div>

<h2>3. Защитники типов (Type Guards)</h2>
<p>
  Когда переменная имеет объединенный тип, перед обращением к специфическим методам необходимо сузить тип с помощью защитника:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>function printLength(val: string | string[]) {
  if (typeof val === 'string') {
    console.log('Длина строки:', val.trim().length);
  } else {
    console.log('Количество элементов массива:', val.length);
  }
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какое ключевое преимущество дает использование защитника типа (Type Guard) в блоке if (typeof x === 'string')?",
          "options": [
            "Компилятор TypeScript автоматически сужает тип переменной x внутри блока if до типа string.",
            "Код исполняется в 2 раза быстрее в среде Node.js.",
            "Переменная x автоматически переводится в верхний регистр.",
            "Отключается сборщик мусора V8."
          ],
          "correct": 0,
          "explanation": "Type Guard позволяет компилятору достоверно сузить тип внутри ветки условия, предоставляя автодополнение и проверку методов string."
        },
        {
          "question": "Что означает вопросительный знак в объявлении свойства: location?: Coordinates?",
          "options": [
            "Свойство является опциональным и может иметь значение undefined или отсутствовать.",
            "Свойство доступно только для чтения (readonly).",
            "Свойство требует обязательного подтверждения от сервера.",
            "Это синтаксическая ошибка в TypeScript."
          ],
          "correct": 0,
          "explanation": "Знак '?' помечает поле как опциональное (optional property)."
        }
      ]
    },
    {
      "num": 3,
      "title": "Глава 3. ООП: классы, интерфейсы и абстрактные типы",
      "subtitle": "Классы в TypeScript, модификаторы public/private/protected, паттерн Одиночка (Singleton), super() и абстрактные классы.",
      "minutes": 14,
      "contentHtml": `<h2>1. Модификаторы доступа в классах</h2>
<p>
  TypeScript расширяет классы ECMAScript строгими модификаторами доступа:
</p>
<ul>
  <li><code class="inline-code">public</code> (по умолчанию) — доступно отовсюду.</li>
  <li><code class="inline-code">private</code> — доступно только внутри самого класса.</li>
  <li><code class="inline-code">protected</code> — доступно внутри класса и во всех его наследниках.</li>
</ul>

<h2>2. Сокращенная инициализация свойств в конструкторе</h2>
<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript · Parameter Properties</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>class BankAccount {
  // TypeScript автоматически создает и инициализирует поля:
  constructor(
    public readonly accountNo: string,
    private balance: number,
    protected currency: string = 'USD'
  ) {}

  public getBalance(): number {
    return this.balance;
  }
}</code></pre>
</div>

<h2>3. Абстрактные классы (abstract class)</h2>
<p>
  Абстрактный класс служит базовым шаблоном для семейств классов и не может быть инстанцирован напрямую через <code class="inline-code">new</code>:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>abstract class BlockchainNode {
  constructor(public readonly address: string) {}

  // Наследники обязаны реализовать абстрактный метод:
  abstract validateBlock(blockData: string): boolean;

  // Общий конкретный метод:
  broadcast(): void {
    console.log('Вещание транзакции от узла', this.address);
  }
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "В чем главное отличие модификатора protected от private?",
          "options": [
            "Поля protected доступны как внутри самого класса, так и внутри классов-наследников.",
            "Поля protected видны во всем глобальном объекте window.",
            "Поля protected нельзя перезаписывать.",
            "Поля protected могут содержать только числовые значения."
          ],
          "correct": 0,
          "explanation": "private скрывает свойство даже от дочерних классов, тогда как protected разрешает доступ классам-наследникам."
        },
        {
          "question": "Можно ли создать экземпляр абстрактного класса напрямую: const n = new BlockchainNode('127.0.0.1')?",
          "options": [
            "Нет, компилятор запрещает создание экземпляров абстрактных классов (Cannot create an instance of an abstract class).",
            "Да, абстрактные классы ничем не отличаются от обычных классов.",
            "Да, но только если в классе нет абстрактных методов.",
            "Только если передан флаг --allowAbstractNew."
          ],
          "correct": 0,
          "explanation": "Абстрактные классы предназначены исключительно для наследования и не могут быть инстанцированы напрямую."
        }
      ]
    },
    {
      "num": 4,
      "title": "Глава 4. Перечисления (Enums) и обобщения (Generics)",
      "subtitle": "Числовые и строковые перечисления (enum), дженерики в функциях, интерфейсах и классах, ограничения обобщений extends.",
      "minutes": 13,
      "contentHtml": `<h2>1. Перечисления (Enums)</h2>
<p>
  Перечисления позволяют определить набор именованных констант. Файн и Моисеев подчеркивают надежность <em>строковых перечислений</em>:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript · String Enums</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>enum TransactionStatus {
  Pending = 'PENDING',
  Confirmed = 'CONFIRMED',
  Rejected = 'REJECTED'
}

function processTx(status: TransactionStatus) {
  if (status === TransactionStatus.Confirmed) {
    console.log('Транзакция успешно записана в блокчейн');
  }
}</code></pre>
</div>

<h2>2. Обобщенные типы (Generics)</h2>
<p>
  Обобщения позволяют создавать повторно используемые компоненты, работающие с различными типами данных, не теряя строгой проверки:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript · Generics</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>// Обобщенная очередь данных
class Queue&lt;T&gt; {
  private data: T[] = [];

  push(item: T): void {
    this.data.push(item);
  }

  pop(): T | undefined {
    return this.data.shift();
  }
}

const numQueue = new Queue&lt;number&gt;();
numQueue.push(42);
// numQueue.push('не число'); // Ошибка компилятора: Argument of type 'string' is not assignable to 'number'.</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Почему строковые enum (String Enums) предпочтительнее числовых по умолчанию?",
          "options": [
            "При отладке и логировании они выводят понятные осмысленные строки, а не абстрактные индексы 0, 1, 2.",
            "Строковые enum компилируются в машинный код быстрее.",
            "Числовые enum удалены из спецификации TypeScript 5.",
            "Строковые enum могут содержать неограниченное количество параметров."
          ],
          "correct": 0,
          "explanation": "Строковые перечисления дают ясную читаемость при сериализации в JSON и отладке в логах."
        },
        {
          "question": "Что представляет собой параметр T в объявлении class Queue<T>?",
          "options": [
            "Переменную типа (Type Variable), определяемую пользователем класса при создании экземпляра.",
            "Обязательный тип 'Text'.",
            "Глобальную константу времени компиляции.",
            "Указатель на память."
          ],
          "correct": 0,
          "explanation": "T — это типовой параметр (generic type parameter), который заменяется на конкретный тип при создании объекта."
        }
      ]
    },
    {
      "num": 5,
      "title": "Глава 5. Декораторы и продвинутые типы",
      "subtitle": "Метапрограммирование с декораторами классов и методов, условные типы, отображенные типы (Mapped Types) и keyof.",
      "minutes": 15,
      "contentHtml": `<h2>1. Декораторы в TypeScript</h2>
<p>
  Декоратор — это специальный вид объявления, который может быть присоединен к классу, методу, свойству или параметру. Декораторы используют форму <code class="inline-code">@expression</code> и активно применяются в Angular:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript · Method Decorator</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>function LogExecutionTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const finish = performance.now();
    console.log('Метод ' + propertyKey + ' выполнен за ' + (finish - start) + ' мс');
    return result;
  };
  return descriptor;
}</code></pre>
</div>

<h2>2. Отображенные типы (Mapped Types) и keyof</h2>
<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>interface Block {
  index: number;
  hash: string;
  previousHash: string;
}

// Превращение всех свойств объекта в опциональные:
type OptionalBlock = {
  [K in keyof Block]?: Block[K];
};</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Что представляет собой оператор keyof Block?",
          "options": [
            "Объединение строковых литералов всех имен ключей типа Block ('index' | 'hash' | 'previousHash').",
            "Массив значений объекта в рантайме.",
            "Случайный хэш-ключ шифрования.",
            "Функцию для удаления ключей из объекта."
          ],
          "correct": 0,
          "explanation": "Оператор keyof возвращает объединение всех доступных имен свойств указанного типа."
        },
        {
          "question": "Какой флаг в tsconfig.json необходим для поддержки экспериментальных декораторов?",
          "options": [
            "experimentalDecorators: true",
            "allowDecorators: true",
            "enableBabelPlugins: true",
            "decoratorsMode: 'legacy'"
          ],
          "correct": 0,
          "explanation": "Флаг experimentalDecorators: true включает поддержку синтаксиса декораторов классов и методов в компиляторе TypeScript."
        }
      ]
    },
    {
      "num": 6,
      "title": "Глава 6. Инструменты: Webpack, Babel и отладка",
      "subtitle": "Интеграция TypeScript с бандлерами, загрузчик ts-loader, транспиляция через Babel, оптимизация сборки и профилирование.",
      "minutes": 14,
      "contentHtml": `<h2>1. Сборка проектов с Webpack и ts-loader</h2>
<p>
  В реальных веб-проектах TypeScript компилируется не отдельно, а как часть цепочки сборщика модулей Webpack. Конфигурационный файл <code class="inline-code">webpack.config.js</code> настраивает трансляцию <code class="inline-code">.ts</code> файлов в общий бандл:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · webpack.config.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какую задачу решает загрузчик ts-loader в конфигурации Webpack?",
          "options": [
            "Передает TypeScript-файлы компилятору tsc для проверки типов и трансляции в JavaScript в процессе сборки бандла.",
            "Загружает шрифты с серверов Google Fonts.",
            "Форматирует CSS-стили с помощью Prettier.",
            "Генерирует SSL-сертификаты для локального сервера."
          ],
          "correct": 0,
          "explanation": "ts-loader является связующим звеном между пайплайном Webpack и компилятором TypeScript."
        },
        {
          "question": "Зачем в секции resolve файла webpack.config.js указывать extensions: ['.ts', '.js']?",
          "options": [
            "Чтобы можно было импортировать модули без явного указания расширения файла в операторе import.",
            "Чтобы запретить сборку файлов с другими расширениями.",
            "Чтобы уменьшить размер картинок в проекте.",
            "Чтобы файлы автоматически архивировались в ZIP."
          ],
          "correct": 0,
          "explanation": "Это указывает Webpack автоматически проверять расширения .ts и .js при разрешении путей в import statements."
        }
      ]
    },
    {
      "num": 7,
      "title": "Глава 7. Совместное использование TypeScript и JavaScript",
      "subtitle": "Миграция легаси-проектов, флаги allowJs и checkJs, аннотации JSDoc, поиск типов и файлы деклараций .d.ts.",
      "minutes": 13,
      "contentHtml": `<h2>1. Постепенная интеграция в существующий проект</h2>
<p>
  TypeScript спроектирован для бесшовного сосуществования с обычным JavaScript. При постепенном переносе проекта на TypeScript в <code class="inline-code">tsconfig.json</code> активируются флаги:
</p>
<ul>
  <li><code class="inline-code">allowJs: true</code> — компилятор tsc обрабатывает и включает файлы <code class="inline-code">.js</code> в общий вывод сборки.</li>
  <li><code class="inline-code">checkJs: true</code> — проверяльщик типов выполняет статический анализ внутри <code class="inline-code">.js</code> файлов на основе аннотаций JSDoc.</li>
</ul>

<h2>2. Использование JSDoc для типизации в JS-файлах</h2>
<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">JavaScript · legacy-utils.js</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>/**
 * Вычисляет SHA-256 хеш транзакции.
 * @param {string} sender Отправитель монет
 * @param {string} recipient Получатель
 * @param {number} amount Количество криптовалюты
 * @returns {string} Хеш-строка
 */
function createTransaction(sender, recipient, amount) {
  return sender + '->' + recipient + ':' + amount;
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какой флаг заставляет tsc проверять соответствие типов внутри файлов .js с использованием JSDoc?",
          "options": [
            "checkJs: true",
            "auditJavaScript: true",
            "verifyJSDoc: true",
            "strict: true без других настроек"
          ],
          "correct": 0,
          "explanation": "checkJs: true активирует механизм статической проверки типов для обычных файлов JavaScript."
        },
        {
          "question": "Для чего в проект подключается библиотека с префиксом @types/ (например, @types/lodash)?",
          "options": [
            "Она предоставляет файлы ambient-деклараций типов (.d.ts) для JavaScript-библиотеки, написанной без TypeScript.",
            "Она заменяет оригинальную библиотеку более производительной версией на WebAssembly.",
            "Она автоматически исправляет ошибки в коде библиотеки.",
            "Она шифрует вызовы библиотеки."
          ],
          "correct": 0,
          "explanation": "Пакеты из репозитория DefinitelyTyped (@types/...) предоставляют информацию о типах для существующих JS-библиотек."
        }
      ]
    },
    {
      "num": 8,
      "title": "Глава 8. Архитектура блокчейна: хэширование SHA-256 и Proof of Work",
      "subtitle": "Моделирование криптографических блоков, транзакций, неизменяемости цепочки и алгоритма майнинга Proof of Work на TypeScript.",
      "minutes": 16,
      "contentHtml": `<h2>1. Структура криптографического блока</h2>
<p>
  В практической части книги Файн и Моисеев создают полноценную систему блокчейна. Блокчейн представляет собой связный список блоков, где каждый блок содержит криптографический хэш предыдущего блока:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript · Block Model</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>interface Transaction {
  sender: string;
  recipient: string;
  amount: number;
}

class Block {
  public nonce: number = 0;
  public hash: string = '';

  constructor(
    public readonly index: number,
    public readonly timestamp: number,
    public readonly previousHash: string,
    public readonly transactions: Transaction[]
  ) {}
}</code></pre>
</div>

<h2>2. Алгоритм консенсуса Proof of Work (Доказательство работы)</h2>
<p>
  Майнинг заключается в подборе числа <code class="inline-code">nonce</code>, при котором результирующий хэш блока SHA-256 начинается с определенного количества нулей (сложность сети):
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript · Mining Algorithm</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>async function mineBlock(block: Block, difficulty: number): Promise&lt;string&gt; {
  const prefix = '0'.repeat(difficulty);
  while (!block.hash.startsWith(prefix)) {
    block.nonce++;
    block.hash = await calculateHash(block);
  }
  console.log('Блок успешно смайнен: ' + block.hash + ' (nonce: ' + block.nonce + ')');
  return block.hash;
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Почему попытка подменить транзакцию в старом блоке блокчейна немедленно разрушает всю цепочку?",
          "options": [
            "Хэш измененного блока изменится, что сделает недействительным поле previousHash во всех последующих блоках цепочки.",
            "Сервер автоматически выключает питание майнинг-ферм.",
            "Браузер блокирует доступ к сайту через HSTS.",
            "Сумма транзакций списывается в пользу валидаторов."
          ],
          "correct": 0,
          "explanation": "Связывание блоков через криптографические хэши обеспечивает строгую неизменяемость: изменение одного бита меняет весь хэш и инвалидирует следующие блоки."
        },
        {
          "question": "Какую роль играет число nonce в процессе майнинга Proof of Work?",
          "options": [
            "Это число-модификатор, инкрементируемое майнером для нахождения подходящего хэша с требуемым числом лидирующих нулей.",
            "Это идентификатор учетной записи майнера.",
            "Это размер комиссии сети в сатоши.",
            "Это номер порта WebSocket сервера."
          ],
          "correct": 0,
          "explanation": "Nonce (Number used ONCE) перебирается в цикле, пока хэш блока не удовлетворит текущей сложности сети."
        }
      ]
    },
    {
      "num": 9,
      "title": "Глава 9. Браузерный узел блокчейна и Web Crypto API",
      "subtitle": "Реализация легковесного узла в браузере, асинхронное вычисление хэшей через Web Crypto API и пользовательский интерфейс.",
      "minutes": 15,
      "contentHtml": `<h2>1. Использование встроенного Web Crypto API</h2>
<p>
  Вместо тяжелых сторонних библиотек для вычисления хэшей SHA-256 авторы используют высокопроизводительный встроенный в браузер стандарт <code class="inline-code">window.crypto.subtle</code>:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript · Web Crypto API</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>async function sha256(message: string): Promise&lt;string&gt; {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какое главное преимущество дает использование window.crypto.subtle перед сторонними JS-библиотеками криптографии?",
          "options": [
            "Аппаратное ускорение на уровне браузера и отсутствие необходимости тащить лишние килобайты в бандле.",
            "Возможность шифровать файлы без согласия пользователя.",
            "Автоматический майнинг биткоинов в фоне.",
            "Поддержка работы без интернета."
          ],
          "correct": 0,
          "explanation": "Web Crypto API аппаратно оптимизирован браузерным движком и не раздувает клиентский бандл сторонним кодом."
        },
        {
          "question": "Какой класс используется для преобразования строки JavaScript в массив байтов Uint8Array для Web Crypto API?",
          "options": [
            "TextEncoder",
            "BufferStream",
            "StringSerializer",
            "ByteConverter"
          ],
          "correct": 0,
          "explanation": "Стандартный класс TextEncoder кодирует строку в поток байтов UTF-8 (Uint8Array)."
        }
      ]
    },
    {
      "num": 10,
      "title": "Глава 10. Серверная синхронизация: Node.js, Express и WebSockets",
      "subtitle": "Создание P2P-сети блокчейна, двусторонняя синхронизация узлов через WebSockets, Express API и широковещание блоков.",
      "minutes": 16,
      "contentHtml": `<h2>1. Архитектура P2P-сети на WebSockets</h2>
<p>
  Для объединения узлов в децентрализованную сеть необходим полнодуплексный протокол связи в реальном времени. Авторы реализуют WebSocket-сервер на TypeScript с использованием библиотеки <code class="inline-code">ws</code>:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript · WebSocket Server</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>import WebSocket, { WebSocketServer } from 'ws';

export enum MessageType {
  QueryLatest = 'QUERY_LATEST',
  QueryAll = 'QUERY_ALL',
  ResponseBlockchain = 'RESPONSE_BLOCKCHAIN'
}

interface PeerMessage {
  type: MessageType;
  data?: any;
}

const wss = new WebSocketServer({ port: 6001 });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    const parsed: PeerMessage = JSON.parse(message);
    console.log('Получено сообщение от пира:', parsed.type);
  });
});</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Почему для синхронизации узлов распределенного блокчейна используется протокол WebSocket, а не классический REST HTTP polling?",
          "options": [
            "WebSocket держит постоянное полнодуплексное соединение, позволяя мгновенно рассылать новые блоки всем подключенным узлам.",
            "REST API запрещен для использования в Node.js.",
            "WebSocket автоматически шифрует все данные без SSL.",
            "Через WebSocket нельзя отправлять текстовые данные."
          ],
          "correct": 0,
          "explanation": "WebSocket минимизирует задержку и сетевые накладные расходы, мгновенно вещая новые блоки в P2P-сети."
        },
        {
          "question": "Какое событие сокета срабатывает в библиотеке ws при получении сообщения от удаленного пира?",
          "options": [
            "message",
            "incomingData",
            "packetReceive",
            "syncState"
          ],
          "correct": 0,
          "explanation": "Событие 'message' передает входящие пакеты данных от подключенного клиента или пира."
        }
      ]
    },
    {
      "num": 11,
      "title": "Глава 11. Архитектура приложений Angular с TypeScript",
      "subtitle": "Основы Angular для TypeScript-разработчиков: декораторы @Component, @Injectable, внедрение зависимостей и реактивные потоки RxJS.",
      "minutes": 14,
      "contentHtml": `<h2>1. Архитектура Angular и глубокая интеграция с TypeScript</h2>
<p>
  Фреймворк Angular от Google с первого дня разрабатывался на TypeScript и использует всю мощь статической системы типов, декораторов и внедрения зависимостей (Dependency Injection):
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript · Angular Service</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private chainSubject = new BehaviorSubject&lt;Block[]&gt;([]);
  public chain$: Observable&lt;Block[]&gt; = this.chainSubject.asObservable();

  addBlock(newBlock: Block): void {
    const current = this.chainSubject.getValue();
    this.chainSubject.next([...current, newBlock]);
  }
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какую роль выполняет декоратор @Injectable({ providedIn: 'root' }) в Angular?",
          "options": [
            "Регистрирует класс в системе Dependency Injection как синглтон, доступный во всем приложении.",
            "Превращает класс в компонент с HTML-шаблоном.",
            "Запрещает удаление класса сборщиком мусора.",
            "Шифрует исходный код сервиса."
          ],
          "correct": 0,
          "explanation": "Декоратор @Injectable сообщает инжектору Angular о возможности внедрения сервиса в компоненты."
        },
        {
          "question": "Какой тип данных из библиотеки RxJS хранит текущее состояние и оповещает подписчиков при каждом обновлении?",
          "options": [
            "BehaviorSubject",
            "Promise",
            "EventEmitter",
            "Observable.never"
          ],
          "correct": 0,
          "explanation": "BehaviorSubject хранит текущее значение, немедленно отдает его новым подписчикам и вещает последующие события."
        }
      ]
    },
    {
      "num": 12,
      "title": "Глава 12. Разработка клиента блокчейна на Angular",
      "subtitle": "Построение панели управления узлом на Angular: отображение блоков, формы транзакций, индикация статуса майнинга.",
      "minutes": 14,
      "contentHtml": `<h2>1. Компонент обозревателя блоков</h2>
<p>
  В двенадцатой главе создается полнофункциональный клиент блокчейна на Angular, отображающий актуальную цепочку блоков с помощью директивы структурного повторения <code class="inline-code">*ngFor</code>:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript · Angular Component</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>@Component({
  selector: 'app-blockchain-viewer',
  template: \`
    <div class="blocks-container">
      <div *ngFor="let block of chain$ | async" class="block-card">
        <h3>Блок #{{ block.index }}</h3>
        <p>Хеш: <code>{{ block.hash }}</code></p>
        <p>Предыдущий хеш: <code>{{ block.previousHash }}</code></p>
        <span>Транзакций: {{ block.transactions.length }}</span>
      </div>
    </div>
  \`
})
export class BlockchainViewerComponent {
  constructor(public blockchainService: BlockchainService) {}
  get chain$() { return this.blockchainService.chain$; }
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какую задачу решает async pipe (| async) в шаблоне Angular?",
          "options": [
            "Автоматически подписывается на Observable, извлекает данные и отписывается при уничтожении компонента.",
            "Делает рендеринг страницы асинхронным через setTimeout.",
            "Загружает стили CSS в отдельном потоке.",
            "Преобразует строку в верхний регистр."
          ],
          "correct": 0,
          "explanation": "async pipe автоматически управляет подпиской на потоки RxJS, предотвращая утечки памяти."
        },
        {
          "question": "Какая конструкция используется в Angular для внедрения зависимостей в класс компонента?",
          "options": [
            "Параметры конструктора с явным указанием типа: constructor(private service: BlockchainService) { }",
            "Глобальный вызов window.getService()",
            "Директива <service-inject>",
            "Аннотация @Autowire над полями класса"
          ],
          "correct": 0,
          "explanation": "Angular использует типизированные параметры конструктора для резолва и инжекции зависимостей."
        }
      ]
    },
    {
      "num": 13,
      "title": "Глава 13. Разработка приложений React.js с помощью TypeScript",
      "subtitle": "Типизация функциональных компонентов, хуки useState, useEffect, useRef, типизация событий React и синтаксис TSX.",
      "minutes": 14,
      "contentHtml": `<h2>1. Функциональные компоненты и TSX</h2>
<p>
  React в связке с TypeScript обеспечивает строгую типизацию пропсов и внутреннего состояния. Расширение файлов <code class="inline-code">.tsx</code> позволяет компилятору валидировать синтаксис JSX:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TSX · React Component</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>interface MiningPanelProps {
  difficulty: number;
  onMine: (nonce: number) => void;
  isMining: boolean;
}

export const MiningPanel: React.FC&lt;MiningPanelProps&gt; = ({
  difficulty,
  onMine,
  isMining
}) => {
  return (
    &lt;div className="panel"&gt;
      &lt;h4&gt;Сложность майнинга: {difficulty}&lt;/h4&gt;
      &lt;button disabled={isMining} onClick={() => onMine(Date.now())}&gt;
        {isMining ? 'Идет подбор хеша...' : 'Майнить новый блок'}
      &lt;/button&gt;
    &lt;/div&gt;
  );
};</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Какое расширение файлов необходимо использовать для React-компонентов с разметкой JSX при использовании TypeScript?",
          "options": [
            ".tsx",
            ".ts",
            ".react",
            ".jsx.ts"
          ],
          "correct": 0,
          "explanation": "Файлы с расширением .tsx позволяют компилятору распознавать синтаксис JSX внутри кода TypeScript."
        },
        {
          "question": "Как типизировать состояние в хуке useState при работе со списком транзакций?",
          "options": [
            "const [txs, setTxs] = useState<Transaction[]>([]);",
            "const txs = useState(Transaction[]);",
            "const [txs] = useType<Transaction>();",
            "useState.type(Transaction);"
          ],
          "correct": 0,
          "explanation": "Дженерик-параметр в хуке useState<Transaction[]>([]) указывает компилятору точный тип массива состояния."
        }
      ]
    },
    {
      "num": 14,
      "title": "Глава 14. Разработка блокчейн-клиента в React.js",
      "subtitle": "Интеграция веб-сокетов с React, управление глобальным состоянием узла, визуализация цепочки блоков и майнинг.",
      "minutes": 14,
      "contentHtml": `<h2>1. Интеграция WebSocket-потока через хук useEffect</h2>
<p>
  В четырнадцатой главе авторы создают SPA-клиент блокчейна на React, связывая локальный майнер и удаленные узлы через WebSockets:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TSX · React Hook</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>export function useBlockchainSocket(url: string) {
  const [chain, setChain] = useState&lt;Block[]&gt;([]);

  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'RESPONSE_BLOCKCHAIN') {
        setChain(message.data);
      }
    };

    return () => {
      ws.close(); // Очистка при размонтировании компонента
    };
  }, [url]);

  return chain;
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Зачем функция-эффект в хуке useEffect возвращает функцию закрытия сокета () => ws.close()?",
          "options": [
            "Это функция очистки (cleanup), предотвращающая утечки соединений при размонтировании компонента.",
            "Это требование безопасности браузера для сброса кук.",
            "Чтобы перезагрузить страницу React.",
            "Чтобы сбросить хеш блока в ноль."
          ],
          "correct": 0,
          "explanation": "Функция очистки в useEffect вызывается перед следующим запуском эффекта и при размонтировании компонента."
        },
        {
          "question": "Что передается во втором аргументе хука useEffect([url])?",
          "options": [
            "Массив зависимостей: эффект перезапустится только при изменении url.",
            "Список секретных ключей для авторизации.",
            "Массив HTML-элементов для анимации.",
            "Размер кэша браузера."
          ],
          "correct": 0,
          "explanation": "Массив зависимостей определяет, при изменении каких переменных эффект должен выполниться повторно."
        }
      ]
    },
    {
      "num": 15,
      "title": "Глава 15. Разработка приложений Vue.js с помощью TypeScript",
      "subtitle": "Vue.js и TypeScript: однофайловые компоненты .vue, синтаксис vue-class-component и vue-property-decorator, реактивность.",
      "minutes": 13,
      "contentHtml": `<h2>1. TypeScript в экосистеме Vue.js</h2>
<p>
  Пятнадцатая глава демонстрирует использование TypeScript во фреймворке Vue.js. С помощью декораторов класс компонента объявляет свойства, вычисляемые геттеры и методы:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">TypeScript · Vue Component</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TransactionItem extends Vue {
  @Prop({ required: true }) readonly tx!: Transaction;

  get formattedAmount(): string {
    return this.tx.amount.toFixed(4) + ' BTC';
  }
}</code></pre>
</div>`,
      "quiz": [
        {
          "question": "Что означает восклицательный знак в объявлении свойства @Prop() readonly tx!: Transaction во Vue?",
          "options": [
            "Определенный оператор присваивания (Definite Assignment Assertion), сообщающий TypeScript, что поле инициализируется фреймворком Vue.",
            "Свойство является приватным.",
            "Свойство нельзя изменять после монтирования.",
            "Свойство должно быть числом."
          ],
          "correct": 0,
          "explanation": "Символ '!' (definite assignment assertion) отключает предупреждение компилятора об отсутствии инициализации в конструкторе."
        },
        {
          "question": "Какую роль выполняет геттер get formattedAmount() во Vue-компоненте?",
          "options": [
            "Он работает как кэшируемое вычисляемое свойство (Computed Property).",
            "Он асинхронно запрашивает курс биткоина с биржи.",
            "Он очищает память компонента.",
            "Он выполняет перерисовку DOM каждые 100 мс."
          ],
          "correct": 0,
          "explanation": "Геттеры в классах Vue преобразуются в computed properties и реактивно кэшируют результат вычислений."
        }
      ]
    },
    {
      "num": 16,
      "title": "Глава 16. Разработка блокчейн-клиента на Vue.js",
      "subtitle": "Завершение трилогии фреймворков: создание полноценной панели узла блокчейна на Vue.js и сравнительный анализ подходов.",
      "minutes": 14,
      "contentHtml": `<h2>1. Полноценная блокчейн-панель на Vue</h2>
<p>
  В заключительной главе Файн и Моисеев собирают итоговое приложение на Vue.js: интерактивную доску со списком подтвержденных блоков, формой генерации новых транзакций и переключателем сложности майнинга:
</p>

<div class="code-container">
  <div class="code-header">
    <span class="code-lang-tag">Vue · BlockchainDashboard.vue</span>
    <button type="button" class="copy-code-btn">Копировать</button>
  </div>
  <pre class="code-body"><code>&lt;template&gt;
  &lt;div class="dashboard"&gt;
    &lt;h1&gt;Блокчейн-узел Vue&lt;/h1&gt;
    &lt;div class="chain-status"&gt;Высота цепочки: {{ blocks.length }}&lt;/div&gt;
    &lt;button @click="generateGenesis"&gt;Создать Genesis-блок&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
</div>

<h2>2. Сравнительный анализ: Angular vs React vs Vue</h2>
<p>
  Авторы подводят итог практического использования TypeScript в трех ведущих веб-фреймворках:
</p>
<table class="data-table">
  <thead>
    <tr>
      <th>Критерий</th>
      <th>Angular</th>
      <th>React</th>
      <th>Vue.js</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Интеграция с TS</strong></td>
      <td>Нативная «из коробки», вся архитектура на декораторах и типах.</td>
      <td>Великолепная через TSX и чистые функции/хуки.</td>
      <td>Высокая гибкость (Composition API или декораторы классов).</td>
    </tr>
    <tr>
      <td><strong>Кривая обучения</strong></td>
      <td>Высокая (DI, RxJS, модули).</td>
      <td>Средняя (JSX, управление состоянием).</td>
      <td>Низкая / средняя (интуитивные шаблоны).</td>
    </tr>
    <tr>
      <td><strong>Рекомендация авторов</strong></td>
      <td>Крупные корпоративные enterprise-системы.</td>
      <td>Динамичные интерактивные SPA-приложения.</td>
      <td>Быстрый старт и элегантные реактивные дашборды.</td>
    </tr>
  </tbody>
</table>`,
      "quiz": [
        {
          "question": "Какой фреймворк из трех изначально проектировался на TypeScript с глубоким использованием декораторов и DI?",
          "options": [
            "Angular",
            "React",
            "Vue.js",
            "jQuery"
          ],
          "correct": 0,
          "explanation": "Angular был полностью переписан на TypeScript командой Google с использованием системы типов и декораторов в качестве фундамента."
        },
        {
          "question": "Какое главное преимущество дает разработка клиентских приложений на TypeScript вне зависимости от выбранного фреймворка?",
          "options": [
            "Единая статическая модель данных и контракты API, предотвращающие ошибки несовместимости типов между сервером и клиентом.",
            "Отсутствие необходимости изучать HTML и CSS.",
            "Автоматический деплой на сервера AWS.",
            "Возможность исполнять код без браузера."
          ],
          "correct": 0,
          "explanation": "TypeScript обеспечивает строгую проверку контрактов структур данных, автодополнение и надежный рефакторинг в любом UI-фреймворке."
        }
      ]
    }
  ]
};
