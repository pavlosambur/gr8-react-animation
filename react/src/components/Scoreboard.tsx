// components/Main.tsx
import React from "react";
import Sections from "./Sections";

const Scoreboard: React.FC = () => {
    return (
        <div className="flex-auto flex flex-col items-center justify-center text-center mx-auto ml-10 mr-10 mt-5 mb-5">
            <Sections sportName="Football Scoreboard" />
        </div>
    );
};

export default Scoreboard;
