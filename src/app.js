const path = require('path');
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const weatherCode = require('./utils/weatherCode');
const app = express();
//Setting up the Dinamic Path
const publicDir = path.join(__dirname, '../public');
const viewDir = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');

const port = process.env.PORT || 3000;
//setting up the view engine
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        auther: 'Sujan Kundu'
    });
});

app.set('views', viewDir);
app.set('view engine', 'hbs');
hbs.registerPartials(partialspath);
//setting up the static directory
app.use(express.static(publicDir));

app.get('/index', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        auther: 'Sujan Kundu'
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.render('error', {
            title: '404',
            error: 'Please enster a valid Address!'
        });
    }
    geoCode(req.query.address, (error, { latitude, longitude, geoPlace } = {}) => {
        if (error || longitude === null || latitude === null) {
            return res.send({
                title: '404',
                error
            });
        }
        weatherCode(longitude, latitude, (error, forcastData = {}) => {
            if (error || forcastData === null) {
                return res.send({
                    title: '404',
                    error
                })
            }
            res.send({
                title: 'Weather App',
                auther: 'Sujan Kundu',
                temparature: forcastData.temperature,
                presure: forcastData.pressure,
                geoPlace,
                time: forcastData.time,
                address: req.query.address,
                humidity: forcastData.humidity,
                summary: forcastData.summary,
                windSpeed: forcastData.windSpeed,
                visibility: forcastData.visibility,
                // precipType: forcastData.precipType,
                precipProbability: forcastData.precipProbability * 100,
                //precipType1: forcastData.precipType1

            });
        });
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        auther: 'Sujan Kundu'
    });
});
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'The Page did Not Found'
    })
});
app.listen(port, () => {
    console.log(chalk.green.underline.bold('Server is running on port :' + port));
})