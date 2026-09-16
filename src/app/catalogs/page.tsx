import type { Metadata } from "next";
import { ArrowDownToLine, FileText } from "lucide-react";
import { InfoHero } from "@/components/info-hero";

export const metadata: Metadata = { title: "Каталоги оборудования", description: "Каталоги и техническая документация AKAPP-STEMMANN в PDF.", alternates: { canonical: "/catalogs/" } };

const groups = [
  { title: "Шинопроводы", documents: [
    ["Multiconductor", "/catalogs/Katalog-Zakrytyj-trollejnyj-tokopodvod-Multiconductor-Akapp-Stemmann.pdf"],
    ["Pro-Ductor", "/catalogs/Katalog-Universalnyj-tokopodvod-ProDuctor-Akapp-Stemmann.pdf"],
    ["4-Ductor", "/catalogs/Katalog-Zakrytyj-trollejnyj-tokopodvod-4Ductor-Akapp-Stemmann.pdf"],
    ["Click-Ductor", "/catalogs/Katalog-Tokopodvod-Click-Ductor-Akapp-Stemmann.pdf"],
    ["SCL / SACL / SICL / SOCL", "/catalogs/Katalog-Sistemi-tokopodvodov-SCL-SACL-SICL-SOCL-Akapp-Stemmann.pdf"],
  ] },
  { title: "Фестонные системы", documents: [["Фестонные системы", "/catalogs/Brochure_Festoon.pdf"]] },
  { title: "Кабельные барабаны", documents: [
    ["Серия AV — техническая информация", "/catalogs/Akapp-Cable-reels-series-AV-Technical-info.pdf"],
    ["Серия AV — описание", "/catalogs/Opisanie_kabelnie_barabany_seriya_AV.pdf"],
    ["Серия AVS28", "/catalogs/Opisanie_kabelnie_barabany_seriya_AVS28.pdf"],
    ["Серия 0951", "/catalogs/Opisanie_kabelnie_barabany_seriya_0951.pdf"],
  ] },
];

export default function CatalogsPage() {
  return <><InfoHero eyebrow="Документация" title="Каталоги AKAPP-STEMMANN" lead="Технические каталоги производителя. Откройте PDF в браузере или сохраните файл для проектной работы." /><section className="section"><div className="shell document-groups">{groups.map((group) => <section key={group.title}><h2>{group.title}</h2><div className="document-grid">{group.documents.map(([name, href]) => <a key={href} className="document-card" href={href} target="_blank" rel="noreferrer"><FileText /><div><strong>{name}</strong><span>PDF · технический каталог</span></div><ArrowDownToLine /></a>)}</div></section>)}</div></section></>;
}
