import { useTranslation } from "react-i18next";



export default function Component() {
  const { t } = useTranslation();

  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{t("chooseAFormInSideBar")}</h2>
      </article>
    </>
  );
}
