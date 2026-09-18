"use client";

import { CalendarClock } from "lucide-react";
import { useSyncExternalStore } from "react";
import { getStockPublicationDate } from "@/lib/stock-date";

const CHECK_INTERVAL_MS = 60 * 60 * 1000;

function subscribeToDate(onStoreChange: () => void) {
  const timer = window.setInterval(onStoreChange, CHECK_INTERVAL_MS);
  return () => window.clearInterval(timer);
}

function getClientSnapshot() {
  return getStockPublicationDate();
}

export function StockPublicationDate({ initialDate }: { initialDate: string }) {
  const publicationDate = useSyncExternalStore(
    subscribeToDate,
    getClientSnapshot,
    () => initialDate,
  );

  return (
    <div className="stock-publication-date">
      <CalendarClock aria-hidden="true" />
      <div>
        <span>Дата публикации остатков</span>
        <strong>{publicationDate}</strong>
      </div>
      <p>Дата меняется автоматически в начале каждой недели. Количество подтверждается при запросе.</p>
    </div>
  );
}