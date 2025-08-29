import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { Header } from "@/components/table";
import { useEffect, useState } from "react";
import type Collector from "hds-lib-js/types/appTemplates/Collector";
import type CollectorInvite from "hds-lib-js/types/appTemplates/CollectorInvite";

const classes = "flex items-center gap-1";

function Actions({ patient }: { patient: CollectorInvite }) {
  const { t } = useTranslation();
  const [sharingLink, setSharingLink] = useState<string | null>(null);
  useEffect(() => {
    const loadLink = async () => {
      if (patient.status !== "pending") return;
      const inviteSharingData = await patient.getSharingData();
      const patientURL = "https://demo-forms.datasafe.dev/patient.html";
      setSharingLink(
        `${patientURL}?apiEndpoint=${inviteSharingData.apiEndpoint}&eventId=${inviteSharingData.eventId}`,
      );
    };
    loadLink();
  }, [patient]);

  const aclasses =
    "font-medium text-blue-600 hover:underline dark:text-blue-500";
  if (patient.status === "active") {
    return (
      <NavLink
        className={aclasses}
        to={`/patients/${patient.collector.id}/${patient.key}`}
      >
        <span className={classes}>
          <img src="https://style.datasafe.dev/images/icons/folder-open-outline.svg" />{" "}
          {t("viewData")}
        </span>
      </NavLink>
    );
  } else if (patient.status === "pending") {
    if (sharingLink == null) {
      return <span className="flex items-center gap-3">{t("loading")}</span>;
    }
    const subject = t("emailSubject");
    const body = t("emailBody", { link: sharingLink });
    const href = `mailto:?subject=${subject}&body=${encodeURIComponent(body)}`;
    return (
      <span className="flex items-center gap-3">
        <a className={aclasses} href={href}>
          <Email />
        </a>
        <a
          className={aclasses}
          href="#"
          onClick={() => handleClick(sharingLink)}
        >
          <Copy />
        </a>
      </span>
    );
  }
}

function Body({ patients }: { patients: CollectorInvite[] }) {
  if (!patients?.[0]) {
    return;
  }
  return (
    <tbody>
      {patients.map((patient) => (
        <TableBody key={patient.key} patient={patient} />
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

function handleClick(link: string) {
  navigator.clipboard.writeText(link);
  alert("Copied the sharing link to clipboard");
}

function PatientsTable({ collector }: { collector: Collector }) {
  const { t } = useTranslation();
  const [patientsList, setPatientList] = useState<CollectorInvite[]>([]);

  useEffect(() => {
    const loadPatients = async () => {
      // check inbox for new incoming accepted requests
      console.log("Patient table use effects", { collector });
      const newCollectorInvites = await collector.checkInbox();
      console.log("## getPatients inbox ", newCollectorInvites);

      // get all patients
      const invites = await collector.getInvites();
      invites.sort(
        (a, b) => b.dateCreation.getTime() - a.dateCreation.getTime(),
      ); // sort by creation date reverse
      setPatientList(invites);
    };
    loadPatients();
  }, [collector]);

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
          <Body patients={patientsList} />
        </table>
      </div>
    </div>
  );
}

function Status({ status }: { status: string }) {
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

function TableBody({ patient }: { patient: CollectorInvite }) {
  return (
    <tr
      className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
      key={patient.key}
    >
      <th
        className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
        scope="row"
      >
        <Status status={patient.status} />
      </th>
      <td className="px-6 py-4">{patient.displayName}</td>
      <td className="px-6 py-4">{patient.dateCreation.toLocaleString()}</td>
      <td className="px-6 py-4">
        <Actions patient={patient} />
      </td>
    </tr>
  );
}

export { PatientsTable };
