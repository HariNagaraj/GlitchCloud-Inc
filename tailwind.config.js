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
          DEFAULT: '#BB86FC',
          dim: 'rgba(187, 134, 252, 0.1)',
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
        'neon-purple': '0 0 15px rgba(187, 134, 252, 0.3)',
        'neon-purple-strong': '0 0 20px rgba(187, 134, 252, 0.5)',
        'neon-yellow': '0 0 20px rgba(245, 158, 11, 0.2)',
        'inner-purple': 'inset 0 0 10px rgba(187, 134, 252, 0.1)',
      },
      letterSpacing: {
        'heading': '0.02em',
      }
    },
  },
  plugins: [],
}
