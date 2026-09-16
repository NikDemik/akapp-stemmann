import Link from "next/link";

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="AKAPP-STEMMANN — на главную">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M5 20h8M27 20h8M13 8v24M27 8v24" />
        <path d="M13 11h14M13 20h14M13 29h14" />
        <circle cx="13" cy="11" r="2.5" />
        <circle cx="27" cy="20" r="2.5" />
        <circle cx="13" cy="29" r="2.5" />
      </svg>
      <span className={light ? "" : "brand-dark"}>
        AKAPP<span>·</span>STEMMANN
      </span>
    </Link>
  );
}
