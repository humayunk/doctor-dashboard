"use client";
import { l } from "hds-lib-js";
import { usePathname } from "next/navigation";

import { strings } from "@/app/dr-lib.js";
import { Tabbar } from "@/components/ui/tabbar";

export default function Page() {
  const p = localStorage.getItem("props");
  const { forms } = JSON.parse(p) || {};
  const formId = usePathname().split("/")[2];
  const form = forms[formId];
  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
      </article>
      <Tabbar tabs={form.tabs} />
      <div className="m-4 ml-8">
        <div className="m-4 prose ml-8">
          <h2 className="font-normal">{l(strings.description)}</h2>
          <p>{form.description}</p>
          <h2 className="font-normal">{l(strings.consent)}</h2>
          <p>{form.consent}</p>
          <h2 className="font-normal">{l(strings.permissions)}</h2>
          <p>{l(strings.permissionsExplanation)}</p>
          <h3 className="italic">{l(strings.read)}</h3>
          <p>{l(strings.readExplanation)}</p>
          <ul>
            {form.permissions.read.map((permission) => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
