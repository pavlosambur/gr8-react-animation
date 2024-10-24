import axios from "axios";
import fs from "fs/promises";
import path from "path";

// Валидация JSON
function isValidJSON(data: any): boolean {
    try {
        JSON.stringify(data);
        return true;
    } catch {
        return false;
    }
}

export async function getMegapariFootballLiveData(): Promise<void> {
    try {
        const response = await axios.get(
            "https://megapari.com/service-api/LiveFeed/Get1x2_VZip?sports=1&count=1000&gr=824&mode=4&country=2&partner=192&getEmpty=true&virtualSports=true&countryFirst=true&noFilterBlockEvent=true"
        );
        const data = response.data;

        // Валидация структуры JSON
        if (!isValidJSON(data)) {
            console.error("Получен некорректный JSON");
            return;
        }

        // Сохраняем данные во временный файл
        const tempFilePath = path.join("/app/public/soccer_data_temp.json");
        const finalFilePath = path.join("/app/public/soccer_data.json");

        await fs.writeFile(tempFilePath, JSON.stringify(data, null, 2));

        // Переименовываем временный файл в data.json после успешной записи
        await fs.rename(tempFilePath, finalFilePath);
        // console.log("Данные успешно сохранены в data.json");
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
    }
}
