import { CustomizeDropdown } from "@/components/ui/dropdown"
import { IconFilter, IconSort } from "@/components/ui/icons"
import { Searchbar } from "@/components/ui/searchbar"

function Body({ data }) {
  const keys = Object.keys(data[0]);
  const first = keys[0];
  return (
    <tbody>
      {data.map((row) => (
        <tr key={row[first]} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <Status status={row[first]} />
          </th>
          {keys.slice(1).map((key) => (
            <td key={key} className="px-6 py-4">
              <Status status={row[key]} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

function Filter({ options }) {
  if (!options) {
    return null;
  }
  return (
    <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
      {options.map((option) => (
        <li key={option}>
          <div className="flex items-center">
            <input defaultChecked id="checkbox-item-1" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label htmlFor="checkbox-item-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {option}
            </label>
          </div>
        </li>
      ))}
    </ul>
  )
}

function Header({ columns, options }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map((column) => (
          <th key={column} scope="col" className="px-6 py-3">
            <div className="flex items-center">
              {column}
              <button id={`dropdownDefaultButton${column}`} data-dropdown-toggle={`dropdown${column}`}>
                <IconFilter />
              </button>
              {/* dropdown menu */}
              <div id={`dropdown${column}`} className="normal-case z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a href="#">
                      <IconSort />
                    </a>
                  </li>
                </ul>
                <Filter options={column !== columns[0] ? options : null} />
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}

function Status({ status }) {
  switch(status) {
    case 'pending':
      return (<>⏳ pending</>);
    case 'revoked':
      return (<>❌ revoked</>);
    case 'submitted':
      return (<>✅ <a href="/patients/details/janedoe/intake" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">submitted</a></>);
    default:
      return status;
  }
}

function Table({ props, props: { columns, data, options } }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between p-4">
        <CustomizeDropdown props={props} />
        <Searchbar />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <Header
            columns={columns}
            options={options}
          />
          <Body data={data} />
        </table>
      </div>
    </div>
  )
}

export {
  Table,
}
