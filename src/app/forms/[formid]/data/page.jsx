"use client";
import { props } from "@/app/data.js";
import { Tabbar } from "@/components/ui/tabbar";
import { Table } from "@/components/table";

export default function Page() {
  const p = localStorage.getItem("props");
  const { form } = JSON.parse(p) || props;
  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
      </article>
      <Tabbar tabs={form.tabs} />
      <Table props={form} />
    </>
  );
}
