import type { Metadata, Viewport } from "next";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/700.css";
import "@fontsource/archivo/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/600.css";
import "./globals.css";
import { CookieBanner } from "@/components/cookie-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { YandexMetrika } from "@/components/yandex-metrika";

export const metadata: Metadata = {
  metadataBase: new URL("https://akapp-stemmann.su"),
  title: {
    default: "Шинопроводы AKAPP-STEMMANN — поставка по России",
    template: "%s | AKAPP-STEMMANN",
  },
  description:
    "Шинопроводы, фестонные системы и кабельные барабаны AKAPP-STEMMANN. Подбор оборудования, техническая консультация и поставка по России.",
  applicationName: "AKAPP-STEMMANN",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AKAPP-STEMMANN",
    url: "https://akapp-stemmann.su",
    telephone: "+7-499-322-93-90",
    email: "zapros@trolleynyi-shinoprovod.ru",
    areaServed: "RU",
  };

  return (
    <html lang="ru">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CookieBanner />
        <YandexMetrika />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
