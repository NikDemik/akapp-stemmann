import Link from "next/link";
import { CurrentYear } from "@/components/current-year";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>Системы электропитания подвижного промышленного оборудования.</p>
        </div>
        <div className="footer-column">
          <h2>Продукция</h2>
          <Link href="/shinoprovody/">Шинопроводы</Link>
          <Link href="/festonnye-sistemy/">Фестонные системы</Link>
          <Link href="/kabelnye-barabany/">Кабельные барабаны</Link>
          <Link href="/catalogs/">Каталоги</Link>
        </div>
        <div className="footer-column">
          <h2>Компания</h2>
          <Link href="/about/">О компании</Link>
          <Link href="/delivery/">Доставка</Link>
          <Link href="/regions/">Регионы поставки</Link>
          <Link href="/contacts/">Контакты</Link>
        </div>
        <div className="footer-column footer-contacts">
          <h2>Связаться</h2>
          <a href="tel:+74993229390">+7 (499) 322-93-90</a>
          <a href="mailto:zapros@trolleynyi-shinoprovod.ru">zapros@trolleynyi-shinoprovod.ru</a>
          <span>Поставки по всей России</span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© <CurrentYear /> ООО Альпарк</span>
        <div>
          <Link href="/privacy/">Политика конфиденциальности</Link>
          <Link href="/consent/">Согласие на обработку данных</Link>
          <a href="https://b2b-studio.ru/" target="_blank" rel="noreferrer">Разработка сайта — B2B Studio</a>
        </div>
      </div>
    </footer>
  );
}
