/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs", "./views/partials/*.ejs"],
  theme: {
    extend: {
      height: {
        '40r': '40rem',
      }
    },
  },
  plugins: [],
}

