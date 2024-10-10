/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "section-expand-plus": "url('/icons/plus.svg')",
                "section-expand-minus": "url('/icons/minus.svg')",
            },
            backgroundPosition: {
                "position-10px": "10px center",
            },
            backgroundSize: {
                "size-16px": "16px 16px",
            },
            colors: {
                customGray: "#3c3c3c",
                dividerMain: "#2929291a",

                // text colors
                textDisable: "#bdb8ad",
                textLive: "#e61414",
                textTitle: "#292621",

                // last match results
                draw: "#f69b5a",
                lose: "#ff3333",
                undefinedResult: "#cbcbcb",
                win: "#009e69",
            },
            fontFamily: {
                "sf-pro": [
                    "SF Pro",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Roboto",
                    "Segoe UI",
                    "Oxygen",
                    "Ubuntu",
                    "Cantarell",
                    "Open Sans",
                    "Helvetica Neue",
                    "Arial",
                    "sans-serif",
                ],
                "sf-pro-display": [
                    "SF Pro Display",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Roboto",
                    "Segoe UI",
                    "Oxygen",
                    "Ubuntu",
                    "Cantarell",
                    "Open Sans",
                    "Helvetica Neue",
                    "Arial",
                    "sans-serif",
                ],
            },
            margin: {
                "2px": "2px", // Добавляем кастомный отступ в 2px
            },
        },
    },
    plugins: [],
};
