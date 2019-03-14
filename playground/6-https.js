const https = require('https');
const url = 'https://api.darksky.net/forecast/30890ab787f1b015e797c82cd58c64d8/37.8267,-122.4233';
const request =  https.request(url,(response)=>{
     let data = '';
        response.on('data',(chunk)=>{
            data = data + chunk.toString();
        })
        response.on('end',()=>{
            console.log('data',JSON.parse(data) );
        })
 })
 request.on('error',(e)=>{
    console.log(e);
  
 })
 request.end();