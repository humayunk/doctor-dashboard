"use client";
import { usePathname } from "next/navigation";

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
  const p = localStorage.getItem("props");
  const { forms } = JSON.parse(p) || {};
  const path = usePathname().split("/");
  const formId = path[2];
  const inviteId = path.pop();
  const form = forms[formId];
  const back = `/forms/${formId}/patients`;
  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
        <a
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          href={back}
        >
          Back to Patients
        </a>
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
