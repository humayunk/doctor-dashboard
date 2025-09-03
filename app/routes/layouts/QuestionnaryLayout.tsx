import { type ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabbar } from "@/components/tabbar";

import { l } from "hds-lib-js";

import type { JSX } from "react/jsx-runtime";
import type Collector from "hds-lib-js/types/appTemplates/Collector";
import { useAppContext } from "@/context/AppContext";

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
  const { appManaging } = useAppContext();
  const [collector, setCollector] = useState<Collector | null>(null);

  useEffect(() => {
    const loadCollector = async () => {
      console.log("loadCollector", { appManaging });
      if (!questionaryId || !appManaging) return;
      const col = await appManaging.getCollectorById(questionaryId);
      await col.init();
      setCollector(col);
      if (col == null) {
        throw new Error(`Cannot find collector with id ${questionaryId}`);
      }
    };
    loadCollector();
  }, [appManaging, questionaryId]);

  if (collector == null) return <>Loading...</>;

  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">
          {l(collector.statusData.requestContent.title)}
        </h2>
      </article>
      <Tabbar collector={collector} />
      {render ? render(collector) : children}
    </>
  );
}
