import { useState, useRef } from "react";
import { motion } from "framer-motion";
import FavoriteIconLeague from "./FavoriteIconLeague";
import LeagueTitle from "./LeagueTitle";
import MatchBlock from "./MatchBlock";

interface LeagueBlockProps {
    leagueId: string;
    matches: any[];
    priority: number;
    togglePriority: (leagueId: string) => void;
}

const LeagueBlock: React.FC<LeagueBlockProps> = ({
    leagueId,
    matches,
    priority,
    togglePriority,
}) => {
    const [isOpen, setIsOpen] = useState(true); // Для скрытия/открытия матчей
    const contentRef = useRef<HTMLDivElement>(null); // Реф для контента

    const handleToggleMatches = () => {
        setIsOpen((prev) => !prev); // Переключаем состояние открытия/закрытия
    };

    const handleFavoriteClick = () => {
        togglePriority(leagueId);
    };

    return (
        <motion.div
            className={`flex flex-col w-full bg-[var(--background-main)] rounded-2xl mb-2 ${
                priority === 0 ? "order-0" : "order-1"
            }`}
            layout
        >
            <div className="flex w-full flex-col">
                <div
                    className={`${
                        matches.length >= 0
                            ? `sticky top-0 border-b-[var(--divider-main)] border-b ${
                                  isOpen ? "rounded-t-2xl" : "rounded-2xl"
                              }`
                            : ""
                    } bg-[var(--background-main)] flex w-full px-4 h-10 items-center justify-between`}
                >
                    <div
                        className="flex w-full justify-between  cursor-pointer"
                        onClick={handleToggleMatches}
                    >
                        <div className="flex items-center">
                            <LeagueTitle
                                countryCode={matches[0].CE}
                                leagueName={matches[0].LE}
                            />
                        </div>
                        <motion.div
                            className="flex items-center justify-center w-6 h-6"
                            animate={{ rotate: isOpen ? 0 : 180 }} // Поворачиваем на 180 градусов
                            transition={{ duration: 0.3 }}
                        >
                            <span>
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.8 14.2C14.9 13.3 12 10.4 12 10.4C12 10.4 9.2 13.3 8.2 14.2C7.8 14.6 7.2 14.6 6.8 14.2C6.4 13.8 6.4 13.2 6.8 12.8C7.9 11.7 10.2 9.4 11.3 8.3C11.7 7.9 12.3 7.9 12.7 8.3C13.8 9.4 16.1 11.7 17.2 12.8C17.6 13.2 17.6 13.8 17.2 14.2C16.8 14.6 16.2 14.6 15.8 14.2Z"
                                        fill="#B7B7B7"
                                    ></path>
                                </svg>
                            </span>
                        </motion.div>
                    </div>
                    <FavoriteIconLeague
                        size={4}
                        leagueId={leagueId}
                        onClick={handleFavoriteClick}
                    />
                </div>

                <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0 }} // Анимируем высоту
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }} // Отключаем прокрутку
                    ref={contentRef}
                >
                    {matches.map((match, index) => (
                        <MatchBlock key={index} match={match} />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LeagueBlock;
