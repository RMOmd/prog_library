// Auto-generated unified book data for python-patterns
window.BOOK_DATA = {
  "id": "python-patterns",
  "title": "Паттерны разработки на Python",
  "author": "Гарри Персиваль, Боб Грегори",
  "cover": "img/cover.jpg",
  "totalChapters": 13,
  "chapters": [
    {
      "num": 1,
      "title": "Глава 1. Моделирование предметной области",
      "subtitle": "Сущности (Entities), объекты-значения (Value Objects) и чистая доменная логика без фреймворков",
      "minutes": 11,
      "contentHtml": "<h2>1. Что такое модель предметной области (Domain Model)?</h2>\r\n<p>Модель предметной области — это сердце программной системы. В классической архитектуре разработчики часто начинают с проектирования таблиц базы данных и моделей Django/SQLAlchemy. Гарри Персиваль и Боб Грегори предлагают противоположный подход DDD (Domain-Driven Design): <b>бизнес-логика должна быть выражена на чистом Python без зависимости от ORM, баз данных и веб-фреймворков</b>.</p>\r\n<div class=\"callout tip\">\r\n  <div class=\"callout-title\">💡 Золотое правило DDD</div>\r\n  <p>Модель предметной области не должна знать ничего о базе данных, HTTP-запросах или формате JSON. Это позволяет тестировать чистый бизнес-код за миллисекунды без запуска базы данных.</p>\r\n</div>\r\n<h2>2. Сущности и Объекты-значения (Entities vs Value Objects)</h2>\r\n<p>В модели предметной области ключевую роль играют две концепции:</p>\r\n<ul>\r\n  <li><b>Объект-значение (Value Object)</b> — идентифицируется исключительно своими данными. Два объекта с одинаковыми полями равны. Объекты-значения должны быть <i>неизменяемыми (immutable)</i>. В современном Python они идеально реализуются через <code class=\"inline-code\">@dataclass(frozen=True)</code>.</li>\r\n  <li><b>Сущность (Entity)</b> — объект с постоянным идентификатором (ID), который сохраняет свою идентичность даже при изменении внутренних полей (например, заказ, партия товара, пользователь).</li>\r\n</ul>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">python</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>from dataclasses import dataclass\r\nfrom typing import Optional\r\nfrom datetime import date\r\n\r\n# Объект-значение: идентифицируется своими значениями, неизменяем\r\n@dataclass(frozen=True)\r\nclass OrderLine:\r\n    orderid: str\r\n    sku: str\r\n    qty: int\r\n\r\n# Сущность: идентифицируется уникальным reference\r\nclass Batch:\r\n    def __init__(self, ref: str, sku: str, qty: int, eta: Optional[date] = None):\r\n        self.reference = ref\r\n        self.sku = sku\r\n        self.eta = eta\r\n        self._purchased_quantity = qty\r\n        self._allocations = set()\r\n\r\n    def allocate(self, line: OrderLine):\r\n        if self.can_allocate(line):\r\n            self._allocations.add(line)\r\n\r\n    def can_allocate(self, line: OrderLine) -> bool:\r\n        return self.sku == line.sku and self.available_quantity >= line.qty\r\n\r\n    @property\r\n    def available_quantity(self) -> int:\r\n        return self._purchased_quantity - sum(l.qty for l in self._allocations)\r\n\r\n    def __eq__(self, other):\r\n        if not isinstance(other, Batch):\r\n            return False\r\n        return other.reference == self.reference\r\n\r\n    def __hash__(self):\r\n        return hash(self.reference)</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "В чем главное концептуальное отличие Сущности (Entity) от Объекта-значения (Value Object) в DDD?",
          "options": [
            "Сущность определяется уникальным неизменным идентификатором (ID), а Объект-значение — только значениями своих полей.",
            "Сущность обязана наследоваться от моделей Django, а Объект-значение — нет.",
            "Объект-значение может мутировать, а Сущность обязана быть frozen dataclass.",
            "Сущности хранятся в PostgreSQL, а Объекты-значения — только в Redis."
          ],
          "correct": 0,
          "explanation": "Сущность сохраняет свою уникальность во времени благодаря идентификатору (reference/id), а два Объекта-значения с равными полями считаются взаимозаменяемыми и равными."
        }
      ]
    },
    {
      "num": 2,
      "title": "Глава 2. Паттерн «Репозиторий»",
      "subtitle": "Изоляция постоянного хранилища (SQLAlchemy) от доменной модели с помощью инверсии зависимостей",
      "minutes": 12,
      "contentHtml": "<h2>1. Зачем нужен паттерн «Репозиторий»?</h2>\r\n<p>Паттерн «Репозиторий» (Repository) является упрощающей абстракцией над хранилищем данных. Он создает иллюзию, что вся коллекция доменных объектов находится прямо в оперативной памяти компьютера в виде обычного списка или словаря.</p>\r\n<p>Вместо вызовов <code class=\"inline-code\">session.query(BatchModel)...</code> внутри бизнес-логики, код домена общается только с интерфейсом репозитория:</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">python</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>import abc\r\n\r\nclass AbstractRepository(abc.ABC):\r\n    @abc.abstractmethod\r\n    def add(self, batch: Batch):\r\n        raise NotImplementedError\r\n\r\n    @abc.abstractmethod\r\n    def get(self, reference: str) -> Batch:\r\n        raise NotImplementedError\r\n\r\n# В тестах используем поддельный репозиторий на основе Python-множества:\r\nclass FakeRepository(AbstractRepository):\r\n    def __init__(self, batches):\r\n        self._batches = set(batches)\r\n\r\n    def add(self, batch: Batch):\r\n        self._batches.add(batch)\r\n\r\n    def get(self, reference: str) -> Batch:\r\n        return next(b for b in self._batches if b.reference == reference)</code></pre>\r\n</div>\r\n<h2>2. Тестирование без реальной базы данных</h2>\r\n<p>Благодаря <code class=\"inline-code\">FakeRepository</code> все тесты бизнес-правил выполняются моментально в памяти (in-memory). Мы не поднимаем Docker-контейнеры с PostgreSQL и не запускаем медленные миграции для каждого модульного теста.</p>",
      "quiz": [
        {
          "question": "Какую главную задачу решает паттерн «Репозиторий» в архитектуре приложения?",
          "options": [
            "Предоставляет доменной модели абстрактный интерфейс коллекции объектов, скрывая SQL-запросы и детали базы данных.",
            "Ускоряет генерацию HTML-шаблонов во фронтенде.",
            "Заменяет собой систему контроля версий Git.",
            "Позволяет запускать код Python без интерпретатора."
          ],
          "correct": 0,
          "explanation": "Репозиторий изолирует доменную логику от инфраструктурных деталей ORM и базы данных, реализуя принцип инверсии зависимостей (DIP)."
        }
      ]
    },
    {
      "num": 3,
      "title": "Глава 3. О связанности и абстракциях",
      "subtitle": "Устранение жесткой зацепленности (Coupling) и правильный выбор точек расширения",
      "minutes": 10,
      "contentHtml": "<h2>1. Проблема жесткой зацепленности</h2>\r\n<p>Когда бизнес-логика напрямую вызывает системные функции операционной системы (например, <code class=\"inline-code\">os.walk</code>, <code class=\"inline-code\">shutil.copy</code> или <code class=\"inline-code\">requests.post</code>), протестировать такой код изолированно становится крайне трудно. Тесты начинают модифицировать реальную файловую систему или слать сетевые запросы.</p>\r\n<h2>2. Абстрагирование ввода-вывода (I/O)</h2>\r\n<p>Авторы демонстрируют это на примере утилиты синхронизации файлов: алгоритм сравнения хешей файлов отделяется от операций чтения с диска. Чистая функция принимает словарь <code class=\"inline-code\">dict[path, hash]</code> и возвращает список команд: <code class=\"inline-code\">COPY</code>, <code class=\"inline-code\">DELETE</code>. Вся сложная логика тестируется чистыми данными без единого обращения к диску.</p>",
      "quiz": [
        {
          "question": "Как согласно принципу инверсии зависимостей (DIP) должны соотноситься модули высокого и низкого уровней?",
          "options": [
            "Модули высокого уровня не должны зависеть от модулей низкого уровня; оба типа должны зависеть от абстракций.",
            "Высокоуровневые модули должны напрямую импортировать сырые SQL-драйверы.",
            "Все модули должны объединяться в один файл монолита.",
            "Низкоуровневые модули должны управлять бизнес-правилами."
          ],
          "correct": 0,
          "explanation": "DIP утверждает, что бизнес-логика (высокий уровень) задает интерфейсы/абстракции, а инфраструктура (низкий уровень) их реализует."
        }
      ]
    },
    {
      "num": 4,
      "title": "Глава 4. Первый вариант использования: API Flask и сервисный слой",
      "subtitle": "Сервисный слой (Service Layer / Use Cases) как граница между веб-контроллером и доменом",
      "minutes": 14,
      "contentHtml": "<h2>1. Зачем нужен сервисный слой?</h2>\r\n<p>Если поместить логику координации в Flask-вьюху, контроллер станет «толстым»: он будет валидировать HTTP-запрос, обращаться к БД, вызывать методы домена и форматировать ответ. Переиспользовать такую логику из CLI или очередей Celery станет невозможно.</p>\r\n<p><b>Сервисный слой</b> выражает <i>варианты использования (Use Cases)</i> системы:</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">python</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code># services.py (Сервисный слой)\r\ndef allocate(line: OrderLine, repo: AbstractRepository, session) -> str:\r\n    batches = repo.list()\r\n    batchref = model.allocate(line, batches)\r\n    session.commit()\r\n    return batchref\r\n\r\n# flask_app.py (Тонкий веб-адаптер)\r\n@app.route(\"/allocate\", methods=[\"POST\"])\r\ndef allocate_endpoint():\r\n    line = OrderLine(request.json['orderid'], request.json['sku'], request.json['qty'])\r\n    repo = SqlAlchemyRepository(db.session)\r\n    batchref = services.allocate(line, repo, db.session)\r\n    return jsonify({'batchref': batchref}), 201</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Какова главная обязанность Сервисного слоя (Service Layer)?",
          "options": [
            "Оркестрация сценариев использования (Use Cases): получение данных из репозитория, вызов методов модели и фиксация изменений.",
            "Рендеринг HTML-страниц и CSS стилей.",
            "Непосредственное выполнение SQL запросов SELECT и INSERT.",
            "Управление сетевыми пакетами TCP/IP."
          ],
          "correct": 0,
          "explanation": "Сервисный слой координирует бизнес-сценарии приложения, освобождая веб-контроллеры от сложной оркестрации."
        }
      ]
    },
    {
      "num": 5,
      "title": "Глава 5. TDD на верхней и нижней передачах",
      "subtitle": "Пирамида тестирования: переход от низкоуровневых юнит-тестов домена к тестам сценариев использования",
      "minutes": 11,
      "contentHtml": "<h2>1. Концепция двух передач в TDD</h2>\r\n<p>В начале работы над новой фичей мы включаем <b>«нижнюю передачу»</b>: пишем детальные модульные тесты непосредственно на классы и методы предметной области (на проверку краевых условий, расчета остатков и исключений).</p>\r\n<p>Когда модель созрела, мы переключаемся на <b>«верхнюю передачу»</b>: пишем тесты на сервисный слой. Тестирование через сервисный слой не зависит от внутреннего устройства классов домена, что позволяет свободно проводить рефакторинг внутренней структуры модели без падения тестов!</p>",
      "quiz": [
        {
          "question": "Почему тесты сервисного слоя делают рефакторинг доменных классов более безопасным?",
          "options": [
            "Они взаимодействуют с системой через ее сценарии использования (Use Cases), поэтому изменения во внутренних методах сущностей не ломают тесты.",
            "Они автоматически исправляют синтаксические ошибки в Python.",
            "Они запускаются без использования интерпретатора.",
            "Тесты сервисного слоя вообще не вызывают бизнес-код."
          ],
          "correct": 0,
          "explanation": "Тесты сервисного слоя проверяют контракты сценариев использования целиком, давая свободу видоизменять структуру внутренних классов модели."
        }
      ]
    },
    {
      "num": 6,
      "title": "Глава 6. Паттерн «Единица работы» (Unit of Work)",
      "subtitle": "Атомарность операций и контекстный менеджер транзакций с автоматическим откатом",
      "minutes": 13,
      "contentHtml": "<h2>1. Зачем нужен Unit of Work (UoW)?</h2>\r\n<p>Паттерн «Единица работы» является единственной точкой входа в постоянное хранилище и отслеживает все изменения объектов во время выполнения бизнес-операции. В Python он элегантно реализуется через контекстный менеджер (<code class=\"inline-code\">with</code>):</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">python</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>class AbstractUnitOfWork(abc.ABC):\r\n    batches: AbstractRepository\r\n\r\n    def __enter__(self):\r\n        return self\r\n\r\n    def __exit__(self, exc_type, exc_val, exc_tb):\r\n        if exc_type is not None:\r\n            self.rollback()\r\n        else:\r\n            self.commit()\r\n\r\n    @abc.abstractmethod\r\n    def commit(self):\r\n        raise NotImplementedError\r\n\r\n    @abc.abstractmethod\r\n    def rollback(self):\r\n        raise NotImplementedError\r\n\r\n# Использование в сервисном слое:\r\ndef allocate(orderid: str, sku: str, qty: int, uow: AbstractUnitOfWork) -> str:\r\n    line = OrderLine(orderid, sku, qty)\r\n    with uow:\r\n        batches = uow.batches.list()\r\n        batchref = model.allocate(line, batches)\r\n        uow.commit()\r\n    return batchref</code></pre>\r\n</div>\r\n<div class=\"callout tip\">\r\n  <div class=\"callout-title\">🛡 Безопасность по умолчанию</div>\r\n  <p>Если внутри блока <code class=\"inline-code\">with uow:</code> возникнет любое исключение, метод <code class=\"inline-code\">__exit__</code> автоматически выполнит откат транзакции (<code class=\"inline-code\">rollback</code>), предотвращая сохранение неконсистентного состояния.</p>\r\n</div>",
      "quiz": [
        {
          "question": "Какую ключевую роль играет паттерн Unit of Work при возникновении ошибки в бизнес-операции?",
          "options": [
            "Гарантирует атомарный откат (rollback) всех незафиксированных изменений в хранилище через контекстный менеджер.",
            "Автоматически отправляет уведомление в Telegram пользователю.",
            "Перезапускает операционную систему сервера.",
            "Удаляет базу данных и создает ее заново."
          ],
          "correct": 0,
          "explanation": "Unit of Work обеспечивает атомарность: либо операция зафиксирована целиком (commit), либо в случае сбоя изменения полностью откатываются (rollback)."
        }
      ]
    },
    {
      "num": 7,
      "title": "Глава 7. Агрегаты и границы согласованности",
      "subtitle": "Определение границ транзакционной целостности и оптимистическая блокировка",
      "minutes": 12,
      "contentHtml": "<h2>1. Что такое Агрегат (Aggregate)?</h2>\r\n<p>Агрегат — это кластер связанных сущностей и объектов-значений, которые рассматриваются как единое целое с точки зрения изменения данных. Каждый агрегат имеет ровно один <b>Корень Агрегата (Aggregate Root)</b>. Любой внешний код имеет право обращаться только к Корню агрегата, но не к его внутренним элементам напрямую.</p>\r\n<p><b>Правило: Один агрегат = один репозиторий.</b> Репозиторий загружает и сохраняет агрегат только целиком.</p>\r\n<h2>2. Оптимистичная конкурентность (Optimistic Locking)</h2>\r\n<p>При параллельных запросах два пользователя могут попытаться одновременно забронировать последний товар. Чтобы избежать состояния гонки без тяжелых блокировок строк в БД, агрегат снабжается версией (<code class=\"inline-code\">version_number</code>). При сохранении проверяется, что версия в БД не изменилась, иначе возбуждается исключение конкурентного доступа.</p>",
      "quiz": [
        {
          "question": "Какое главное правило взаимодействия внешнего кода с объектами внутри Агрегата?",
          "options": [
            "Внешний код может взаимодействовать с агрегатом только через его Корень (Aggregate Root).",
            "Внешний код обязан напрямую менять приватные поля внутренних объектов.",
            "Каждая строчка внутри агрегата должна иметь собственный репозиторий.",
            "Агрегаты запрещено использовать в Python-проектах."
          ],
          "correct": 0,
          "explanation": "Корень агрегата защищает свои инварианты и бизнес-правила: внешние клиенты не имеют прямого доступа к внутренним сущностям в обход корня."
        }
      ]
    },
    {
      "num": 8,
      "title": "Глава 8. События и шина сообщений",
      "subtitle": "Событийно-управляемый подход (Event-Driven): избавление от побочных эффектов в домене",
      "minutes": 13,
      "contentHtml": "<h2>1. События предметной области (Domain Events)</h2>\r\n<p>Что делать, когда при нехватке товара на складе нужно отправить email в отдел закупок? Если поместить вызов отправки почты в метод <code class=\"inline-code\">allocate()</code>, доменная модель свяжется с сетевой инфраструктурой и станет ненадежной.</p>\r\n<p>Решение: агрегат просто регистрирует в своем внутреннем списке факт того, что произошло: событие <code class=\"inline-code\">OutOfStock(sku)</code>.</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">python</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>from dataclasses import dataclass\r\n\r\nclass Event:\r\n    pass\r\n\r\n@dataclass\r\nclass OutOfStock(Event):\r\n    sku: str\r\n\r\nclass Product:\r\n    def __init__(self, sku: str, batches: list[Batch]):\r\n        self.sku = sku\r\n        self.batches = batches\r\n        self.events = []  # Список возникших событий\r\n\r\n    def allocate(self, line: OrderLine) -> str:\r\n        try:\r\n            batch = next(b for b in sorted(self.batches) if b.can_allocate(line))\r\n            batch.allocate(line)\r\n            return batch.reference\r\n        except StopIteration:\r\n            # Возникло бизнес-событие!\r\n            self.events.append(OutOfStock(line.sku))\r\n            return None</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Как событийно-управляемый подход защищает доменную модель от побочных эффектов (отправка email, SMS и т.д.)?",
          "options": [
            "Модель не выполняет побочные эффекты сама, а лишь фиксирует факты произошедшего в виде структур данных (Events).",
            "События отключают отправку почты на уровне операционной системы.",
            "Побочные эффекты передаются напрямую через глобальные переменные.",
            "События могут генерироваться только в JavaScript."
          ],
          "correct": 0,
          "explanation": "События (Events) представляют собой простые структуры данных, фиксирующие факт бизнес-события. Их обработка выносится наружу в шину сообщений."
        }
      ]
    },
    {
      "num": 9,
      "title": "Глава 9. Катимся на шине сообщений: обработчики",
      "subtitle": "Шина сообщений (Message Bus) и диспетчеризация независимых обработчиков событий",
      "minutes": 12,
      "contentHtml": "<h2>1. Устройство шины сообщений</h2>\r\n<p>Шина сообщений связывает события с функциями-обработчиками (handlers). Когда Unit of Work завершает фиксацию транзакции, он передает накопленные события в шину:</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">python</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>HANDLERS = {\r\n    events.OutOfStock: [send_out_of_stock_notification],\r\n    events.OrderAllocated: [publish_allocation_metrics, update_read_model],\r\n}\r\n\r\ndef handle(event: events.Event, uow: AbstractUnitOfWork):\r\n    for handler in HANDLERS[type(event)]:\r\n        handler(event, uow=uow)</code></pre>\r\n</div>\r\n<p>Теперь добавление нового побочного эффекта (например, запись в аудит-лог) сводится к добавлению одной строки в словарь <code class=\"inline-code\">HANDLERS</code> без изменения существующего доменного кода (соблюдение принципа Open-Closed).</p>",
      "quiz": [
        {
          "question": "Какой принцип SOLID напрямую соблюдается при использовании словаря обработчиков в шине сообщений?",
          "options": [
            "Open/Closed Principle (принцип открытости/закрытости): система открыта для расширения новыми обработчиками без модификации старого кода.",
            "Liskov Substitution Principle.",
            "Single Level of Abstraction.",
            "KISS."
          ],
          "correct": 0,
          "explanation": "Шина сообщений позволяет подключать сколь угодно много новых обработчиков на одно событие без правки кода предметной области."
        }
      ]
    },
    {
      "num": 10,
      "title": "Глава 10. Команды и обработчик команд",
      "subtitle": "Разделение Команд (Commands — указание сделать) и Событий (Events — свершившийся факт)",
      "minutes": 11,
      "contentHtml": "<h2>1. Разница между Command и Event</h2>\r\n<p>Хотя команды и события технически представляют собой классы данных (<code class=\"inline-code\">@dataclass</code>), между ними существует принципиальная семантическая разница:</p>\r\n<table style=\"width:100%;border-collapse:collapse;margin:16px 0;\">\r\n  <thead>\r\n    <tr style=\"border-bottom:1px solid rgba(255,255,255,0.1);text-align:left;\">\r\n      <th style=\"padding:8px;\">Характеристика</th>\r\n      <th style=\"padding:8px;\">Команда (Command)</th>\r\n      <th style=\"padding:8px;\">Событие (Event)</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr style=\"border-bottom:1px solid rgba(255,255,255,0.06);\">\r\n      <td style=\"padding:8px;\"><b>Имя</b></td>\r\n      <td style=\"padding:8px;\">Повелительное наклонение (<code class=\"inline-code\">AllocateOrder</code>)</td>\r\n      <td style=\"padding:8px;\">Прошедшее время (<code class=\"inline-code\">OrderAllocated</code>)</td>\r\n    </tr>\r\n    <tr style=\"border-bottom:1px solid rgba(255,255,255,0.06);\">\r\n      <td style=\"padding:8px;\"><b>Получатель</b></td>\r\n      <td style=\"padding:8px;\">Ровно один конкретный обработчик</td>\r\n      <td style=\"padding:8px;\">Широковещательно: 0, 1 или N подписчиков</td>\r\n    </tr>\r\n    <tr>\r\n      <td style=\"padding:8px;\"><b>Ошибки</b></td>\r\n      <td style=\"padding:8px;\">Может быть отклонена с ошибкой клиенту</td>\r\n      <td style=\"padding:8px;\">Уже произошла, не может быть отменена</td>\r\n    </tr>\r\n  </tbody>\r\n</table>",
      "quiz": [
        {
          "question": "Сколько обработчиков должна иметь Команда (Command) в архитектуре системы?",
          "options": [
            "Ровно один обработчик (команда направляется конкретному адресату с намерением выполнить действие).",
            "Бесконечно много обработчиков.",
            "Ни одного, команды не обрабатываются.",
            "Команды обрабатываются только веб-сервером Nginx."
          ],
          "correct": 0,
          "explanation": "Команда — это персональное указание выполнить действие, поэтому у нее должен быть строго один обработчик, в отличие от событий, у которых может быть много подписчиков."
        }
      ]
    },
    {
      "num": 11,
      "title": "Глава 11. Интеграция микросервисов через события",
      "subtitle": "Асинхронный обмен сообщениями через Redis Pub/Sub и паттерн Outbox",
      "minutes": 14,
      "contentHtml": "<h2>1. Проблема распределенного монолита</h2>\r\n<p>Когда сервисы вызывают друг друга через синхронный REST API по цепочке (<code class=\"inline-code\">A -> B -> C -> D</code>), сбой или задержка в одном сервисе парализует всю систему. Это называется «распределенным комком грязи».</p>\r\n<h2>2. Внешние события и Redis</h2>\r\n<p>Вместо вызова удаленного API микросервис публикует событие в брокер сообщений (Redis, RabbitMQ, Kafka). Сервис заказов просто сообщает: <code class=\"inline-code\">OrderAllocated</code>. Сервис доставки подписывается на этот канал и обрабатывает событие в своем темпе, даже если сервис заказов в этот момент перезагружается.</p>",
      "quiz": [
        {
          "question": "Какое главное архитектурное преимущество дает интеграция микросервисов через события по сравнению с синхронными REST-вызовами?",
          "options": [
            "Временное и пространственное ослабление зацепленности (Temporal & Spatial Decoupling): отказ одного сервиса не ломает отправителя.",
            "REST запросы автоматически становятся бесплатными.",
            "События исключают необходимость использования базы данных.",
            "Вся система начинает работать в одном процессе."
          ],
          "correct": 0,
          "explanation": "Асинхронные события устраняют временную зацепленность: издатель не блокируется в ожидании ответа и не зависит от доступности подписчика в момент отправки."
        }
      ]
    },
    {
      "num": 12,
      "title": "Глава 12. Разделение ответственности команд и запросов (CQRS)",
      "subtitle": "Оптимизация чтения (Query) в обход сложной доменной модели и проблема N+1",
      "minutes": 13,
      "contentHtml": "<h2>1. Проблема симметричных моделей</h2>\r\n<p>Классическая ошибка — пытаться использовать одну и ту же богатую доменную модель для записи и для отображения данных на веб-страницах. Чтобы просто показать список партий и остатков, ORM загружает сотни связанных объектов с вычислением свойств, вызывая проблему <b>SELECT N+1</b>.</p>\r\n<h2>2. CQRS: Command Query Responsibility Segregation</h2>\r\n<p>Архитектурный паттерн CQRS разделяет систему на две независимые модели:</p>\r\n<ul>\r\n  <li><b>Модель записи (Commands)</b>: сложная бизнес-логика, инварианты, Unit of Work, репозиторий.</li>\r\n  <li><b>Модель чтения (Queries)</b>: простой, сверхбыстрый плоский SQL-запрос напрямую в базу данных, возвращающий список словарей или плоских DTO без инстанцирования тяжелых объектов.</li>\r\n</ul>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">python</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code># Модель чтения в CQRS: быстрый сырой SQL без ORM-маппинга\r\ndef allocations_view(orderid: str, db_session) -> list[dict]:\r\n    query = \"\"\"\r\n        SELECT b.reference, b.sku, ol.qty\r\n        FROM allocations a\r\n        JOIN batches b ON a.batch_id = b.id\r\n        JOIN order_lines ol ON a.orderline_id = ol.id\r\n        WHERE ol.orderid = :orderid\r\n    \"\"\"\r\n    return [dict(r) for r in db_session.execute(query, {'orderid': orderid})]</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "В чем суть паттерна CQRS?",
          "options": [
            "Разделение операций изменения данных (Commands) и операций чтения данных (Queries) на отдельные независимые модели.",
            "Отказ от реляционных баз данных в пользу графовых СУБД.",
            "Шифрование всех SQL-запросов перед отправкой в сеть.",
            "Запрет на использование любых функций чтения в веб-приложении."
          ],
          "correct": 0,
          "explanation": "CQRS разделяет запись со сложными инвариантами и чтение, позволяя оптимизировать запросы на выборку данных без загрузки тяжелых агрегатов."
        }
      ]
    },
    {
      "num": 13,
      "title": "Глава 13. Внедрение зависимостей и начальная загрузка (Bootstrap)",
      "subtitle": "Сборка приложения (Composition Root) и внедрение зависимостей без тяжелых DI-контейнеров",
      "minutes": 15,
      "contentHtml": "<h2>1. Сценарий начальной загрузки (Bootstrap)</h2>\r\n<p>В финальной главе Персиваль и Грегори объединяют все компоненты воедино. Точкой сборки становится функция <code class=\"inline-code\">bootstrap()</code>. В ней создаются реальные зависимости (UnitOfWork, EmailSender, RedisPublisher) или их поддельные тестовые аналоги, и передаются в шину сообщений через частичное применение функций (<code class=\"inline-code\">functools.partial</code>):</p>\r\n<div class=\"code-block-wrapper\">\r\n  <div class=\"code-block-header\">\r\n    <span class=\"code-lang\">python</span>\r\n    <button class=\"copy-code-btn\" type=\"button\">Копировать</button>\r\n  </div>\r\n  <pre><code>import inspect\r\nfrom functools import partial\r\n\r\ndef bootstrap(\r\n    uow: AbstractUnitOfWork = SqlAlchemyUnitOfWork(),\r\n    notifications: AbstractNotifications = EmailNotifications(),\r\n    publish: Callable = redis_publisher,\r\n) -> MessageBus:\r\n    dependencies = {'uow': uow, 'notifications': notifications, 'publish': publish}\r\n    injected_handlers = {\r\n        command_type: inject_dependencies(handler, dependencies)\r\n        for command_type, handler in COMMAND_HANDLERS.items()\r\n    }\r\n    return MessageBus(uow=uow, command_handlers=injected_handlers, event_handlers=...)</code></pre>\r\n</div>\r\n<div class=\"callout tip\">\r\n  <div class=\"callout-title\">🎉 Триумф чистой архитектуры</div>\r\n  <p>Теперь всё приложение готово к работе: контроллеры Flask, консольные CLI команды и тесты используют один и тот же сценарий <code class=\"inline-code\">bootstrap()</code>, подставляя нужные адаптеры в один клик!</p>\r\n</div>",
      "quiz": [
        {
          "question": "Какую главную задачу решает скрипт начальной загрузки (Bootstrap / Composition Root)?",
          "options": [
            "Связывает абстракции с конкретными адаптерами и настраивает шину сообщений перед запуском приложения.",
            "Компилирует код Python в бинарный машинный код C++.",
            "Устанавливает пакеты через pip во время HTTP-запроса.",
            "Управляет питанием серверной стойки в дата-центре."
          ],
          "correct": 0,
          "explanation": "Bootstrap выполняет сборку графа зависимостей (Composition Root), инжектируя репозитории, шину и адаптеры в обработчики команд и событий."
        }
      ]
    }
  ]
};
