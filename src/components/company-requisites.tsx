import type { ReactNode } from "react";
import requisites from "../../docs/legal/requisites.json";

const { organization } = requisites;

type RequisiteProps = {
  label: string;
  children: ReactNode;
};

function Requisite({ label, children }: RequisiteProps) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function CompanyRequisites({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="company-requisites">
        <div className="requisites-heading">
          <p className="eyebrow">Контактная информация</p>
          <h2>О компании</h2>
        </div>

        <div className="requisites-grid">
          <section className="requisites-group requisites-group-wide">
            <dl>
              <Requisite label="Наименование компании">{organization.full_name}</Requisite>
              <Requisite label="Адрес">{organization.legal_address}</Requisite>
              <Requisite label="Телефон">
                <a href={`tel:${organization.phone.replace(/[^+\d]/g, "")}`}>{organization.phone}</a>
              </Requisite>
              <Requisite label="Эл. почта">
                <a href={`mailto:${organization.email}`}>{organization.email}</a>
              </Requisite>
            </dl>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="company-requisites">
      <div className="requisites-heading">
        <p className="eyebrow">Юридическая информация</p>
        <h2>Реквизиты компании</h2>
      </div>

      <div className="requisites-grid">
        <section className="requisites-group requisites-group-wide">
          <dl>
            <Requisite label="Наименование компании">{organization.full_name}</Requisite>
            <Requisite label="Юридический адрес">{organization.legal_address}</Requisite>
            <Requisite label="ИНН">{organization.inn}</Requisite>
            <Requisite label="ОГРН">{organization.ogrn}</Requisite>
            <Requisite label="Телефон">
              <a href={`tel:${organization.phone.replace(/[^+\d]/g, "")}`}>{organization.phone}</a>
            </Requisite>
            <Requisite label="Эл. почта">
              <a href={`mailto:${organization.email}`}>{organization.email}</a>
            </Requisite>
          </dl>
        </section>
      </div>
    </div>
  );
}
