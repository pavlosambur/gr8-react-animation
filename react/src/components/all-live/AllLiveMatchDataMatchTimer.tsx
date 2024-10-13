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

    useEffect(() => {
        const adjustWidth = () => {
            if (spanRef.current && divRef.current) {
                const currentWidth = spanRef.current.offsetWidth;
                const newWidth = Math.ceil(currentWidth / 5) * 5;
                const currentDivWidth = divRef.current.offsetWidth;

                if (
                    currentWidth < currentDivWidth - 7 ||
                    currentWidth > currentDivWidth
                ) {
                    divRef.current.style.width = `${newWidth}px`;
                }
            }
        };

        adjustWidth();

        const observer = new ResizeObserver(() => {
            adjustWidth();
        });

        if (spanRef.current) {
            observer.observe(spanRef.current);
        }

        return () => {
            if (spanRef.current) {
                observer.unobserve(spanRef.current);
            }
        };
    }, [
        currentTime,
        matchBreak,
        matchCurrentPeriod,
        matchIsRegularTimeEnded,
        matchIsFinished,
    ]);

    // Форматированное значение времени
    const formattedTime = () => {
        if (matchIsFinished) return "match ended";

        if (matchIsRegularTimeEnded < 0 && matchTimeStamp >= 5400)
            return "regular time ended";

        // Случай 1: Перерыв
        if (matchBreak === 1) return "half-time";

        // Случай 2: Первый период после 45:00
        if (matchCurrentPeriod === 1 && matchTimeStamp > 2700) {
            const overtime = currentTime - 2700;
            const overtimeMinutes = Math.floor(overtime / 60)
                .toString()
                .padStart(2, "0");
            const overtimeSeconds = (overtime % 60).toString().padStart(2, "0");
            return `45:00 +${overtimeMinutes}:${overtimeSeconds}`;
        }

        // Случай 3: Второй период после 90:00
        if (matchCurrentPeriod === 2 && matchTimeStamp > 5400) {
            const overtime = currentTime - 5400;
            const overtimeMinutes = Math.floor(overtime / 60)
                .toString()
                .padStart(2, "0");
            const overtimeSeconds = (overtime % 60).toString().padStart(2, "0");
            return `90:00 +${overtimeMinutes}:${overtimeSeconds}`;
        }

        // Обычный случай времени матча
        return matchTimeStamp > 0
            ? `${Math.floor(currentTime / 60)
                  .toString()
                  .padStart(2, "0")}:${(currentTime % 60)
                  .toString()
                  .padStart(2, "0")}`
            : "match not started";
    };

    return (
        <div ref={divRef} className="flex min-w-8">
            <span
                ref={spanRef}
                className="inline-flex font-sf-pro-display font-semibold text-[10px] leading-[14px] tracking-[0.7px] uppercase text-[var(--text-live)]"
            >
                {formattedTime()}
            </span>
        </div>
    );
};

export default AllLiveMatchDataMatchTimer;
