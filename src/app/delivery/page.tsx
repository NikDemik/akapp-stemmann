import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InfoHero } from "@/components/info-hero";

export const metadata: Metadata = { title: "Доставка оборудования по России", description: "Поставка шинопроводов, фестонных систем и кабельных барабанов AKAPP-STEMMANN по России.", alternates: { canonical: "/delivery/" } };

export default function DeliveryPage() {
  return <><InfoHero eyebrow="Логистика" title="Доставка по всей России" lead="Организуем отгрузку оборудования транспортными компаниями до терминала или адреса получателя." /><section className="section"><div className="shell prose-layout"><div><h2>Как проходит поставка</h2><ol><li><strong>Согласование.</strong> Проверяем состав комплекта, сроки и адрес доставки.</li><li><strong>Подготовка.</strong> Упаковываем оборудование с учётом габаритов профилей и комплектующих.</li><li><strong>Отгрузка.</strong> Передаём заказ выбранной транспортной компании и предоставляем данные для отслеживания.</li></ol></div><aside><p className="eyebrow">Важно</p><p>Стоимость и срок доставки рассчитываются отдельно и зависят от региона, габаритов груза и выбранного перевозчика.</p><Link href="/#request">Запросить расчёт <ArrowRight /></Link></aside></div></section></>;
}
