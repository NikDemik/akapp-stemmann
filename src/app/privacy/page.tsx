import type { Metadata } from "next";
import { CompanyRequisites } from "@/components/company-requisites";
import { InfoHero } from "@/components/info-hero";
import requisites from "../../../docs/legal/requisites.json";

export const metadata: Metadata = { title: "Политика конфиденциальности", robots: { index: false, follow: true }, alternates: { canonical: "/privacy/" } };

export default function PrivacyPage() {
  return <><InfoHero eyebrow="Правовая информация" title="Политика конфиденциальности" lead="Правила обработки информации, получаемой через сайт akapp-stemmann.su." /><section className="section"><article className="shell legal-copy"><h2>1. Общие положения</h2><p>Настоящая политика описывает порядок обработки персональных данных посетителей сайта. Оператор персональных данных — {requisites.organization.full_name}. Оператор использует сведения только для ответа на обращения и подготовки коммерческих предложений.</p><h2>2. Какие данные обрабатываются</h2><p>Имя, компания, телефон, адрес электронной почты, содержание сообщения, а также технические данные, автоматически передаваемые браузером.</p><h2>3. Цели и сроки</h2><p>Данные используются для связи с пользователем, подбора оборудования, расчёта стоимости и исполнения договорных обязательств. Хранение ведётся не дольше, чем этого требуют указанные цели и законодательство РФ.</p><h2>4. Передача и защита</h2><p>Данные не распространяются и не передаются третьим лицам, кроме случаев, предусмотренных законом или необходимых для исполнения обращения. Принимаются организационные и технические меры защиты.</p><h2>5. Обращения</h2><p>Отозвать согласие или задать вопрос можно по адресу <a href={`mailto:${requisites.organization.email}`}>{requisites.organization.email}</a>.</p><CompanyRequisites /></article></section></>;
}
