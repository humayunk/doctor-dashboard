import { l } from "hds-lib-js";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Tabbar } from "@/components/tabbar";
import { getAppManaging } from "@/dr-lib";

export default function Component() {
  const { t } = useTranslation();
  const appManager = getAppManaging();

  const [form, setForm] = useState({ tabs: null, title: ''});
  const { formId } = useParams();

  console.log('*****', formId);

  useEffect(() => {
    const loadForm = async () => {
      const collector = await appManager.getCollectorById(formId);
      await collector.init(); // load controller data only when needed
      const formData: any = {};
      // show details
      const { requestContent } = collector.statusData;
      formData.consent = l(requestContent.consent);
      formData.requester = requestContent.requester?.name;
      formData.description = l(requestContent.description);
      formData.permissions = {};
      if (requestContent.permissions) {
        formData.permissions.read = requestContent.permissions
          .filter((p: any) => p.level === "read")
          .map((p: any) => p.defaultName);
      }
      formData.title = l(requestContent.title);

      const base = `/forms/${collector.id}`;
      const tabs = [
        { href: `${base}/patients`, label: i18next.t("patients") },
        { href: `${base}/details`, label: i18next.t("formDetails") },
      ];
      // add existing forms to tabs
      if (requestContent.app.data.forms) {
        for (const [formSectionKey, formSection] of Object.entries(
          requestContent.app.data.forms,
        )) {
          tabs.push({
            href: `${base}/section-${formSectionKey}`,
            label: `${i18next.t("section")} ${formSection.name}`,
          });
        }
      }

      formData.tabs = tabs;

      setForm(formData);
    };
    loadForm();
  }, [appManager, formId]);

  if (form.tabs == null) return <>Loading...</>;

  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
      </article>
      <Tabbar tabs={form.tabs} />
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
            {form.permissions?.read.map((permission) => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
