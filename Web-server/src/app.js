const path = require('path');
const hbs = require('hbs');
const express = require('express');
// Thư viện express thực chất chỉ là 1 hàm, không phải là đối tượng hay gì khác,

const geocode = require('./utils/geocode')
const forecast = require('./utils/darksky')

// Thiết lập đường dẫn cho hbs
const hbsPath = path.join(__dirname,'../Templates/HandleBars')
hbs.registerPartials(hbsPath);

const app = express()

const port = process.env.PORT || 2000;
// vì vậy, cần gán hàm express() vào biến app để chạy ứng dụng express( không cần tham số)

const viewsPath = path.join(__dirname,'../Templates/Views')

app.set('view engine','hbs');
// Thiết lập view engine là hbs
// Express mặc định sẽ tìm trong folder views để render, nếu muốn thay đổi tên folder views, ta có thẻ dùng lệnh :
app.set('views', viewsPath );
app.use(express.static(path.join(__dirname,'../public')))
app.get('',(req , res)=>{
    res.render('index',{
        title : 'Weather App',
        name : ' Van Ha'
    })
})
app.get('/about',(req , res)=>{
    res.render('about',{
        title : 'About Me',
        name : ' Van Ha'
    })
})
app.get('/help',(req , res)=>{
    res.render('help',{
        title : 'Help Me',
        helpText : 'Page Help'
    })
})
app.get('/help/*',(req , res)=>{
   res.render('help404',{
       title : 'Help page 404',
       name : 'Van Ha'
   })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide an Address',
        })
    }
    geocode( req.query.address, (error, { longitude, latitude, place }={})=>{
        if(error){
            return res.send({error})
        }
        forecast( longitude,latitude,(error, data)=>{
            if(error){
                return console.log(error);
            }
            res.send({
               data,
               place,
               address : req.query.address,
            })
        })
    
    })

})
app.get('*',(req , res)=>{
   res.render('all404',{
       title : 'all page 404',
       name : 'Van Ha Sama'
   })
})
app.listen(port,()=>{
    console.log('Server is up on port',port);
})
// Đối với các ứng dụng khác, khi chạy xong task, thì node sẽ đưa ta trở lại command line để thực hiện lệnh khác.
// Nhưng với web server thì khác, node process không bao giờ dừng lại cho đến khi ta dừng nó. Nhiệm vụ của nó khỏi động server và chạy liên tục.

