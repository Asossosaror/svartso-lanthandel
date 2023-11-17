const express = require('express');
const app = express();
const path = require('path');

const 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home', { title: 'Välkommen till Svartsö Lanthandel' });
})

app.get('/gasthamn', (req, res) => {
    res.render('guest-harbor', { title: 'Svartsö Gästhman Guest Port SeaStop Dockspot' });
});

app.get('/cykeluthyrning', (req, res) => {
    res.render('bike-rental', { title: 'Cykeluthyrning - Svartsö Lanthandel AB' });
});

app.get('/sjobodarna', (req, res) => {
    res.render('boat-houses', { title: 'Sjöbodarna - Svartsö Lanthandel AB' });
});

app.get('/om-svartso', (req, res) => {
    res.render('about-us', { title: 'Om Svartsö - Svartsö Lanthandel AB' });
});

app.get('/kontakt', (req, res) => {
    res.render('contact-us', { title: 'Kontakt - Svartsö Lanthandel AB' })
})

app.listen(3000, (req, res) => {
    console.log('Listening on port 3000.');
})