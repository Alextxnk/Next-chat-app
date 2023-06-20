const { colors } = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: ['class'],
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './ui/**/*.{ts,tsx}',
      './content/**/*.{md,mdx}'
   ],
   darkMode: ['class'],
   theme: {
      container: {
         center: true,
         padding: '1.5rem',
         screens: {
            // 'sm': '400px',
            // 'xl': '1080px',
            '2xl': '1440px'
         }
      },
      extend: {
         fontFamily: {
            sans: ['var(--font-inter)', ...fontFamily.sans]
         }
      }
   },
   plugins: [
      require('@tailwindcss/forms')({
         strategy: 'class'
      }),
      require('tailwindcss-animate'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/line-clamp')
   ]
};
