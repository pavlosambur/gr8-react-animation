import React, { useState } from "react";
import classNames from "classnames";

import FootballScoreboard from "./Football/FootballScoreboard";

interface SportSectionName {
    sportName: string;
}

const SportSection: React.FC<SportSectionName> = ({ sportName }) => {
    const [isExpanded, setIsExpanded] = useState(true); // Состояние для управления фоновым изображением

    // Динамическое добавление классов в зависимости от состояния
    const mainDivClass = classNames(
        "flex",
        "flex-auto",
        "w-full",
        "border-black",
        "border-t",
        "border-b",
        "border-r",
        "border-l-2",
        "rounded",
        "text-black",
        "bg-zinc-400",
        {
            "bg-section-expand-plus": isExpanded,
            "bg-section-expand-minus": !isExpanded,
        },
        "bg-no-repeat",
        "bg-size-16px",
        "bg-position-10px",
        "pl-8",
        "transition-all",
        "duration-300"
    );

    const secondDivClass = classNames(
        "bg-gray-300",
        "w-full",
        "flex",
        "flex-auto",
        "border-black",
        "border-t",
        "border-b",
        "border-r",
        "border-l-2",
        "rounded",
        {
            hidden: isExpanded,
        }
    );

    const spanClass = classNames("font-semibold");

    const renderSportScoreboardComponent = () => {
        switch (sportName) {
            case "Football":
                return <FootballScoreboard />;
            default:
                return <div>Sport not found</div>;
        }
    };
    return (
        <>
            <div
                className={mainDivClass}
                onClick={() => setIsExpanded(!isExpanded)} // Меняем состояние при клике
            >
                <span className={spanClass}>{sportName}</span>
            </div>
            <div className={secondDivClass}>
                {renderSportScoreboardComponent()}
            </div>
        </>
    );
};

export default SportSection;
