import { useTranslation } from "react-i18next";
import { QuestionnaryLayout } from "@/routes/layouts/QuestionnaryLayout";
import type Collector from "hds-lib-js/types/appTemplates/Collector";

export default function Component() {
  const { t } = useTranslation();
  return (
    <QuestionnaryLayout
      render={(form: any, collector: Collector) => (
        
        <div className="m-4 ml-8">
          <div className="m-4 prose ml-8">
            <h2 className="font-normal">{t("description")}</h2>
            <p>{form.description}</p>
            <h2 className="font-normal">{t("consent")}</h2>
            <p>{form.consent}</p>
            <h2 className="font-normal">{t("permissions")}</h2>
            <p>{t("permissionsExplanation")}</p>
            <h3 className="italic">{t("read")}</h3>
            <p>{t("readExplanation")}</p>
            <ul>
              {form.permissions?.read.map((permission: string) => (
                <li key={permission}>{permission}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    />
  );
}
