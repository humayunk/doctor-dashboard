const columns = ["Status", "Patient Reference", "Submission Date", "Actions"];

function Actions({ row }) {
  const classes =
    "font-medium text-blue-600 dark:text-blue-500 hover:underline";
  if (!row.sharingLink) {
    return (
      <a href="/patients/details/janedoe/intake" className={classes}>
        👀 view data
      </a>
    );
  } else {
    const body =
      "Hello,\n\nI am sending you a link to fill out a form.\nPlease click on the link below to access the form: \n\n" +
      row.sharingLink +
      "\n\nBest regards,\nYour Doctor";
    const href = `mailto:?subject=Invitation&body=${encodeURIComponent(body)}`;
    return (
      <span>
        <a href={href} className={classes}>
          ✉️ Send by email
        </a>{" "}
        |{" "}
        <a
          href="#"
          onClick={() => handleClick(row.sharingLink)}
          className={classes}
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
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map((column) => (
          <th key={column} scope="col" className="px-6 py-3">
            <div className="flex items-center">{column}</div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

function PatientsTable({ props: { data } }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
      key={row.reference}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
