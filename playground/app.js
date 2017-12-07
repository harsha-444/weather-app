const request = require('request');
const yargs = require('yargs');

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

request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
}, (err, res, body) => {
    // console.log("res: ", res);
    if(err){
        console.log(err);
    }
    else if(body.status === 'ZERO_RESULTS'){
        console.log('unable to find that address');
    }
    else if(body.status === 'OK'){
        console.log(`The latitude is ${body.results[0].formatted_address}`);
        console.log(`The latitude is ${body.results[0].geometry.location.lat}`);
        console.log(`The latitude is ${body.results[0].geometry.location.lng}`);
    }

});
