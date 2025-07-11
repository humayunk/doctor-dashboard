import { IconColumns, IconDown } from "@/components/ui/icons";

function Button({ props: { buttonID, menuID } }) {
  return (
    <button
      id={buttonID}
      data-dropdown-toggle={menuID}
      className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      type="button"
    >
      <span className="sr-only">Customize dropdown</span>
      <IconColumns />
      Customize Columns
      <IconDown />
    </button>
  );
}

function CustomizeDropdown({ props }) {
  return (
    <div>
      <Button props={props} />
      <Menu props={props} />
    </div>
  );
}

function Menu({ props: { columns, menuID } }) {
  return (
    <div
      id={menuID}
      className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
    >
      <ul
        className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownCheckboxButton"
      >
        {columns.map((column) => (
          <li key={column}>
            <div className="flex items-center">
              <input
                defaultChecked
                id="checkbox-item-1"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-1"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {column}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { CustomizeDropdown };
