import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        colors: {
            "rp-base": "#191724",
            "surface": "#1f1d2e",
            "overlay": "#26233a",
            "muted": "#6e6a86",
            "subtle": "#908caa",
            "text": "#e0def4",
            "love": "#eb6f92",
            "gold": "#f6c177",
            "rose": "#ebbcba",
            "pine": "#31748f",
            "foam": "#9ccfd8",
            "iris": "#c4a7e7",
            "highlight-low": "#21202e",
            "highlight-med": "#403d52",
            "highlight-high": "#524f67"
        },
        extend: {
            keyframes: {
                slideDownAndFade: {
                    from: { opacity: "0", transform: "translateY(-2px)" },
                    to: { opacity: "1", transform: "translateY(0)" }
                },
                slideLeftAndFade: {
                    from: { opacity: "0", transform: "translateX(2px)" },
                    to: { opacity: "1", transform: "translateX(0)" }
                },
                slideUpAndFade: {
                    from: { opacity: "0", transform: "translateY(2px)" },
                    to: { opacity: "1", transform: "translateY(0)" }
                },
                slideRightAndFade: {
                    from: { opacity: "0", transform: "translateX(-2px)" },
                    to: { opacity: "1", transform: "translateX(0)" }
                },
            },
            animation: {
                slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                slideRightAndFade: "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)"
            }
        }
    },
    plugins: []
}

export default config;
