import { dataForm } from "../../data.js"
import { Tabbar } from "@/components/ui/tabbar"
import { Table } from "@/components/table"

export default function Page() {
  return (
    <>
      <Tabbar />
      <Table props={dataForm} />
    </>
  );
}
