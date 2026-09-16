import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { SeriesCard } from "@/components/series-card";
import { categories, getCategory, getSeriesByCategory } from "@/lib/catalog";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name} AKAPP-STEMMANN`,
    description: category.description,
    alternates: { canonical: `/${category.slug}/` },
    openGraph: { title: `${category.name} AKAPP-STEMMANN`, description: category.description, type: "website" },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = getSeriesByCategory(slug);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://akapp-stemmann.su/" },
      { "@type": "ListItem", position: 2, name: category.name, item: `https://akapp-stemmann.su/${category.slug}/` },
    ],
  };

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><span>{category.name}</span></nav>
          <p className="eyebrow">Категория {category.number}</p>
          <h1>{category.shortName}</h1>
          <div className="page-hero-summary"><p>{category.description}</p><strong>{category.range}</strong></div>
        </div>
      </section>
      <section className="section catalog-section">
        <div className="shell">
          <div className="section-heading compact"><div><p className="eyebrow">Серии оборудования</p><h2>Выберите решение</h2></div><p>{items.length} серий с характеристиками и каталогами производителя.</p></div>
          <div className="series-grid">{items.map((item, index) => <SeriesCard key={item.slug} item={item} index={index} />)}</div>
        </div>
      </section>
      <section className="inline-cta"><div className="shell"><div><p className="eyebrow">Нужна помощь с выбором?</p><h2>Подберём систему под вашу задачу</h2></div><Link className="button button-primary" href="/#request">Отправить параметры <ArrowRight /></Link></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
