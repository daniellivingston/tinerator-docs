module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'outline-inner': 'inset 0 0 0 3px rgba(66,153,225,0.5)',
        menu:
          '0 0 1px 0 rgba(0, 0, 0, 0.2), 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)'
      },
      letterSpacing: {
        snug: '-.0125em'
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
      },
      height: {
        '128': '32rem'
      },
      borderRadius: {
        md: '.375rem'
      },
      lineHeight: {
        tighter: 1.2
      },
      minHeight: {
        '144': '36rem'
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active']
  },
  plugins: []
};
