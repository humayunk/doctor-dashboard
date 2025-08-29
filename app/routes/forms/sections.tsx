import { l, getHDSModel } from "hds-lib-js";
import { useParams } from "react-router-dom";
import { QuestionnaryLayout } from "@/routes/layouts/QuestionnaryLayout";
import type Collector from "hds-lib-js/types/appTemplates/Collector";
import type HDSItemDef from "hds-lib-js/types/HDSModel/HDSItemDef";

export default function Component() {
  const { sectionId: rawSectionId } = useParams();
  const sectionKey = (rawSectionId ?? "").replace("section-", "");
  const model = getHDSModel();
  return (
    <QuestionnaryLayout
      render={(collector: Collector) => {
        console.log(">>> Section:", { sectionKey, collector });
        const appData = collector?.statusData.requestContent.app.data;
        const sectionData = appData?.forms[sectionKey];
        if (sectionData == null) {
          return <> No Data .. </>;
        }

        return (
          <div className="m-4 ml-8">
            <div className="m-4 prose ml-8">
              <h2 className="font-normal">Profile (permanent)</h2>
              <ul>
                {sectionData.itemKeys.map((itemKey: string) => {
                  const itemDef = model.itemsDefs.forKey(itemKey);
                  return <ItemDef key={itemDef.key} itemDef={itemDef} />;
                })}
              </ul>
            </div>
          </div>
        );
      }}
    />
  );
}

function ItemDef({ itemDef }: { itemDef: HDSItemDef }) {
  if (itemDef.data.type === "select" && itemDef.data?.options) {
    return (
      <li key={itemDef.key}>
        <span>{itemDef.label}:</span>
        <ul>
          {Object.entries(
            itemDef.data.options as Record<string, { label: any }>,
          ).map(([optKey, opt]) => (
            <li key={optKey}>{l(opt.label)}</li>
          ))}
        </ul>
      </li>
    );
  } else {
    return (
      <li key={itemDef.key}>
        <span>
          {itemDef.label} ({itemDef.data.type})
        </span>
      </li>
    );
  }
}
