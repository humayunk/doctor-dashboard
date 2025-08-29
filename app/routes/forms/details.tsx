import { useTranslation } from "react-i18next";
import { QuestionnaryLayout } from "@/routes/layouts/QuestionnaryLayout";
import type Collector from "hds-lib-js/types/appTemplates/Collector";
import { l } from "hds-lib-js";

export default function Component() {
  const { t } = useTranslation();
  return (
    <QuestionnaryLayout
      render={(collector: Collector) => {
        const { requestContent } = collector.statusData;
        return (
          <div className="m-4 ml-8">
            <div className="m-4 prose ml-8">
              <h2 className="font-normal">{t("description")}</h2>
              <p>{l(requestContent.description)}</p>
              <h2 className="font-normal">{t("consent")}</h2>
              <p>{l(requestContent.consent)}</p>
              <h2 className="font-normal">{t("permissions")}</h2>
              <p>{t("permissionsExplanation")}</p>
              <h3 className="italic">{t("list")}</h3>
              <ul>
                {requestContent.permissions.map((p: any) => {
                  if (!p.level) return <></>;
                  return (
                    <li key={p.streamId + " " + p.level}>
                      {p.defaultName} - {p.level}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      }}
    />
  );
}
