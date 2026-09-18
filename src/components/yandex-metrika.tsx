"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useCookieConsent } from "@/lib/cookie-consent";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

const counterId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || 0);

export function reachGoal(goal: string) {
  if (counterId && window.ym) window.ym(counterId, "reachGoal", goal);
}

export function YandexMetrika() {
  const consent = useCookieConsent();

  useEffect(() => {
    if (!counterId || consent !== "accepted") return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      const href = link?.getAttribute("href") || "";
      if (href.startsWith("tel:")) reachGoal("phone_click");
      else if (href.startsWith("mailto:")) reachGoal("email_click");
      else if (href.toLowerCase().endsWith(".pdf")) reachGoal("catalog_download");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  if (!counterId || consent !== "accepted") return null;
  return <Script id="yandex-metrika" strategy="afterInteractive">{`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${counterId},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}</Script>;
}
