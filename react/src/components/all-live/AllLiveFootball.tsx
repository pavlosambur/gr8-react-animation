import React, { useEffect, useState } from "react";
import { fetchData, groupMatchesByLeague } from "../../utils/utils";
import Cookies from "js-cookie";

import AllLiveLeagueBlock from "./AllLiveLeagueBlock";

const AllLiveFootball: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priorities, setPriorities] = useState<{ [key: string]: number }>({});
  const [refreshKey, setRefreshKey] = useState(0); // ключ для перезагрузки
  const fetchInterval = 5000;

  // Функция для получения данных с ретри
  // Функция для получения данных с ретри
  useEffect(() => {
    const fetchDataWithRetry = async () => {
      try {
        await fetchData("soccer_data.json", setData, setLoading, setError);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);

        // Если произошла ошибка, ждём 3 секунды и пробуем снова
        setTimeout(() => {
          setRefreshKey((prevKey) => prevKey + 1); // обновляем ключ для перезагрузки
        }, 3000);
      }
    };

    fetchDataWithRetry();
    const intervalId = setInterval(fetchDataWithRetry, fetchInterval);
    return () => clearInterval(intervalId);
  }, [refreshKey]); // добавляем зависимость от ключа

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
    <>
      <div className="flex w-full px-4 py-2" data-id="sport-title">
        <img
          src="https://mdlr.tech/assets/images/brand5/mdpi/img_sport_f.png"
          alt=""
          className="inline-block w-[22px] h-[22px]"
        />
        <div className="ml-2 font-sf-pro-display text-[var(--text-body)] font-semibold text-[18px] leading-[22px] tracking-[0.6px] normal-case">
          <span>Football</span>
        </div>
      </div>

      <div className="flex flex-col">
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
    </>
  );
};

export default AllLiveFootball;
