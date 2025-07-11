import { props } from "@/app/data.js";
import { Tabbar } from "@/components/ui/tabbar";
import { Table } from "@/components/table";

export default function Page() {
  return (
    <>
      <Tabbar tabs={props.form.tabs} />
      <Table props={props.form} />
    </>
  );
}
