"use client";
import { usePathname } from "next/navigation";

import { Tabbar } from "@/components/ui/tabbar";

export default function Page() {
  const p = localStorage.getItem("props");
  const { forms } = JSON.parse(p) || {};
  const formId = usePathname().split("/")[2];
  const form = forms[formId];
  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
      </article>
      <Tabbar tabs={form.tabs} />
      <div className="m-4 ml-8">
        <div className="m-4 prose ml-8">
          <h2 className="font-normal">Description</h2>
          <p>{form.description}</p>
          <h2 className="font-normal">Consent</h2>
          <p>{form.consent}</p>
          <h2 className="font-normal">Permissions</h2>
          <p>
            Permissions are the authorizations that a patient will grant to you.
          </p>
          <h3 className="italic">Read</h3>
          <p>You will be able to read the following data points:</p>
          <ul>
            {form.permissions.read.map((permission) => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
