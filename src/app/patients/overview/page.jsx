import { CustomizeDropdown } from "@/components/ui/dropdown";
import { props } from "@/app/data.js";
import { Searchbar } from "@/components/ui/searchbar";
import { Table } from "@/components/table";

export default function Page() {
  return <Table props={props.patient} />;
}
