/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        shopee: { DEFAULT: '#ee4d2d', light: '#fff0ec' },
        tokopedia: { DEFAULT: '#42b549', light: '#f0fdf1' },
        lazada: { DEFAULT: '#0f1461', light: '#f0f0ff', accent: '#6a1b9a' },
      },
    },
  },
  plugins: [],
}
