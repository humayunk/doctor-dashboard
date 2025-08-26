import { l } from "hds-lib-js";
import { useParams } from "react-router-dom";

import { Tabbar } from "@/components/tabbar";

export default function Component() {
  const { forms } = JSON.parse(localStorage.getItem("props"));
  const { formId, sectionId: rawSectionId } = useParams();
  const sectionId = rawSectionId.replace("section-", "");
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
