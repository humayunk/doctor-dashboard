import { l } from "hds-lib-js";

import { Tabbar } from "@/components/tabbar";

import type { Route } from "./+types/product";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { fid: params.formId, sid: params.sectionId.replace("section-", "") };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  const { forms } = JSON.parse(localStorage.getItem("props"));
  const formId = loaderData.fid;
  const sectionId = loaderData.sid;
  const form = forms[formId];
  const section = form[sectionId];
  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
      </article>
      <Tabbar tabs={form.tabs} />
      <div className="m-4 ml-8">
        <div className="m-4 prose ml-8">
          <h2 className="font-normal">Profile (permanent)</h2>
          <ul>
            {section.itemDefs.map((itemDef) => (
              <ItemDef key={itemDef.key} props={itemDef} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function ItemDef({ props: { key, label, options, type } }) {
  if (type === "select" && options) {
    return (
      <li key={key}>
        <span>{l(label)}:</span>
        <ul>
          {Object.entries(options).map(([key, title]) => (
            <li key={key}>{l(title.label)}</li>
          ))}
        </ul>
      </li>
    );
  } else {
    return (
      <li key={key}>
        <span>
          {l(label)} ({type})
        </span>
      </li>
    );
  }
}
