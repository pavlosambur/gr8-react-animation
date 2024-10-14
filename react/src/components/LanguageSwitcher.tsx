import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        navigate(`/${lng}`);
    };

    return (
        <div>
            <button onClick={() => changeLanguage("en")}>English</button>
            <button onClick={() => changeLanguage("uk")}>Українська</button>
        </div>
    );
};

export default LanguageSwitcher;
