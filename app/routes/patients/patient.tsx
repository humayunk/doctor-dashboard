import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Card } from "@/components/card";
import { Table } from "@/components/table";

import i18next from "i18next";

import { l, type pryv } from "hds-lib-js";
import { getAppManaging, getLineForEvent } from "@/dr-lib";

import type Collector from "hds-lib-js/types/appTemplates/Collector";

export default function Component() {
  const { t } = useTranslation();
  const { questionaryId, inviteId } = useParams<string>();
  const appManager = getAppManaging();
  const [collector, setCollector] = useState<Collector | null>(null);
  const [patientData, setPatientData] = useState<any>(null);

  useEffect(() => {
    const loadCollector = async () => {
      if (!questionaryId || !inviteId) return;
      const col = await appManager.getCollectorById(questionaryId);
      await col.init();
      setCollector(col);
      if (col == null) {
        throw new Error(`Cannot find collector with id ${questionaryId}`);
      }
      // invite (patient)
      const invite = await col.getInviteByKey(inviteId);
      if (col == null) {
        throw new Error(`Cannot find invite with id "${inviteId}" for collector "${questionaryId}"`);
      }

      // patient Data
      const contentData = {
        name: invite.eventData.content.name,
        nonRepeatableData: [] as {label: string, value: string}[],
        repeatableDataRows: [] as {date: string, label: string, value: string }[]
      }
      function forEachEvent(event: pryv.Event) {
        const line = getLineForEvent(event);
        console.log('>> Event patiendata', event);

        if (line.repeatable === 'none') {
          contentData.nonRepeatableData.push({
            label: line.formLabel,
            value: line.value
          });
        } else {
          contentData.repeatableDataRows.push({
            date: line.time,
            label: line.formLabel,
            value: line.value
          });
        }
      }

      // will load events
      await invite.connection.getEventsStreamed({ limit: 10000 }, forEachEvent);
      console.log('>> Event patiendata Done');
      setPatientData(contentData);
    };
    loadCollector();
  }, [appManager, questionaryId, inviteId]);

  const back = `/forms/${questionaryId}/patients`;
  const content = t("backToForm");

  if (collector == null || patientData == null) return <>Loading...</>;

  const tableData = {
    columns: [i18next.t("date"), i18next.t("label"), i18next.t("value")],
    data: patientData.repeatableDataRows
  }

  console.log('### tableData', tableData);

  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{l(collector.statusData.requestContent.title)}</h2>
        <h3 className="italic">
          {t("dataFor")} {patientData.name}
        </h3>
        <NavLink
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          to={back}
        >
          {content}
        </NavLink>
      </article>
      <div className="m-4 grid grid-cols-1 grid-rows-1 md:grid-cols-3">
        {patientData.nonRepeatableData.map((info: {label: string, value: string}) => (
          <Card info={info} key={info.label} />
        ))}
      </div>
      <Table props={tableData} />
    </>
  );
}
