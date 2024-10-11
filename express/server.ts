import express from "express";
import { getMegapariFootballLiveData } from "./services/getMegapariFootballLiveData";

const app = express();
const PORT = 3000;

// Запускаем периодическое обновление данных каждые 30 секунд (или любой другой интервал)
setInterval(async () => {
    await getMegapariFootballLiveData();
    // console.log("Данные обновлены");
}, 1000); // обновление каждые 30 секунд

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
