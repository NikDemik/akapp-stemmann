# akapp-stemmann.su

Статический каталог оборудования AKAPP-STEMMANN: шинопроводы, фестонные системы и кабельные барабаны. Проект построен на Next.js, TypeScript и Tailwind CSS, не использует CMS или базу данных и публикуется на обычном хостинге Beget.

## Локальный запуск

Требуется Node.js 20.9 или новее.

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:3000`.

## Контроль перед публикацией

```bash
npm run validate:data
npm run typecheck
npm run lint
npm run build
```

Команда `npm run build` создаёт готовую к загрузке папку `out` и добавляет в неё конфигурацию Apache для Beget.

## Как обновить каталог

1. Откройте `src/data/categories.json` для изменения категорий или `src/data/series.json` для изменения серий.
2. Не меняйте существующие `slug` без необходимости: они формируют адреса страниц.
3. Изображение положите в `public/images/catalogs`, PDF — в `public/catalogs`.
4. В JSON указывайте пути от корня сайта, например `/images/catalogs/file.jpg`.
5. Запустите четыре команды контроля из предыдущего раздела.
6. Просмотрите изменённые страницы локально и только затем публикуйте содержимое `out`.

Структура серии:

```json
{
  "slug": "series-name",
  "category": "shinoprovody",
  "name": "Название",
  "subtitle": "Краткое назначение",
  "range": "Диапазон",
  "description": "Описание серии",
  "image": "/images/catalogs/image.jpg",
  "catalog": "/catalogs/catalog.pdf",
  "specs": [{ "label": "Параметр", "value": "Значение" }],
  "models": [{ "model": "Модель", "current": "Исполнение", "application": "Применение" }]
}
```

## SmartCaptcha, Метрика и формы

Скопируйте `.env.example` в `.env.local` и задайте публичный ключ `NEXT_PUBLIC_SMARTCAPTCHA_SITE_KEY` до сборки. Серверный секрет `YANDEX_SMARTCAPTCHA_SECRET` должен быть доступен PHP через переменную окружения Beget и не должен попадать в Git.

Обработчик находится в `public/api/send.php`. Получатель заявок: `zapros@trolleynyi-shinoprovod.ru`. До запуска необходимо проверить поддержку `mail()` и доставку тестового письма с production-домена.

Номер счётчика задаётся в `NEXT_PUBLIC_YANDEX_METRIKA_ID` до сборки. В коде подготовлены цели `form_submit`, `phone_click`, `email_click` и `catalog_download`; цели с такими именами нужно создать в интерфейсе Метрики.

## Деплой на Beget

1. Сделайте резервную копию текущего `public_html` и настроек домена.
2. Выполните `npm ci && npm run build`.
3. Очистите каталог домена только после проверки резервной копии.
4. Загрузите **содержимое** папки `out` в корень домена (`public_html`), включая скрытый `.htaccess` и папку `api`.
5. Проверьте главную, три категории, одну страницу серии, PDF, форму, `/robots.txt`, `/sitemap.xml` и ответ 404.
6. Добавьте Sitemap в Яндекс Вебмастер и отправьте основные URL на переобход.

Откат: вернуть сохранённую копию прежнего `public_html` и прежний `.htaccess`.

## Структура проекта

- `src/app` — страницы и SEO-маршруты;
- `src/components` — общие компоненты;
- `src/data` — изменяемые JSON-данные;
- `public/catalogs` — PDF-каталоги;
- `public/images/catalogs` — изображения серий;
- `public/api/send.php` — обработчик заявок;
- `docs/PROJECT_PLAN.md` — план;
- `docs/DEVELOPMENT_LOG.md` — журнал и шаблоны записей.
