/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/flowbite/**/*.js,ts,tsx,jsx"
  ],
  theme: {
    extend: {
      screens: {
        mh: "960px"
      },
    },
  },
  plugins: [],
}

