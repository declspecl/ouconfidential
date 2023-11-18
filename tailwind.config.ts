import type { Config } from "tailwindcss";

export const config: Config = {
    content: [
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
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

            "gold": {
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

            "blue": {
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
            },

            "white": {
                "DEFAULT": "hsl(0 0% 100%)",
                50: "hsl(0 0% 95%)",
                100: "hsl(0 0% 90%)",
                150: "hsl(0 0% 85%)",
                200: "hsl(0 0% 80%)",
                250: "hsl(0 0% 75%)",
                300: "hsl(0 0% 70%)"
            },

            "black": {
                "DEFAULT": "hsl(0 0% 0%)",
                50: "hsl(0 0% 5%)",
                100: "hsl(0 0% 10%)",
                150: "hsl(0 0% 15%)",
                200: "hsl(0 0% 20%)",
                250: "hsl(0 0% 25%)",
                300: "hsl(0 0% 30%)"
            }
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
