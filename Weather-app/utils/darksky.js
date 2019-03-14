const request = require('request');
const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/30890ab787f1b015e797c82cd58c64d8/'+latitude+','+longitude;
    request({ url , json : true },(error,{body})=>{
        if(error){
            callback('Network failure',undefined);
        }else if(  body.error ){
            callback('Unable to find location',undefined)
        }else {
            callback(undefined,body.daily.data[0].summary)
        }
    })
}
module.exports = forecast;