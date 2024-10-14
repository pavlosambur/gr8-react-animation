import { iso31661 } from "iso-3166";

export const getCountryCode = (countryName: string) => {
    const country = iso31661.find(
        (entry) => entry.name.toLowerCase() === countryName.toLowerCase()
    );
    return country ? country.alpha3.toLowerCase() : "cyb_f";
};

export const fetchData = async (
    fileName: string,
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
    try {
        const response = await fetch(`/gr8-react-animation/${fileName}`);

        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result.Value);
        setLoading(false);
    } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError(
            err instanceof Error ? err.message : "Произошла неизвестная ошибка"
        );
        setLoading(false);
    }
};

export const groupMatchesByLeague = (data: any[]) => {
    return data.reduce((acc: any, match: any) => {
        const leagueId = match.LI;
        if (!acc[leagueId]) {
            acc[leagueId] = [];
        }
        acc[leagueId].push(match);
        return acc;
    }, {});
};

export const getOddFromJSON = (
    data: { B: boolean; C: number; G: number; T: number }[] | undefined,
    targetG: number,
    targetT: number
): { C: number | undefined; B: boolean } => {
    if (!Array.isArray(data)) {
        // Если data не массив, возвращаем значения по умолчанию
        return { C: undefined, B: false };
    }

    const foundItem = data.find(
        (item) => item.G === targetG && item.T === targetT
    );

    return {
        C: foundItem ? foundItem.C : undefined, // возвращает значение C или undefined
        B: foundItem ? foundItem.B : false, // возвращает значение B или false
    };
};
