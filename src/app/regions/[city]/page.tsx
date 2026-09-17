import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Boxes, Cable, Check, MapPin, Route, Settings2 } from "lucide-react";
import { RequestForm } from "@/components/request-form";
import { categories } from "@/lib/catalog";
import { getRegion, getRegionHref, regions } from "@/lib/regions";

type Props = { params: Promise<{ city: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((region) => ({ city: region.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const region = getRegion(city);
  if (!region) return {};
  const title = `Купить AKAPP-STEMMANN в ${region.namePrepositional} — цена и поставка`;
  const description = `Оборудование AKAPP-STEMMANN в ${region.namePrepositional}: шинопроводы, фестонные системы и кабельные барабаны. Подбор, расчёт цены и доставка в ${region.nameAccusative} и по региону.`;

  return {
    title,
    description,
    keywords: [
      `купить AKAPP в ${region.namePrepositional}`,
      `AKAPP-STEMMANN ${region.name}`,
      `шинопровод ${region.name}`,
      `троллейный токоподвод ${region.name}`,
      `кабельный барабан ${region.name}`,
    ],
    alternates: { canonical: `/regions/${region.slug}/` },
    openGraph: { title, description, type: "website", locale: "ru_RU", url: `/regions/${region.slug}/` },
  };
}

export default async function RegionPage({ params }: Props) {
  const { city } = await params;
  const region = getRegion(city);
  if (!region) notFound();

  const canonicalUrl = `https://akapp-stemmann.su${getRegionHref(region)}`;
  const faq = [
    {
      q: `Как купить оборудование AKAPP-STEMMANN в ${region.namePrepositional}?`,
      a: "Отправьте параметры линии или спецификацию через форму. Специалист проверит конфигурацию, составит комплект и подготовит коммерческое предложение.",
    },
    {
      q: `Как рассчитывается доставка в ${region.nameAccusative}?`,
      a: "Стоимость и срок зависят от состава заказа, длины профилей, массы, выбранного перевозчика и адреса разгрузки. Расчёт выполняется для конкретной заявки.",
    },
    {
      q: "Можно ли заказать отдельные комплектующие?",
      a: "Да. Доступна поставка токосъёмников, секций шинопровода, соединителей, подвесов, вводов питания, кабельных тележек и других компонентов.",
    },
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Поставка оборудования AKAPP-STEMMANN в ${region.nameAccusative}`,
    serviceType: "Подбор и поставка систем электропитания подвижного оборудования",
    provider: { "@type": "Organization", name: "AKAPP-STEMMANN", url: "https://akapp-stemmann.su/" },
    areaServed: [
      { "@type": "City", name: region.name },
      { "@type": "AdministrativeArea", name: region.regionName },
    ],
    url: canonicalUrl,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://akapp-stemmann.su/" },
      { "@type": "ListItem", position: 2, name: "Регионы поставки", item: "https://akapp-stemmann.su/regions/" },
      { "@type": "ListItem", position: 3, name: region.name, item: canonicalUrl },
    ],
  };
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question", name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <section className="page-hero region-hero">
        <div className="blueprint-grid" aria-hidden="true" />
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link><span>/</span><Link href="/regions/">Регионы</Link><span>/</span><span>{region.name}</span>
          </nav>
          <p className="eyebrow"><MapPin /> {region.federalDistrict}</p>
          <h1>Оборудование <span>AKAPP-STEMMANN</span><br />в {region.namePrepositional}</h1>
          <div className="page-hero-summary">
            <p>Поставка шинопроводов, фестонных систем и кабельных барабанов для промышленных предприятий. Подберём оборудование, рассчитаем комплект и логистику в {region.nameAccusative}.</p>
            <Link className="button button-primary" href="#region-request">Получить предложение <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="section region-products-section">
        <div className="shell">
          <div className="section-heading compact">
            <div><p className="eyebrow"><b>01</b> Продукция</p><h2>Купить AKAPP<br />для вашего проекта</h2></div>
            <p>Подбираем не отдельную позицию, а совместимый комплект системы: от токоподвода и токосъёмников до подвесов, соединителей и вводов питания.</p>
          </div>
          <div className="region-product-grid">
            {categories.map((category, index) => {
              const Icon = index === 0 ? Cable : index === 1 ? Boxes : Settings2;
              return (
                <article key={category.slug}>
                  <Icon aria-hidden="true" />
                  <span className="mono-label">{category.range}</span>
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                  <Link href={`/${category.slug}/`}>Модели и характеристики <ArrowRight /></Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section section-light region-context-section">
        <div className="shell region-context-grid">
          <div>
            <p className="eyebrow"><b>02</b> Региональная специфика</p>
            <h2>Решения для региона: {region.regionName}</h2>
            <p>{region.marketText}</p>
            <ul>{region.industries.map((industry) => <li key={industry}><Check />{industry}</li>)}</ul>
          </div>
          <aside>
            <Route aria-hidden="true" />
            <p className="eyebrow">Логистика</p>
            <h2>Доставка в {region.nameAccusative}</h2>
            <p>{region.deliveryText}</p>
            <div className="nearby-cities"><span>Также поставляем:</span><p>{region.nearby.join(" · ")}</p></div>
            <Link href="/delivery/">Подробнее о доставке <ArrowRight /></Link>
          </aside>
        </div>
      </section>

      <section className="section region-steps-section">
        <div className="shell">
          <div className="section-heading compact">
            <div><p className="eyebrow"><b>03</b> Порядок работы</p><h2>От задачи<br />до поставки</h2></div>
            <p>Инженерная проверка параметров помогает согласовать совместимость компонентов до формирования заказа.</p>
          </div>
          <div className="engineering-grid">
            {[
              ["01", "Исходные данные", "Получаем параметры оборудования, трассы, тока, скорости и режима работы."],
              ["02", "Подбор", "Определяем подходящую серию и проверяем электрические и механические характеристики."],
              ["03", "Предложение", "Формируем спецификацию, цену, условия оплаты и расчёт доставки."],
              ["04", "Отгрузка", `Комплектуем заказ и передаём перевозчику для доставки в ${region.nameAccusative}.`],
            ].map(([number, title, text]) => (
              <article key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light faq-section">
        <div className="shell faq-layout">
          <div className="faq-intro">
            <p className="eyebrow"><b>04</b> Вопросы</p>
            <h2>Поставка AKAPP в {region.nameAccusative}</h2>
            <p>Ответы на основные вопросы о подборе, комплектации и доставке оборудования в регион.</p>
          </div>
          <div className="faq-list">
            {faq.map((item, index) => (
              <details key={item.q} open={index === 0}>
                <summary><span>0{index + 1}</span>{item.q}<b>+</b></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="request-section" id="region-request">
        <div className="blueprint-grid" aria-hidden="true" />
        <div className="shell request-layout">
          <div className="request-copy">
            <p className="eyebrow"><b>05</b> Заявка</p>
            <h2>Рассчитать поставку<br />в {region.nameAccusative}</h2>
            <p>Укажите серию оборудования или опишите задачу. Подготовим спецификацию и предложение с учётом региона доставки.</p>
            <div className="direct-contacts">
              <span className="mono-label">Прямая связь</span>
              <a href="tel:+74993229390">+7 (499) 322-93-90</a>
              <a href="mailto:zapros@trolleynyi-shinoprovod.ru">zapros@trolleynyi-shinoprovod.ru</a>
            </div>
          </div>
          <div className="request-card">
            <span className="form-badge">RFQ · {region.name}</span>
            <RequestForm defaultType="price" region={region.name} />
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </>
  );
}
