# Деплой статического сайта на Beget

Проект собирается в обычные HTML-, CSS- и JavaScript-файлы. Node.js на Beget не нужен: на хостинг загружается только **содержимое** каталога `out`.

> Сайт статический, но форма обратной связи использует PHP-файл `api/send.php`. Для работы формы на Beget должен быть включён PHP.

## Что уже настроено

В `next.config.ts` включены:

- `output: 'export'` — статический экспорт в `out`;
- `trailingSlash: true` — страницы формируются как `путь/index.html`;
- `images.unoptimized: true` — изображения не требуют сервера Next.js.

`npm run build` дополнительно копирует `deploy/.htaccess` в `out/.htaccess`. Конфигурация задаёт страницу 404, HTTPS-редирект на `akapp-stemmann.su`, защитные заголовки, сжатие и кеширование.

## 1. Первичная настройка Beget

1. В панели Beget откройте **Сайты** и создайте сайт.
2. В разделе **Домены и поддомены** добавьте `akapp-stemmann.su` и прикрепите его к сайту.
3. Убедитесь, что домен направлен на каталог вида `akapp-stemmann.su/public_html`.
4. Если DNS обслуживается не в Beget, задайте у регистратора IP-адрес, показанный Beget, и дождитесь обновления DNS.
5. В разделе **Домены и поддомены → Управление SSL-сертификатами** закажите бесплатный Let's Encrypt.
6. В разделе **Сайты** включите актуальную версию PHP — она нужна только обработчику формы.

Beget создаёт для сайта каталог с подкаталогом `public_html`. Именно содержимое `public_html` доступно посетителям.

Текущий `.htaccess` всегда перенаправляет запросы на `https://akapp-stemmann.su`. Технический адрес вида `логин.bget.ru` поэтому не подходит для полноценного предпросмотра.

## 2. Переменные перед сборкой

Создайте локальный `.env.local` на основе `.env.example`:

```dotenv
NEXT_PUBLIC_SMARTCAPTCHA_SITE_KEY=публичный_ключ_капчи
NEXT_PUBLIC_YANDEX_METRIKA_ID=номер_счётчика
```

Эти значения встраиваются в клиентские файлы при сборке. После их изменения сайт нужно собрать и загрузить заново.

`YANDEX_SMARTCAPTCHA_SECRET` не помещайте в Git или архив. Секрет нужен PHP на сервере и должен быть доступен вызову `getenv('YANDEX_SMARTCAPTCHA_SECRET')` в `api/send.php`. Попросите поддержку Beget задать эту переменную для виртуального хоста. Если тариф или режим PHP этого не позволяет, секрет следует хранить в конфигурации вне `public_html` и подключать из PHP — для этого потребуется отдельное изменение обработчика.

Если секрет не задан, форма будет отправлять письма, но серверная проверка SmartCaptcha окажется отключена.

## 3. Проверка и сборка

На компьютере требуется Node.js 20.9 или новее. В корне проекта выполните:

```powershell
npm ci
npm run validate:data
npm run typecheck
npm run lint
npm run build
```

Успешная сборка заканчивается сообщением о добавлении `out/.htaccess`. Проверьте результат:

```powershell
Test-Path .\out\index.html
Test-Path .\out\404.html
Test-Path .\out\.htaccess
Test-Path .\out\robots.txt
Test-Path .\out\sitemap.xml
Test-Path .\out\api\send.php
```

Все команды должны вывести `True`.

Не загружайте на Beget репозиторий целиком, `.next`, `node_modules`, `.env.local` или `src`.

## 4. Подготовка ZIP-архива

```powershell
tar.exe -a -c -f .\akapp-stemmann-beget.zip -C .\out .
tar.exe -tf .\akapp-stemmann-beget.zip | Select-String -Pattern 'index.html|\.htaccess|api/send\.php'
```

Убедитесь, что в архив вошли `./.htaccess` и `./api/.htaccess`. Архив должен содержать **содержимое** `out`, а не папку `out`: после распаковки нужен путь `public_html/index.html`, а не `public_html/out/index.html`.

## 5. Публикация через файловый менеджер

