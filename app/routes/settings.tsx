import { getAppManaging } from "@/dr-lib";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const DEFAULT_LANGUAGE = "en";
const DEFAULT_THEME = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

export default function Component() {
  const appManaging = getAppManaging();
  const { t } = useTranslation();
  const [settings, setSettings] = useState<any | null>({
    language: DEFAULT_LANGUAGE,
    theme: DEFAULT_THEME,
  });

  const languageOptions = [
    { text: "English", value: "en" },
    { text: "Español", value: "es" },
  ];
  const themeOptions = [
    { text: t("darkMode"), value: "dark" },
    { text: t("lightMode"), value: "light" },
  ];

  const switchTheme = (event) => {
    saveSettings("theme", event.target.value);
  };

  const switchLng = async (event) => {
    saveSettings("language", event.target.value);
  };

  async function saveSettings(key: string, value: any) {
    setSettings({ ...settings, [key]: value });
    await appManaging.setCustomSettings({ ...settings });
  }

  // settings loader
  useEffect(() => {
    const loadSettings = async () => {
      const appSettings = await appManaging.getCustomSettings();
      setSettings(appSettings);
    };
    loadSettings();
  }, [appManaging]);

  // update UI on state change
  useEffect(() => {
    document.body.setAttribute("data-theme", settings.theme);
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings]);

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
          value={settings.language}
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
          value={settings.theme}
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
