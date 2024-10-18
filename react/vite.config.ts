import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    base: process.env.VITE_BASE_PATH,
    define: {
        "process.env": process.env,
    },
    plugins: [react()],
    server: {
        watch: {
            usePolling: true, // Включаем polling для отслеживания изменений
        },
        host: true, // Делаем сервер доступным на всех интерфейсах
    },
});
