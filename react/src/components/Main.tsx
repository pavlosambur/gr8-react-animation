import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Main: React.FC = () => {
    const { i18n } = useTranslation();
    const lang = i18n.language; // получение текущего языка

    return (
        <HelmetProvider>
            <div className="flex flex-col w-full max-w-5xl bg-[var(--background-secondary)] justify-start px-1 select-none">
                <Helmet>
                    <title>Main Page</title>
                    <meta
                        httpEquiv="refresh"
                        content={`0; URL='${process.env.REACT_APP_BASE_PATH}#/${lang}/alllive'`} // Adjusted to include base URL
                    />
                </Helmet>
            </div>
        </HelmetProvider>
    );
};

export default Main;
