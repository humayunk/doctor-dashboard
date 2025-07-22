import { l } from "hds-lib-js";

import { strings } from "@/app/dr-lib.js";
import {
  IconActive,
  IconCopy,
  IconEmail,
  IconPending,
  IconRefused,
  IconRevoked,
  IconView,
} from "@/components/icons";
import { Header } from "@/components/table";

const classes = "flex items-center gap-1";
const columns = [
  l(strings.status),
  l(strings.patientReference),
  l(strings.submissionDate),
  l(strings.actions),
];

function Actions({ row }) {
  const aclasses =
    "font-medium text-blue-600 hover:underline dark:text-blue-500";
  if (row.viewLink) {
    return (
      <a className={aclasses} href={row.viewLink}>
        <View />
      </a>
    );
  } else if (row.sharingLink) {
    const body = `${l(strings.emailBody1)} ${row.sharingLink} ${l(strings.emailBody2)}`;
    const href = `mailto:?subject=${l(strings.emailSubject)}&body=${encodeURIComponent(body)}`;
    return (
      <span className="flex items-center gap-3">
        <a className={aclasses} href={href}>
          <Email />
        </a>
        <a
          className={aclasses}
          href="#"
          onClick={() => handleClick(row.sharingLink)}
        >
          <Copy />
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

function Copy() {
  return (
    <span className={classes}>
      <IconCopy /> {l(strings.copyToClipboard)}
    </span>
  );
}

function Email() {
  return (
    <span className={classes}>
      <IconEmail /> {l(strings.sendByEmail)}
    </span>
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
      return (
        <span className={classes}>
          <IconActive /> {l(strings.active)}
        </span>
      );
    case "pending":
      return (
        <span className={classes}>
          <IconPending /> {l(strings.pending)}
        </span>
      );
    case "refused":
      return (
        <span className={classes}>
          <IconRefused /> {l(strings.refused)}
        </span>
      );
    case "revoked":
      return (
        <span className={classes}>
          <IconRevoked /> {l(strings.revoked)}
        </span>
      );
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

function View() {
  return (
    <span className={classes}>
      <IconView /> {l(strings.viewData)}
    </span>
  );
}

export { PatientsTable };
