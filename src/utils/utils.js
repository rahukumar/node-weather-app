const request = require('request');

const geocode = (location, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1Ijoicmt1bWFyNTkiLCJhIjoiY2p5Z3hycHlyMDVsbzNucjVneXV0Z2lsNCJ9.vRqH25ZPkQgJaSeOhG3srA&limit=1';

    request({ url: geocodeUrl, json: true }, (error, response, body) => {
        if (error) {
            // console.log('unable to connect to the service')
            callback('unable to connect to the service', undefined);
        } else if ((body.error) || (body.message) || (body.features && body.features.length < 1)) {
            // console.log('unable to find the latitudes and logitudes')

            callback('unable to find the Location', undefined)
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            // console.log('longitude : ' + longitude + '\nlatitude : ' + latitude);
            callback(undefined, { longitude, latitude });
        }
    })
}

const forecast = (latitude, longitude, callback) => {
    const forecastUrl = 'https://api.darksky.net/forecast/68976c6586c26057bd85cd46a26f0dd5/' + latitude + ',' + longitude + '?units=si&lang=hi';

    request({ url: forecastUrl, json: true }, (error, response, body) => {
        if (error) {
            // console.log('unable to connect to the service')
            callback('unable to connect to the service', undefined);
        } else if ((body.error) || (body.message) || (body.features && body.features.length < 1)) {
            // console.log('unable to find the latitudes and logitudes')

            callback('unable to find the latitudes and logitudes', undefined)
        } else {
            const temperature = body.currently.temperature;
            // console.log('longitude : ' + longitude + '\nlatitude : ' + latitude);
            callback(undefined, temperature);
        }
    })
}

module.exports = {
    geocode: geocode,
    forecast: forecast
}