"use client";

import { useEffect, useRef } from "react";

const MAP_CONSTRUCTOR_URL =
  "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Afe902e78548fabd57dff216a1ab92cb224bed13007e9c123bc1f0956dbcfbf04&width=1200&height=600&lang=ru_RU&scroll=true";

export function YandexMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    script.src = MAP_CONSTRUCTOR_URL;
    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return <div ref={containerRef} className="yandex-map" aria-label="Карта проезда" />;
}
