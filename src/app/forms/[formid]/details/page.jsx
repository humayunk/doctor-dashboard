"use client";
import { props } from "@/app/data.js";
import { Tabbar } from "@/components/ui/tabbar";

export default function Page() {
  const p = localStorage.getItem("props");
  const { form } = JSON.parse(p) || props;
  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
      </article>
      <Tabbar tabs={form.tabs} />
      <div className="m-4 ml-8">
        <div className="prose m-4 ml-8">
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
            <li>Profile</li>
            <li>Body Weight</li>
            <li>Vulva Wetness Feeling</li>
            <li>Vulva Mucus Inspect</li>
            <li>Vulva Mucus Stretch</li>
            <li>New Cycle</li>
            <li>Ovulation Day</li>
          </ul>
        </div>
      </div>
    </>
  );
}
