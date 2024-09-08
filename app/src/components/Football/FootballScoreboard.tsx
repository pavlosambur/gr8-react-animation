import React, { useState } from "react";
import { gsap } from "gsap";

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
    matchStage: string; // Опционально для отображения стадии матча
    firstHalfHomeScore?: number | null;
    firstHalfAwayScore?: number | null;
}
const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
    matchHomeScore,
    matchAwayScore,
    matchStage,
    firstHalfHomeScore,
    firstHalfAwayScore,
}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center font-sf-pro-display font-semibold text-[10px] leading-[14px] tracking-[0.7px] uppercase text-textLive whitespace-normal">
                {matchStage}
            </div>
            <div className="flex flex-row justify-center font-sf-pro-display font-semibold text-[24px] leading-[30px] tracking-[0.8px]">
                <span>{matchHomeScore}</span>
                <span>:</span>
                <span>{matchAwayScore}</span>
            </div>
            {firstHalfHomeScore !== undefined &&
                firstHalfAwayScore !== undefined && (
                    <div className="flex flex-row justify-center font-sf-pro-display font-semibold text-[10px] leading-[14px] tracking-[0.7px] text-textLive">
                        {/* home score */}
                        <span>{firstHalfHomeScore}</span>
                        {/* score divider */}
                        <span>:</span>
                        {/* score away */}
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
                                matchStage={matchStages[currentStageIndex]}
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
