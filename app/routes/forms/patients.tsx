import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { PatientsTable } from "@/components/patients";
import { Tabbar } from "@/components/tabbar";

export default function Component() {
  const { t } = useTranslation();
  const { forms } = JSON.parse(localStorage.getItem("props"));
  const { formId } = useParams();
  const form = forms[formId];
  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
      </article>
      <Tabbar tabs={form.tabs} />

      {/* TODO: Make this work */}
      <article className="my-2 prose">
        <h3 className="italic">{t("createSharingLink")}</h3>
      </article>
      <form>
        <label
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="search"
        >
          {t("createSharingLinkPlaceholder")}
        </label>
        <div className="relative w-1/2">
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            id="search"
            placeholder={t("createSharingLinkPlaceholder")}
            required
            type="search"
          />
          <button
            className="absolute end-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-700 dark:text-gray-300 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
            type="submit"
          >
            {t("create")}
          </button>
        </div>
      </form>

      <PatientsTable props={form} />
    </>
  );
}
