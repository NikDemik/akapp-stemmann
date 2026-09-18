import type { Metadata } from "next";
import { CompanyRequisites } from "@/components/company-requisites";
import { InfoHero } from "@/components/info-hero";
import { YandexMap } from "@/components/yandex-map";

export const metadata: Metadata = {
  title: "О компании",
  description: "Наименование, адрес, телефон и электронная почта ООО «Альпарк».",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <InfoHero eyebrow="О компании" title="О компании" lead="Контактная информация компании." />
      <section className="section requisites-section">
        <div className="shell">
          <CompanyRequisites compact />
        </div>
      </section>
      <section className="section map-section">
        <div className="shell">
          <div className="map-heading">
            <p className="eyebrow">Как нас найти</p>
            <h2>Карта</h2>
          </div>
          <YandexMap />
        </div>
      </section>
    </>
  );
}
