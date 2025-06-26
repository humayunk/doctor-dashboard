import CustomizeDropdown from "@/components/ui/dropdown"
import Searchbar from "@/components/ui/searchbar"

function HeaderForm({ columns }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map((column) => (
          <th key={column} scope="col" className="px-6 py-3">
            <div className="flex items-center">
              {column}
              <button id={`dropdownDefaultButton${column}`} data-dropdown-toggle={`dropdown${column}`}>
                <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                </svg>
              </button>
              {/* dropdown menu */}
              <div id={`dropdown${column}`} className="normal-case z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a href="#">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.7" d="M8 20V10m0 10-3-3m3 3 3-3m5-13v10m0-10 3 3m-3-3-3 3"/>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}

function HeaderPatient({ columns }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map((column) => (
          <th key={column} scope="col" className="px-6 py-3">
            <div className="flex items-center">
              {column}
              <button id={`dropdownDefaultButton${column}`} data-dropdown-toggle={`dropdown${column}`}>
                <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                </svg>
              </button>
              {/* dropdown menu */}
              <div id={`dropdown${column}`} className="normal-case z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a href="#">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.7" d="M8 20V10m0 10-3-3m3 3 3-3m5-13v10m0-10 3 3m-3-3-3 3"/>
                      </svg>
                    </a>
                  </li>
                </ul>
                <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                  {['[Blank]', 'Pending', 'Submitted', 'Revoked'].map((option) => (
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
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}

function BodyForm ({ data }) {
  return (
    <tbody>
      {data.map(({ display, dob, fname, lname }) => (
        <tr key={display} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {display}
          </th>
          <td className="px-6 py-4">
            {fname}
          </td>
          <td className="px-6 py-4">
            {lname}
          </td>
          <td className="px-6 py-4">
            {dob}
          </td>
        </tr>
      ))}
    </tbody>
  )
}

function Status({ status }) {
  switch(status) {
    case 'pending':
      return (<>⏳ pending</>);
    case 'revoked':
      return (<>❌ revoked</>);
    case 'submitted':
      return (<>✅ <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">submitted</a></>);
    default:
      return (<></>);
  }
}

function BodyPatient({ data }) {
  return (
    <tbody>
      {data.map(({ display, intake, endo, cycle }) => (
        <tr key={display} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {display}
          </th>
          <td className="px-6 py-4">
            <Status status={intake} />
          </td>
          <td className="px-6 py-4">
            <Status status={endo} />
          </td>
          <td className="px-6 py-4">
            <Status status={cycle} />
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export function TableForm({ props, props: { columns, data } }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between p-4">
        <CustomizeDropdown props={props} />
        <Searchbar />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <HeaderForm columns={columns}/>
          <BodyForm data={data}/>
        </table>
      </div>
    </div>
  )
}

export function TablePatient({ props, props: { columns, data } }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between p-4">
        <CustomizeDropdown props={props} />
        <Searchbar />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <HeaderPatient columns={columns}/>
          <BodyPatient data={data}/>
        </table>
      </div>
    </div>
  )
}
