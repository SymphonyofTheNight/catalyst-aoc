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
        "bed-sleep": "url('https://store-z2qdisybty.mybigcommerce.com/content/converted%20webp/bed-top-view.webp')",
        "certified-prod": "url('https://store-z2qdisybty.mybigcommerce.com/content/converted%20webp/certified-bg.webp')",
        "sofa-img": "url('https://store-z2qdisybty.mybigcommerce.com/content/converted%20webp/forever-warranty-bg.webp')",
        "stack-img": "url('https://store-z2qdisybty.mybigcommerce.com/content/converted%20webp/feature-rich-%20mattress.webp')",
        "bg-parallax-footer": "url('https://cdn11.bigcommerce.com/s-z2qdisybty/images/stencil/original/image-manager/is-parallax-pattern-opt.png?t=1677658441&_gl=1*foioyg*_ga*MTg3MDAxNzI4MC4xNjU4ODE4Mzk1*_ga_WS2VZYPC6G*MTY3NzY1Njg1MS40MTMuMS4xNjc3NjU4NDQyLjQ3LjAuMA')",
        "adjustable-frame": "url('https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/adjustable-frames-sub-banner.png')",
        "category-parallax": "url('https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/adjustable-frames-parallax.png')",
        "Blankets": "url('https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/related-blankets.png')",
        "Mattress": "url('https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/related-mattress-protector.png')",
        "Sheets": "url('https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/related-sheets.png')",
        "custom-productpage-bg": "url('https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/stars-bg-.png?t=1652429372&_gl=1*1dk7e7c*_ga*ODk3ODY0MTgwLjE2NDg4MDI1OTE.*_ga_WS2VZYPC6G*MTY1MjQyODk2NS4xMDEuMS4xNjUyNDI5NjYxLjYw')",
        "icon-diff": "url('https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/starry-bg-200px.png')"
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      boxShadow: {
        'bottom': '1px 2px 4px 0 rgba(0, 0, 0, 0.65)',
      },
    },
    screens: {
      'xxs': '260px',
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'lgshow': '1100px',
      'xl': '1280px',
      '1xl': '1360px',
      '2xl': '1440px',
      '3xl': '1540px',
      '4xl': '1680px',
      '5xl': '1800px',
    }
  },

  plugins: [
    // @ts-ignore
    require('tailwindcss-radix')(),
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
  ],
};

module.exports = config;
