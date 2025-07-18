import { props } from "@/app/data.js";
import { Table } from "@/components/table";
import { Card } from "@/components/ui/card";

const {
  details,
  details: {
    info: { dob, fname, lname },
  },
} = props;

export default function Page() {
  return (
    <>
      <div className="m-4 grid grid-cols-1 grid-rows-1 md:grid-cols-3">
        <Card info={fname} />
        <Card info={lname} />
        <Card info={dob} />
      </div>
      <Table props={details} />
    </>
  );
}
