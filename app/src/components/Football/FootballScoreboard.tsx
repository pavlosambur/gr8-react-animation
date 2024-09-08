import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MatchTimerProps {
    initialMinutes: number;
}

const MatchTimer: React.FC<MatchTimerProps> = ({ initialMinutes }) => {
    const [secondsElapsed, setSecondsElapsed] = useState(initialMinutes * 60); // Переводим минуты в секунды

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsElapsed((prev) => prev + 1);
        }, 1000); // Обновляем каждую секунду

        return () => clearInterval(interval); // Очищаем интервал при размонтировании
    }, []);

    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;

    return (
        <div>
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
        </div>
    );
};

interface TeamInfoProps {
    teamName: string;
    teamLogo: string;
    results: string[];
}
const TeamInfo: React.FC<TeamInfoProps> = ({ teamName, teamLogo, results }) => {
    return (
        <div className="flex flex-1 flex-col items-center">
            {/* team-logo */}
            <div className="flex flex-1 justify-center mx-auto mb-2">
                <div className="flex w-16 h-16 border rounded-full justify-center items-center">
                    <img className="h-10 w-10" src={teamLogo} alt="" />
                </div>
            </div>
            {/* team name */}
            <span className="font-sf-pro font-normal text-xs">{teamName}</span>
            {/* last games */}
            <div className="flex flex-row mt-3 mb-2">
                {results.map((result, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 bg-${result} rounded mx-2px`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

interface ScoreDisplayProps {
    matchHomeScore: number;
    matchAwayScore: number;
    curentStage: string;
    nextStage: string;
    firstHalfHomeScore?: number | null;
    firstHalfAwayScore?: number | null;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
    matchHomeScore,
    matchAwayScore,
    curentStage,
    firstHalfHomeScore,
    firstHalfAwayScore,
}) => {
    const stageRef = useRef<HTMLDivElement>(null);
    const [displayStage, setDisplayStage] = useState(curentStage);
    const [showTimer, setShowTimer] = useState(false); // Состояние для отображения таймера
    const [initialMinutes, setInitialMinutes] = useState(0); // Добавляем состояние для начальных минут таймера

    useEffect(() => {
        const timeline = gsap.timeline(); // Создаем GSAP таймлайн

        // Анимация исчезновения текущей стадии
        timeline
            .to(stageRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.out",
            })
            .call(() => {
                // Меняем текст на следующую стадию через состояние
                setDisplayStage(curentStage);
            })
            // Анимация появления новой стадии
            .to(stageRef.current, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
            });

        // Проверка стадии для запуска таймера
        if (curentStage === "Match started" || curentStage === "Second half") {
            // Запускаем вторую анимацию только для стадий "Match started" и "Second half started"
            timeline
                .to(stageRef.current, {
                    opacity: 0, // Исчезновение текста
                    duration: 1,
                    ease: "power2.out",
                })
                .call(() => {
                    // Скрываем текст и показываем таймер
                    setShowTimer(true);

                    // Устанавливаем начальные минуты для таймера в зависимости от стадии
                    if (curentStage === "Match started") {
                        setInitialMinutes(0); // Для первого тайма
                    } else if (curentStage === "Second half") {
                        setInitialMinutes(45); // Для второго тайма
                    }
                })
                .to(stageRef.current, {
                    opacity: 1, // Появление таймера
                    duration: 1,
                    ease: "power2.out",
                });
        } else {
            // Если стадия не "Match started" и не "Second half started", сбрасываем таймер
            setShowTimer(false);
        }
    }, [curentStage]);

    return (
        <div className="flex flex-col items-center">
            <div
                ref={stageRef}
                className="flex justify-center font-sf-pro-display font-semibold text-[10px] leading-[14px] tracking-[0.7px] uppercase text-textLive whitespace-normal"
            >
                {showTimer ? (
                    <MatchTimer initialMinutes={initialMinutes} />
                ) : (
                    displayStage
                )}{" "}
                {/* Показываем либо таймер, либо текущую стадию */}
            </div>

            {/* Счёт матча */}
            <div className="flex flex-row justify-center font-sf-pro-display font-semibold text-[24px] leading-[30px] tracking-[0.8px]">
                <span>{matchHomeScore}</span>
                <span>:</span>
                <span>{matchAwayScore}</span>
            </div>

            {/* Счёт первого тайма */}
            {firstHalfHomeScore !== undefined &&
                firstHalfAwayScore !== undefined && (
                    <div className="flex flex-row justify-center font-sf-pro-display font-semibold text-[10px] leading-[14px] tracking-[0.7px] text-textLive">
                        <span>{firstHalfHomeScore}</span>
                        <span>:</span>
                        <span>{firstHalfAwayScore}</span>
                    </div>
                )}
        </div>
    );
};

interface H2HSectionProps {
    homeWins: number;
    draws: number;
    awayWins: number;
}
const H2HSection: React.FC<H2HSectionProps> = ({
    homeWins,
    draws,
    awayWins,
}) => {
    return (
        <div className="flex flex-row justify-center mt-1 gap-x-[6px]">
            {/* home wins */}
            <div className="flex flex-col text-[10px]">
                <span className="text-textTitle">{homeWins}</span>
                <span className="text-textDisable">W</span>
            </div>
            {/* divider */}
            <div className="h-full w-px bg-dividerMain"></div>
            {/* draws */}
            <div className="flex flex-col text-[10px]">
                <span className="text-textTitle">{draws}</span>
                <span className="text-textDisable">D</span>{" "}
                {/* D обозначает Draw (ничья) */}
            </div>
            {/* divider */}
            <div className="h-full w-px bg-dividerMain"></div>
            {/* away wins */}
            <div className="flex flex-col text-[10px]">
                <span className="text-textTitle">{awayWins}</span>
                <span className="text-textDisable">W</span>
            </div>
        </div>
    );
};

const ChangeMatchStage: React.FC<{
    onStageChange: () => void;
    nextStage: string;
}> = ({ onStageChange, nextStage }) => {
    return (
        <button
            className="bg-zinc-400 hover:bg-zinc-500 text-black font-normal py-2 px-4 rounded w-80 self-auto"
            onClick={onStageChange}
        >
            Change match stage to: {nextStage}
        </button>
    );
};

const FootballScoreboard: React.FC = () => {
    const matchStages = [
        "Starting soon",
        "Match started",
        "Half-time",
        "Second half",
        "Match ended",
    ];
    const [currentStageIndex, setCurrentStageIndex] = useState(0);

    const handleStageChange = () => {
        setCurrentStageIndex(
            (prevIndex) => (prevIndex + 1) % matchStages.length
        );
    };
    const nextStageIndex = (currentStageIndex + 1) % matchStages.length;
    const nextStage = matchStages[nextStageIndex];
    return (
        <div className="flex w-full text-black">
            <div className="flex w-1/2 py-5 justify-center">
                {/* mobile wrapper */}
                <div className="w-80 flex bg-white">
                    {/* scoreboard wrapper */}
                    <div className="flex w-full flex-row my-2">
                        {/* home team */}
                        <TeamInfo
                            teamName="Manchester City"
                            teamLogo="https://secure.cache.images.core.optasports.com/soccer/teams/150x150/676.png"
                            results={[
                                "undefinedResult",
                                "win",
                                "lose",
                                "draw",
                                "win",
                            ]}
                        />

                        {/* scoreboard */}

                        <div className="flex w-[90px] flex-col">
                            <ScoreDisplay
                                matchHomeScore={0}
                                matchAwayScore={0}
                                curentStage={matchStages[currentStageIndex]} // Текущая стадия
                                nextStage={matchStages[nextStageIndex]} // Следующая стадия
                                firstHalfHomeScore={null}
                                firstHalfAwayScore={undefined}
                            />

                            {/* h2h section */}
                            <H2HSection homeWins={2} draws={3} awayWins={4} />
                        </div>

                        {/* away team */}
                        <TeamInfo
                            teamName="Arsenal"
                            teamLogo="https://secure.cache.images.core.optasports.com/soccer/teams/150x150/660.png"
                            results={[
                                "undefinedResult",
                                "win",
                                "win",
                                "win",
                                "win",
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className="flex w-1/2 py-5 justify-center">
                {/* change match stage */}
                <div className="w-full justify-center">
                    <ChangeMatchStage
                        onStageChange={handleStageChange}
                        nextStage={nextStage}
                    />
                </div>
            </div>
        </div>
    );
};

export default FootballScoreboard;
