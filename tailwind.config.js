import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                mainOrange: "#dd8500",
                mainDark: "#0b0b0b",
                secondaryDark: "#111111",
            },
            boxShadow: {
                gameThumbnailShadow: "5px 5px 5px black",
                homePageHeroShadow: "0 0 5px 1px #dd8500",
            }
        },
    },

    plugins: [forms],
};
