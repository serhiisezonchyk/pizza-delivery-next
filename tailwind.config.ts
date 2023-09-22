import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      body: { DEFAULT: '#FFF', lightgrey:'#f4f4f4' },
      danger: { DEFAULT: '#D32F2F', light: '#FECDD3' },
      warning: { DEFAULT: '#FBC02D', light: '#FFF2C6' },
      success: { DEFAULT: '#388E3C', light: '#BBF7D0' },
      mint: { DEFAULT: '#5ABBA7' },
      white: 'white',
      black: 'black',
      blue: 'blue',
      red: 'red',
      transparent: 'transparent',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'max-height': 'max-height'
      }
    },
  },

  plugins: [],
};
export default config;
