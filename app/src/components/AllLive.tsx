import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { iso31661 } from "iso-3166";

function getCountryCode(countryName: string) {
    const country = iso31661.find(
        (entry) => entry.name.toLowerCase() === countryName.toLowerCase()
    );
    return country ? country.alpha3.toLowerCase() : "cyb_f"; // Если страна найдена, возвращаем её трёхбуквенный код, если нет — 'N/A'
}

// https://megapari.com/service-api/LiveFeed/Get1x2_VZip?sports=1&count=1000&gr=824&mode=4&country=2&partner=192&getEmpty=true&virtualSports=true&countryFirst=true&noFilterBlockEvent=true

const FavoriteIconLeague: React.FC<{ size: number }> = ({ size }) => {
    return (
        <div className="flex w-4 h-4">
            <span>
                <svg
                    className={`w-${size} h-${size}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.9499 6.1L13.5526 10.3H18.0601L14.5543 13.3L15.8564 17.6L11.9499 15.1L8.04341 17.6L9.34558 13.3L5.83974 10.3H10.3472L11.9499 6.1ZM11.9499 2C11.0484 2 10.7479 4 8.94491 8.3H3.43573C1.83306 8.3 1.53256 9.2 2.73456 10.2L7.04174 14C6.14024 17.6 4.23707 21 5.9399 21C6.74124 21 7.24207 20.4 11.9499 17.5C16.6578 20.4 17.1586 21 17.9599 21C19.6628 21 17.7596 17.6 16.8581 14L21.2654 10.2C22.4674 9.2 22.1669 8.3 20.5643 8.3H14.9549C13.1519 4.1 12.9516 2 11.9499 2Z"
                        fill="var(--icon-main)"
                    />
                </svg>
            </span>
        </div>
    );
};

const OddField: React.FC<{ marketName: string; marketPrice: number }> = ({
    marketName,
    marketPrice,
}) => {
    return (
        <div className="flex flex-col bg-[var(--control-secondary)] rounded-[var(--radius-xs)] w-full h-full items-center justify-center max-h-[56px] min-h-[40px] py-2 px-4">
            <span className="font-sf-pro-display text-[var(--text-outcome)] font-medium text-[16px] leading-[20px] tracking-[0.5px] normal-case">
                {marketPrice}
            </span>
            <span className="font-sf-pro-display text-[var(--text-body)] font-semibold text-[10px] leading-[14px] tracking-[0.7px] uppercase">
                {marketName}
            </span>
        </div>
    );
};

const FavoriteIconMatch: React.FC<{ size: number }> = ({ size }) => {
    return (
        <div className="flex items-center">
            <span>
                <svg
                    className={`w-${size} h-${size}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.9499 6.1L13.5526 10.3H18.0601L14.5543 13.3L15.8564 17.6L11.9499 15.1L8.04341 17.6L9.34558 13.3L5.83974 10.3H10.3472L11.9499 6.1ZM11.9499 2C11.0484 2 10.7479 4 8.94491 8.3H3.43573C1.83306 8.3 1.53256 9.2 2.73456 10.2L7.04174 14C6.14024 17.6 4.23707 21 5.9399 21C6.74124 21 7.24207 20.4 11.9499 17.5C16.6578 20.4 17.1586 21 17.9599 21C19.6628 21 17.7596 17.6 16.8581 14L21.2654 10.2C22.4674 9.2 22.1669 8.3 20.5643 8.3H14.9549C13.1519 4.1 12.9516 2 11.9499 2Z"
                        fill="var(--icon-main)"
                    ></path>
                </svg>
            </span>
        </div>
    );
};

const LeagueTitle: React.FC<{ countryCode: string; leagueName: string }> = ({
    countryCode,
    leagueName,
}) => {
    return (
        <>
            <img
                src={`https://topmatch7.com/taxonomyicons/categories/${getCountryCode(
                    countryCode
                )}`}
                alt=""
                className="w-6"
            />
            <span className="font-sf-pro text-[var(--text-body)] font-normal text-[12px] leading-[16px] tracking-[-0.32px] normal-case ml-2">
                {leagueName}
            </span>
        </>
    );
};

const MatchData: React.FC<{
    outcomeCounter: string;
    team1IMG: string;
    team1Name: string;
    team1Score: string;
    team2IMG: string;
    team2Name: string;
    team2Score: string;
}> = ({
    outcomeCounter,
    team1IMG,
    team1Name,
    team1Score,
    team2IMG,
    team2Name,
    team2Score,
}) => {
    return (
        <>
            <div className="flex w-full flex-row justify-between py-2 gap-2 ">
                <div className="flex w-full flex-col">
                    <div className="flex w-full mb-[6px]">
                        <div className="flex-1 flex items-center gap-1">
                            <span className="inline-flex font-sf-pro-display font-semibold text-[10px] leading-[14px] tracking-[0.7px] uppercase text-[var(--text-live)]">
                                1st half 34'
                            </span>
                            <span className="inline-flex w-[14px] h-[14px]">
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                                        fill="var(--text-outcome)"
                                    ></path>
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM12 5C11.4477 5 11 5.44772 11 6V8.12602C9.27477 8.57006 8 10.1362 8 12C8 13.8638 9.27477 15.4299 11 15.874V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V15.874C14.7252 15.4299 16 13.8638 16 12C16 10.1362 14.7252 8.57006 13 8.12602V6C13 5.44772 12.5523 5 12 5Z"
                                        fill="var(--text-outcome)"
                                    ></path>
                                </svg>
                            </span>
                            <div className="inline-flex w-[14px] h-[14px]">
                                <img
                                    src="https://mdlr.tech/assets/images/brand5/xhdpi/img_translation.png"
                                    alt=""
                                    className="inline-flex w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="font-sf-pro-display font-medium text-[10px] leading-[14px] tracking-[0.3px] normal-case text-[var(--text-body)]">
                                +{outcomeCounter}
                            </span>
                            <span className="inline-flex w-3 h-3">
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.8 17.2C9.4 16.8 9.4 16.2 9.8 15.8C10.7 14.9 13.6 12 13.6 12C13.6 12 10.7 9.2 9.8 8.2C9.4 7.8 9.4 7.2 9.8 6.8C10.2 6.4 10.8 6.4 11.2 6.8C12.3 7.9 14.6 10.2 15.7 11.3C16.1 11.7 16.1 12.3 15.7 12.7C14.9 13.5 12.4 16.1 11.2 17.2C10.8 17.6 10.2 17.6 9.8 17.2Z"
                                        fill="var(--icon-main)"
                                    ></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="flex w-full gap-2 flex-wrap">
                        <div className="flex-1 min-w-[300px] sm:w-1/3 gap-2 flex flex-col">
                            <div className="flex flex-row w-full gap-2 items-center">
                                <img
                                    className="w-6 h-6"
                                    src={`https://v3.traincdn.com/resized/size24/sfiles/logo_teams/${
                                        team1IMG[0].split(".")[0]
                                    }.webp`}
                                    alt={team1Name}
                                />
                                <span className="flex-1 font-sf-pro text-[var(--text-title)] font-normal text-[14px] leading-[18px] tracking-[-0.15px] normal-case">
                                    {team1Name}
                                </span>
                                <span className="font-sf-pro-display text-[var(--text-live)] font-semibold text-[14px] leading-[17px] tracking-[0.6px] normal-case">
                                    {team1Score ?? 0}
                                </span>
                            </div>
                            <div className="flex flex-row w-full gap-2 items-center">
                                <img
                                    className="w-6 h-6"
                                    src={`https://v3.traincdn.com/resized/size24/sfiles/logo_teams/${
                                        team2IMG[0].split(".")[0]
                                    }.webp`}
                                    alt={team2Name}
                                />
                                <span className="flex-1 font-sf-pro text-[var(--text-title)] font-normal text-[14px] leading-[18px] tracking-[-0.15px] normal-case">
                                    {team2Name}
                                </span>
                                <span className="font-sf-pro-display text-[var(--text-live)] font-semibold text-[14px] leading-[17px] tracking-[0.6px] normal-case">
                                    {team2Score ?? 0}
                                </span>
                            </div>
                        </div>
                        <div className="flex order-1 sm:order-2">
                            <FavoriteIconMatch size={4} />
                        </div>

                        {/* odds */}
                        <div className="flex flex-1 gap-2 order-2 sm:order-1">
                            <OddField marketName="1" marketPrice={13} />
                            <OddField marketName="х" marketPrice={5.1} />
                            <OddField marketName="2" marketPrice={1.28} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <FavoriteIconMatch size={4} /> */}
        </>
    );
};

