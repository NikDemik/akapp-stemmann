import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Factory, Wrench } from "lucide-react";
import { CompanyRequisites } from "@/components/company-requisites";
import { InfoHero } from "@/components/info-hero";

export const metadata: Metadata = { title: "О компании", description: "Поставка систем токоподвода AKAPP-STEMMANN и инженерная поддержка проектов по России.", alternates: { canonical: "/about/" } };

export default function AboutPage() {
  return <><InfoHero eyebrow="О компании" title="Инженерный подход к токоподводу" lead="Поставляем оборудование AKAPP-STEMMANN для кранов, конвейеров, складских и производственных комплексов по всей России." /><section className="section"><div className="shell info-grid"><article><Factory /><h2>Промышленные решения</h2><p>Закрытые и открытые шинопроводы, фестонные системы и пружинные кабельные барабаны для подвижного оборудования.</p></article><article><Wrench /><h2>Подбор конфигурации</h2><p>Помогаем определить серию и состав системы по параметрам трассы, нагрузке, скорости и условиям эксплуатации.</p></article><article><BadgeCheck /><h2>Техническая документация</h2><p>Предоставляем каталоги, характеристики и опросный лист по запросу. Параметры проверяются до подготовки предложения.</p></article></div><div className="center-action"><Link className="button button-primary" href="/#request">Обсудить задачу <ArrowRight /></Link></div></section><section className="section requisites-section"><div className="shell"><CompanyRequisites /></div></section></>;
}
