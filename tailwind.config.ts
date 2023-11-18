import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "text": {
                    "DEFAULT": "hsl(var(--text))",
                    50: "hsl(var(--text-50))",
                    100: "hsl(var(--text-100))",
                    150: "hsl(var(--text-150))",
                    200: "hsl(var(--text-200))",
                    250: "hsl(var(--text-250))",
                    300: "hsl(var(--text-300))"
                },

                "background": {
                    "DEFAULT": "hsl(var(--background))",
                    50: "hsl(var(--background-50))",
                    100: "hsl(var(--background-100))",
                    150: "hsl(var(--background-150))",
                    200: "hsl(var(--background-200))",
                    250: "hsl(var(--background-250))",
                    300: "hsl(var(--background-300))"
                },

                "ou-gold": {
                    "DEFAULT": "hsl(var(--gold-500))",
                    0: "hsl(var(--gold-0))",
                    100: "hsl(var(--gold-100))",
                    200: "hsl(var(--gold-200))",
                    300: "hsl(var(--gold-300))",
                    400: "hsl(var(--gold-400))",
                    500: "hsl(var(--gold-500))",
                    600: "hsl(var(--gold-600))",
                    700: "hsl(var(--gold-700))",
                    800: "hsl(var(--gold-800))",
                    900: "hsl(var(--gold-900))",
                    1000: "hsl(var(--gold-1000))",
                },

                "ou-blue": {
                    "DEFAULT": "hsl(var(--blue-500))",
                    0: "hsl(var(--blue-0))",
                    100: "hsl(var(--blue-100))",
                    200: "hsl(var(--blue-200))",
                    300: "hsl(var(--blue-300))",
                    400: "hsl(var(--blue-400))",
                    500: "hsl(var(--blue-500))",
                    600: "hsl(var(--blue-600))",
                    700: "hsl(var(--blue-700))",
                    800: "hsl(var(--blue-800))",
                    900: "hsl(var(--blue-900))",
                    1000: "hsl(var(--blue-1000))"
                }
            }
        }
    },
    plugins: []
}

export default config;
