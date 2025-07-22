"use client";
import { l } from "hds-lib-js";
import { usePathname } from "next/navigation";

import { strings } from "@/app/dr-lib.js";
import { Card } from "@/components/card";
import { Link } from "@/components/link";
import { Table } from "@/components/table";

export default function Page() {
  const props = localStorage.getItem("props");
  const data = JSON.parse(props) || {};
  const path = usePathname().split("/");
  const formId = path[2];
  const inviteId = path.pop();
  const form = data.forms[formId];
  const details = data[inviteId];
  const back = `/forms/${formId}/patients`;
  const content = l(strings.backToForm);
  const info = details.info;
  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
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
