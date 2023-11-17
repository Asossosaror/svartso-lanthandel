const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const { transporter } = require('./nodemailerConfig');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home', { title: 'Välkommen till Svartsö Lanthandel', page: 'home' });
})

app.get('/gasthamn', (req, res) => {
    res.render('guest-harbor', { title: 'Svartsö Gästhman Guest Port SeaStop Dockspot', page: 'guest-harbor' });
});

app.get('/cykeluthyrning', (req, res) => {
    res.render('bike-rental', { title: 'Cykeluthyrning - Svartsö Lanthandel AB', page: 'bike-rental' });
});

app.get('/sjobodarna', (req, res) => {
    res.render('boat-houses', { title: 'Sjöbodarna - Svartsö Lanthandel AB', page: 'boat-houses' });
});

app.get('/om-svartso', (req, res) => {
    res.render('about-us', { title: 'Om Svartsö - Svartsö Lanthandel AB', page: 'about-us' });
});

app.get('/kontakt', (req, res) => {
    res.render('contact-us', { title: 'Kontakt - Svartsö Lanthandel AB', page: 'contact-us' })
})

app.post('/send-email', (req, res) => {
    console.log(req.body);
    const { name, phoneNumber, email, message } = req.body;
    let dateBoatHouse = '';
    let dateBoatHouseString = '';
    try {
        dateBoatHouse = req.body.date;
        if(dateBoatHouse) {
            dateBoatHouseString = "\nDatum: " + dateBoatHouse;
        }
    } catch (error) {
        console.error(error);
    }

    console.log(dateBoatHouseString);

    const mailToAdmin = `Namn: ${name}\nTelefonnummer: ${phoneNumber}\nMailaddress: ${email}\nMeddelande: ${message}${dateBoatHouseString}`;

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_ADDRESS,
        subject: 'Testing Nodemailer',
        text: mailToAdmin
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Form submission failed.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: 'Form submitted successfully!' })
            res.redirect('/');
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('Listening on port 3000.');
})