const AllLive: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const baseUrl = "/gr8-react-animation";

    const fetchData = async () => {
        try {
            const response = await fetch(`${baseUrl}/data.json`); // Путь к файлу в папке public
            if (!response.ok) {
                throw new Error("Ошибка загрузки данных");
            }
            const result = await response.json();
            setData(result.Value); // Сохраняем данные в стейт
            setLoading(false);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Произошла неизвестная ошибка");
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 1000); // Повторяем запрос каждые 10 секунд

        return () => clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    // Группируем матчи по League ID (LI)
    const groupedMatches = data.reduce((acc: any, match: any) => {
        const leagueId = match.LI;
        if (!acc[leagueId]) {
            acc[leagueId] = [];
        }
        acc[leagueId].push(match);
        return acc;
    }, {});

    return (
        <div className="flex flex-col w-full bg-[var(--background-secondary)] justify-start px-1">
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

            {/* Рендерим сгруппированные матчи */}
            {Object.keys(groupedMatches).map((leagueId) => {
                const matches = groupedMatches[leagueId]; // Все матчи для текущего leagueId
                const isSticky = matches.length >= 4; // Проверяем, есть ли больше 3 матчей

                return (
                    // Блок матчей одной лиги начинается
                    <div
                        key={leagueId}
                        className="flex flex-col w-full bg-[var(--background-main)] rounded-2xl mb-2"
                    >
                        <div className="flex w-full flex-col">
                            {/* Заголовок лиги с условным sticky */}
                            <div
                                className={`${
                                    isSticky ? "sticky top-0" : ""
                                } bg-[var(--background-main)] rounded-2xl flex w-full px-4 h-10 items-center justify-between`}
                            >
                                <div className="flex items-center">
                                    <LeagueTitle
                                        countryCode={matches[0].CE} // Берем страну из первого матча
                                        leagueName={matches[0].LE} // Берем название лиги из первого матча
                                    />
                                </div>
                                <FavoriteIconLeague size={4} />
                            </div>

                            {/* Рендерим матчи внутри лиги */}
                            {matches.map((match: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex flex-row w-full border-t-[var(--divider-main)] border-t px-4 gap-2"
                                >
                                    {/* Блок одного матча */}
                                    <MatchData
                                        outcomeCounter={match.EC}
                                        team1IMG={match.O1IMG}
                                        team2IMG={match.O2IMG}
                                        team1Name={match.O1E}
                                        team2Name={match.O2E}
                                        team1Score={match.SC.FS.S1 ?? 0}
                                        team2Score={match.SC.FS.S2 ?? 0}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    // Блок матчей одной лиги заканчивается
                );
            })}
        </div>
    );
};

export default AllLive;
