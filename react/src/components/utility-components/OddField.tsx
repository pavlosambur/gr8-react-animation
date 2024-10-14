const OddField: React.FC<{
    marketName: string;
    marketPrice: number | string;
    marketIsBlocked: boolean;
}> = ({ marketName, marketPrice, marketIsBlocked }) => {
    return (
        <div className="flex flex-1 flex-col bg-[var(--control-secondary)] rounded-[var(--radius-xs)] w-full h-full items-center justify-center max-h-[56px] min-h-[40px] min-w-[34px] py-2 px-4">
            <div className="flex font-sf-pro-display text-[var(--text-outcome)] font-medium text-[16px] leading-[20px] tracking-[0.5px] normal-case text-nowrap">
                <span>{marketPrice}</span>
            </div>
            <div className="flex font-sf-pro-display text-[var(--text-body)] font-semibold text-[10px] leading-[14px] tracking-[0.7px] uppercase text-nowrap">
                <span>{marketName}</span>
            </div>
        </div>
    );
};

export default OddField;
