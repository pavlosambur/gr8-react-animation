import { iso31661 } from "iso-3166";

export const getCountryCode = (countryName: string) => {
    if (!countryName) return "cyb_f";

    const country = iso31661.find(
        (entry) =>
            entry.name && entry.name.toLowerCase() === countryName.toLowerCase()
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

        // Добавляем обработку ошибок парсинга JSON
        let result;
        try {
            result = await response.json();
        } catch (jsonError) {
            throw new SyntaxError(
                `Ошибка парсинга JSON: ${(jsonError as Error).message}`
            );
        }

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

export const getMatchWinnerOddFromJSON = (
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

export const getMatchHandicapsAndTotalOddsFromJSON = (
    data:
        | {
              G: number;
              ME: {
                  C: number;
                  CE?: number;
                  G: number;
                  P?: number;
                  T: number;
                  B?: boolean;
              }[];
          }[]
        | undefined,
    targetG: number,
    targetT: number
): { C: number | undefined; B: boolean; P: number | undefined } => {
    // Проверка, является ли data массивом
    if (!Array.isArray(data)) {
        return { C: undefined, B: false, P: undefined };
    }

    // Находим группу с целевым значением G
    const targetGroup = data.find((item) => item.G === targetG);

    if (!targetGroup) {
        // Если группа с targetG не найдена, возвращаем значения по умолчанию
        return { C: undefined, B: false, P: undefined };
    }

    // Ищем в массиве ME элемент с targetT и CE = 1
    const foundItem = targetGroup.ME.find(
        (item) => item.T === targetT && item.CE === 1
    );

    return {
        C: foundItem ? foundItem.C : undefined,
        B: foundItem ? foundItem.B ?? false : false,
        P: foundItem ? foundItem.P : undefined,
    };
};
