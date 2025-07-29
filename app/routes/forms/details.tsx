import { l } from "hds-lib-js";

import { Tabbar } from "@/components/tabbar";
import { strings } from "@/dr-lib";

import type { Route } from "./+types/product";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  /* const res = await fetch(`/api/products/${params.pid}`);
   * const product = await res.json(); */
  return { fid: params.formId };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  const { forms } = JSON.parse(localStorage.getItem("props"));
  const formId = loaderData.fid;
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
