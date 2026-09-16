import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { InfoHero } from "@/components/info-hero";

export const metadata: Metadata = { title: "Контакты", description: "Контакты для запроса цены и подбора оборудования AKAPP-STEMMANN.", alternates: { canonical: "/contacts/" } };

export default function ContactsPage() {
  return <><InfoHero eyebrow="Связаться с нами" title="Контакты" lead="Отправьте параметры проекта — инженер поможет подобрать оборудование и подготовит предложение." /><section className="section"><div className="shell contact-grid"><a href="tel:+74993229390"><Phone /><span>Телефон</span><strong>+7 (499) 322-93-90</strong></a><a href="mailto:zapros@trolleynyi-shinoprovod.ru"><Mail /><span>Email для заявок</span><strong>zapros@trolleynyi-shinoprovod.ru</strong></a><div><MapPin /><span>География поставок</span><strong>Вся Россия</strong></div></div><div className="center-action"><Link className="button button-primary" href="/#request">Отправить заявку <ArrowRight /></Link></div></section></>;
}
