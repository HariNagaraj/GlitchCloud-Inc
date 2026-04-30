/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#141218',
        surface: {
          DEFAULT: '#141218',
          dim: '#141218',
          bright: '#3b383e',
          container: '#211f24',
          'container-low': '#1d1b20',
          'container-lowest': '#0f0d13',
          'container-high': '#2b292f',
          'container-highest': '#36343a',
          variant: '#36343a',
        },
        primary: {
          DEFAULT: '#cfbcff',
          container: '#6750a4',
          fixed: '#e9ddff',
          'fixed-dim': '#cfbcff',
        },
        'on-primary': {
          DEFAULT: '#381e72',
          container: '#e0d2ff',
          fixed: '#22005d',
          'fixed-variant': '#4f378a',
        },
        secondary: {
          DEFAULT: '#cdc0e9',
          container: '#4d4465',
        },
        'on-secondary': {
          DEFAULT: '#342b4b',
          container: '#bfb2da',
        },
        'on-surface': {
          DEFAULT: '#e6e0e9',
          variant: '#cbc4d2',
        },
        outline: {
          DEFAULT: '#948e9c',
          variant: '#494551',
        },
        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
        },
        'on-error': {
          DEFAULT: '#690005',
          container: '#ffdad6',
        },
        inverse: {
          surface: '#e6e0e9',
          'on-surface': '#322f35',
          primary: '#6750a4',
        }
      },
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      boxShadow: {
        'glass-inner': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'neon-primary': '0 0 20px rgba(207, 188, 255, 0.4)',
        'neon-secondary': '0 0 20px rgba(205, 192, 233, 0.4)',
      },
      letterSpacing: {
        'heading': '0.02em',
      },
      backdropBlur: {
        'glass': '20px',
      }
    },
  },
  plugins: [],
}
