/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs", "./views/partials/*.ejs"],
  theme: {
    extend: {
      height: {
        '30r': '30rem',
        '40r': '40rem',
      }
    },
  },
  plugins: [],
}

