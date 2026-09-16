import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSeriesHref, type ProductSeries } from "@/lib/catalog";

export function SeriesCard({ item, index }: { item: ProductSeries; index: number }) {
  return (
    <article className="series-card">
      <div className="series-card-image">
        <Image src={item.image} alt={`Каталог серии ${item.name}`} fill sizes="(max-width: 760px) 100vw, 33vw" />
        <span>0{index + 1}</span>
      </div>
      <div className="series-card-body">
        <p className="mono-label">{item.range}</p>
        <h3>{item.name}</h3>
        <p>{item.subtitle}</p>
        <Link href={getSeriesHref(item)} aria-label={`Подробнее о серии ${item.name}`}>
          Характеристики <ArrowUpRight />
        </Link>
      </div>
    </article>
  );
}
