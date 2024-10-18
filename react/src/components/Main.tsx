import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Main: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language; // получение текущего языка
  const basepath = process.env.VITE_BASE_PATH || "";

  return (
    <HelmetProvider>
      <div className="flex flex-col w-full max-w-5xl bg-[var(--background-secondary)] justify-start px-1 select-none">
        <Helmet>
          <title>...</title>
          <meta
            httpEquiv="refresh"
            content={`0; URL='${basepath}#/${lang}/alllive'`} // Adjusted to include base URL
          />
        </Helmet>
      </div>
    </HelmetProvider>
  );
};

export default Main;
