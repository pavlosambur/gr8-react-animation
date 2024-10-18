const OddLabel: React.FC<{
  oddsLabelName: string | undefined;
  OddsLabelValue: string | undefined;
  marketIsBlocked: boolean;
}> = ({ oddsLabelName, OddsLabelValue, marketIsBlocked }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-transparent border-none cursor-pointer rounded-[var(--radius-xs)] max-h-[56px] py-2 px-4 w-full">
      <div className="text-[var(--text-title)] font-sf-pro-display font-medium text-[16px] leading-[20px] tracking-[0.5px] normal-case">
        <span>{OddsLabelValue}</span>
      </div>
      <div className="font-sf-pro-display text-[var(--text-body)] font-semibold text-[10px] leading-[14px] tracking-[0.7px] uppercase text-nowrap">
        <span>{oddsLabelName}</span>
      </div>
    </div>
  );
};

export default OddLabel;
