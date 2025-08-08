import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { Header } from "@/components/table";

const classes = "flex items-center gap-1";

function Actions({ row }) {
  const { t } = useTranslation();
  const aclasses =
    "font-medium text-blue-600 hover:underline dark:text-blue-500";
  if (row.viewLink) {
    return (
      <NavLink className={aclasses} to={row.viewLink}>
        <span className={classes}>
          <img src="https://style.datasafe.dev/images/icons/folder-open-outline.svg" />{" "}
          {t("viewData")}
        </span>
      </NavLink>
    );
  } else if (row.sharingLink) {
    const subject = t("emailSubject");
    const body = t("emailBody", { link: row.sharingLink });
    const href = `mailto:?subject=${subject}&body=${encodeURIComponent(body)}`;
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
  const { t } = useTranslation();
  return (
    <span className={classes}>
      <img src="https://style.datasafe.dev/images/icons/file-copy-alt-solid.svg" />{" "}
      {t("copyToClipboard")}
    </span>
  );
}

function Email() {
  const { t } = useTranslation();
  return (
    <span className={classes}>
      <img src="https://style.datasafe.dev/images/icons/mail-box-outline.svg" />{" "}
      {t("sendByEmail")}
    </span>
  );
}

function handleClick(link) {
  navigator.clipboard.writeText(link);
  alert("Copied the sharing link to clipboard");
}

function PatientsTable({ props: { data } }) {
  const { t } = useTranslation();
  const columns = [
    t("status"),
    t("patientReference"),
    t("submissionDate"),
    t("actions"),
  ];
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
  const { t } = useTranslation();
  switch (status) {
    case "active":
      return (
        <span className={classes}>
          <img src="https://style.datasafe.dev/images/icons/badge-check.svg" />{" "}
          <span className="dark:text-gray-400">{t("active")}</span>
        </span>
      );
    case "pending":
      return (
        <span className={classes}>
          <img src="https://style.datasafe.dev/images/icons/clock-arrow.svg" />{" "}
          <span className="dark:text-gray-400">{t("pending")}</span>
        </span>
      );
    case "refused":
      return (
        <span className={classes}>
          <img src="https://style.datasafe.dev/images/icons/close.svg" />{" "}
          <span className="dark:text-gray-400">{t("refused")}</span>
        </span>
      );
    case "revoked":
      return (
        <span className={classes}>
          <img src="https://style.datasafe.dev/images/icons/ban.svg" />{" "}
          <span className="dark:text-gray-400">{t("revoked")}</span>
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

export { PatientsTable };
