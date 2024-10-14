import OddField from "../utility-components/OddField";
import OddLabel from "../utility-components/OddLabel";

const OddsCard_MarketLabelMarket: React.FC<{
    market1Name: string;
    market1Price?: number;
    market2Name: string;
    market2Price?: number;
    marketName: string;
    marketValue: string;
}> = ({ market1Name, market1Price, market2Name, market2Price }) => {
    const display1Price =
        typeof market1Price === "number" ? market1Price.toFixed(2) : "---";
    const display2Price =
        typeof market2Price === "number" ? market2Price.toFixed(2) : "---";

    return (
        <div className="flex flex-nowrap flex-row w-full sm:w-1/3 gap-2 ">
            <OddField marketName={market1Name} marketPrice={display1Price} />
            <OddLabel oddsLabelName="total" OddsLabelValue="2.5" />
            <OddField marketName={market2Name} marketPrice={display2Price} />
        </div>
    );
};

export default OddsCard_MarketLabelMarket;
