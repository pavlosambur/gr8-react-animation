import React, { useState } from "react";
import classNames from "classnames";

import FootballScoreboard from "./Football/FootballScoreboard";

const Sections: React.FC<{ sportName: string }> = ({ sportName }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mainDivClass = classNames(
    "flex",
    "flex-auto",
    "w-full",
    "border-black",
    "border-t",
    "border-b",
    "border-r",
    "border-l-2",
    "rounded",
    "text-black",
    "bg-zinc-400",
    {
      "bg-section-expand-plus": isExpanded,
      "bg-section-expand-minus": !isExpanded,
    },
    "bg-no-repeat",
    "bg-size-16px",
    "bg-position-10px",
    "pl-8",
    "transition-all",
    "duration-300",
  );

  const secondDivClass = classNames(
    "bg-gray-300",
    "w-full",
    "flex",
    "flex-auto",
    "border-black",
    "border-t",
    "border-b",
    "border-r",
    "border-l-2",
    "rounded",
    {
      hidden: isExpanded,
    },
  );

  const spanClass = classNames("font-semibold");

  return (
    <>
      <div className={mainDivClass} onClick={() => setIsExpanded(!isExpanded)}>
        <span className={spanClass}>{sportName}</span>
      </div>
      <div className={secondDivClass}>
        <FootballScoreboard />
      </div>
      <div className="w-full h-4">
        <a href="/#/en/alllive">test</a>
      </div>
    </>
  );
};

export default Sections;
