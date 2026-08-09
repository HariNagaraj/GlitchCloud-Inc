/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: {
          DEFAULT: '#111116',
          hover: '#1A1A24',
          border: '#2A2A35'
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          dim: 'var(--color-primary-dim)',
        },
        neutral: {
          DEFAULT: '#94A3B8',
          dark: '#475569',
        },
        warning: {
          DEFAULT: '#F59E0B',
          dim: 'rgba(245, 158, 11, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      boxShadow: {
        'neon-purple': '0 0 15px var(--color-primary-glow)',
        'neon-purple-strong': '0 0 25px var(--color-primary-glow)',
        'neon-yellow': '0 0 20px rgba(245, 158, 11, 0.2)',
        'inner-purple': 'inset 0 0 10px var(--color-primary-dim)',
      },
      letterSpacing: {
        'heading': '0.02em',
      },
      screens: {
        'xs': '480px',
      }
    },
  },
  plugins: [],
}
