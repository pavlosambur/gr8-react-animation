import { useEffect, useRef, useState } from "react";

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
    const divRef = useRef<HTMLDivElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

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
            if (matchIsFinished) return "match ended";
            if (matchIsRegularTimeEnded < 0 && matchTimeStamp >= 5400)
                return "90:00";

            if (matchBreak === 1) return "half-time";

            if (matchCurrentPeriod === 1 && matchTimeStamp > 2700) {
                const overtime = currentTime - 2700;
                const overtimeMinutes = Math.floor(overtime / 60)
                    .toString()
                    .padStart(2, "0");
                const overtimeSeconds = (overtime % 60)
                    .toString()
                    .padStart(2, "0");
                return `45:00 +${overtimeMinutes}:${overtimeSeconds}`;
            }

            if (matchCurrentPeriod === 2 && matchTimeStamp > 5400) {
                const overtime = currentTime - 5400;
                const overtimeMinutes = Math.floor(overtime / 60)
                    .toString()
                    .padStart(2, "0");
                const overtimeSeconds = (overtime % 60)
                    .toString()
                    .padStart(2, "0");
                return `90:00 +${overtimeMinutes}:${overtimeSeconds}`;
            }

            return matchTimeStamp > 0
                ? `${Math.floor(currentTime / 60)
                      .toString()
                      .padStart(2, "0")}:${(currentTime % 60)
                      .toString()
                      .padStart(2, "0")}`
                : "match not started";
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

    // Обновляем ширину div после изменения formattedTime
    useEffect(() => {
        const adjustWidth = () => {
            // if (spanRef.current && divRef.current) {
            //     const widthUnit = 7;
            //     const currentSpanScrollWidth = spanRef.current.scrollWidth;
            //     // console.log(currentSpanScrollWidth);
            //     const newWidth =
            //         Math.ceil(currentSpanScrollWidth / widthUnit) * widthUnit;
            //     divRef.current.style.width = `${newWidth + widthUnit}px`;
            // }

            if (spanRef.current && divRef.current) {
                const widthUnit = 5;
                const divStyleWidth = parseFloat(
                    window.getComputedStyle(divRef.current).width
                );
                const spanStyleWidth = parseFloat(
                    window.getComputedStyle(spanRef.current).width
                );
                const newWidth =
                    (Math.ceil(spanStyleWidth / widthUnit) + 1) * widthUnit +
                    widthUnit;

                if (
                    divStyleWidth > newWidth ||
                    divStyleWidth <= spanStyleWidth + 3
                ) {
                    console.log("newWidth ", newWidth);
                    divRef.current.style.width = `${newWidth}px`;
                }
            }
        };

        adjustWidth();
    }, [formattedTime]);

    return (
        <div className="flex">
            <div
                ref={divRef}
                className="inline-flex font-sf-pro-display font-semibold text-[10px] leading-[14px] tracking-[0.7px] uppercase text-[var(--text-live)] text-nowrap whitespace-nowrap"
            >
                <span ref={spanRef}>{formattedTime}</span>
            </div>
        </div>
    );
};

export default AllLiveMatchDataMatchTimer;
