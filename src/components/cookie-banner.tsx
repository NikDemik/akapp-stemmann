"use client";

import Link from "next/link";
import { saveCookieConsent, useCookieConsent } from "@/lib/cookie-consent";

export function CookieBanner() {
  const consent = useCookieConsent();

  if (consent !== null) return null;

  return (
    <aside className="cookie-banner" aria-label="Настройки файлов cookie">
      <div className="cookie-banner-copy">
        <strong>Мы используем файлы cookie</strong>
        <p>
          Они помогают анализировать работу сайта и делать его удобнее. Подробнее — в нашей{" "}
          <Link href="/privacy/">политике конфиденциальности</Link>.
        </p>
      </div>
      <div className="cookie-banner-actions">
        <button className="cookie-button cookie-button-secondary" type="button" onClick={() => saveCookieConsent("rejected")}>
          Только необходимые
        </button>
        <button className="cookie-button cookie-button-primary" type="button" onClick={() => saveCookieConsent("accepted")}>
          Принять
        </button>
      </div>
    </aside>
  );
}
