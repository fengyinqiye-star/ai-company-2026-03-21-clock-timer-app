import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        gold: {
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
      },
      fontFamily: {
        display: ['var(--font-space-mono)', 'ui-monospace', 'monospace'],
        body:    ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        mono: [
          'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas',
          'Liberation Mono', 'Courier New', 'monospace',
        ],
      },
      boxShadow: {
        'glow':        '0 0 20px rgba(251, 191, 36, 0.15)',
        'glow-strong': '0 0 40px rgba(251, 191, 36, 0.25)',
        'card':        '0 4px 24px rgba(0, 0, 0, 0.35)',
        'card-hover':  '0 8px 40px rgba(0, 0, 0, 0.55)',
        'inner':       'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        flash:        'flash 0.5s ease-in-out 3',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        flash: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%':      { backgroundColor: 'rgb(251 191 36 / 0.25)' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
