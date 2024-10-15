import OddField from "../utility-components/OddField";
import OddLabel from "../utility-components/OddLabel";

const OddsCard_MarketMarketMarket: React.FC<{
    market1Name: string;
    market1Price?: number | null;
    market2Name: string;
    market2Price?: number;
    market3Name?: string;
    market3Price?: number;
    marketName?: string;
    marketValue?: string | undefined;
    marketShowLabel?: boolean;
    marketType: number;
    marketIsBlocked: boolean;
}> = ({
    market1Name,
    market1Price,
    market2Name,
    market2Price,
    market3Name,
    market3Price,
    marketName,
    marketValue,
    marketShowLabel,
    marketType,
    marketIsBlocked,
}) => {
    const formatPrice = (price?: number | null): string | number => {
        if (typeof price === "number") {
            const [, decimalPart] = price.toString().split(".");
            if (decimalPart && decimalPart.length > 2) {
                return price.toFixed(2); // округляем до двух знаков
            }
            return price; // возвращаем как есть
        }
        return "---"; // если не число
    };

    const display1Price = formatPrice(market1Price);
    const display2Price = formatPrice(market2Price);
    const display3Price = formatPrice(market3Price);

    return (
        <div className="flex flex-nowrap flex-row w-full gap-2">
            {marketType === 3 && market1Name && market2Name && market3Name && (
                <>
                    <OddField
                        marketName={market1Name}
                        marketPrice={display1Price}
                        marketIsBlocked={marketIsBlocked}
                    />
                    <OddField
                        marketName={market2Name}
                        marketPrice={display2Price}
                        marketIsBlocked={marketIsBlocked}
                    />
                    <OddField
                        marketName={market3Name}
                        marketPrice={display3Price}
                        marketIsBlocked={marketIsBlocked}
                    />
                </>
            )}
            {marketType === 2 && marketShowLabel === false && (
                <>
                    <OddField
                        marketName={market1Name}
                        marketPrice={display1Price}
                        marketIsBlocked={marketIsBlocked}
                    />
                    <OddField
                        marketName={market2Name}
                        marketPrice={display2Price}
                        marketIsBlocked={marketIsBlocked}
                    />
                </>
            )}
            {marketType === 2 &&
                marketShowLabel === true &&
                marketName &&
                marketValue && (
                    <>
                        <OddField
                            marketName={market1Name}
                            marketPrice={display1Price}
                            marketIsBlocked={marketIsBlocked}
                        />
                        <OddLabel
                            oddsLabelName={marketName}
                            OddsLabelValue={marketValue}
                            marketIsBlocked={marketIsBlocked}
                        />
                        <OddField
                            marketName={market2Name}
                            marketPrice={display2Price}
                            marketIsBlocked={marketIsBlocked}
                        />
                    </>
                )}
        </div>
    );
};

export default OddsCard_MarketMarketMarket;
