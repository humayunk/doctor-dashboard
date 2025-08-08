import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import type { Route } from "./+types/settings";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { fid: params.formId, iid: params.inviteId };
}

export default function Component() {
  const { t } = useTranslation();
  const languageOptions = [
    { text: "English", value: "en" },
    { text: "Español", value: "es" },
  ];
  const themeOptions = [
    { text: t("darkMode"), value: "dark" },
    { text: t("lightMode"), value: "light" },
  ];

  const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const dataTheme = localStorage.getItem("dataTheme") ?? defaultTheme;
  const [theme, setTheme] = useState(dataTheme);
  const switchTheme = (event) => {
    setTheme(event.target.value);
  };

  const defaultLang = localStorage.getItem("i18nextLng") ?? "en";
  const [lng, setLng] = useState(defaultLang);
  const switchLng = (event) => {
    setLng(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("i18nextLng", lng);
    localStorage.setItem("dataTheme", theme);
    document.body.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [lng, theme]);

  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{t("settings")}</h2>
        <h3 className="italic">{t("settingsInstructions")}</h3>
      </article>
      <form className="flex max-w-sm items-center gap-4">
        <label
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="languageSelect"
        >
          {t("language")}
        </label>
        <select
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          id="languageSelect"
          onChange={switchLng}
          value={lng}
        >
          {languageOptions.map(({ text, value }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
        <label
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="themeSelect"
        >
          {t("theme")}
        </label>
        <select
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          id="themeSelect"
          onChange={switchTheme}
          value={theme}
        >
          {themeOptions.map(({ text, value }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}
