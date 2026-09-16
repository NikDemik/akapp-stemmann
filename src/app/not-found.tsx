import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <section className="not-found"><div><p className="eyebrow">Ошибка 404</p><h1>Страница не найдена</h1><p>Возможно, адрес изменился. Вернитесь на главную или перейдите в каталог продукции.</p><Link className="button button-primary" href="/"><ArrowLeft /> На главную</Link></div></section>;
}
