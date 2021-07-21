const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './gatsby-ssr.js'],
  darkMode: 'class',
  important: true,
  mode: 'jit',
  theme: {
    extend: {
      backgroundImage: {
        'light-gradient':
          'radial-gradient(circle 993px at 0.5% 50.5%, rgba(232,238,252,0.45) 0%, rgba(255,255,255,1) 100.2% )',
        'dark-gradient': 'radial-gradient(circle 993px at 0.5% 50.5%, rgba(0,0,0,1) 0%, rgba(10,10,18,1) 100.2% )',
      },
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              'code::before': {
                content: '""',
              },
              'code::after': {
                content: '""',
              },
            },
          ],
        },
        light: {
          css: [
            {
              color: theme('colors.gray.100'),
              '[class~="lead"]': {
                color: theme('colors.gray.300'),
              },
              a: {
                color: theme('colors.white'),
              },
              strong: {
                color: theme('colors.white'),
              },
              'ol > li::before': {
                color: theme('colors.gray.400'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.600'),
              },
              hr: {
                borderColor: theme('colors.gray.200'),
              },
              blockquote: {
                color: theme('colors.gray.200'),
                borderLeftColor: theme('colors.gray.600'),
              },
              h1: {
                color: theme('colors.white'),
              },
              h2: {
                color: theme('colors.white'),
              },
              h3: {
                color: theme('colors.white'),
              },
              h4: {
                color: theme('colors.white'),
              },
              'figure figcaption': {
                color: theme('colors.gray.400'),
              },
              code: {
                color: theme('colors.white'),
              },
              'a code': {
                color: theme('colors.white'),
              },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: theme('colors.white'),
                borderBottomColor: theme('colors.gray.400'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.600'),
              },
              'code::before': {
                content: '""',
              },
              'code::after': {
                content: '""',
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
