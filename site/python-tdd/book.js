// Auto-generated unified book data for python-tdd
window.BOOK_DATA = {
  "id": "python-tdd",
  "title": "Python. Разработка на основе тестирования",
  "author": "Гарри Персиваль",
  "cover": "img/cover.jpg",
  "totalChapters": 26,
  "chapters": [
    {
      "num": 1,
      "title": "Глава 1. Настройка Django с использованием функционального теста",
      "subtitle": "Знакомство с методологией TDD (Test-Driven Development), написание первого сквозного функционального теста с использованием Selenium WebDriver и создание каркаса проекта на Django.",
      "minutes": 12,
      "contentHtml": "<h2>1. Философия TDD и «Билли-тестировщик»</h2>\n    <p>\n      Разработка через тестирование (TDD) — это дисциплина, которую можно сформулировать одним фундаментальным правилом:\n    </p>\n\n    <div class=\"callout rule\">\n      <div class=\"callout-title\">⚖️ Золотое правило TDD</div>\n      <p><b>Не пишите ни единой строчки продуктового кода, пока у вас нет предварительно написанного падающего теста!</b></p>\n    </div>\n\n    <p>\n      Автор книги, Гарри Персиваль, вводит метафорического персонажа — <i>Козла-тестировщика (Testing Goat)</i>, или Билли. Его наставление сурово, но спасительно: каждый раз, когда у вас появляется искушение «просто быстро написать пару функций, а тесты добавить потом», остановитесь. Код, написанный без теста, не защищен от регрессий, его архитектура не проверена с точки зрения вызывающей стороны, а уверенность в его работоспособности иллюзорна.\n    </p>\n\n    <h2>2. Функциональные тесты против модульных тестов</h2>\n    <p>\n      В мире тестирования существуют два фундаментальных уровня проверок, которые дополняют друг друга:\n    </p>\n\n    <div class=\"schema-box\">\n      <div class=\"schema-grid\">\n        <div class=\"schema-item blue\">\n          <strong>Функциональный тест (FT)</strong>\n          <p>Смотрит на приложение <b>снаружи</b>, глазами пользователя. Автоматически запускает браузер, кликает по ссылкам и кнопкам, проверяет реальный пользовательский опыт (User Story).</p>\n        </div>\n        <div class=\"schema-item green\">\n          <strong>Модульный тест (Unit Test)</strong>\n          <p>Смотрит на код <b>изнутри</b>, глазами разработчика. Проверяет отдельные классы, функции и методы в полной изоляции, исполняясь за миллисекунды.</p>\n        </div>\n      </div>\n    </div>\n\n    <p>\n      Функциональные тесты называют также <i>приемочными (acceptance tests)</i> или <i>сквозными (end-to-end / E2E)</i>. Они служат путеводной нитью проекта: пока функциональный тест падает — фича не готова. Когда он стал зеленым — задача пользователя решена.\n    </p>\n\n    <h2>3. Написание первого теста: functional_tests.py</h2>\n    <p>\n      Мы используем библиотеку <b>Selenium</b>, которая позволяет программно управлять настоящим браузером (Firefox или Chrome). Создадим в корне проекта файл <code class=\"inline-code\">functional_tests.py</code>:\n    </p>\n\n    <div class=\"code-container\">\n      <div class=\"code-header\">\n        <span class=\"code-lang-tag\">Python · functional_tests.py</span>\n        <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n      </div>\n      <pre class=\"code-body\"><code>from selenium import webdriver\n\n# Эдит услышала про новое крутое онлайн-приложение со списком неотложных дел.\n# Она открывает домашнюю страницу сайта в браузере:\nbrowser = webdriver.Firefox()\nbrowser.get('http://localhost:8000')\n\n# Она видит, что заголовок и шапка страницы упоминают списки неотложных дел (To-Do):\nassert 'To-Do' in browser.title, f\"Browser title was '{browser.title}'\"\n\n# Она закрывает браузер:\nbrowser.quit()</code></pre>\n    </div>\n\n    <div class=\"callout tip\">\n      <div class=\"callout-title\">💡 Комментарии в стиле User Story</div>\n      <p>Обратите внимание на комментарии: они описывают сценарий использования (User Story) от лица конкретного пользователя («Эдит»). Это помогает разработчику не забывать, для кого и зачем создается каждая экранная форма.</p>\n    </div>\n\n    <h2>4. Фаза 1: Красный тест (Red)</h2>\n    <p>\n      Запустим наш тест в терминале, предварительно убедившись, что сервер Django ещё не запущен:\n    </p>\n\n    <div class=\"code-container\">\n      <div class=\"code-header\">\n        <span class=\"code-lang-tag\">Bash / Terminal</span>\n        <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n      </div>\n      <pre class=\"code-body\"><code>$ python functional_tests.py\nTraceback (most recent call last):\n  File \"functional_tests.py\", line 6, in &lt;module&gt;\n    browser.get('http://localhost:8000')\n  ...\nurllib3.exceptions.MaxRetryError: HTTPConnectionPool(host='localhost', port=8000): \nMax retries exceeded with url: / (Caused by NewConnectionError('&lt;...&gt;: Connection refused'))</code></pre>\n    </div>\n\n    <p>\n      <b>Тест упал с ошибкой подключения (Connection refused).</b> В классическом программировании ошибка в терминале считается неудачей, но в методологии TDD это <b>триумф первой фазы</b>:\n    </p>\n    <ul>\n      <li>Тест действительно запускается и отправляет реальные сетевые запросы.</li>\n      <li>Тест не проходит случайно сам по себе («false positive»).</li>\n      <li>У нас есть четкий следующий шаг — запустить сервер, чтобы устранить эту ошибку.</li>\n    </ul>\n\n    <h2>5. Фаза 2: Зеленый тест (Green)</h2>\n    <p>\n      Чтобы удовлетворить наш тест, поднимем стандартный проект Django с помощью утилиты <code class=\"inline-code\">django-admin</code>:\n    </p>\n\n    <div class=\"code-container\">\n      <div class=\"code-header\">\n        <span class=\"code-lang-tag\">Bash / Terminal</span>\n        <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n      </div>\n      <pre class=\"code-body\"><code># Создаем каркас проекта в текущей папке:\n$ django-admin startproject superlists .\n\n# Запускаем локальный сервер разработки:\n$ python manage.py runserver\nWatching for file changes with StatReloader\nPerforming system checks...\nDjango version 4.2, using settings 'superlists.settings'\nStarting development server at http://127.0.0.1:8000/\nQuit the server with CONTROL-C.</code></pre>\n    </div>\n\n    <p>\n      Теперь во втором окне терминала повторно запустим наш скрипт:\n    </p>\n\n    <div class=\"code-container\">\n      <div class=\"code-header\">\n        <span class=\"code-lang-tag\">Bash / Terminal</span>\n        <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\n      </div>\n      <pre class=\"code-body\"><code>$ python functional_tests.py\nAssertionError: Browser title was 'The install worked successfully! Congratulations!'</code></pre>\n    </div>\n\n    <p>\n      Смотрите, ошибка изменилась! Теперь браузер успешно подключился к серверу, но заголовок дефолтной страницы Django гласит <i>\"The install worked successfully!\"</i>, а наш тест ждет подстроку <i>\"To-Do\"</i>. Теперь сервер поднят, и на следующем этапе мы напишем первое приложение, чтобы сделать этот тест полностью зеленым.\n    </p>\n\n    <h2>6. Непрерывный цикл TDD</h2>\n    <p>\n      Весь дальнейший процесс разработки на протяжении книги будет следовать триаде:\n    </p>\n\n    <div class=\"schema-box\">\n      <div class=\"schema-grid\">\n        <div class=\"schema-item red\">\n          <strong>1. Красный (Red)</strong>\n          <p>Напишите тест для желаемой функциональности. Запустите его и убедитесь, что он падает именно с ожидаемой ошибкой.</p>\n        </div>\n        <div class=\"schema-item green\">\n          <strong>2. Зеленый (Green)</strong>\n          <p>Напишите минимально возможный код, чтобы тест прошел успешно (даже если этот код пока кажется наивным хаком).</p>\n        </div>\n        <div class=\"schema-item blue\">\n          <strong>3. Рефакторинг (Refactor)</strong>\n          <p>Очистите код, удалите дублирование, улучшите читаемость. Тесты гарантируют, что поведение системы не нарушится.</p>\n        </div>\n      </div>\n    </div>",
      "quiz": [
        {
          "question": "Каково главное «золотое правило» методологии разработки через тестирование (TDD)?",
          "options": [
            "Не писать ни строчки продуктового кода без предварительно падающего теста.",
            "Все тесты должны выполняться менее чем за 1 миллисекунду.",
            "Сначала пишется вся архитектура и контроллеры, а тесты пишутся на этапе релиза.",
            "Функциональные тесты обязательно должны заменять модульные тесты."
          ],
          "correct": 0,
          "explanation": "Фундамент TDD — сначала создается тест, демонстрирующий отсутствие нужного поведения, и только потом пишется код для его прохождения."
        },
        {
          "question": "Чем принципиально отличается функциональный тест от модульного теста (unit-теста)?",
          "options": [
            "Функциональный тест проверяет отдельные функции изолированно от базы данных.",
            "Функциональный тест смотрит на систему снаружи (глазами пользователя, часто через браузер), а модульный — изнутри (на отдельные классы и функции).",
            "Функциональные тесты пишутся только на JavaScript, а модульные — только на Python.",
            "Функциональные тесты выполняются компилятором, а модульные — вручную тестировщиком."
          ],
          "correct": 1,
          "explanation": "Функциональный тест (FT / E2E) эмулирует реальный пользовательский опыт в браузере и проверяет взаимодействие всех слоев веб-приложения целиком."
        },
        {
          "question": "Почему в TDD падение первого теста (фаза Red) считается успешным результатом?",
          "options": [
            "Потому что падение теста освобождает память операционной системы.",
            "Потому что это доказывает, что тест действительно работает, реагирует на код и не выдает ложноположительный зеленый результат.",
            "Потому что Django блокирует любые тесты, если они не падают.",
            "Это просто традиция без технического смысла."
          ],
          "correct": 1,
          "explanation": "Если новый тест сразу проходит зеленым, скорее всего, он проверяет что-то не то или написан с ошибкой. Падение теста с понятной причиной — доказательство его работоспособности."
        },
        {
          "question": "В каком порядке выполняется цикл разработки в TDD?",
          "options": [
            "Зеленый (Green) → Красный (Red) → Документирование",
            "Красный (Red) → Зеленый (Green) → Рефакторинг (Refactor)",
            "Рефакторинг → Зеленый → Красный",
            "Код без тестов → Ручная проверка → Рефакторинг"
          ],
          "correct": 1,
          "explanation": "Классическая триада TDD: Красный (падающий тест) → Зеленый (минимальный работающий код) → Рефакторинг (улучшение структуры без изменения внешнего поведения)."
        }
      ]
    },
    {
      "num": 2,
      "title": "Глава 2. Расширение функционального теста при помощи модуля unittest",
      "subtitle": "Переход от примитивного скрипта к профессиональному тестовому набору: использование стандартного модуля unittest, фикстур setUp и tearDown и информативных ассертов.",
      "minutes": 12,
      "contentHtml": "<h2>1. Проблема примитивного функционального теста</h2>\r\n<p>В первой главе наш тест был простым Python-скриптом. Однако у него были серьезные недостатки: если тест падал на строке с assert, браузер Firefox оставался висеть открытым на экране, захламляя память. Кроме того, нам приходилось вручную проверять код возврата и выводить ошибки.</p>\r\n<div class=\"callout warning\">\r\n  <div class=\"callout-title\">⚠️ Утечка ресурсов без фикстур очистки</div>\r\n  <p>Если процесс падает до вызова browser.quit(), окно браузера останется в операционной системе, удерживая порт и системные ресурсы.</p>\r\n</div>\r\n<h2>2. Внедрение стандартного модуля unittest</h2>\r\n<p>Python поставляется с великолепной встроенной библиотекой unittest. Она предоставляет готовые механизмы для организации тестов, управления их жизненным циклом и генерации отчетов.</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · functional_tests.py</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>from selenium import webdriver\r\nimport unittest\r\n\r\nclass NewVisitorTest(unittest.TestCase):\r\n\r\n    def setUp(self):\r\n        # Метод setUp запускается ПЕРЕД каждым тестовым методом:\r\n        self.browser = webdriver.Firefox()\r\n\r\n    def tearDown(self):\r\n        # Метод tearDown запускается ВСЕГДА, даже если тест упал с ошибкой:\r\n        self.browser.quit()\r\n\r\n    def test_can_start_a_list_and_retrieve_it_later(self):\r\n        # Любой метод, начинающийся с test_, считается тестовым случаем:\r\n        self.browser.get('http://localhost:8000')\r\n\r\n        # Проверяем заголовок страницы:\r\n        self.assertIn('To-Do', self.browser.title)\r\n        self.fail('Закончить тест!')\r\n\r\nif __name__ == '__main__':\r\n    unittest.main()</code></pre>\r\n</div>\r\n<h2>3. Методы setUp() и tearDown()</h2>\r\n<p>Это специальные методы фикстур (fixtures). Метод <b>setUp</b> подготавливает окружение (запускает браузер), а <b>tearDown</b> гарантированно наводит порядок после теста (закрывает браузер), даже если в теле теста произошло исключение AssertionError.</p>\r\n<h2>4. Метод self.fail() как напоминание разработчику</h2>\r\n<p>Обратите внимание на вызов <code class=\"inline-code\">self.fail('Закончить тест!')</code>. В TDD это стандартный приём: мы намеренно завершаем тест принудительным падением в том месте, где наша пользовательская история еще не дописана. Это служит надежной закладкой в коде.</p>",
      "quiz": [
        {
          "question": "Почему использование метода tearDown() предпочтительнее простого вызова browser.quit() в конце скрипта?",
          "options": [
            "tearDown() гарантированно выполнится даже в том случае, если тест завершился сбоем (AssertionError или Exception).",
            "tearDown() ускоряет выполнение JavaScript в браузере в два раза.",
            "tearDown() автоматически перезапускает упавший сервер Django.",
            "Это чисто стилистическое соглашение, не имеющее технической разницы."
          ],
          "correct": 0,
          "explanation": "Если ассерт внутри теста падает, выполнение функции прерывается. Обычный код после ассерта не выполнится, а tearDown() вызывается тестовым раннером всегда."
        },
        {
          "question": "По какому соглашению раннер модуля unittest находит методы для запуска?",
          "options": [
            "Имя метода должно начинаться с префикса test_",
            "Имя метода должно заканчиваться суффиксом _run",
            "Метод должен быть обязательно декорирован @run_test",
            "Все публичные методы класса запускаются автоматически"
          ],
          "correct": 0,
          "explanation": "Модуль unittest запускает только те методы тестового класса, названия которых начинаются с префикса test_."
        },
        {
          "question": "Для чего автор книги использует вызов self.fail('Закончить тест!')?",
          "options": [
            "Чтобы проверить скорость аварийного завершения Python.",
            "Как напоминание и отметку о том, что пользовательская история написана не до конца и требует продолжения реализации.",
            "Чтобы заблокировать коммит в Git.",
            "Это требование компилятора Django."
          ],
          "correct": 1,
          "explanation": "В TDD падающий self.fail() в конце незавершенного теста гарантирует, что вы не забудете вернуться и дописать функционал."
        }
      ]
    },
    {
      "num": 3,
      "title": "Глава 3. Тестирование простой домашней страницы при помощи модульных тестов",
      "subtitle": "Погружение в архитектуру Django изнутри: создание первого приложения, разница между URL-маршрутизацией, функциями представлений (views) и модульными тестами.",
      "minutes": 14,
      "contentHtml": "<h2>1. Модульные тесты vs Функциональные тесты</h2>\r\n<p>Если функциональные тесты проверяют приложение целиком снаружи, то <b>модульные тесты (Unit Tests)</b> тестируют внутренние шестерёнки: отдельные функции, генерацию HTML и логику представлений. Они работают прямо в памяти без запуска медленного браузера, отрабатывая за доли секунды.</p>\r\n<h2>2. Создание приложения lists</h2>\r\n<p>В Django проект (project) состоит из отдельных приложений (apps). Создадим приложение для списков задач:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Bash / Terminal</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>$ python manage.py startapp lists</code></pre>\r\n</div>\r\n<h2>3. Первый модульный тест: lists/tests.py</h2>\r\n<p>Откроем сгенерированный файл <code class=\"inline-code\">lists/tests.py</code> и напишем наш первый модульный тест:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · lists/tests.py</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>from django.urls import resolve\r\nfrom django.test import TestCase\r\nfrom lists.views import home_page\r\n\r\nclass HomePageTest(TestCase):\r\n\r\n    def test_root_url_resolves_to_home_page_view(self):\r\n        # Функция resolve сопоставляет URL со связанной функцией представления:\r\n        found = resolve('/')\r\n        self.assertEqual(found.func, home_page)</code></pre>\r\n</div>\r\n<h2>4. Тестирование HTML ответа представления</h2>\r\n<p>Второй модульный тест проверяет, что сама функция <code class=\"inline-code\">home_page</code> возвращает реальный объект <code class=\"inline-code\">HttpResponse</code> с корректным заголовком:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · lists/tests.py</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>from django.http import HttpRequest\r\n\r\n    def test_home_page_returns_correct_html(self):\r\n        request = HttpRequest()\r\n        response = home_page(request)\r\n        html = response.content.decode('utf8')\r\n        self.assertTrue(html.startswith('<html>'))\r\n        self.assertIn('<title>To-Do lists</title>', html)\r\n        self.assertTrue(html.endswith('</html>'))</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Какую задачу решает функция resolve('/') из модуля django.urls?",
          "options": [
            "Сопоставляет переданный URL-путь с зарегистрированной в urls.py функцией представления (view).",
            "Очищает кэш браузера при переходе по ссылке.",
            "Автоматически создает миграции для базы данных.",
            "Шифрует пароли пользователей."
          ],
          "correct": 0,
          "explanation": "resolve(url) разбирает путь согласно urlpatterns и возвращает метаданные маршрута, включая ссылку на функцию представления found.func."
        },
        {
          "question": "Какой командой запускаются модульные тесты в проекте Django?",
          "options": [
            "python manage.py test",
            "python manage.py runserver --test",
            "django-admin starttest",
            "pytest --django-only"
          ],
          "correct": 0,
          "explanation": "Стандартная команда управления Django для прогона всех тестов в приложениях — python manage.py test."
        },
        {
          "question": "Какое главное преимущество модульных тестов перед функциональными тестами с Selenium?",
          "options": [
            "Модульные тесты выполняются колоссально быстрее, так как не требуют запуска настоящего браузера и сетевых задержек.",
            "Модульные тесты могут проверять работу CSS стилей в браузере.",
            "Модульные тесты пишутся один раз и никогда не требуют изменений.",
            "Модульные тесты заменяют собой всю документацию проекта."
          ],
          "correct": 0,
          "explanation": "Unit-тесты работают в памяти за миллисекунды, позволяя разработчику получать мгновенную обратную связь после каждого изменения строки кода."
        }
      ]
    },
    {
      "num": 4,
      "title": "Глава 4. И что же делать со всеми этими тестами (и рефакторизацией)?",
      "subtitle": "Внедрение шаблонизатора Django, избавление от ручной склейки HTML строк, безопасный рефакторинг под защитой тестов и первый коммит в Git.",
      "minutes": 11,
      "contentHtml": "<h2>1. Проблема жестко зашитого HTML в представлениях</h2>\r\n<p>В 3-й главе наше представление возвращало сырую строку <code class=\"inline-code\">HttpResponse('&lt;html&gt;&lt;title&gt;To-Do lists&lt;/title&gt;&lt;/html&gt;')</code>. Это ужасная практика: смешивать разметку с логикой на Python нельзя. Нам нужны <b>шаблоны (templates)</b>.</p>\r\n<h2>2. Создание шаблона home.html</h2>\r\n<p>Создадим файл шаблона <code class=\"inline-code\">lists/templates/home.html</code>:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">HTML · lists/templates/home.html</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code><!DOCTYPE html>\r\n<html>\r\n<head>\r\n    <title>To-Do lists</title>\r\n</head>\r\n<body>\r\n    <h1>Your To-Do list</h1>\r\n    <input id=\"id_new_item\" placeholder=\"Enter a to-do item\" />\r\n    <table id=\"id_list_table\">\r\n    </table>\r\n</body>\r\n</html></code></pre>\r\n</div>\r\n<h2>3. Рефакторинг с функцией render()</h2>\r\n<p>Теперь мы можем переписать функцию представления с использованием вспомогательной функции <code class=\"inline-code\">render</code>:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · lists/views.py</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>from django.shortcuts import render\r\n\r\ndef home_page(request):\r\n    return render(request, 'home.html')</code></pre>\r\n</div>\r\n<h2>4. Тестирование с помощью self.assertTemplateUsed()</h2>\r\n<p>Тестовый клиент Django (<code class=\"inline-code\">self.client.get('/')</code>) позволяет проверять факт использования конкретного шаблона вместо примитивной проверки текста строки:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · lists/tests.py</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>    def test_home_page_returns_correct_html(self):\r\n        response = self.client.get('/')\r\n        self.assertTemplateUsed(response, 'home.html')</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "В чем заключается сущность этапа 'Рефакторинг' в цикле TDD?",
          "options": [
            "Улучшение структуры, читаемости и дизайна существующего кода БЕЗ изменения его внешнего поведения.",
            "Полное переписывание проекта на другой язык программирования.",
            "Удаление всех старых тестов.",
            "Добавление пяти новых фич за один коммит."
          ],
          "correct": 0,
          "explanation": "Рефакторинг — это улучшение внутреннего качества кода под защитой тестов: если после рефакторинга все тесты зеленые, вы ничего не сломали."
        },
        {
          "question": "Какой метод тестового клиента Django проверяет, что представление отрендерило нужный шаблон?",
          "options": [
            "self.assertTemplateUsed(response, 'home.html')",
            "self.assertEqual(template, True)",
            "self.assertInHTML(response, 'template')",
            "self.checkTemplate('home.html')"
          ],
          "correct": 0,
          "explanation": "assertTemplateUsed — удобный метод Django TestCase, который проверяет стек использованных шаблонов при обработке запроса."
        }
      ]
    },
    {
      "num": 5,
      "title": "Глава 5. Сохранение вводимых данных: тестирование базы данных",
      "subtitle": "Обработка POST-запросов от пользователя, защита от CSRF-атак, создание моделей данных Django ORM и тестирование сохранения в базу SQLite.",
      "minutes": 15,
      "contentHtml": "<h2>1. Обработка POST-запроса формы</h2>\r\n<p>Пользователь вводит текст в поле и нажимает Enter. Браузер отправляет HTTP POST запрос. Нам нужно проверить два аспекта: сохранение элемента в базу данных и перенаправление пользователя обратно на страницу (паттерн Post/Redirect/Get).</p>\r\n<h2>2. Защита от CSRF в Django</h2>\r\n<p>Django по умолчанию требует защиту от подделки межсайтовых запросов (Cross-Site Request Forgery). В любой форме с методом POST обязателен тег шаблонизатора <code class=\"inline-code\">{% csrf_token %}</code>:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">HTML · lists/templates/home.html</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code><form method=\"POST\">\r\n    <input name=\"item_text\" id=\"id_new_item\" placeholder=\"Enter a to-do item\" />\r\n    {% csrf_token %}\r\n</form></code></pre>\r\n</div>\r\n<h2>3. Модель данных Item и тестирование ORM</h2>\r\n<p>Напишем модульный тест для модели базы данных:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · lists/tests.py</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>from lists.models import Item\r\n\r\nclass ItemModelTest(TestCase):\r\n\r\n    def test_saving_and_retrieving_items(self):\r\n        first_item = Item()\r\n        first_item.text = 'The first (ever) list item'\r\n        first_item.save()\r\n\r\n        saved_items = Item.objects.all()\r\n        self.assertEqual(saved_items.count(), 1)\r\n        self.assertEqual(saved_items[0].text, 'The first (ever) list item')</code></pre>\r\n</div>\r\n<h2>4. Реализация модели Item и миграции</h2>\r\n<p>Создаем модель в <code class=\"inline-code\">lists/models.py</code> и генерируем миграцию базы данных:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · lists/models.py</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>from django.db import models\r\n\r\nclass Item(models.Model):\r\n    text = models.TextField(default='')</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Зачем в формы Django с методом POST обязательно включать тег {% csrf_token %}?",
          "options": [
            "Для защиты от атак типа Cross-Site Request Forgery (подделка межсайтовых запросов злоумышленником).",
            "Для шифрования данных по алгоритму RSA.",
            "Для ускорения передачи пакетов по протоколу HTTP.",
            "Без него база данных SQLite не сможет сохранить текст."
          ],
          "correct": 0,
          "explanation": "CSRF-токен генерируется сервером и подтверждает, что POST-запрос пришел именно от пользователя вашего сайта, а не со сторонней вредоносной страницы."
        },
        {
          "question": "Какими командами в Django создаются и применяются миграции базы данных?",
          "options": [
            "python manage.py makemigrations и затем python manage.py migrate",
            "python manage.py db_update",
            "django-admin create_tables",
            "python manage.py syncdb --force"
          ],
          "correct": 0,
          "explanation": "makemigrations анализирует изменения в models.py и генерирует файлы миграций, а migrate применяет их к реальной базе данных."
        }
      ]
    },
    {
      "num": 6,
      "title": "Глава 6. Усовершенствование FT: изоляция и удаление time.sleep",
      "subtitle": "Переход к LiveServerTestCase, избавление от хрупких вызовов time.sleep() и реализация надежных явных ожиданий в функциональных тестах.",
      "minutes": 12,
      "contentHtml": "<h2>1. Проблема: ручной запуск runserver</h2>\r\n<p>Раньше перед прогоном функциональных тестов нам приходилось в отдельном терминале запускать <code class=\"inline-code\">python manage.py runserver</code>. Это неудобно и ненадежно: тесты могут засорять рабочую базу данных реальными записями.</p>\r\n<h2>2. Внедрение LiveServerTestCase</h2>\r\n<p>Django предоставляет класс <code class=\"inline-code\">LiveServerTestCase</code>, который автоматически поднимает тестовый сервер на случайном свободном порту и создает изолированную тестовую базу данных, которая уничтожается после каждого прогона:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · functional_tests/tests.py</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>from django.test import LiveServerTestCase\r\nfrom selenium import webdriver\r\n\r\nclass NewVisitorTest(LiveServerTestCase):\r\n\r\n    def setUp(self):\r\n        self.browser = webdriver.Firefox()\r\n\r\n    def tearDown(self):\r\n        self.browser.quit()\r\n\r\n    def test_can_start_a_list(self):\r\n        # self.live_server_url автоматически содержит адрес тестового сервера:\r\n        self.browser.get(self.live_server_url)</code></pre>\r\n</div>\r\n<h2>3. Злодей по имени time.sleep()</h2>\r\n<p>Когда браузер отправляет запрос, странице требуется время на загрузку. Новички часто пишут <code class=\"inline-code\">time.sleep(1)</code>. Это ужасно:</p>\r\n<div class=\"callout warning\">\r\n  <div class=\"callout-title\">⚠️ Почему time.sleep() разрушает тесты</div>\r\n  <p>1. На медленной машине или сервере CI 1 секунды не хватит, и тест случайно упадет (flaky test).<br>2. На быстрой машине тест будет тратить 90% времени на бессмысленное ожидание, замедляя всю команду.</p>\r\n</div>\r\n<h2>4. Помощник явного ожидания с циклом опроса</h2>\r\n<p>Правильный подход: циклически опрашивать страницу с коротким интервалом (например, 0.1 с) вплоть до истечения таймаута (например, 10 секунд):</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · Вспомогательный метод ожидания</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>import time\r\nfrom selenium.common.exceptions import WebDriverException\r\n\r\nMAX_WAIT = 10\r\n\r\ndef wait_for_row_in_list_table(self, row_text):\r\n    start_time = time.time()\r\n    while True:\r\n        try:\r\n            table = self.browser.find_element_by_id('id_list_table')\r\n            rows = table.find_elements_by_tag_name('tr')\r\n            self.assertIn(row_text, [row.text for row in rows])\r\n            return\r\n        except (AssertionError, WebDriverException) as e:\r\n            if time.time() - start_time > MAX_WAIT:\r\n                raise e\r\n            time.sleep(0.1)</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "В чем главное преимущество LiveServerTestCase перед обычным TestCase в Django?",
          "options": [
            "Он автоматически запускает реальный HTTP-сервер в фоновом потоке и поднимает изолированную тестовую базу данных.",
            "Он автоматически компилирует Python код в C++.",
            "Он отключает все проверки валидации форм.",
            "Он генерирует скриншоты рабочего стола."
          ],
          "correct": 0,
          "explanation": "LiveServerTestCase идеально подходит для Selenium: он запускает сервер на лету и автоматически очищает тестовую базу после каждого прогона."
        },
        {
          "question": "Почему жестко зашитые паузы time.sleep(N) считаются антипаттерном в E2E тестах?",
          "options": [
            "Они делают тесты либо медленными (если N велико), либо нестабильными/флакующими (если машина тормозит и N не хватает).",
            "time.sleep блокирует работу видеокарты.",
            "В Python 3 модуль time признан устаревшим.",
            "time.sleep() приводит к ошибкам в базе данных SQLite."
          ],
          "correct": 0,
          "explanation": "Явное ожидание (polling) проверяет условие каждые 0.1 с и завершается в ту же миллисекунду, когда элемент появился, не тратя лишнего времени."
        }
      ]
    },
    {
      "num": 7,
      "title": "Глава 7. Работа в инкрементном режиме: разделение списков",
      "subtitle": "Проектирование RESTful URL-маршрутов, поддержка множественных уникальных списков для разных пользователей и инкрементная разработка.",
      "minutes": 11,
      "contentHtml": "<h2>1. Новый пользователь — новый список</h2>\r\n<p>До сих пор наше приложение отображало один общий список для всех. Но настоящему приложению нужны уникальные списки для каждого пользователя по отдельным URL-адресам (например, <code class=\"inline-code\">/lists/the-only-list-in-the-world/</code>).</p>\r\n<h2>2. Модель List и связь внешнего ключа (ForeignKey)</h2>\r\n<p>Элемент <code class=\"inline-code\">Item</code> должен принадлежать конкретному списку <code class=\"inline-code\">List</code>:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · lists/models.py</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>from django.db import models\r\n\r\nclass List(models.Model):\r\n    pass\r\n\r\nclass Item(models.Model):\r\n    text = models.TextField(default='')\r\n    list = models.ForeignKey(List, default=None, on_delete=models.CASCADE)</code></pre>\r\n</div>\r\n<h2>3. RESTful архитектура URL</h2>\r\n<p>Мы проектируем чистые маршруты в стиле REST:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · superlists/urls.py</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>from django.urls import path\r\nfrom lists import views\r\n\r\nurlpatterns = [\r\n    path('', views.home_page, name='home'),\r\n    path('lists/new', views.new_list, name='new_list'),\r\n    path('lists/<int:list_id>/', views.view_list, name='view_list'),\r\n    path('lists/<int:list_id>/add_item', views.add_item, name='add_item'),\r\n]</code></pre>\r\n</div>\r\n<h2>4. Финал первой части TDD</h2>\r\n<p>Мы завершили <b>Часть I книги</b>! Мы построили работающее веб-приложение списков дел, где каждый шаг разработки — от модели базы данных до обработки URL и отображения в браузере — был полностью спроектирован через падающие и проходящие тесты.</p>",
      "quiz": [
        {
          "question": "Какое поле модели Django используется для связи 'многие к одному' (много элементов принадлежат одному списку)?",
          "options": [
            "models.ForeignKey(List, on_delete=models.CASCADE)",
            "models.ManyToManyField(List)",
            "models.OneToOneField(List)",
            "models.ReferenceField(List)"
          ],
          "correct": 0,
          "explanation": "ForeignKey задает отношение 'многие к одному': много строк Item ссылаются на один родительский объект List."
        },
        {
          "question": "Что означает принцип инкрементной разработки в TDD?",
          "options": [
            "Создание сложной системы небольшими законченными шагами, каждый из которых проверен автоматическим тестом.",
            "Увеличение шрифта в редакторе кода с каждой новой главой.",
            "Написание всех моделей базы данных за один день без запуска тестов.",
            "Использование только инкрементных идентификаторов в URL."
          ],
          "correct": 0,
          "explanation": "Инкрементная разработка разбивает глобальную задачу на мини-шаги: каждый шаг оставляет систему в стабильном, полностью рабочем и протестированном состоянии."
        }
      ]
    },
    {
      "num": 8,
      "title": "Глава 8. Макет, стилевое оформление и что тут тестировать",
      "subtitle": "Интеграция Bootstrap, подключение статических файлов (CSS/JS) в Django и тестирование макета и расположения элементов через Selenium.",
      "minutes": 12,
      "contentHtml": "<h2>1. Что следует и чего не следует тестировать в стилях</h2>\r\n<p>Тестировать каждый пиксель или цвет кнопки — верный путь к хрупким тестам. Но ключевые аспекты компоновки (например, что поле ввода отцентровано по центру экрана) можно и нужно тестировать с помощью Selenium:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · Тестирование геометрии элемента</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>inputbox = self.browser.find_element_by_id('id_new_item')\r\nself.assertAlmostEqual(\r\n    inputbox.location['x'] + inputbox.size['width'] / 2,\r\n    512,\r\n    delta=10\r\n)</code></pre>\r\n</div>\r\n<h2>2. Статические файлы в Django</h2>\r\n<p>Для обслуживания стилей и картинок создается папка <code class=\"inline-code\">lists/static/</code> и настраиваются параметры <code class=\"inline-code\">STATIC_URL</code> и тег <code class=\"inline-code\">{% load static %}</code> в шаблоне.</p>",
      "quiz": [
        {
          "question": "Почему не стоит писать тесты на каждый CSS-стиль и точный цвет элементов?",
          "options": [
            "Такие тесты делают систему хрупкой и ломаются при малейшем редизайне, не добавляя реальной надежности функционалу.",
            "Браузер Firefox запрещает чтение стилей через Selenium.",
            "CSS стили не кэшируются тестовым сервером.",
            "Это требование консорциума W3C."
          ],
          "correct": 0,
          "explanation": "Тестировать стоит только критическую компоновку и видимость, иначе любой косметический редизайн превратится в мучительную правку тестов."
        }
      ]
    },
    {
      "num": 9,
      "title": "Глава 9. Тестирование развертывания с промежуточным сервером (Staging)",
      "subtitle": "Концепция тестового промежуточного сервера (Staging), запуск функциональных тестов против реального удаленного сервера до релиза.",
      "minutes": 14,
      "contentHtml": "<h2>1. Зачем нужен Staging сервер?</h2>\r\n<p>Приложение отлично работает на машине разработчика (<code class=\"inline-code\">localhost</code>), но падает на продакшене из-за различий в веб-серверах, базах данных и переменных окружения. Промежуточный сервер (Staging) — это точная копия боевого сервера.</p>\r\n<h2>2. Запуск FT против внешнего сервера</h2>\r\n<p>Мы модифицируем наш тест так, чтобы он мог принимать целевой URL через аргумент командной строки <code class=\"inline-code\">--liveserver=staging.mysite.com</code>:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Bash / Terminal</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>$ python manage.py test functional_tests --liveserver=staging.superlists.com</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "В чем главное назначение промежуточного сервера (Staging)?",
          "options": [
            "Проверка работы приложения в инфраструктуре, максимально приближенной к продакшену, до выкатки пользователям.",
            "Резервное копирование исходного кода.",
            "Генерация логотипов для мобильных устройств.",
            "Снижение нагрузки на процессор разработчика."
          ],
          "correct": 0,
          "explanation": "Staging позволяет обнаружить ошибки конфигурации веб-сервера, Nginx, прав доступа к файлам и баз данных до того, как их увидят реальные клиенты."
        }
      ]
    },
    {
      "num": 10,
      "title": "Глава 10. Переход к боевому развертыванию: Nginx, Gunicorn и Systemd",
      "subtitle": "Архитектура современного веб-сервера: проксирование запросов через Nginx, WSGI-сервер Gunicorn и демонизация через systemd.",
      "minutes": 13,
      "contentHtml": "<h2>1. Стек веб-сервера</h2>\r\n<p>В продакшене встроенный <code class=\"inline-code\">manage.py runserver</code> использовать категорически запрещено. Профессиональный стек включает:<br>• <b>Nginx:</b> фронтенд веб-сервер, принимает соединения, отдает статику и проксирует трафик.<br>• <b>Gunicorn:</b> WSGI HTTP-сервер для выполнения Python кода.<br>• <b>Systemd:</b> служба операционной системы, перезапускающая процесс при сбоях.</p>",
      "quiz": [
        {
          "question": "Какую роль выполняет Gunicorn в связке с Nginx?",
          "options": [
            "Является WSGI-сервером приложений, который транслирует входящие HTTP-запросы в вызовы Python функций Django.",
            "Отвечает за отрисовку шрифтов на мониторе.",
            "Шифрует жесткий диск сервера.",
            "Автоматически пишет тесты для базы данных."
          ],
          "correct": 0,
          "explanation": "Nginx принимает трафик из сети и пересылает его в сокет Gunicorn, который запускает код Django по спецификации WSGI."
        }
      ]
    },
    {
      "num": 11,
      "title": "Глава 11. Автоматизация развертывания с помощью Fabric",
      "subtitle": "Автоматизация деплоя по SSH одной командой: создание fabfile, подтягивание кода из Git, сборка статики и запуск миграций.",
      "minutes": 11,
      "contentHtml": "<h2>1. Принцип воспроизводимого развертывания</h2>\r\n<p>Ручной деплой через SSH консоль чреват человеческими ошибками. Библиотека <b>Fabric</b> позволяет автоматизировать всю цепочку шагов на Python:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · deploy.py (Fabfile)</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>from fabric.contrib.files import append, exists\r\nfrom fabric.api import cd, env, local, run\r\n\r\ndef deploy():\r\n    site_folder = f'/home/{env.user}/sites/{env.host}'\r\n    run(f'mkdir -p {site_folder}')\r\n    with cd(site_folder):\r\n        _get_latest_source()\r\n        _update_virtualenv()\r\n        _update_static_files()\r\n        _update_database()</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Почему автоматизированный деплой (через Fabric, Ansible или CI) предпочтительнее ручного ввода команд на сервере?",
          "options": [
            "Он исключает человеческий фактор, гарантирует повторяемость шагов и экономит часы времени.",
            "Ручной ввод команд запрещен лицензией Python.",
            "Автоматизация увеличивает размер оперативной памяти сервера.",
            "Без Fabric веб-страницы открываются только в режиме чтения."
          ],
          "correct": 0,
          "explanation": "Автоматизированный скрипт делает деплой предсказуемым и безопасным процессом, выполняемым нажатием одной кнопки."
        }
      ]
    },
    {
      "num": 12,
      "title": "Глава 12. Разделение тестов на файлы и обобщенный помощник ожидания",
      "subtitle": "Рефакторинг тестовой базы: разбиение разросшихся tests.py на отдельные файлы представлений, моделей и форм, а также выделение базового класса ожидания.",
      "minutes": 12,
      "contentHtml": "<h2>1. Пакетная структура тестов</h2>\r\n<p>Когда файл тестов превышает 300 строк, его необходимо реорганизовать в пакет:<br><code class=\"inline-code\">lists/tests/test_views.py</code>, <code class=\"inline-code\">test_models.py</code>, <code class=\"inline-code\">test_forms.py</code>.</p>",
      "quiz": [
        {
          "question": "Что необходимо создать, чтобы Python воспринимал папку как пакет с модулями?",
          "options": [
            "Файл __init__.py внутри директории.",
            "Файл package.json.",
            "Текстовый документ README.txt.",
            "Папку .git."
          ],
          "correct": 0,
          "explanation": "Файл __init__.py указывает интерпретатору Python, что директорию следует трактовать как импортируемый пакет модулей."
        }
      ]
    },
    {
      "num": 13,
      "title": "Глава 13. Валидация на уровне базы данных",
      "subtitle": "Защита целостности данных: валидаторы моделей Django, метод full_clean() и обработка попыток сохранения пустых элементов списка.",
      "minutes": 13,
      "contentHtml": "<h2>1. Тестирование валидации модели</h2>\r\n<p>Пользователь не должен иметь возможности сохранить пустой элемент. Мы пишем тест, ожидающий исключение <code class=\"inline-code\">ValidationError</code>:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · lists/tests/test_models.py</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>from django.core.exceptions import ValidationError\r\n\r\ndef test_cannot_save_empty_list_items(self):\r\n    list_ = List.objects.create()\r\n    item = Item(list=list_, text='')\r\n    with self.assertRaises(ValidationError):\r\n        item.save()\r\n        item.full_clean()</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Почему при тестировании валидации модели Django важно вручную вызывать item.full_clean() перед save()?",
          "options": [
            "Метод save() в Django ORM по умолчанию не запускает валидаторы полей в SQLite ради производительности.",
            "full_clean() форматирует жесткий диск.",
            "save() заблокирован в тестовом окружении.",
            "full_clean() очищает базу данных от спама."
          ],
          "correct": 0,
          "explanation": "Django ORM из соображений скорости не вызывает валидацию полей в методе save() автоматически; для явного прогона правил используется full_clean()."
        }
      ]
    },
    {
      "num": 14,
      "title": "Глава 14. Простые формы Django",
      "subtitle": "Использование мощной подсистемы форм Django (forms.ModelForm): генерация HTML-тегов, валидация полей и вывод сообщений об ошибках.",
      "minutes": 12,
      "contentHtml": "<h2>1. Зачем нужны формы Django?</h2>\r\n<p>Формы Django объединяют валидацию данных, генерацию безопасных HTML-инпутов и связывание с моделями базы данных в единый лаконичный класс <code class=\"inline-code\">ItemForm</code>.</p>",
      "quiz": [
        {
          "question": "Какой класс Django позволяет автоматически сгенерировать форму на основе полей модели базы данных?",
          "options": [
            "forms.ModelForm",
            "models.FormFactory",
            "forms.AutoGenerator",
            "views.FormBuilder"
          ],
          "correct": 0,
          "explanation": "forms.ModelForm автоматически создает поля формы с валидацией, опираясь на метаданные указанной модели."
        }
      ]
    },
    {
      "num": 15,
      "title": "Глава 15. Более развитые формы и уникальность",
      "subtitle": "Проверка уникальности элементов внутри одного списка, кастомные ошибки валидации и класс ExistingListItemForm.",
      "minutes": 12,
      "contentHtml": "<h2>1. Составное ограничение уникальности unique_together</h2>\r\n<p>Один и тот же текст не должен дублироваться внутри одного списка, но может повторяться в разных списках:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · lists/models.py</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>class Meta:\r\n    unique_together = ('list', 'text')</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Что задает параметр unique_together = ('list', 'text') в классе Meta модели?",
          "options": [
            "Составное ограничение уникальности: комбинация полей list и text не может дублироваться в базе данных.",
            "Сортировку записей по алфавиту.",
            "Связь один-к-одному между таблицами.",
            "Шифрование текста элемента."
          ],
          "correct": 0,
          "explanation": "unique_together создает уникальный индекс на уровне СУБД, защищая данные от повторяющихся элементов в рамках одного списка."
        }
      ]
    },
    {
      "num": 16,
      "title": "Глава 16. Окунаемся в тестирование JavaScript во фронтенде",
      "subtitle": "Клиентский интерактив: скрытие сообщений об ошибках при начале ввода текста пользователем, модульное тестирование JS с фреймворком QUnit.",
      "minutes": 14,
      "contentHtml": "<h2>1. Тестирование фронтенд логики</h2>\r\n<p>Когда пользователь видит ошибку валидации и начинает вводить новый символ, красное сообщение об ошибке должно мгновенно исчезнуть. Мы пишем модульный тест на JavaScript:</p>",
      "quiz": [
        {
          "question": "Какое ключевое преимущество дает написание модульных тестов для JavaScript-кода (например, в QUnit)?",
          "options": [
            "Возможность быстро проверять логику DOM-манипуляций и обработчиков событий без необходимости полного прогона медленных тестов Selenium.",
            "Автоматическое удаление CSS стилей.",
            "Ускорение рендеринга видеокарт.",
            "JavaScript тесты компилируются в байт-код Python."
          ],
          "correct": 0,
          "explanation": "Модульные тесты JS проверяют поведение скрипта мгновенно в тестовом раннере, экономя время по сравнению с тяжелыми E2E сценариями."
        }
      ]
    },
    {
      "num": 17,
      "title": "Глава 17. Развертывание нового программного кода",
      "subtitle": "Финал второй части: применение миграций на сервере staging, автоматический прогон функциональных тестов и безопасный деплой на боевой сервер.",
      "minutes": 11,
      "contentHtml": "<h2>1. Полный цикл непрерывной доставки</h2>\r\n<p>Мы выстроили полный конвейер: локальная разработка под защитой модульных тестов -> выкатка на staging через Fabric -> прогон Selenium FT -> выкатка на продакшен.</p>",
      "quiz": [
        {
          "question": "В какой последовательности безопаснее всего выпускать релиз веб-приложения?",
          "options": [
            "Локальные юнит-тесты → деплой на Staging → прогон сквозных FT → деплой на Production.",
            "Сразу на Production без запуска тестов.",
            "Коммит в мастер без локальной проверки.",
            "Ручное тестирование на сервере клиентов."
          ],
          "correct": 0,
          "explanation": "Это классический пайплайн безопасной непрерывной поставки (Continuous Delivery), исключающий внезапные падения сервиса."
        }
      ]
    },
    {
      "num": 18,
      "title": "Глава 18. Аутентификация пользователя и спайк-исследования (Spikes)",
      "subtitle": "Исследовательское прототипирование (Spike) без тестов, за которым следует удаление спайка и строгое воспроизведение фичи через TDD на примере беспарольной аутентификации.",
      "minutes": 14,
      "contentHtml": "<h2>1. Что такое спайк (Spike) в экстремальном программировании?</h2>\r\n<p>Когда вы не знаете, как устроена сторонняя библиотека или протокол, писать тесты заранее невозможно. Спайк — это намеренное написание неряшливого кода без тестов только ради изучения технологии. Главное правило спайка: <b>после изучения весь код спайка удаляется или переносится в отдельную ветку, и разработка начинается заново строго по TDD</b>.</p>",
      "quiz": [
        {
          "question": "Каково главное правило завершения 'спайк-исследования' (Spike)?",
          "options": [
            "Код спайка удаляется или изолируется, а рабочая версия пишется заново с нуля строго по методологии TDD.",
            "Код спайка сразу отправляется в продакшен без ревью.",
            "Спайк переименовывается в микросервис.",
            "Все разработчики обязаны подписать протокол спайка."
          ],
          "correct": 0,
          "explanation": "Спайк предназначен только для обучения; его код грязен и не покрыт тестами. Продуктовый код пишется набело по TDD с использованием полученных знаний."
        }
      ]
    },
    {
      "num": 19,
      "title": "Глава 19. Использование имитаций (Mocks) для внешних зависимостей",
      "subtitle": "Изоляция тестируемого кода от медленных и ненадежных сторонних систем (отправка email, платежные шлюзы) с помощью unittest.mock.patch.",
      "minutes": 16,
      "contentHtml": "<h2>1. Зачем нужны Mock-объекты?</h2>\r\n<p>Реальная отправка писем по SMTP во время каждого модульного теста сделала бы их медленными и требовала бы интернет-соединения. Имитации (Mocks) подменяют внешние вызовы фейковыми объектами:</p>\r\n<div class=\"code-container\">\r\n  <div class=\"code-header\">\r\n    <span class=\"code-lang-tag\">Python · Использование mock.patch</span>\r\n    <button type=\"button\" class=\"copy-code-btn\">Копировать</button>\r\n  </div>\r\n  <pre class=\"code-body\"><code>from unittest.mock import patch\r\n\r\n@patch('accounts.views.send_mail')\r\ndef test_sends_link_to_email(self, mock_send_mail):\r\n    self.client.post('/accounts/send_login_email', data={'email': 'edith@example.com'})\r\n    self.assertEqual(mock_send_mail.called, True)\r\n    (subject, body, from_email, to_list), kwargs = mock_send_mail.call_args\r\n    self.assertEqual(to_list, ['edith@example.com'])</code></pre>\r\n</div>",
      "quiz": [
        {
          "question": "Какую главную опасность таит в себе чрезмерное злоупотребление mock-объектами (over-mocking)?",
          "options": [
            "Тесты становятся тесно связанными с деталями внутренней реализации, а не с поведением, и могут проходить зелеными, даже когда реальная система сломана.",
            "Mocks увеличивают расход батареи ноутбука.",
            "Библиотека mock запрещена в Python 3.",
            "Mocks не работают с базой данных SQLite."
          ],
          "correct": 0,
          "explanation": "Чрезмерный мокинг опасен: вы можете замокать всё настолько, что тесты проверяют лишь вызовы моков, а не реальную функциональность."
        }
      ]
    },
    {
      "num": 20,
      "title": "Глава 20. Тестовые фикстуры и предварительная аутентификация",
      "subtitle": "Ускорение функциональных тестов: создание фикстур сессий на стороне сервера для мгновенного входа без повторения шагов логина через браузер.",
      "minutes": 12,
      "contentHtml": "<h2>1. Ускорение прогона тестов</h2>\r\n<p>Если каждый из 50 тестов будет логиниться через форму, вводя почту и кликая по ссылке, прогон займет часы. Мы создаем сессионный куки напрямую на сервере и подставляем его в браузер за 10 миллисекунд.</p>",
      "quiz": [
        {
          "question": "Зачем в функциональных тестах подставляют предсозданную сессию (session cookie) вместо реального логина через форму?",
          "options": [
            "Чтобы сэкономить десятки минут времени прогона тестового набора, минуя рутинные одинаковые шаги аутентификации.",
            "Потому что Selenium не умеет нажимать на кнопки входа.",
            "Для обхода двухфакторной аутентификации.",
            "Это требование безопасности Django."
          ],
          "correct": 0,
          "explanation": "Прямая инъекция сессии позволяет сразу тестировать нужный экран от лица залогиненного пользователя, минуя повторный вход."
        }
      ]
    },
    {
      "num": 21,
      "title": "Глава 21. Отладка на стороне сервера и автоматические скриншоты",
      "subtitle": "Диагностика сбоев на Staging сервере: перехват скриншотов в момент падения теста и сбор дампов HTML для быстрого анализа.",
      "minutes": 11,
      "contentHtml": "<h2>1. Автоматический скриншот при ошибке</h2>\r\n<p>В методе tearDown мы проверяем факт падения теста и сохраняем скриншот экрана браузера: <code class=\"inline-code\">self.browser.get_screenshot_as_file(filename)</code>.</p>",
      "quiz": [
        {
          "question": "Как автоматический скриншот в момент падения теста помогает при отладке в CI/CD?",
          "options": [
            "Позволяет мгновенно увидеть точное состояние экрана и текст ошибки в браузере на удаленном безголовом сервере.",
            "Уменьшает размер репозитория Git.",
            "Перезапускает упавший веб-сервер.",
            "Отправляет отчет в службу поддержки браузера."
          ],
          "correct": 0,
          "explanation": "На CI сервере нет монитора, и скриншот — единственный способ заглянуть внутрь браузера в момент аварии."
        }
      ]
    },
    {
      "num": 22,
      "title": "Глава 22. Завершение приложения «Мои списки»: подход Outside-In TDD",
      "subtitle": "Классический подход Outside-In: от функционального теста через представления и формы к моделям базы данных.",
      "minutes": 14,
      "contentHtml": "<h2>1. Разработка снаружи-внутрь (Outside-In)</h2>\r\n<p>Мы начинаем со сквозного FT теста на уровне интерфейса, спускаемся на уровень контроллера (View), затем формы и только в конце проектируем таблицу базы данных.</p>",
      "quiz": [
        {
          "question": "В чем главное преимущество подхода 'Снаружи-внутрь' (Outside-In)?",
          "options": [
            "Вы проектируете только тот код и поля базы данных, которые действительно необходимы для удовлетворения конкретного шага пользователя.",
            "Он не требует использования базы данных.",
            "Он позволяет обходиться без языка Python.",
            "Тесты выполняются в обратном порядке."
          ],
          "correct": 0,
          "explanation": "Outside-In защищает от написания лишнего кода: каждый созданный класс строго обоснован требованием верхнего уровня."
        }
      ]
    },
    {
      "num": 23,
      "title": "Глава 23. Изоляция тестов и «слушание своих тестов»",
      "subtitle": "Тесты как инструмент архитектурного проектирования: если тест тяжело писать или мокать, значит в дизайне системы есть проблема связности.",
      "minutes": 14,
      "contentHtml": "<h2>1. Слушайте свои тесты (Listen to your tests)</h2>\r\n<p>Если для проверки одной функции вам приходится настраивать 10 моков и 5 строк фикстур — это сигнал тревоги. Ваш модуль нарушает принцип единственной ответственности (SRP).</p>",
      "quiz": [
        {
          "question": "О чем обычно сигнализирует тест, который требует огромного количества сложных моков и настроек?",
          "options": [
            "О плохом дизайне и чрезмерной связности (high coupling) тестируемого класса с внешними зависимостями.",
            "О том, что язык Python устарел.",
            "О нехватке оперативной памяти.",
            "О высокой скорости работы базы данных."
          ],
          "correct": 0,
          "explanation": "Сложность написания теста прямо отражает архитектурную сложность кода: упрощайте архитектуру, выносите зависимости."
        }
      ]
    },
    {
      "num": 24,
      "title": "Глава 24. Непрерывная интеграция (CI)",
      "subtitle": "Автоматический запуск тестов при каждом пуше в репозиторий: настройка CI-сервера и культивация культуры 'зеленого билда'.",
      "minutes": 12,
      "contentHtml": "<h2>1. Роль CI сервера</h2>\r\n<p>CI гарантирует, что в главную ветку не попадет код, ломающий тесты. 'Красный билд' — наивысший приоритет команды, требующий немедленного исправления.</p>",
      "quiz": [
        {
          "question": "Каково главное правило команды при 'красном билде' в Continuous Integration?",
          "options": [
            "Починка билда имеет наивысший приоритет, никто не вливает новый код поверх упавшего.",
            "Отключить упавшие тесты и продолжить работу.",
            "Перезагрузить сервер CI три раза.",
            "Ждать конца недели для общего разбора."
          ],
          "correct": 0,
          "explanation": "Красный билд останавливает конвейер: команда должна немедленно восстановить стабильность общей ветки."
        }
      ]
    },
    {
      "num": 25,
      "title": "Глава 25. Шаблон проектирования Page Object",
      "subtitle": "Борьба с хрупкостью UI-тестов: инкапсуляция селекторов и действий со страницей в специализированные классы страниц (Page Objects).",
      "minutes": 14,
      "contentHtml": "<h2>1. Паттерн Page Object</h2>\r\n<p>Вместо дублирования <code class=\"inline-code\">browser.find_element_by_id(...)</code> по всем тестам, мы создаем класс <code class=\"inline-code\">MyListsPage</code>, который предоставляет бизнес-методы: <code class=\"inline-code\">page.create_list('Купить молоко')</code>.</p>",
      "quiz": [
        {
          "question": "Какую проблему решает шаблон Page Object в тестировании Selenium?",
          "options": [
            "Устраняет дублирование CSS/XPath селекторов и делает тесты устойчивыми к изменениям разметки страницы.",
            "Ускоряет загрузку шрифтов.",
            "Автоматически переводит сайт на другие языки.",
            "Шифрует пароли в формах."
          ],
          "correct": 0,
          "explanation": "Если ID поля изменится, вы исправите селектор в одном месте — внутри класса Page Object, а не в 40 тестовых сценариях."
        }
      ]
    },
    {
      "num": 26,
      "title": "Глава 26. Быстрые тесты, медленные тесты и пирамида тестирования",
      "subtitle": "Финал книги Гарри Персиваля: баланс пирамиды тестирования, горячие поля, разделение быстрого локального набора и ночных регрессионных прогонов.",
      "minutes": 13,
      "contentHtml": "<h2>1. Пирамида тестирования</h2>\r\n<p>Основание пирамиды — тысячи быстрых модульных тестов (доли секунды). Середина — интеграционные тесты сервисов. Вершина — несколько десятков сквозных функциональных тестов (FT/E2E). Этот баланс дает максимальную скорость и 100% уверенность в надежности системы.</p>\r\n<h2>2. Поздравляем с завершением книги!</h2>\r\n<p>Вы полностью освоили методологию TDD, от первого падающего теста до масштабируемой веб-архитектуры и непрерывной интеграции. Повинуйтесь Билли-тестировщику и пишите надежный код!</p>",
      "quiz": [
        {
          "question": "Какое соотношение тестов описывает классическая пирамида тестирования?",
          "options": [
            "Много быстрых модульных тестов в основании, меньше интеграционных тестов в середине и небольшое число сквозных E2E тестов на вершине.",
            "90% сквозных тестов Selenium и 10% модульных тестов.",
            "Исключительно ручное тестирование.",
            "Все тесты должны выполняться одинаковое количество времени."
          ],
          "correct": 0,
          "explanation": "Пирамида гарантирует быструю обратную связь: быстрые модульные тесты ловят ошибки за секунды, а верхушка E2E проверяет ключевые бизнес-пути."
        }
      ]
    }
  ]
};
