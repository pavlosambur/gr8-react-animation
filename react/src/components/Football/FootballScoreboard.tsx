import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

enum MatchStages {
  MATCH_NOT_STARTED = "Starting soon",
  MATCH_STARTED = "Kick-off",
  HALF_BREAK = "Half-time",
  SECOND_HALF_STARTED = "Second half",
  MATCH_ENDED = "Match ended",
}

const MatchTimer: React.FC<{ initialMinutes: number }> = ({
  initialMinutes,
}) => {
  const [secondsElapsed, setSecondsElapsed] = useState(initialMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
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

const TeamInfo: React.FC<{
  teamName: string;
  teamLogo: string;
  results: string[];
}> = ({ teamName, teamLogo, results }) => {
  const colorMap: { [key: string]: string } = {
    win: "bg-win",
    lose: "bg-lose",
    draw: "bg-draw",
    undefinedResult: "bg-undefinedResult",
  };
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
            className={`h-2 w-2 ${
              colorMap[result] || "bg-gray-500"
            } rounded mx-2px`}
          ></div>
        ))}
      </div>
    </div>
  );
};

const ScoreDisplay: React.FC<{
  matchHomeScore: number;
  matchAwayScore: number;
  curentStage: string;
  nextStage: string;
  firstHalfHomeScore?: number | null;
  firstHalfAwayScore?: number | null;
}> = ({
  matchHomeScore,
  matchAwayScore,
  curentStage,
  firstHalfHomeScore,
  firstHalfAwayScore,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const homeScoreContainerRef = useRef<HTMLDivElement>(null);
  const awayScoreContainerRef = useRef<HTMLDivElement>(null);
  const [displayStage, setDisplayStage] = useState(curentStage);
  const [showTimer, setShowTimer] = useState(false);
  const [initialMinutes, setInitialMinutes] = useState(0);

  const animateScoreChange = (
    ref: React.RefObject<HTMLDivElement>,
    newValue: number,
  ) => {
    const current = ref.current;
    if (current) {
      const newSpan = document.createElement("span");
      newSpan.textContent = newValue.toString();
      current.appendChild(newSpan);

      gsap.fromTo(
        current,
        { y: "0%" },
        {
          y: "-100%",
          duration: 1.2,
          ease: "back.in",
          onComplete: () => {
            while (current.childNodes.length > 1) {
              current.removeChild(current.firstChild as Node);
            }
            gsap.set(current, { y: "0%" });
          },
        },
      );
    }
  };

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.to(stageRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    if (
      curentStage === MatchStages.MATCH_STARTED ||
      curentStage === MatchStages.SECOND_HALF_STARTED
    ) {
      timeline
        .call(() => {
          setDisplayStage(curentStage);
          setShowTimer(false);
        })
        .to(stageRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        })
        .to(stageRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        })
        .call(() => {
          setShowTimer(true);
          if (curentStage === MatchStages.MATCH_STARTED) {
            setInitialMinutes(0);
          } else if (curentStage === MatchStages.SECOND_HALF_STARTED) {
            setInitialMinutes(45);
          }
        })
        .to(stageRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        });
    } else if (
      curentStage === MatchStages.HALF_BREAK ||
      curentStage === MatchStages.MATCH_ENDED
    ) {
      timeline
        .call(() => {
          setShowTimer(false);
        })
        .to(stageRef.current, {
          opacity: 0,
          duration: 0,
          ease: "power2.out",
        })
        .call(() => {
          setDisplayStage(curentStage);
        })
        .to(stageRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        });
    } else {
      timeline
        .call(() => {
          setDisplayStage(curentStage);
          setShowTimer(false);
        })
        .to(stageRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        });
    }
  }, [curentStage]);

  useEffect(() => {
    if (homeScoreContainerRef.current) {
      animateScoreChange(homeScoreContainerRef, matchHomeScore);
    }
  }, []);

  useEffect(() => {
    animateScoreChange(homeScoreContainerRef, matchHomeScore);
  }, [matchHomeScore]);

  useEffect(() => {
    animateScoreChange(awayScoreContainerRef, matchAwayScore);
  }, [matchAwayScore]);

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
      <div className="flex flex-row justify-center font-sf-pro-display font-semibold text-[24px] leading-[30px] tracking-[0.8px] h-7 overflow-hidden">
        <div className="flex flex-col" ref={homeScoreContainerRef}></div>
        <span>:</span>
        <div className="flex flex-col" ref={awayScoreContainerRef}></div>
      </div>

      {/* Счёт первого тайма */}
      {firstHalfHomeScore !== undefined && firstHalfAwayScore !== undefined && (
        <div className="flex flex-row justify-center font-sf-pro-display font-semibold text-[10px] leading-[14px] tracking-[0.7px] text-textLive overflow-hidden h-3">
          <span>{firstHalfHomeScore}</span>
          <span>:</span>
          <span>{firstHalfAwayScore}</span>
        </div>
      )}
    </div>
  );
};

