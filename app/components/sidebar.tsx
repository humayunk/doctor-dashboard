import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { logout } from "@/dr-lib";

function FormEntry({ href, name }) {
  const isCurrent = getId(window.location.pathname) === getId(href);
  const classes = isCurrent
    ? "flex items-center p-2 text-blue-600 bg-gray-100 rounded-lg active dark:bg-gray-800 dark:text-blue-500 group"
    : "flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 group";

  return (
    <li key={name}>
      <NavLink className={classes} to={href}>
        {name}
      </NavLink>
    </li>
  );
}

function getId(path) {
  return path.split("/")[2];
}

function Sidebar({ user }) {
  const { t } = useTranslation();
  const props = JSON.parse(localStorage.getItem("props"));
  if (!props.forms) {
    props.forms = { summary: [] };
  }
  const forms = props.forms.summary;
  return (
    <>
      <button
        aria-controls="sidebar-multi-level-sidebar"
        className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        type="button"
      >
        <span className="sr-only">{t("openSidebar")}</span>
        <img src="https://style.datasafe.dev/images/icons/bars-from-left.svg" />
      </button>

      <aside
        aria-label="Sidebar"
        className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        id="sidebar-multi-level-sidebar"
      >
        <NavLink to="/">
          <img
            alt="Logo"
            className="mx-2"
            src="https://style.datasafe.dev/images/logos/horizontal/hds-logo-hz-1024x400-hz-color.png"
            width="200px"
          />
        </NavLink>
        <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <div className="group flex items-center rounded-lg p-2 text-gray-900 dark:text-white">
                <img src="https://style.datasafe.dev/images/icons/file-pen-solid.svg" />
                <span className="ms-3 flex-1 whitespace-nowrap dark:text-gray-300">
                  {t("forms")}
                </span>
              </div>
            </li>
            {forms.map(({ href, id, name }) => (
              <FormEntry href={href} key={id} name={name} />
            ))}
          </ul>
          <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 font-medium dark:border-gray-700">
            <li>
              <a
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                href="https://www.healthdatasafe.org/"
                rel="noreferrer"
                target="_blank"
              >
                <img src="https://style.datasafe.dev/images/icons/life-saver-solid.svg" />
                <span className="ms-3 flex-1 whitespace-nowrap dark:text-gray-300">
                  {t("help")}
                </span>
              </a>
            </li>
            <li>
              <NavLink
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={logout}
                to="/"
              >
                <img src="https://style.datasafe.dev/images/icons/arrow-left-to-bracket.svg" />
                <span className="ms-3 flex-1 whitespace-nowrap dark:text-gray-300">
                  {user}: {t("logOut")}
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export { Sidebar };
