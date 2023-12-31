/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      fontFamily: {poppins: ['Poppins']},
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'loginPicture': "url('../public/authPatePicture.jpg')",
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'sf7':'914px',
        'nh':'1000px',
        'lg': '1200px',
        'xl': '1280px',
        'xxl':'1500px'
      },
    },
  },
  plugins: [],
}
