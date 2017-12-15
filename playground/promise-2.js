const request = require('request');

var geoCodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);

        request({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (err, res, body) => {
            // console.log("res: ", res);
            if(err){
                reject(err);
            }
            else if(body.status === 'ZERO_RESULTS'){
                reject('unable to find that address');
            }
            else if(body.status === 'OK'){
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }

        });
    });
}

geoCodeAddress('508001').then((location) => {
    console.log(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
}, (err) => {
    console.log(err);
});
