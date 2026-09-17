import type { ReactNode } from "react";
import requisites from "../../docs/legal/requisites.json";

const { organization, management, bank_details: bankDetails } = requisites;

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

export function CompanyRequisites() {
  return (
    <div className="company-requisites">
      <div className="requisites-heading">
        <p className="eyebrow">Юридическая информация</p>
        <h2>Реквизиты компании</h2>
      </div>

      <div className="requisites-grid">
        <section className="requisites-group requisites-group-wide">
          <h3>Организация</h3>
          <dl>
            <Requisite label="Полное наименование">{organization.full_name}</Requisite>
            <Requisite label="Краткое наименование">{organization.short_name}</Requisite>
            <Requisite label="Генеральный директор">{management.general_director}</Requisite>
            <Requisite label="Юридический адрес">{organization.legal_address}</Requisite>
            <Requisite label="Почтовый адрес">{organization.postal_address}</Requisite>
          </dl>
        </section>

        <section className="requisites-group">
          <h3>Регистрационные данные</h3>
          <dl>
            <Requisite label="ИНН">{organization.inn}</Requisite>
            <Requisite label="КПП">{organization.kpp}</Requisite>
            <Requisite label="ОГРН">{organization.ogrn}</Requisite>
          </dl>
        </section>

        <section className="requisites-group">
          <h3>Банковские реквизиты</h3>
          <dl>
            <Requisite label="Банк">{bankDetails.bank_name}</Requisite>
            <Requisite label="Расчётный счёт">{bankDetails.checking_account}</Requisite>
            <Requisite label="Корреспондентский счёт">{bankDetails.correspondent_account}</Requisite>
            <Requisite label="БИК">{bankDetails.bik}</Requisite>
          </dl>
        </section>

        <section className="requisites-group requisites-group-wide">
          <h3>Контакты</h3>
          <dl>
            <Requisite label="Телефон">
              <a href={`tel:${organization.phone.replace(/[^+\d]/g, "")}`}>{organization.phone}</a>
            </Requisite>
            <Requisite label="Электронная почта">
              <a href={`mailto:${organization.email}`}>{organization.email}</a>
            </Requisite>
            <Requisite label="Сайт">
              <a href={`https://${organization.website}`} rel="noreferrer" target="_blank">
                {organization.website}
              </a>
            </Requisite>
          </dl>
        </section>
      </div>
    </div>
  );
}
