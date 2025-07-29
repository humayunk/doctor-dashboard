import { l } from "hds-lib-js";

import { PatientsTable } from "@/components/patients";
import { Tabbar } from "@/components/tabbar";
import { strings } from "@/dr-lib";

import type { Route } from "./+types/product";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
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

      {/* TODO: Make this work */}
      <article className="my-2 prose">
        <h3 className="italic">{l(strings.createSharingLink)}</h3>
      </article>
      <form>
        <label
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="search"
        >
          {l(strings.search)}
        </label>
        <div className="relative w-1/2">
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            id="search"
            placeholder={l(strings.createSharingLinkPlaceholder)}
            required
            type="search"
          />
          <button
            className="absolute end-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            {l(strings.create)}
          </button>
        </div>
      </form>

      <PatientsTable props={form} />
    </>
  );
}
