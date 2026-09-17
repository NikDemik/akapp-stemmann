"use client";

import Script from "next/script";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { reachGoal } from "@/components/yandex-metrika";

declare global {
  interface Window {
    onCaptchaSuccess?: (token: string) => void;
    smartCaptcha?: { reset: () => void };
  }
}

const captchaSiteKey = process.env.NEXT_PUBLIC_SMARTCAPTCHA_SITE_KEY;

export function RequestForm({ defaultType = "request", region }: { defaultType?: string; region?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  useEffect(() => {
    window.onCaptchaSuccess = setCaptchaToken;
    return () => { delete window.onCaptchaSuccess; };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (captchaSiteKey && !captchaToken) {
      setStatus("error");
      setMessage("Подтвердите, что вы не робот.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/send.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, captchaToken }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "Не удалось отправить заявку");
      form.reset();
      setCaptchaToken("");
      setStatus("success");
      setMessage("Заявка отправлена. Специалист свяжется с вами в рабочее время.");
      reachGoal("form_submit");
      window.smartCaptcha?.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Ошибка отправки. Позвоните нам или напишите на email.");
    }
  }

  return (
    <>
      {captchaSiteKey ? <Script src="https://smartcaptcha.yandexcloud.net/captcha.js" strategy="afterInteractive" /> : null}
      <form className="request-form" onSubmit={handleSubmit} noValidate>
        {region ? <input type="hidden" name="region" value={region} /> : null}
        <div className="form-row">
          <label>
            <span>Имя *</span>
            <input name="name" required minLength={2} autoComplete="name" placeholder="Как к вам обращаться" />
          </label>
          <label>
            <span>Компания</span>
            <input name="company" autoComplete="organization" placeholder="Название компании" />
          </label>
        </div>
        <div className="form-row">
          <label>
            <span>Телефон *</span>
            <input name="phone" required autoComplete="tel" type="tel" placeholder="+7 900 000-00-00" />
          </label>
          <label>
            <span>Email *</span>
            <input name="email" required autoComplete="email" type="email" placeholder="mail@company.ru" />
          </label>
        </div>
        <label>
          <span>Тип обращения</span>
          <select name="type" defaultValue={defaultType}>
            <option value="request">Обычная заявка</option>
            <option value="price">Запрос цены</option>
            <option value="analogue">Подбор аналога</option>
          </select>
        </label>
        <label>
          <span>Сообщение *</span>
          <textarea name="message" required minLength={10} rows={5} placeholder="Укажите серию, параметры линии и задачу" />
        </label>
        <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        {captchaSiteKey ? (
          <div className="smart-captcha" data-sitekey={captchaSiteKey} data-callback="onCaptchaSuccess" />
        ) : (
          <p className="form-config-note">SmartCaptcha будет активирована после добавления ключей.</p>
        )}
        <label className="consent-check">
          <input name="consent" type="checkbox" required />
          <span>
            Согласен с <Link href="/consent/">обработкой персональных данных</Link>
          </span>
        </label>
        <button className="button button-primary form-submit" type="submit" disabled={status === "loading"}>
          {status === "loading" ? <LoaderCircle className="spin" /> : <ArrowRight />}
          {status === "loading" ? "Отправляем" : "Отправить заявку"}
        </button>
        {message ? (
          <p className={`form-status is-${status}`} role="status">
            {status === "success" ? <CheckCircle2 /> : null}
            {message}
          </p>
        ) : null}
      </form>
    </>
  );
}
