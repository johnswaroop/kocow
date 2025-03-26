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
            },
            backdropBlur: {
                xs: '2px',
                sm: '4px',
                md: '8px',
                lg: '12px',
                xl: '16px',
                '2xl': '24px',
                '3xl': '32px',
            },
            backgroundOpacity: {
                '15': '0.15',
                '35': '0.35',
                '85': '0.85',
                '95': '0.95',
            },
            borderOpacity: {
                '15': '0.15',
                '35': '0.35',
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