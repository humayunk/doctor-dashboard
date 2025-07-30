import { useTranslation } from "react-i18next";

import { Card } from "@/components/card";
import { Link } from "@/components/link";
import { Table } from "@/components/table";

import type { Route } from "./+types/product";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { fid: params.formId, iid: params.inviteId };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation();
  const props = JSON.parse(localStorage.getItem("props"));
  const formId = loaderData.fid;
  const inviteId = loaderData.iid;
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
        <Link content={content} href={back} />
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
