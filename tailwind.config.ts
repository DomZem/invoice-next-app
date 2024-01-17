import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        primaryHover: 'var(--primaryHover)',
        midnightBlue: 'var(--midnightBlue)',
        darkRoyalBlue: 'var(--darkRoyalBlue)',
        softLavender: 'var(--softLavender)',
        heatherGray: 'var(--heatherGray)',
        bluebellGray: 'var(--bluebellGray)',
        starlessNight: 'var(--starlessNight)',
        whisperWhite: 'var(--whisperWhite)',
        darkAbyss: 'var(--darkAbyss)',
        destructive: 'var(--destructive)',
        destructiveHover: 'var(--destructiveHover)',
      },
      fontSize: {
        'heading-l': [
          '2.25rem',
          {
            lineHeight: '1.5',
            letterSpacing: '-1.125px',
            fontWeight: '700',
          },
        ],
        'heading-m': [
          '1.5rem',
          {
            lineHeight: '1.5',
            letterSpacing: '-0.75px',
            fontWeight: '700',
          },
        ],
        'heading-s': [
          '15px',
          {
            lineHeight: '1.5rem',
            letterSpacing: '-0.25px',
            fontWeight: '700',
          },
        ],
        'heading-s-variant': [
          '15px',
          {
            lineHeight: '100%',
            letterSpacing: '-0.25px',
            fontWeight: '700',
          },
        ],
        body: [
          '13px',
          {
            lineHeight: '138.462%',
            letterSpacing: '-0.1px',
            fontWeight: '500',
          },
        ],
        'body-variant': [
          '13px',
          {
            lineHeight: '115.385%',
            letterSpacing: '-0.1px',
            fontWeight: '500',
          },
        ],
        label: [
          '13px',
          {
            lineHeight: '15px',
            letterSpacing: '-0.1px',
            fontWeight: '500',
          },
        ],
        'invoice-detail': [
          '15px',
          {
            lineHeight: '133.333%',
            letterSpacing: '-0.25px',
            fontWeight: '700',
          },
        ],
      },
      boxShadow: {
        wrapper: '0px 10px 10px -10px rgba(72, 84, 159, 0.10)',
        box: '0px 10px 20px 0px rgba(72, 84, 159, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;
