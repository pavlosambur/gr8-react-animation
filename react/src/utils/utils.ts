import { iso31661 } from "iso-3166";

export const getCountryCode = (countryName: string) => {
    const country = iso31661.find(
        (entry) => entry.name.toLowerCase() === countryName.toLowerCase()
    );
    return country ? country.alpha3.toLowerCase() : "cyb_f";
};

export const fetchData = async (
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
    try {
        const response = await fetch("/gr8-react-animation/data.json");
        if (!response.ok) {
            throw new Error("Ошибка загрузки данных");
        }
        const result = await response.json();
        setData(result.Value);
        setLoading(false);
    } catch (err) {
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
