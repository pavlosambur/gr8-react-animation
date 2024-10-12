import axios from "axios";
import fs from "fs";
import path from "path";

export async function getMegapariFootballLiveData(): Promise<void> {
    try {
        const response = await axios.get(
            "https://megapari.com/service-api/LiveFeed/Get1x2_VZip?sports=1&count=1000&gr=824&mode=4&country=2&partner=192&getEmpty=true&virtualSports=true&countryFirst=true&noFilterBlockEvent=true"
        );
        const data = response.data;

        // Сохраняем данные во временный файл
        const tempFilePath = path.join("/app/public/data_temp.json");
        fs.writeFileSync(tempFilePath, JSON.stringify(data, null, 2));

        // Переименовываем временный файл в data.json после успешной записи
        fs.renameSync(tempFilePath, path.join("/app/public/data.json"));
        console.log("Данные успешно сохранены в data.json");
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
    }
}
