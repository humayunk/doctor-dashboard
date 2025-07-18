"use client";
import { props } from "@/app/data.js";
import { Tabbar } from "@/components/ui/tabbar";
import { PatientsTable } from "@/components/patients";

export default function Page() {
  const p = localStorage.getItem("props");
  const { form } = JSON.parse(p) || props;
  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{form.title}</h2>
      </article>
      <Tabbar tabs={form.tabs} />

      <article className="my-2 prose">
        <h3 className="italic">Create Sharing Link</h3>
      </article>
      <form>
        <label
          htmlFor="search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Enter patient reference"
            required
          />
          <button
            type="submit"
            className="absolute end-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
        </div>
      </form>

      <PatientsTable props={form} />
    </>
  );
}
