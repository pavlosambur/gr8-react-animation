import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const AllLiveMatchDataMatchTimer: React.FC<{
    matchTimeStamp: number;
    matchBreak?: number;
    matchCurrentPeriod?: number;
    matchIsRegularTimeEnded?: number;
    matchIsFinished?: boolean;
}> = ({
    matchTimeStamp,
    matchBreak = 0,
    matchCurrentPeriod = 0,
    matchIsRegularTimeEnded = 0,
    matchIsFinished = false,
}) => {
    const [currentTime, setCurrentTime] = useState(matchTimeStamp);
    const [formattedTime, setFormattedTime] = useState("match not started");
    const { t } = useTranslation();

    useEffect(() => {
        setCurrentTime(matchTimeStamp);

        // Если matchTimeStamp больше 0, запускаем таймер
        if (matchTimeStamp > 0) {
            const intervalId = setInterval(() => {
                setCurrentTime((prevTime) => prevTime + 1);
            }, 1000);

            // Очищаем интервал при изменении matchTimeStamp или размонтировании
            return () => clearInterval(intervalId);
        }
    }, [matchTimeStamp]);

    // Обновляем `formattedTime` при изменении зависимостей
    useEffect(() => {
        const formatTime = () => {
            if (matchIsFinished) return t("MATCH_ENDED");
            if (matchIsRegularTimeEnded < 0 && matchTimeStamp >= 5400)
                return t("REGULAR_TIME_ENDED");

            if (matchBreak === 1) return t("HALF_TIME");

            if (matchCurrentPeriod === 1 && matchTimeStamp > 2700) {
                const overtime = currentTime - 2700;
                const overtimeMinutes = Math.floor(overtime / 60)
                    .toString()
                    .padStart(2, "0");
                const overtimeSeconds = (overtime % 60)
                    .toString()
                    .padStart(2, "0");
                return `${t(
                    "OVERTIME_PREFIX_45"
                )}\u00A0+${overtimeMinutes}:${overtimeSeconds}`;
            }

            if (matchCurrentPeriod === 2 && matchTimeStamp > 5400) {
                const overtime = currentTime - 5400;
                const overtimeMinutes = Math.floor(overtime / 60)
                    .toString()
                    .padStart(2, "0");
                const overtimeSeconds = (overtime % 60)
                    .toString()
                    .padStart(2, "0");
                return `${t(
                    "OVERTIME_PREFIX_90"
                )}\u00A0+${overtimeMinutes}:${overtimeSeconds}`;
            }

            return matchTimeStamp > 0
                ? `${Math.floor(currentTime / 60)
                      .toString()
                      .padStart(2, "0")}:${(currentTime % 60)
                      .toString()
                      .padStart(2, "0")}`
                : t("MATCH_NOT_STARTED");
        };

        setFormattedTime(formatTime());
    }, [
        currentTime,
        matchTimeStamp,
        matchBreak,
        matchCurrentPeriod,
        matchIsRegularTimeEnded,
        matchIsFinished,
    ]);

    // Разделяем formattedTime на цифры и символы
    const splitFormattedTime = formattedTime
        .split(/(\d)/)
        .map((part, index) => {
            if (part.match(/\d/) || part === " ") {
                return (
                    <span
                        key={index}
                        style={{ width: "7px", display: "inline-block" }}
                    >
                        {part}
                    </span>
                );
            } else {
                return <span key={index}>{part}</span>;
            }
        });

    return (
        <div className="inline-flex font-sf-pro-display font-semibold text-[10px] leading-[14px] tracking-[0.7px] uppercase text-[var(--text-live)] transition-all duration-300 ease-in-out">
            {splitFormattedTime}
        </div>
    );
};

export default AllLiveMatchDataMatchTimer;
