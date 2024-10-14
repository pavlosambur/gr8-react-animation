import OddField from "../utility-components/OddField";
import OddLabel from "../utility-components/OddLabel";

const OddsCard_MarketMarketMarket: React.FC<{
    market1Name: string;
    market1Price?: number | null;
    market1isBlocked: boolean;
    market2Name: string;
    market2Price?: number;
    market2isBlocked: boolean;
    market3Name: string;
    market3Price?: number;
    market3isBlocked: boolean;
    marketName?: string;
    marketValue?: string;
    marketShowLabel?: boolean;
    marketType: number;
}> = ({
    market1Name,
    market1Price,
    market1isBlocked,
    market2Name,
    market2Price,
    market2isBlocked,
    market3Name,
    market3Price,
    market3isBlocked,
    marketName,
    marketValue,
    marketShowLabel,
    marketType,
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
            {marketType === 3 && (
                <>
                    <OddField
                        marketName={market1Name}
                        marketPrice={display1Price}
                        marketIsBlocked={market1isBlocked}
                    />
                    <OddField
                        marketName={market2Name}
                        marketPrice={display2Price}
                        marketIsBlocked={market2isBlocked}
                    />
                    <OddField
                        marketName={market3Name}
                        marketPrice={display3Price}
                        marketIsBlocked={market3isBlocked}
                    />
                </>
            )}
            {marketType === 2 && marketShowLabel === false && (
                <>
                    <OddField
                        marketName={market1Name}
                        marketPrice={display1Price}
                        marketIsBlocked={market1isBlocked}
                    />
                    <OddField
                        marketName={market2Name}
                        marketPrice={display2Price}
                        marketIsBlocked={market2isBlocked}
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
                            marketIsBlocked={market1isBlocked}
                        />
                        <OddLabel
                            oddsLabelName={marketName}
                            OddsLabelValue={marketValue}
                            marketIsBlocked={market1isBlocked}
                        />
                        <OddField
                            marketName={market2Name}
                            marketPrice={display2Price}
                            marketIsBlocked={market2isBlocked}
                        />
                    </>
                )}
        </div>
    );
};

export default OddsCard_MarketMarketMarket;
