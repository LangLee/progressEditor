/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ["./src/**/*.{html,js,vue,ts,jsx,tsx}"],
  darkMode: 'selector',
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography")
  ],
  corePlugins: {
    preflight: true,
  }
}