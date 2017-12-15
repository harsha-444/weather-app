const request = require('request');
const yargs = require('yargs');

const axios = require('axios');
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    // console.log(JSON.stringify(response.data));
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/76cc7df3624aeed934327aa26aa8a27f/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`it's currently ${temperature}.It feels like ${apparentTemperature}`);
}).catch((err) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers');
    }
    else{
        console.log(e.message);
    }
});
