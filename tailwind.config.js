import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // ~14px
        mini: ["0.9375rem", { lineHeight: "1.35rem" }], // custom fontsize ~15px
        base: ["1rem", { lineHeight: "1.5rem" }], // ~ 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".centered": {
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
        },
        ".smooth-scrollbar": {
          "&::-webkit-scrollbar": {
            height: "6px",
            width: "7px",

            "@media (min-width: 1024px)": {
              width: "8px",
            },
          },
          "&::-webkit-scrollbar-track": {
            "background-color": "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            "border-radius": "8px",
            "border-left": 0,
            "border-right": 0,
            "background-color": "#dfdfdf",

            "&:hover": {
              " background-color": "#d8d5d5",
            },
          },
          "&::-webkit-scrollbar-button": {
            width: 0,
            height: 0,
            display: "none",
          },
          "&::-webkit-scrollbar-corner": {
            "background-color": "transparent",
          },
        },
      });
    }),
  ],
};
