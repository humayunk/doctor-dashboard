const columns = ["Status", "Patient Reference", "Submission Date", "Actions"];

function Actions({ row }) {
  const classes =
    "font-medium text-blue-600 dark:text-blue-500 hover:underline";
  if (row.viewLink) {
    return (
      <a className={classes} href={row.viewLink}>
        👀 view data
      </a>
    );
  } else if (row.sharingLink) {
    const body =
      "Hello,\n\nI am sending you a link to fill out a form.\nPlease click on the link below to access the form: \n\n" +
      row.sharingLink +
      "\n\nBest regards,\nYour Doctor";
    const href = `mailto:?subject=Invitation&body=${encodeURIComponent(body)}`;
    return (
      <span>
        <a className={classes} href={href}>
          ✉️ Send by email
        </a>{" "}
        |{" "}
        <a
          className={classes}
          href="#"
          onClick={() => handleClick(row.sharingLink)}
        >
          ️📝 Copy link to clipboard
        </a>
      </span>
    );
  }
}

function Body({ data }) {
  if (!data || !data[0]) {
    return;
  }
  return (
    <tbody>
      {data.map((row) => (
        <TableBody key={Math.random()} row={row} />
      ))}
    </tbody>
  );
}

function handleClick(link) {
  navigator.clipboard.writeText(link);
  alert("Copied the sharing link to clipboard");
}

function Header() {
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

function PatientsTable({ props: { data } }) {
  return (
    <div className="relative my-4 overflow-x-auto shadow-md sm:rounded-lg">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <Header />
          <Body data={data} />
        </table>
      </div>
    </div>
  );
}

function Status({ status }) {
  switch (status) {
    case "active":
      return <>✅ active</>;
    case "pending":
      return <>⏳ pending</>;
    case "refused":
      return <>⛔ refused</>;
    case "revoked":
      return <>❌ revoked</>;
    default:
      return status;
  }
}

function TableBody({ row }) {
  return (
    <tr
      className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
      key={row.reference}
    >
      <th
        className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
        scope="row"
      >
        <Status status={row.status} />
      </th>
      <td className="px-6 py-4">{row.reference}</td>
      <td className="px-6 py-4">{row.date}</td>
      <td className="px-6 py-4">
        <Actions row={row} />
      </td>
    </tr>
  );
}

export { PatientsTable };
