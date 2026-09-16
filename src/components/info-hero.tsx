import Link from "next/link";

export function InfoHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return <section className="page-hero info-hero"><div className="shell"><nav className="breadcrumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><span>{title}</span></nav><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="page-hero-summary"><p>{lead}</p></div></div></section>;
}
