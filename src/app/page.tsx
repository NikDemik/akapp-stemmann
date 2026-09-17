import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Cable,
  CircleGauge,
  Clock3,
  DraftingCompass,
  Factory,
  FileCheck2,
  Headphones,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { ProductTabs } from "@/components/product-tabs";
import { RequestForm } from "@/components/request-form";
import { categories, series } from "@/lib/catalog";

const faqs = [
  {
    q: "Какие данные нужны для подбора шинопровода?",
    a: "Тип оборудования, длина и конфигурация трассы, номинальный и пусковой ток, количество полюсов, скорость движения, режим работы и условия окружающей среды.",
  },
  {
    q: "Можно ли подобрать замену существующей системе?",
    a: "Да. Укажите производителя и серию установленного оборудования, приложите обозначение или запросите опросный лист по email. Мы сопоставим электрические и механические параметры.",
  },
  {
    q: "Поставляются ли отдельные комплектующие?",
    a: "Да, возможна поставка секций, токосъёмников, соединителей, подвесов, вводов питания, кабельных тележек и других компонентов системы.",
  },
  {
    q: "В какие регионы выполняется доставка?",
    a: "Оборудование поставляется по всей России через транспортные компании. Срок и стоимость рассчитываются для конкретного состава заказа и города назначения.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="blueprint-grid" aria-hidden="true" />
        <div className="shell hero-layout">
          <div className="hero-copy">
            <p className="status-chip"><span /> Поставка по всей России</p>
            <h1>
              Энергия<br />
              <span>в движении.</span>
            </h1>
            <p className="hero-lead">
              Шинопроводы, фестонные системы и кабельные барабаны <strong>AKAPP-STEMMANN</strong> для кранов,
              конвейеров и промышленной автоматизации.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="#request">
                Получить предложение <ArrowRight />
              </Link>
              <Link className="button button-outline" href="#products">
                Выбрать систему <ArrowDown />
              </Link>
            </div>
          </div>
          <div className="hero-visual" aria-label="Каталог шинопроводов AKAPP-STEMMANN">
            <div className="hero-visual-frame">
              <Image
                src="/images/products/Multiconductor/AKAPP-STEMMANN-trollejnij-tokoprovod-Multiconductor.jpg"
                alt="Каталог закрытого шинопровода Multiconductor"
                fill
                priority
                sizes="(max-width: 900px) 90vw, 44vw"
              />
            </div>
            <div className="hero-data data-a">
              <span>Диапазон</span>
              <strong>35–2200 A</strong>
            </div>
            <div className="hero-data data-b">
              <span>Системы</span>
              <strong>15 серий</strong>
            </div>
            <div className="hero-axis axis-x" />
            <div className="hero-axis axis-y" />
          </div>
        </div>
        <div className="shell hero-foot">
          <span className="mono-label">AKAPP / WABTEC NETHERLANDS</span>
          <div>
            {categories.map((category) => (
              <span key={category.slug}>{category.name}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="stat-band" aria-label="Ключевые характеристики">
        <div className="shell stats-grid">
          <div><strong>35–2200</strong><span>А · диапазон токов</span></div>
          <div><strong>3</strong><span>направления продукции</span></div>
          <div><strong>до IP66</strong><span>защита оборудования</span></div>
          <div><strong>Россия</strong><span>география поставок</span></div>
        </div>
      </section>

      <section className="section section-light" id="products">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><b>01</b> Продукция</p>
              <h2>Система под задачу,<br />а не наоборот</h2>
            </div>
            <p>
              Подбираем конфигурацию по электрическим параметрам, длине трассы, скорости, режиму работы и условиям эксплуатации.
            </p>
          </div>
          <ProductTabs />
        </div>
      </section>

      <section className="section engineering-section">
        <div className="shell">
          <div className="section-heading section-heading-dark">
            <div>
              <p className="eyebrow"><b>02</b> Инженерный подход</p>
              <h2>От исходных данных<br />до готовой линии</h2>
            </div>
            <p>Сопровождаем проект на этапах подбора, комплектации и поставки.</p>
          </div>
          <div className="engineering-grid">
            {[
              { icon: DraftingCompass, title: "Подбор", text: "Проверяем ток, полюсность, длину линии, скорость и условия среды." },
              { icon: FileCheck2, title: "Спецификация", text: "Формируем комплект системы и перечень необходимых компонентов." },
              { icon: Wrench, title: "Совместимость", text: "Подбираем аналог и учитываем существующие крепления и трассу." },
              { icon: Truck, title: "Поставка", text: "Организуем доставку оборудования и документации по России." },
            ].map((item, index) => (
              <article key={item.title}>
                <span className="step-number">0{index + 1}</span>
                <item.icon />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light applications-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><b>03</b> Применение</p>
              <h2>Для непрерывных<br />производственных процессов</h2>
            </div>
            <p>Оборудование для передачи энергии подвижным машинам в промышленности, логистике и грузоподъёмной технике.</p>
          </div>
          <div className="application-list">
            {[
              { icon: Factory, title: "Мостовые и козловые краны", fact: "Токоподвод силовых и управляющих цепей" },
              { icon: Cable, title: "Конвейеры и технологические линии", fact: "Непрерывная передача энергии в движении" },
              { icon: CircleGauge, title: "Автоматизированные склады", fact: "Высокие скорости и точное позиционирование" },
              { icon: Zap, title: "Портовое оборудование", fact: "Тяжёлые режимы и большие токовые нагрузки" },
            ].map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <div className="application-icon"><item.icon /></div>
                <h3>{item.title}</h3>
                <p>{item.fact}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section support-section">
        <div className="shell support-layout">
          <div>
            <p className="eyebrow"><b>04</b> Документация</p>
            <h2>Технические данные<br />для проектирования</h2>
            <p className="support-lead">
              Каталоги содержат размеры, варианты исполнения, таблицы подбора и перечни комплектующих.
            </p>
            <Link className="button button-outline" href="/catalogs/">
              Открыть каталоги <BookOpenText />
            </Link>
          </div>
          <div className="support-cards">
            {[
              { icon: BadgeCheck, title: "Проверенные характеристики", text: `${series.length} серий в структурированном каталоге` },
              { icon: ShieldCheck, title: "Оригинальная документация", text: "PDF-каталоги AKAPP-STEMMANN и Wabtec Netherlands" },
              { icon: Headphones, title: "Помощь специалиста", text: "Опросный лист и консультация по запросу" },
              { icon: Clock3, title: "Быстрый ответ", text: "Запрос сразу поступает ответственному специалисту" },
            ].map((item) => (
              <article key={item.title}>
                <item.icon />
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light faq-section">
        <div className="shell faq-layout">
          <div className="faq-intro">
            <p className="eyebrow"><b>05</b> Частые вопросы</p>
            <h2>Перед отправкой запроса</h2>
            <p>Если исходных данных пока недостаточно, специалист поможет их собрать.</p>
            <Link className="text-link" href="#request">Задать вопрос <ArrowRight /></Link>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <details key={item.q} open={index === 0}>
                <summary><span>0{index + 1}</span>{item.q}<b>+</b></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="request-section" id="request">
        <div className="blueprint-grid" aria-hidden="true" />
        <div className="shell request-layout">
          <div className="request-copy">
            <p className="eyebrow"><b>06</b> Заявка</p>
            <h2>Получите подбор<br />и предложение</h2>
            <p>Опишите задачу в свободной форме. Если потребуется, мы отправим опросный лист на email.</p>
            <div className="direct-contacts">
              <span className="mono-label">Прямая связь</span>
              <a href="tel:+74993229390">+7 (499) 322-93-90</a>
              <a href="mailto:zapros@trolleynyi-shinoprovod.ru">zapros@trolleynyi-shinoprovod.ru</a>
            </div>
          </div>
          <div className="request-card">
            <span className="form-badge">RFQ · REQUEST FOR QUOTATION</span>
            <RequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
