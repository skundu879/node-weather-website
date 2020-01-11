const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2t1bmR1ODc5IiwiYSI6ImNrNDFnMjUzcTAwenkza3FyazE3MTJuaGUifQ.FfjN2z167qhJWYuy2K3UWw&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect with Location services!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Couldnot find the place please try to another place!', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                geoPlace: response.body.features[0].place_name


            })
        }
    })
}

module.exports = geoCode;