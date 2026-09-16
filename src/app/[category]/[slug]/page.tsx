import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { RequestForm } from "@/components/request-form";
import { categories, getCategory, getSeries, series } from "@/lib/catalog";

type Props = { params: Promise<{ category: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return series.map((item) => ({ category: item.category, slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = await params;
  const item = getSeries(route.category, route.slug);
  if (!item) return {};
  return {
    title: `${item.name} — ${item.subtitle}`,
    description: item.description,
    alternates: { canonical: `/${item.category}/${item.slug}/` },
    openGraph: { title: `${item.name} AKAPP-STEMMANN`, description: item.description, images: [item.image], type: "website" },
  };
}

export default async function SeriesPage({ params }: Props) {
  const route = await params;
  const item = getSeries(route.category, route.slug);
  const category = getCategory(route.category);
  if (!item || !category || !categories.some((entry) => entry.slug === route.category)) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${item.name} AKAPP-STEMMANN`,
    description: item.description,
    image: `https://akapp-stemmann.su${item.image}`,
    brand: { "@type": "Brand", name: "AKAPP-STEMMANN" },
    category: category.name,
    url: `https://akapp-stemmann.su/${item.category}/${item.slug}/`,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://akapp-stemmann.su/" },
      { "@type": "ListItem", position: 2, name: category.name, item: `https://akapp-stemmann.su/${category.slug}/` },
      { "@type": "ListItem", position: 3, name: item.name, item: `https://akapp-stemmann.su/${item.category}/${item.slug}/` },
    ],
  };

  return (
    <>
      <section className="series-hero">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><Link href={`/${category.slug}/`}>{category.name}</Link><span>/</span><span>{item.name}</span></nav>
          <div className="series-hero-grid">
            <div className="series-hero-copy"><p className="eyebrow">AKAPP-STEMMANN · {category.name}</p><h1>{item.name}</h1><p className="series-subtitle">{item.subtitle}</p><p>{item.description}</p><div className="hero-actions"><Link className="button button-primary" href="#request-series">Запросить цену <ArrowRight /></Link><a className="button button-ghost" href={item.catalog} target="_blank" rel="noreferrer">Каталог PDF <ArrowDownToLine /></a></div></div>
            <div className="series-hero-image"><Image src={item.image} alt={`Оборудование и каталог ${item.name}`} fill priority sizes="(max-width: 900px) 100vw, 45vw" /><span>{item.range}</span></div>
          </div>
        </div>
      </section>
      <section className="section specs-section"><div className="shell two-column-title"><div><p className="eyebrow">Технические данные</p><h2>Основные характеристики</h2></div><dl className="spec-list">{item.specs.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl></div></section>
      <section className="section models-section"><div className="shell"><div className="section-heading compact"><div><p className="eyebrow">Исполнения</p><h2>Модификации серии</h2></div><p>Финальная конфигурация определяется после проверки параметров линии инженером.</p></div><div className="table-wrap"><table><thead><tr><th>Модель</th><th>Диапазон / исполнение</th><th>Применение</th></tr></thead><tbody>{item.models.map((model) => <tr key={model.model}><td><Check />{model.model}</td><td>{model.current}</td><td>{model.application}</td></tr>)}</tbody></table></div><p className="data-note">Характеристики извлечены из каталогов производителя и подлежат проверке разработчиком перед публикацией коммерческого предложения.</p></div></section>
      <section className="request-section" id="request-series"><div className="shell request-layout"><div className="request-copy"><p className="eyebrow">Расчёт проекта</p><h2>Запросить цену на {item.name}</h2><p>Опишите задачу и параметры трассы. Мы уточним исполнение, состав комплекта и срок поставки.</p><a href={item.catalog} target="_blank" rel="noreferrer">Скачать каталог серии <ArrowDownToLine /></a></div><div className="request-card"><RequestForm defaultType="price" /></div></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
