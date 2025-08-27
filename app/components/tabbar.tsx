import type Collector from "hds-lib-js/types/appTemplates/Collector";
import i18next from "i18next";
import { NavLink } from "react-router-dom";

function splitPop(path: string) {
  return path.split("/").pop();
}

function Tab({ href, label}: { href: string, label: string}) {
  const isCurrent = splitPop(href) === splitPop(window.location.pathname);
  const classes = isCurrent
    ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
    : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";

  return (
    <NavLink
      aria-current={isCurrent ? "page" : undefined}
      className={classes}
      to={href}
    >
      {label}
    </NavLink>
  );
}

function Tabbar({ collector } : { collector: Collector}) {
  const tabs : { href: string; label: string }[] = [] ;
  const { requestContent } = collector.statusData;

  if (requestContent.app.data.forms) {
    for (const [formSectionKey, formSection] of Object.entries(
      requestContent.app.data.forms,
    ) as any) {
      tabs.push({
        href: `/forms/${collector.id}/section-${formSectionKey}`,
        label: `${i18next.t("section")} ${(formSection as any).name}`,
      });
    }
  }

  return (
    <ul className="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <li className="me-2" key="patients">
        <Tab href={`/forms/${collector.id}/patients`} label={i18next.t("patients")} />
      </li>
      <li className="me-2" key="details">
        <Tab href={`/forms/${collector.id}/details`} label={i18next.t("Details")} />
      </li>
      {tabs.map(({ href, label }) => (
        <li className="me-2" key={label}>
          <Tab href={href} label={label} />
        </li>
      ))}
    </ul>
  );
}

export { Tabbar };
