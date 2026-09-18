const MOSCOW_OFFSET_MS = 3 * 60 * 60 * 1000;

export function getStockPublicationDate(referenceDate = new Date()) {
  const moscowDate = new Date(referenceDate.getTime() + MOSCOW_OFFSET_MS);
  const daysSinceMonday = (moscowDate.getUTCDay() + 6) % 7;
  moscowDate.setUTCDate(moscowDate.getUTCDate() - daysSinceMonday);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(moscowDate);
}