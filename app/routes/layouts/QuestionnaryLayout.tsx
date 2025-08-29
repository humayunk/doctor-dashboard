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
  render?: (collector: Collector) => ReactNode;
}

export function QuestionnaryLayout({
  children,
  render,
}: QuestionnaryLayoutProps): JSX.Element | null {
  const { questionaryId } = useParams();
  const appManager = useMemo(() => getAppManaging(), []);
  const [collector, setCollector] = useState<Collector | null>(null);

  useEffect(() => {
    const loadCollector = async () => {
      if (!questionaryId) return;
      const col = await appManager.getCollectorById(questionaryId);
      await col.init();
      setCollector(col);
      if (col == null) {
        throw new Error(`Cannot find collector with id ${questionaryId}`);
      }
    };
    loadCollector();
  }, [appManager, questionaryId]);

  if (collector == null) return <>Loading...</>;

  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{l(collector.statusData.requestContent.title)}</h2>
      </article>
      <Tabbar collector={collector} />
      {render ? render(collector) : children}
    </>
  );
}
