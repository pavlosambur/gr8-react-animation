import React from "react";

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

export default OddField;
