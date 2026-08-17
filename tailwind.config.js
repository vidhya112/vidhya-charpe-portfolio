/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#05070d',
          secondary: '#0a0e17',
          tertiary: '#0f172a',
        },
        surface: {
          DEFAULT: '#0c1220',
          elevated: '#111827',
          card: '#161f32',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.04)',
        },
        brand: {
          purple: '#8b5cf6',
          violet: '#7c3aed',
          indigo: '#6366f1',
          cyan: '#06b6d4',
          sky: '#38bdf8',
          emerald: '#10b981',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(124, 58, 237, 0.15)',
        'glow-md': '0 0 30px rgba(124, 58, 237, 0.25)',
        'glow-lg': '0 0 50px rgba(124, 58, 237, 0.35)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.25)',
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.25)',
        'inner-glass': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
