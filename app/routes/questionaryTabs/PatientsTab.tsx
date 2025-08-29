import { useTranslation } from "react-i18next";
import { PatientsTable } from "@/components/PatientsTable";
import { QuestionnaryLayout } from "@/routes/layouts/QuestionnaryLayout";
import type Collector from "hds-lib-js/types/appTemplates/Collector";

export default function PatientsTab() {
  const { t } = useTranslation();
  return (
    <QuestionnaryLayout
      render={(collector: Collector) => {
        return (
          <>
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

            <PatientsTable collector={collector} />
          </>
        );
      }}
    />
  );
}
