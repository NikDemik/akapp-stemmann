import type { Metadata } from "next";
import { CompanyRequisites } from "@/components/company-requisites";
import { InfoHero } from "@/components/info-hero";
import requisites from "../../../docs/legal/requisites.json";

export const metadata: Metadata = { title: "Согласие на обработку персональных данных", robots: { index: false, follow: true }, alternates: { canonical: "/consent/" } };

export default function ConsentPage() {
  return <><InfoHero eyebrow="Правовая информация" title="Согласие на обработку данных" lead="Условия обработки данных, передаваемых через формы сайта." /><section className="section"><article className="shell legal-copy"><p>Отправляя форму на сайте akapp-stemmann.su, пользователь свободно, своей волей и в своём интересе даёт согласие оператору — {requisites.organization.full_name} — на обработку указанных в форме персональных данных.</p><h2>Состав данных</h2><p>Имя, наименование компании, телефон, электронная почта и содержание обращения.</p><h2>Цели обработки</h2><p>Обратная связь, консультация, подбор аналога или оборудования, подготовка и направление коммерческого предложения.</p><h2>Действия с данными</h2><p>Сбор, запись, систематизация, хранение, уточнение, использование, блокирование и удаление с применением средств автоматизации или без них.</p><h2>Отзыв согласия</h2><p>Согласие действует до достижения целей обработки или его отзыва. Отзыв можно направить на <a href={`mailto:${requisites.organization.email}`}>{requisites.organization.email}</a>.</p><CompanyRequisites /></article></section></>;
}
