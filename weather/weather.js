const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/76cc7df3624aeed934327aa26aa8a27f/${lat},${lng}`,
        json: true
    }, (err, res, body) => {
        if(!err && res.statusCode === 200){
            callback(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature

            });
        }
        else{
            callback("unable to fetch the weather");
        }
    });
}

module.exports.getWeather = getWeather;
