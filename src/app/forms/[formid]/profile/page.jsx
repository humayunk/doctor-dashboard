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
        <div className="m-4 prose ml-8">
          <form className="max-w-md">
            <h2 className="font-normal">Profile</h2>
            <div className="group relative z-0 mb-5 w-full">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_first_name"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Name
              </label>
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_last_name"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Surname
              </label>
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <input
                type="text"
                name="floating_dob"
                id="floating_dob"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_dob"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Date of Birth
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
