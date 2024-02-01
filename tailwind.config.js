/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'pink': '#eab2bb',
        'blue': '#3c6ca8',
        'orange': '#e37951',
        'off-white': '#fffcf6',
        'light-pink': '#f4ebec',
        'light-blue': '#95a9c7',

        // Add more colors as needed
      },
    },
  },
  plugins: []
};