import React from "react";
import {
    getMatchWinnerOddFromJSON,
    getMatchHandicapsAndTotalOddsFromJSON,
} from "../../utils/utils";

import AllLiveFavoriteIconMatch from "./AllLiveFavoriteIconMatch";
import AllLiveMatchDataMatchTimer from "./AllLiveMatchDataMatchTimer";
import AllLiveMatchDataTeamInfo from "./AllLiveMatchDataTeamInfo";
import OddsCard_MarketMarketMarket from "../odds-cards/OddsCard_MarketMarketMarket";
import OddsCard_MarketMarket from "../odds-cards/OddsCard_MarketMarket";
// import OddsCard_MarketLabelMarket from "../odds-cards/OddsCard_MarketLabelMarket";

const AllLiveMatchData: React.FC<{
    matchData: any;
    outcomeCounter: string;
    matchTimeStamp?: number;
    matchBreak?: number;
    matchCurrentPeriod?: number;
    matchIsRegularTimeEnded?: number;
    matchIsFinished?: boolean;
    team1IMG: string;
    team1Name: string;
    team1Score: string;
    team2IMG: string;
    team2Name: string;
    team2Score: string;
}> = ({
    matchData,
    outcomeCounter,
    matchTimeStamp = 0,
    matchBreak = 0,
    matchCurrentPeriod = 0,
    matchIsRegularTimeEnded = 0,
    matchIsFinished = false,
    team1IMG,
    team1Name,
    team1Score,
    team2IMG,
    team2Name,
    team2Score,
}) => {
    return (
        <>
            <div className="flex flex-row w-full border-t-[1px] first:border-t-0 border-t-[var(--divider-main)] px-4 gap-2">
                <div className="flex w-full flex-row justify-between py-2 gap-2 ">
                    <div className="flex w-full flex-col">
                        <div className="flex w-full mb-[6px]">
                            <div className="flex-1 flex items-center">
                                <div className="flex justify-between gap-1">
                                    <AllLiveMatchDataMatchTimer
                                        matchTimeStamp={matchTimeStamp}
                                        matchBreak={matchBreak}
                                        matchCurrentPeriod={matchCurrentPeriod}
                                        matchIsRegularTimeEnded={
                                            matchIsRegularTimeEnded
                                        }
                                        matchIsFinished={matchIsFinished}
                                    />
                                    <div className="inline-flex w-[14px] h-[14px]">
                                        <span>
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
                                    </div>
                                    <div className="inline-flex w-[14px] h-[14px]">
                                        <img
                                            src="https://mdlr.tech/assets/images/brand5/xhdpi/img_translation.png"
                                            alt=""
                                            className="inline-flex w-full h-full"
                                        />
                                    </div>
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
                            <div className="flex-1 min-w-[300px] sm:w-1/4 gap-2 flex flex-col">
                                <AllLiveMatchDataTeamInfo
                                    teamIMG={team1IMG}
                                    teamName={team1Name}
                                    teamScore={team1Score}
                                />
                                <AllLiveMatchDataTeamInfo
                                    teamIMG={team2IMG}
                                    teamName={team2Name}
                                    teamScore={team2Score}
                                />
                            </div>
                            <div className="flex order-1 sm:order-2">
                                <AllLiveFavoriteIconMatch size={4} />
                            </div>

                            {/* odds */}
                            <div className="flex flex-1 order-2 sm:order-1">
                                <OddsCard_MarketMarketMarket
                                    marketType={3}
                                    market1Name="1"
                                    market1Price={
                                        getMatchWinnerOddFromJSON(
                                            matchData.E,
                                            1,
                                            1
                                        ).C
                                    }
                                    market2Name="x"
                                    market2Price={
                                        getMatchWinnerOddFromJSON(
                                            matchData.E,
                                            1,
                                            2
                                        ).C
                                    }
                                    market3Name="2"
                                    market3Price={
                                        getMatchWinnerOddFromJSON(
                                            matchData.E,
                                            1,
                                            3
                                        ).C
                                    }
                                    marketIsBlocked={
                                        getMatchWinnerOddFromJSON(
                                            matchData.E,
                                            1,
                                            3
                                        ).B
                                    }
                                />
                            </div>
                            <div className="flex flex-1 order-2 sm:order-1">
                                <OddsCard_MarketMarketMarket
                                    marketName="total"
                                    marketValue={getMatchHandicapsAndTotalOddsFromJSON(
                                        matchData.AE,
                                        17,
                                        9
                                    ).P?.toString()}
                                    marketShowLabel={false}
                                    market1Name={`over ${getMatchHandicapsAndTotalOddsFromJSON(
                                        matchData.AE,
                                        17,
                                        9
                                    ).P?.toString()}`}
                                    market1Price={
                                        getMatchHandicapsAndTotalOddsFromJSON(
                                            matchData.AE,
                                            17,
                                            9
                                        ).C
                                    }
                                    market2Name={`under ${getMatchHandicapsAndTotalOddsFromJSON(
                                        matchData.AE,
                                        17,
                                        10
                                    ).P?.toString()}`}
                                    market2Price={
                                        getMatchHandicapsAndTotalOddsFromJSON(
                                            matchData.AE,
                                            17,
                                            10
                                        ).C
                                    }
                                    marketType={2}
                                    marketIsBlocked={
                                        getMatchHandicapsAndTotalOddsFromJSON(
                                            matchData.AE,
                                            17,
                                            10
                                        ).B
                                    }
                                />
                            </div>
                            <div className="flex flex-1 order-2 sm:order-1">
                                <OddsCard_MarketMarket
                                    market1Name="HDP 1 (-1.5)"
                                    market1Price={5.4}
                                    market2Name="HDP 2 (1.5)"
                                    market2Price={1.8}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllLiveMatchData;
