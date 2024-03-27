/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["content/**/*.md", "layouts/**/*.html", "themes/**/*.html"],
  theme: {
    extend: {
        colors: {
            'aqua-haze': {
            50: '#FEFFFE',
            100: '#FDFEFE',
            200: '#FBFDFC',
            300: '#F9FBFB',
            400: '#F4F8F7',
            500: '#EFF5F4',
            600: '#D7DDDC',
            700: '#8F9392',
            800: '#6C6E6E',
            900: '#484A49',
            },

            'shakespeare': {
            50: '#F7FCFE',
            100: '#EFF8FC',
            200: '#D8EEF8',
            300: '#C0E4F4',
            400: '#91CFEB',
            500: '#62BBE3',
            600: '#58A8CC',
            700: '#3B7088',
            800: '#2C5466',
            900: '#1D3844',
            },

            'mantis': {
            50: '#FAFDF7',
            100: '#F5FAF0',
            200: '#E5F3D9',
            300: '#D6EBC2',
            400: '#B7DC95',
            500: '#98CD67',
            600: '#89B95D',
            700: '#5B7B3E',
            800: '#445C2E',
            900: '#2E3E1F',
            },

            'havelock-blue': {
            50: '#F7F9FC',
            100: '#EEF2F9',
            200: '#D5DFF0',
            300: '#BBCCE6',
            400: '#89A6D4',
            500: '#5680C1',
            600: '#4D73AE',
            700: '#344D74',
            800: '#273A57',
            900: '#1A263A',
            },
        },
    },
  },
  plugins: [],
}

