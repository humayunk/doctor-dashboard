"use client";
import { usePathname } from "next/navigation";

import { Table } from "@/components/table";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/ui/link";

// TODO: Remove
const dob = { label: "DOB", value: "1991-01-19" };
const fname = { label: "First Name", value: "Jane" };
const lname = { label: "Last Name", value: "Doe" };

export default function Page() {
  const props = localStorage.getItem("props");
  const data = JSON.parse(props) || {};
  const path = usePathname().split("/");
  const formId = path[2];
  const inviteId = path.pop();
  const form = data.forms[formId];
  const details = data[inviteId];
  const back = `/forms/${formId}/patients`;
  const content = "Back to Form Information";
  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
        <Link content={content} href={back} />
      </article>
      <div className="m-4 grid grid-cols-1 grid-rows-1 md:grid-cols-3">
        <Card info={fname} />
        <Card info={lname} />
        <Card info={dob} />
      </div>
      <Table props={details} />
    </>
  );
}
