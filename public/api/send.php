<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Метод не поддерживается'], JSON_UNESCAPED_UNICODE);
    exit;
}

function respond(int $status, string $message): never {
    http_response_code($status);
    echo json_encode(['ok' => $status < 400, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function clean(string $value, int $max = 2000): string {
    $value = trim(strip_tags($value));
    return mb_substr($value, 0, $max, 'UTF-8');
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) respond(400, 'Некорректный формат запроса');

if (!empty($data['website'])) respond(200, 'Заявка отправлена');

$rateFile = sys_get_temp_dir() . '/akapp_form_' . hash('sha256', (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
$lastRequest = is_file($rateFile) ? (int)file_get_contents($rateFile) : 0;
if ($lastRequest > time() - 30) respond(429, 'Повторите отправку через несколько секунд');

$name = clean((string)($data['name'] ?? ''), 100);
$company = clean((string)($data['company'] ?? ''), 150);
$phone = clean((string)($data['phone'] ?? ''), 60);
$email = filter_var(trim((string)($data['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$message = clean((string)($data['message'] ?? ''), 4000);
$type = clean((string)($data['type'] ?? 'request'), 30);
$consent = (string)($data['consent'] ?? '');

if (mb_strlen($name) < 2 || mb_strlen($phone) < 6 || !$email || mb_strlen($message) < 10 || $consent === '') {
    respond(422, 'Проверьте обязательные поля формы');
}

$captchaSecret = getenv('YANDEX_SMARTCAPTCHA_SECRET') ?: '';
$captchaToken = (string)($data['captchaToken'] ?? '');
if ($captchaSecret !== '') {
    if ($captchaToken === '') respond(422, 'Подтвердите, что вы не робот');
    $payload = http_build_query([
        'secret' => $captchaSecret,
        'token' => $captchaToken,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);
    $context = stream_context_create(['http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => $payload,
        'timeout' => 8,
        'ignore_errors' => true,
    ]]);
    $captchaResponse = @file_get_contents('https://smartcaptcha.yandexcloud.net/validate', false, $context);
    $captcha = json_decode($captchaResponse ?: '', true);
    if (!is_array($captcha) || ($captcha['status'] ?? '') !== 'ok') respond(422, 'Проверка CAPTCHA не пройдена');
}

$typeNames = [
    'request' => 'Обычная заявка',
    'price' => 'Запрос цены',
    'analogue' => 'Подбор аналога',
];
$typeLabel = $typeNames[$type] ?? 'Заявка с сайта';
$recipient = 'zapros@trolleynyi-shinoprovod.ru';
$subject = '=?UTF-8?B?' . base64_encode($typeLabel . ' — akapp-stemmann.su') . '?=';
$body = "Тип: {$typeLabel}\nИмя: {$name}\nКомпания: {$company}\nТелефон: {$phone}\nEmail: {$email}\n\nСообщение:\n{$message}\n\nИсточник: akapp-stemmann.su";
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: AKAPP-STEMMANN <noreply@akapp-stemmann.su>',
    'Reply-To: ' . $email,
];

if (!mail($recipient, $subject, $body, implode("\r\n", $headers))) {
    respond(500, 'Не удалось отправить заявку. Напишите нам на email.');
}

@file_put_contents($rateFile, (string)time(), LOCK_EX);

respond(200, 'Заявка отправлена');
