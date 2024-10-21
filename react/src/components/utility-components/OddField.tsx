// OddField.tsx
import { useTranslation } from "react-i18next";
const OddField: React.FC<{
  marketName: string;
  marketPrice: number | string;
  marketIsBlocked: boolean;
}> = ({ marketName, marketPrice, marketIsBlocked }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-1 flex-col ${
        marketIsBlocked
          ? "bg-[var(--control-disabled)]"
          : "bg-[var(--control-secondary)]"
      } h-full max-h-[56px] min-h-[40px] w-full min-w-[34px] cursor-pointer items-center justify-center rounded-[var(--radius-xs)] px-4 py-2 duration-100 md:hover:bg-[var(--control-secondary-hover)]`}
    >
      <div
        className={`flex font-sf-pro-display ${
          marketIsBlocked || marketPrice === t("ODDS_NO_PRICE_TEXT")
            ? "text-[var(--text-disable)]"
            : "text-[var(--text-outcome)]"
        } text-nowrap text-[16px] font-medium normal-case leading-[20px] tracking-[0.5px]`}
      >
        <span>{marketPrice}</span>
      </div>
      <div className="flex text-nowrap font-sf-pro-display text-[10px] font-semibold uppercase leading-[14px] tracking-[0.7px] text-[var(--text-body)]">
        <span>{marketName}</span>
      </div>
    </div>
  );
};

export default OddField;
