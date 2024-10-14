import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import Main from "./components/Main";
import AllLive from "./components/AllLive";
import { useTranslation } from "react-i18next";
import "./utils/i18n";

const App: React.FC = () => {
    const { i18n } = useTranslation();

    return (
        <HashRouter>
            <Routes>
                {/* Перенаправляем корень на язык по умолчанию */}
                <Route
                    path="/"
                    element={<Navigate to={`/${i18n.language}`} />}
                />

                {/* Роуты с поддержкой локализации */}
                <Route path="/:lang" element={<Main />} />
                <Route path="/:lang/alllive" element={<AllLive />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
