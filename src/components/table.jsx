function Body({ data }) {
  if (!data || !data[0]) {
    return;
  }
  const keys = Object.keys(data[0]);
  const first = keys[0];
  return (
    <tbody>
      {data.map((row) => (
        <TableBody key={row[first]} first={first} keys={keys} row={row} />
      ))}
    </tbody>
  );
}

function Header({ columns, options }) {
  return (
    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map((column) => (
          <HeaderRow
            key={column}
            column={column}
            first={columns[0]}
            options={options}
          />
        ))}
      </tr>
    </thead>
  );
}

function HeaderRow({ column, first, options }) {
  return (
    <th scope="col" className="px-6 py-3">
      <div className="flex items-center">{column}</div>
    </th>
  );
}

function Table({ props, props: { columns, data, options } }) {
  return (
    <div className="relative my-4 overflow-x-auto shadow-md sm:rounded-lg">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <Header columns={columns} options={options} />
          <Body data={data} />
        </table>
      </div>
    </div>
  );
}

function TableBody({ first, keys, row }) {
  return (
    <tr
      key={row[first]}
      className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
      >
        {row[first]}
      </th>
      {keys.slice(1).map((key) => (
        <TableData key={key} item={key} row={row} />
      ))}
    </tr>
  );
}

function TableData({ item, row }) {
  return <td className="px-6 py-4">{row[item]}</td>;
}

export { Table };
