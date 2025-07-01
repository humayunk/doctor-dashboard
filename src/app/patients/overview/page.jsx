import { props } from "@/app/data.js";
import { Table } from "@/components/table";

export default function Page() {
  return <Table props={props.patient} />;
}
