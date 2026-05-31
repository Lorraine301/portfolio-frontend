/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Outfit', 'sans-serif'],   // même classe CSS, juste changer la font
        dm:   ['Inter', 'sans-serif'],
      },
      colors: {
        bg:       '#0a0a0f',
        surface:  '#12121a',
        surface2: '#1a1a28',
        accent:   '#7c6ff7',
        accent2:  '#f7c06f',
        accent3:  '#6ff7c0',
        muted:    '#8888aa',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fadeUp 0.6s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'none' },
        },
      },
    },
  },
  plugins: [],
}
