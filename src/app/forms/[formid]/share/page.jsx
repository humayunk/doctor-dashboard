import { props } from "@/app/data.js"
import { IconQR } from "@/components/ui/icons"
import { Tabbar } from "@/components/ui/tabbar"

export default function Page() {
  return (
    <>
      <Tabbar tabs={props.form.tabs} />
      <div className="mt-8 grid place-items-center">
        <IconQR />
        <div className="grid md:grid-cols-2 md:gap-6">
          <a href="mailto:example@example.com">
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Email</button>
          </a>
          <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Copy Link</button>
        </div>
      </div>
    </>
  );
}
