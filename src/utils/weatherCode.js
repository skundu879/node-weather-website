const request = require('request');
const moment = require('moment');

const weatherData = (latitude, longitude, callback) => {
    console.log(latitude + ' , ' + longitude);
    const url = 'https://api.darksky.net/forecast/3409f7a6941c1e59892ac14fb06d1ecf/' + latitude + ',' + longitude + '?units=si';
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect with weather services!', undefined);
        } else if (response.body.code === 400) {
            callback('Poorly formatted request!', undefined);
        } else {
            callback(undefined, {
                temperature: response.body.currently.temperature,
                time: moment(response.body.currently.time * 1000).calendar(),
                pressure: response.body.currently.pressure,
                Place: response.body.timezone,
                humidity: response.body.currently.humidity,
                summary: response.body.currently.summary,
                windSpeed: response.body.currently.windSpeed,
                visibility: response.body.currently.visibility,
                precipProbability: response.body.currently.precipProbability,
                //if (precipType) { precipType1: precipType }
            })
        }
    })

}
module.exports = weatherData;