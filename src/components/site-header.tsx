"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

const links = [
  { href: "/shinoprovody/", label: "Шинопроводы" },
  { href: "/festonnye-sistemy/", label: "Фестонные системы" },
  { href: "/kabelnye-barabany/", label: "Кабельные барабаны" },
  { href: "/catalogs/", label: "Каталоги" },
  { href: "/about/", label: "О компании" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-locked", open);
    return () => document.body.classList.remove("menu-locked");
  }, [open]);

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="shell header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Основная навигация">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <a className="header-phone" href="tel:+74993229390">
            <Phone size={15} />
            +7 (499) 322-93-90
          </a>
          <Link className="button button-primary button-small header-request" href="/#request">
            Отправить заявку
          </Link>
          <button
            className="menu-button"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
            aria-expanded={open}
          >
            <Menu />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-top">
          <Logo />
          <button className="menu-button" type="button" onClick={() => setOpen(false)} aria-label="Закрыть меню">
            <X />
          </button>
        </div>
        <nav aria-label="Мобильная навигация">
          {links.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <span>{link.label}</span>
              <small>0{index + 1}</small>
            </Link>
          ))}
          <Link href="/#request" onClick={() => setOpen(false)}>
            <span>Отправить заявку</span>
            <small>06</small>
          </Link>
        </nav>
        <div className="mobile-menu-contacts">
          <a href="tel:+74993229390">+7 (499) 322-93-90</a>
          <a href="mailto:zapros@trolleynyi-shinoprovod.ru">zapros@trolleynyi-shinoprovod.ru</a>
        </div>
      </div>
    </>
  );
}
