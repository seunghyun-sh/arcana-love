import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#1a0b2e',
        'night-deep': '#0f0720',
        lavender: '#e9d5ff',
        'mystic-gold': '#fbbf24',
        violet: '#8B5CF6',
        ivory: '#F8FAFC',
        midnight: '#0B1020',
        panel: '#151B2F',
        gold: '#D4AF37',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        aura: '0 18px 60px rgba(139, 92, 246, 0.18)',
        gold: '0 16px 48px rgba(251, 191, 36, 0.16)',
        'gold-strong': '0 0 30px rgba(251,191,36,0.5), 0 0 80px rgba(251,191,36,0.2)',
      },
      backgroundImage: {
        cosmos:
          'radial-gradient(circle at top, rgba(139,92,246,0.28), transparent 32%), radial-gradient(circle at 80% 20%, rgba(251,191,36,0.12), transparent 20%), linear-gradient(180deg, #1a0b2e 0%, #0f0720 52%, #1a0b2e 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;

