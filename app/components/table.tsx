function Body({ data }) {
  if (!data?.[0]) {
    return;
  }
  const keys = Object.keys(data[0]);
  const first = keys[0];
  return (
    <tbody>
      {data.map((row) => (
        <TableBody first={first} key={Math.random()} keys={keys} row={row} />
      ))}
    </tbody>
  );
}

function Header({ columns }) {
  return (
    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map((column) => (
          <th className="px-6 py-3" key={column} scope="col">
            <div className="flex items-center">{column}</div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Table({ props: { columns, data } }) {
  return (
    <div className="relative my-4 overflow-x-auto shadow-md sm:rounded-lg">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <Header columns={columns} />
          <Body data={data} />
        </table>
      </div>
    </div>
  );
}

function TableBody({ first, keys, row }) {
  return (
    <tr
      className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
      key={row[first]}
    >
      <th
        className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
        scope="row"
      >
        {row[first]}
      </th>
      {keys.slice(1).map((key) => (
        <TableData item={key} key={key} row={row} />
      ))}
    </tr>
  );
}

function TableData({ item, row }) {
  return <td className="px-6 py-4">{row[item]}</td>;
}

export { Header, Table };
