/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '!./node_modules/**', // Exclude everything in node_modules to speed up builds
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000000',
        primary: '#053FB0',
        secondary: '#3071EF',
        white: '#FFFFFF',
        clr: "#132448",
        error: {
          DEFAULT: '#AD0000',
          secondary: '#C62828',
        },
        success: {
          DEFAULT: '#146622',
          secondary: '#388E3C',
        },
        gray: {
          100: '#F1F3F5',
          200: '#CFD8DC',
          300: '#AFBAC5',
          400: '#90A4AE',
          500: '#546E7A',
          600: '#091D45',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      borderColor: {
        DEFAULT: '#CFD8DC',
      },
      backgroundColor: {
        "btnclr": "#264da3"
      },
      keyframes: {
        revealVertical: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
        revealVertical: 'revealVertical 400ms forwards cubic-bezier(0, 1, 0.25, 1)',
      },
      backgroundImage: {
        "hero-bg": "url('https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/is-banner-with-puppy-2x.png?t=1725594856')",
        "hp-content-bg": "url('https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/starry-bg-200px.png')",
        "parallax-1": "url('https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/is-parallax-pattern-bg.png?t=1647995595&_gl=1*qnpn72*_ga*Nzk0NzIwMzUxLjE2NDY2MzgxMzc.*_ga_WS2VZYPC6G*MTY0Nzk5NTUyMi41NC4xLjE2NDc5OTU2MDAuNTg.')",
        "kid-sleep": "url('https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/usa.png?t=1647849295&_gl=1*mkoz7y*_ga*Nzk0NzIwMzUxLjE2NDY2MzgxMzc.*_ga_WS2VZYPC6G*MTY0NzgzODg1Ni40Ni4xLjE2NDc4NDkyODIuNTk.')",
        "affirm": "https://store-z2qdisybty.mybigcommerce.com/content/converted%20webp/affirm-bg.webp",
        "parallax-2": "url('https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/is-parallax-pattern-bg.png?t=1647995595&_gl=1*qnpn72*_ga*Nzk0NzIwMzUxLjE2NDY2MzgxMzc.*_ga_WS2VZYPC6G*MTY0Nzk5NTUyMi41NC4xLjE2NDc5OTU2MDAuNTg')",
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      }
    },
  },

  plugins: [
    // @ts-ignore

    require('tailwindcss-radix')(),
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
  ],
};

module.exports = config;
