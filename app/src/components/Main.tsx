// components/Main.tsx
import React from "react";
import SportSection from "./SportSection";

const Main: React.FC = () => {
    return (
        <div className="flex-auto flex flex-col items-center justify-center text-center mx-auto ml-10 mr-10 mt-5 mb-5">
            <SportSection />
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
        </div>
    );
};

export default Main;
