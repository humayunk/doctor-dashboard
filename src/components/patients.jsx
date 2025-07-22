import { l } from "hds-lib-js";

import { strings } from "@/app/dr-lib.js";
import { Link } from "@/components/ui/link";
import { Header } from "@/components/table";

const columns = [
  l(strings.status),
  l(strings.patientReference),
  l(strings.submissionDate),
  l(strings.actions),
];

function Actions({ row }) {
  const classes =
    "font-medium text-blue-600 dark:text-blue-500 hover:underline";
  if (row.viewLink) {
    const content = `👀 ${l(strings.viewData)}`;
    return <Link content={content} href={row.viewLink} />;
  } else if (row.sharingLink) {
    const body = `${l(strings.emailBody1)} ${row.sharingLink} ${l(strings.emailBody2)}`;
    const copy = `📝 ${l(strings.copyToClipboard)}`;
    const email = `✉️ ${l(strings.sendByEmail)}`;
    const href = `mailto:?subject=${l(strings.emailSubject)}&body=${encodeURIComponent(body)}`;
    return (
      <span>
        <Link content={email} href={href} /> |{" "}
        <Link content={copy} onClick={() => handleClick(row.sharingLink)} />
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

function PatientsTable({ props: { data } }) {
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

function Status({ status }) {
  switch (status) {
    case "active":
      return <>✅ {l(strings.active)}</>;
    case "pending":
      return <>⏳ {l(strings.pending)}</>;
    case "refused":
      return <>⛔ {l(strings.refused)}</>;
    case "revoked":
      return <>❌ {l(strings.revoked)}</>;
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