1. В разделе **BackUp** создайте резервную копию. Дополнительно скачайте текущий `public_html` архивом.
2. В файловом менеджере загрузите ZIP рядом с `public_html`.
3. Распакуйте его во временный каталог `public_html_new`.
4. Проверьте, что внутри сразу находятся `index.html`, `.htaccess`, `_next`, `api`, `images` и остальные каталоги.
5. Переименуйте текущий `public_html` в `public_html_old`, затем `public_html_new` — в `public_html`.
6. Проверьте сайт по чек-листу ниже.
7. Не удаляйте `public_html_old`, пока новая версия не проверена.

Если из-за привязанного FTP-аккаунта каталог переименовать нельзя, сначала сохраните резервную копию, затем замените **содержимое** `public_html`. Не удаляйте сайт и не открепляйте домен в разделе **Сайты**.

## 6. Публикация по SFTP

1. Включите SSH/SFTP в Beget и получите параметры подключения.
2. В WinSCP или другом клиенте откройте `akapp-stemmann.su/public_html`.
3. Сохраните копию текущей версии.
4. Загрузите содержимое локального `out` с заменой файлов.
5. Включите показ скрытых файлов и проверьте `public_html/.htaccess` и `public_html/api/.htaccess`.

Копирование поверх старой версии не удаляет устаревшие страницы. После удаления или переименования маршрутов полностью заменяйте содержимое `public_html` либо используйте схему с `public_html_new`.

## 7. Проверка после публикации

Проверьте в приватном окне браузера:

- главная страница открывается по HTTPS без предупреждений;
- HTTP и вариант с `www`, если он настроен в DNS, перенаправляются на основной домен;
- открываются `/shinoprovody/`, `/festonnye-sistemy/` и `/kabelnye-barabany/`;
- открываются страница серии и региональная страница;
- изображения и стили загружаются без ошибок в DevTools → Network;
- скачивается PDF-каталог;
- доступны `/robots.txt` и `/sitemap.xml`;
- несуществующий адрес показывает страницу 404 и возвращает статус 404;
- тестовая заявка приходит на `zapros@trolleynyi-shinoprovod.ru`;
- в Метрике появляются визит и цели `form_submit`, `phone_click`, `email_click`, `catalog_download`.

Быстрая проверка статусов:

```powershell
curl.exe -I https://akapp-stemmann.su/
curl.exe -I https://akapp-stemmann.su/robots.txt
curl.exe -I https://akapp-stemmann.su/sitemap.xml
curl.exe -I https://akapp-stemmann.su/nesushchestvuyushchaya-stranitsa/
```

Ожидается `200` для первых трёх адресов и `404` для последнего.

## 8. Откат

1. Переименуйте проблемный `public_html` в `public_html_failed`.
2. Переименуйте `public_html_old` обратно в `public_html`.
3. Повторно проверьте главную страницу, форму и `.htaccess`.

Если старого каталога нет, восстановите файлы через **BackUp**. Перед восстановлением Beget рекомендует переименовать текущий `public_html`, чтобы не смешивать файлы разных версий.

## Частые ошибки

- **403 или список файлов:** `index.html` лежит не в корне; нужен `public_html/index.html`.
- **Внутренние страницы дают 404:** проверьте каталог страницы, например `public_html/about/index.html`. Из-за `trailingSlash: true` дополнительные rewrite-правила не нужны.
- **Нет редиректа или своей 404:** не загружен скрытый `public_html/.htaccess`.
- **Нет стилей:** отсутствует `public_html/_next` либо браузер показывает старый кеш.
- **Форма даёт 404 или PHP скачивается:** отсутствует `api/send.php` или для сайта не включён PHP.
- **Форма даёт 500 или письмо не приходит:** проверьте функцию `mail()`, адрес `noreply@akapp-stemmann.su`, секрет SmartCaptcha и папку «Спам»; передайте поддержке Beget время теста.
- **Технический домен ведёт на production:** это ожидаемый редирект текущего `.htaccess`.

## Официальная документация

- [Управление сайтами в Beget](https://beget.com/ru/kb/manual/sajty)
- [Домены, поддомены и SSL в Beget](https://beget.com/ru/kb/manual/domeny-i-poddomeny)
- [Файловый менеджер Beget](https://beget.com/ru/kb/manual/fajlovyj-menedzher)
- [Резервные копии Beget](https://beget.com/ru/kb/manual/backup)
- [Статический экспорт Next.js](https://nextjs.org/docs/app/guides/static-exports)
