const request = require('request');
const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGluaHZhbmhhIiwiYSI6ImNqdDcxdjR5ZzBubDIzeXBtOGVlNm9pbzUifQ.yl6iwezZctf7Z8gWCSwq0w&limit=1';
    request({ url , json : true },(error,{body})=>{
        if(error){
            callback('Network failure',undefined);
        }else if(  body.features.length === 0 ){
            callback('Unable to find location service',undefined)
        }else {
            callback(undefined,{
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                place :  body.features[0].place_name,
            })
        }
    })
}
module.exports = geocode;