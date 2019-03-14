const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/darksky')
//const urlDarkSky = 'https://api.darksky.net/forecast/30890ab787f1b015e797c82cd58c64d8/37.8267,-122.4233';
// Link tham khảo các option https://darksky.net/dev/docs

// Link tham khảo các option https://docs.mapbox.com/api/search/#geocoding
if(process.argv[2] === undefined ){
    console.log('Please input location');
}else {
    geocode(process.argv[2], (error, { longitude, latitude })=>{
    if(error){
        return console.log(error);
    }
    forecast( longitude,latitude,(error, data)=>{
        if(error){
            return console.log(error);
        }
        console.log('error',error);
        console.log('data',data);
    })

})
}

