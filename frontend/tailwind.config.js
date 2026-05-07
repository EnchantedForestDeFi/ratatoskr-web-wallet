/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // EFD primary palette — forest green centered on #4ade80 (glow accent)
        ratr: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // EFD gold accent — for highlights / premium states
        gold: {
          300: '#e8d5a8',
          400: '#e0c08a',
          500: '#d4af6a',
          600: '#b8924a',
        },
        // Dark surface palette — unchanged from source (slate)
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        // EFD typography stack — falls back gracefully if fonts not loaded
        display: ['Cinzel Decorative', 'Cinzel', 'serif'],
        body: ['Cormorant Garamond', 'Cormorant', 'Georgia', 'serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
