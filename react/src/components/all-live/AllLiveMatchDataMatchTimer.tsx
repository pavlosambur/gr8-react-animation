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
        // Initialize currentTime with matchTimeStamp
        setCurrentTime(matchTimeStamp);

        // Start timer if matchTimeStamp is greater than 0
        if (matchTimeStamp > 0) {
            const intervalId = setInterval(() => {
                setCurrentTime((prevTime) => prevTime + 1);
            }, 1000);

            // Clear interval on unmount or change of matchTimeStamp
            return () => clearInterval(intervalId);
        }
    }, [matchTimeStamp]);

    useEffect(() => {
        // Adjust width of div based on the content width of span
        const adjustWidth = () => {
            if (spanRef.current && divRef.current) {
                const widthUnit = 3;
                const currentWidth = spanRef.current.offsetWidth;
                const newWidth =
                    Math.ceil(currentWidth / widthUnit) * widthUnit;
                const currentDivWidth = divRef.current.offsetWidth;

                // Adjust width if it differs from the new calculated width
                if (
                    currentWidth < currentDivWidth - widthUnit * 2 ||
                    currentWidth > currentDivWidth
                ) {
                    divRef.current.style.width = `${newWidth}px`;
                }
            }
        };

        adjustWidth();

        // Observer to track span width changes
        const observer = new ResizeObserver(() => {
            adjustWidth();
        });

        // Start observing the span element
        if (spanRef.current) {
            observer.observe(spanRef.current);
        }

        // Cleanup observer on component unmount
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

    // Formats the match time based on the match state
    const formattedTime = () => {
        if (matchIsFinished) return "match ended";

        if (matchIsRegularTimeEnded < 0 && matchTimeStamp >= 5400)
            return "regular time ended";

        // Case 1: Half-time
        if (matchBreak === 1) return "half-time";

        // Case 2: First period after 45:00
        if (matchCurrentPeriod === 1 && matchTimeStamp > 2700) {
            const overtime = currentTime - 2700;
            const overtimeMinutes = Math.floor(overtime / 60)
                .toString()
                .padStart(2, "0");
            const overtimeSeconds = (overtime % 60).toString().padStart(2, "0");
            return `45:00 +${overtimeMinutes}:${overtimeSeconds}`;
        }

        // Case 3: Second period after 90:00
        if (matchCurrentPeriod === 2 && matchTimeStamp > 5400) {
            const overtime = currentTime - 5400;
            const overtimeMinutes = Math.floor(overtime / 60)
                .toString()
                .padStart(2, "0");
            const overtimeSeconds = (overtime % 60).toString().padStart(2, "0");
            return `90:00 +${overtimeMinutes}:${overtimeSeconds}`;
        }

        // Default case: Regular match time
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
                className="inline-flex font-sf-pro-display font-semibold text-[10px] leading-[14px] tracking-[0.7px] uppercase text-[var(--text-live)] text-nowrap whitespace-nowrap"
            >
                {formattedTime()}
            </span>
        </div>
    );
};

export default AllLiveMatchDataMatchTimer;
