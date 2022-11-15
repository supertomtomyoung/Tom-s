/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['layouts/**/*.html'],
  variants: {
    extend: {
      animation: ['group-hover'],
    },
  },
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            blockquote: {
              'p::after': {
                content: '\'\'',
              },
              'p::before': {
                content: '\'\'',
              },
            },
            code: {
              'word-break': 'break-word',
              'background-color': theme('colors.zinc.100'),
              'border-radius': '.25rem',
              padding: '.3em .5em',
            },
            'code::after': {
              content: '\'\'',
            },
            'code::before': {
              content: '\'\'',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
