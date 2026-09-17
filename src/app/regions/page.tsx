import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Truck } from "lucide-react";
import { InfoHero } from "@/components/info-hero";
import { getRegionHref, regions } from "@/lib/regions";

export const metadata: Metadata = {
  title: "Поставка AKAPP-STEMMANN по городам России",
  description:
    "Региональные поставки шинопроводов, фестонных систем и кабельных барабанов AKAPP-STEMMANN. Подбор оборудования и расчёт доставки по России.",
  alternates: { canonical: "/regions/" },
};

export default function RegionsPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://akapp-stemmann.su/" },
      { "@type": "ListItem", position: 2, name: "Регионы поставки", item: "https://akapp-stemmann.su/regions/" },
    ],
  };

  return (
    <>
      <InfoHero
        eyebrow="География поставок"
        title="AKAPP-STEMMANN в регионах России"
        lead="Подбираем системы токоподвода и организуем доставку промышленного оборудования до терминала или адреса предприятия."
      />
      <section className="section region-directory-section">
        <div className="shell">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow"><b>01</b> Города</p>
              <h2>Условия поставки<br />по регионам</h2>
            </div>
            <p>На странице каждого города собраны направления продукции, особенности подбора и порядок расчёта доставки.</p>
          </div>
          <div className="region-directory">
            {regions.map((region, index) => (
              <Link href={getRegionHref(region)} key={region.slug}>
                <span className="region-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{region.name}</strong>
                  <small>{region.regionName}</small>
                </div>
                <MapPin aria-hidden="true" />
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="inline-cta">
        <div className="shell">
          <div><p className="eyebrow">Вашего города нет в списке?</p><h2>Поставляем оборудование по всей России</h2></div>
          <Link className="button button-primary" href="/#request">Рассчитать доставку <Truck /></Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
