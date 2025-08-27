import { type ReactNode, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { Tabbar } from "@/components/tabbar";
import { getAppManaging } from "@/dr-lib";
import { l } from "hds-lib-js";
import type { JSX } from "react/jsx-runtime";
import type Collector from "hds-lib-js/types/appTemplates/Collector";

interface QuestionnaryLayoutProps {
  children?: ReactNode;
  /**
   * If true, QuestionnaryLayout will fetch and build form model from the manager
   * and expose it down to children via render prop.
   */
  render?: (form: any, collector: Collector) => ReactNode;
}

export function QuestionnaryLayout({ children, render }: QuestionnaryLayoutProps): JSX.Element | null {
  const { formId } = useParams();
  const appManager = useMemo(() => getAppManaging(), []);

  const [form, setForm] = useState<any>({ tabs: null, title: "" });
  const [collector, setCollector] = useState<Collector | null>(null);

  useEffect(() => {
    const loadForm = async () => {
      if (!formId) return;
      const col = await appManager.getCollectorById(formId);
      await col.init();
      setCollector(col);
      if (collector == null) {
        throw new Error(`Cannot find collector with id ${formId}`);
      }

      const formData: any = {};
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

      formData.raw = requestContent;

      setForm(formData);
    };
    loadForm();
  }, [appManager, formId]);

  if (collector == null) return <>Loading...</>;

  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
      </article>
      <Tabbar collector={collector} />
      {render ? render(form, collector) : children}
    </>
  );
}

export default QuestionnaryLayout;


