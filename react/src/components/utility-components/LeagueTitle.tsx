import React from "react";
import { getCountryCode } from "../../utils/utils";

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

export default LeagueTitle;
