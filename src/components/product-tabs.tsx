"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { categories, getSeriesByCategory } from "@/lib/catalog";

export function ProductTabs() {
  const [active, setActive] = useState(categories[0].slug);
  const category = categories.find((item) => item.slug === active) ?? categories[0];
  const items = getSeriesByCategory(category.slug);

  return (
    <div className="product-browser">
      <div className="product-browser-nav" role="tablist" aria-label="Направления продукции">
        <div className="product-browser-title mono-label">Выберите направление</div>
        {categories.map((item) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={item.slug === active}
            className={item.slug === active ? "is-active" : ""}
            onClick={() => setActive(item.slug)}
          >
            <span>{item.number}</span>
            <strong>{item.name}</strong>
            <small>{getSeriesByCategory(item.slug).length} серий</small>
            <ArrowRight />
          </button>
        ))}
      </div>
      <div className="product-browser-content">
        <div className="product-browser-image">
          <Image src={category.image} alt={category.name} fill sizes="(max-width: 980px) 100vw, 42vw" />
          <span className="image-code">AKAPP / {category.number}</span>
        </div>
        <div className="product-browser-copy">
          <p className="mono-label accent">{category.range}</p>
          <h3>{category.name}</h3>
          <p>{category.description}</p>
          <div className="series-links">
            {items.slice(0, 5).map((item) => (
              <Link key={item.slug} href={`/${item.category}/${item.slug}/`}>
                <span>{item.name}</span>
                <small>{item.range}</small>
              </Link>
            ))}
          </div>
          <Link className="button button-dark" href={`/${category.slug}/`}>
            Все серии <ArrowUpRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
