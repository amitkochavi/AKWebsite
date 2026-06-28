import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0b0f1a',
          soft: '#1a2236',
        },
        brand: {
          DEFAULT: '#1c3faa',
          light: '#3b6fe0',
          dark: '#13297a',
        },
        gold: '#c9a24b',
        paper: '#f7f8fb',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};
export default config;
