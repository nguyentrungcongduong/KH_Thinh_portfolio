/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'swiss-bg': '#FAFAF7',
        'swiss-fg': '#16201C',
        'swiss-muted': '#EEF1EE',
        'swiss-accent': '#C84A2F',
      },
      fontFamily: {
        'inter': ['Open Sans', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['3rem', { lineHeight: '1.08', letterSpacing: '0', fontWeight: '800' }],
        'display-md': ['4.25rem', { lineHeight: '1.04', letterSpacing: '0', fontWeight: '800' }],
        'display-lg': ['5.75rem', { lineHeight: '1', letterSpacing: '0', fontWeight: '800' }],
        'display-xl': ['7rem', { lineHeight: '1', letterSpacing: '0', fontWeight: '800' }],
      },
      borderWidth: {
        '3': '3px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
