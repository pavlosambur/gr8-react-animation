import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { fetchData, groupMatchesByLeague } from "../utils/utils";
import Cookies from "js-cookie";
import AllLiveLeagueBlock from "./all-live/AllLiveLeagueBlock";

const AllLive: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [priorities, setPriorities] = useState<{ [key: string]: number }>({});
    const fetchInterval = 5000;

    // Функция для получения данных с ретри
    useEffect(() => {
        const fetchDataWithRetry = async (retries: number = 3) => {
            while (retries > 0) {
                try {
                    await fetchData(setData, setLoading, setError);
                    return;
                } catch (error) {
                    console.error("Ошибка при получении данных:", error);
                    retries -= 1;
                    if (retries === 0) {
                        setError("Failed to fetch after multiple attempts");
                    }
                }
            }
        };

        fetchDataWithRetry();
        const intervalId = setInterval(fetchDataWithRetry, fetchInterval);
        return () => clearInterval(intervalId);
    }, []);

    // Загружаем приоритеты из cookie при изменении данных
    useEffect(() => {
        const savedPriorities: Record<string, number> = {};
        Object.keys(groupMatchesByLeague(data)).forEach((leagueId) => {
            const savedPriority = Cookies.get(`leaguePriority-${leagueId}`);
            if (savedPriority) {
                savedPriorities[leagueId] = JSON.parse(savedPriority);
            }
        });

        setPriorities(savedPriorities);
    }, [data]);

    const togglePriority = (leagueId: string) => {
        const newPriority = priorities[leagueId] === 0 ? 1 : 0;
        setPriorities((prevPriorities) => ({
            ...prevPriorities,
            [leagueId]: newPriority,
        }));
        Cookies.set(`leaguePriority-${leagueId}`, JSON.stringify(newPriority), {
            expires: 365,
        });
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    const groupedMatches = groupMatchesByLeague(data);

    return (
        <HelmetProvider>
            <div className="flex flex-col w-full bg-[var(--background-secondary)] justify-start px-1 select-none">
                <Helmet>
                    <title>All live</title>
                </Helmet>
                <div className="flex w-full px-4 py-2" data-id="sport-title">
                    <img
                        src="https://mdlr.tech/assets/images/brand5/mdpi/img_sport_f.png"
                        alt=""
                        className="inline-block w-[22px] h-[22px]"
                    />
                    <span className="ml-2 font-sf-pro-display text-[var(--text-body)] font-semibold text-[18px] leading-[22px] tracking-[0.6px] normal-case">
                        Football
                    </span>
                </div>

                {Object.keys(groupedMatches).map((leagueId) => (
                    <AllLiveLeagueBlock
                        key={leagueId}
                        leagueId={leagueId}
                        matches={groupedMatches[leagueId]}
                        priority={priorities[leagueId]}
                        togglePriority={togglePriority}
                    />
                ))}
            </div>
        </HelmetProvider>
    );
};

export default AllLive;