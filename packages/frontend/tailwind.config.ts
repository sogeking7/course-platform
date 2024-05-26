import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: theme("colors.blueGray.500"),
            "> :first-child": { marginTop: "-" },
            "> :last-child": { marginBottom: "-" },
            "&:first-child > :first-child": {
              marginTop: "0",
            },
            "&:last-child > :last-child": {
              marginBottom: "0",
            },
            h1: {
              fontSize: theme("fontSize.4xl")[0],
              fontWeight: theme("fontWeight.extrabold"),
            },
            h2: {
              fontSize: theme("fontSize.3xl")[0],
              fontWeight: theme("fontWeight.bold"),
            },
            h3: {
              fontSize: theme("fontSize.2xl")[0],
            },
            h4: {
              fontSize: theme("fontSize.xl")[0],
            },
            h5: {
              fontSize: theme("fontSize.lg")[0],
            },
            h6: {
              fontSize: theme("fontSize.base")[0],
            },
            "h1, h2, h3, h4, h5, h6": {
              fontWeight: theme("fontWeight.semibold"),
              color: theme("colors.blueGray.900"),
            },
            "h1, h2": {
              letterSpacing: "-0.025em",
            },
            "h2, h3": {
              "scroll-margin-block": `${(70 + 40) / 16}rem`,
            },
            "h3, h4, h5, h6": {
              fontWeight: theme("fontWeight.semibold"),
            },
            p: {
              fontSize: theme("fontSize.xl")[0],
              lineHeight: theme("lineHeight.9"),
              color: theme("colors.blueGray.600"),
            },
            hr: {
              borderTopWidth: theme("borderWidth.2"),
              color: theme("colors.blueGray.200"),
            },
            "ul, ol": {
              position: "relative",
            },
            "ul > li, ol > li": {
              paddingLeft: "1.5em",
              fontSize: theme("fontSize.xl")[0],
              color: theme("colors.blueGray.600"),
              lineHeight: theme("lineHeight.9"),
              overflowWrap: "break-word",
            },
            "ul > li::before": {
              width: "0.75em",
              height: "0.100em",
              top: "calc(0.875em - 0.0625em)",
              left: 0,
              borderRadius: 0,
              backgroundColor: theme("colors.blueGray.400"),
            },
            "ol > li::before": {},
            a: {
              color: theme("colors.cyan.700"),
              fontWeight: theme("fontWeight.medium"),
              textDecoration: "none",
              boxShadow: theme("boxShadow.link"),
            },
            "a code": {
              color: "inherit",
              fontWeight: "inherit",
            },
            strong: {
              color: theme("colors.blueGray.900"),
              fontWeight: theme("fontWeight.medium"),
            },
            "a strong": {
              color: "inherit",
              fontWeight: "inherit",
            },
            code: {
              fontSize: theme("fontSize.base")[0],
              fontWeight: "400",
              padding: theme("spacing.1"),
              color: theme("colors.blueGray.200"),
              backgroundColor: theme("colors.blueGray.900"),
              borderRadius: theme("borderRadius.md"),
              overflowX: "auto",
            },
            "code::before": {
              // content: 'none',
            },
            "code::after": {
              // content: 'none',
            },
            pre: {
              backgroundColor: "-",
              color: theme("colors.white"),
              borderRadius: 0,
              marginTop: 0,
              marginBottom: 0,
            },
            table: {
              // ...fullBleed,
              fontSize: theme("fontSize.sm")[0],
              lineHeight: theme("fontSize.sm")[1].lineHeight,
              tableLayout: theme("tableLayout.fixed"),
            },
            thead: {
              color: theme("colors.blueGray.600"),
              borderBottomColor: theme("colors.blueGray.200"),
            },
            "thead th": {
              fontSize: theme("fontSize.xl")[0],
              fontWeight: theme("fontWeight.semibold"),
              lineHeight: theme("fontSize.xl")[0].lineHeight,
              color: theme("colors.blueGray.900"),
              letterSpacing: theme("letterSpacing.wider"),
              paddingTop: 0,
            },
            "tbody tr": {
              borderBottomColor: theme("colors.blueGray.200"),
            },
            "tbody td": {
              fontSize: theme("fontSize.lg")[0],
              lineHeight: theme("lineHeight.9"),
              color: theme("colors.blueGray.600"),
            },
            "tbody tr:last-child": {
              borderBottomWidth: "1px",
            },
            "tbody code": {
              fontSize: theme("fontSize.xs")[0],
            },
          },
        },
      }),
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
      },
      colors: {
        my_cyan: "#048998",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
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
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