const H2HSection: React.FC<{
  homeWins: number;
  draws: number;
  awayWins: number;
}> = ({ homeWins, draws, awayWins }) => {
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
    <div
      className="flex items-center justify-center bg-zinc-400 hover:bg-zinc-500 text-black font-normal py-px px-4 rounded w-80 h-7 self-auto cursor-pointer"
      onClick={onStageChange}
    >
      Change match stage to: {nextStage}
    </div>
  );
};

const UpdateScore: React.FC<{
  onHomeTeamScored: () => void;
  onAwayTeamScored: () => void;
}> = ({ onHomeTeamScored, onAwayTeamScored }) => {
  return (
    <div className="flex flex-rov w-full space-x-1">
      <div
        className="flex items-center justify-center bg-zinc-400 hover:bg-zinc-500 text-black font-normal py-px px-4 rounded w-80 h-7 self-auto cursor-pointer"
        onClick={onHomeTeamScored}
      >
        Home Goal +
      </div>
      <div
        className="flex items-center justify-center bg-zinc-400 hover:bg-zinc-500 text-black font-normal py-px px-4 rounded w-80 h-7 self-auto cursor-pointer"
        onClick={onAwayTeamScored}
      >
        Away Goal +
      </div>
    </div>
  );
};

const FootballScoreboard: React.FC = () => {
  const matchStages = [
    MatchStages.MATCH_NOT_STARTED,
    MatchStages.MATCH_STARTED,
    MatchStages.HALF_BREAK,
    MatchStages.SECOND_HALF_STARTED,
    MatchStages.MATCH_ENDED,
  ];
  // match stage hooks
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  // update score hooks
  const [homeTeamScore, updateHomeTeamScore] = useState(0);
  const [awayTeamScore, updateAwayTeamScore] = useState(0);

  // match stage
  const handleStageChange = () => {
    setCurrentStageIndex((prevIndex) => (prevIndex + 1) % matchStages.length);
  };
  const nextStageIndex = (currentStageIndex + 1) % matchStages.length;
  const nextStage = matchStages[nextStageIndex];
  // end match stage

  // update score
  const handleHomeTeamScore = () => {
    updateHomeTeamScore((homeGoals) => homeGoals + 1);
  };
  const handleAwayTeamScore = () => {
    updateAwayTeamScore((awayGoals) => awayGoals + 1);
  };
  // end update score
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
              results={["undefinedResult", "lose", "win", "win", "win"]}
            />

            {/* scoreboard */}

            <div className="flex w-[90px] flex-col">
              <ScoreDisplay
                matchHomeScore={homeTeamScore}
                matchAwayScore={awayTeamScore}
                curentStage={matchStages[currentStageIndex]}
                nextStage={matchStages[nextStageIndex]}
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
              results={["undefinedResult", "win", "win", "draw", "win"]}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/2 py-5 justify-start items-center select-none space-y-1">
        {/* change match stage */}
        <div>
          <ChangeMatchStage
            onStageChange={handleStageChange}
            nextStage={nextStage}
          />
        </div>
        <div>
          <UpdateScore
            onHomeTeamScored={handleHomeTeamScore}
            onAwayTeamScored={handleAwayTeamScore}
          />
        </div>
      </div>
    </div>
  );
};

export default FootballScoreboard;
