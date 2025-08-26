import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Card } from "@/components/card";
import { Table } from "@/components/table";

export default function Component() {
  const { t } = useTranslation();
  const props = JSON.parse(localStorage.getItem("props"));
  const { formId, inviteId } = useParams();
  const form = props.forms[formId];
  const details = props[inviteId];
  const back = `/forms/${formId}/patients`;
  const content = t("backToForm");
  const info = details.info;

  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
        <h3 className="italic">
          {t("dataFor")} {details.name}
        </h3>
        <NavLink
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          to={back}
        >
          {content}
        </NavLink>
      </article>
      <div className="m-4 grid grid-cols-1 grid-rows-1 md:grid-cols-3">
        {info.map((info) => (
          <Card info={info} key={info.label} />
        ))}
      </div>
      <Table props={details} />
    </>
  );
}
