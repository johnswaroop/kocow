/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            colors: {
                kohinoor: {
                    50: '#f0f7ff',
                    100: '#e0efff',
                    200: '#c0e0ff',
                    300: '#91caff',
                    400: '#5eaaff',
                    500: '#3588ff',
                    600: '#1b68f7',
                    700: '#1553e0',
                    800: '#1847b3',
                    900: '#1a408c',
                    950: '#15296e',
                },
                'kohinoor-blue': '#3588ff',
                'kohinoor-purple': '#8b5cf6',
            },
            backdropBlur: {
                xs: '2px',
                sm: '4px',
                DEFAULT: '8px',
                md: '12px',
                lg: '16px',
                xl: '24px',
                '2xl': '40px',
                '3xl': '64px',
            },
            backgroundOpacity: {
                '15': '0.15',
                '35': '0.35',
                '65': '0.65',
                '85': '0.85',
            },
            borderOpacity: {
                '15': '0.15',
                '35': '0.35',
                '65': '0.65',
                '85': '0.85',
            },
            animation: {
                'blob': 'blob 7s infinite',
            },
            keyframes: {
                blob: {
                    '0%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                    },
                    '100%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                },
            },
        },
    },
    plugins: [],
} 