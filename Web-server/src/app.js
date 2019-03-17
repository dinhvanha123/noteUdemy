const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/darksky')

const express = require('express');
// Thư viện express thực chất chỉ là 1 hàm, không phải là đối tượng hay gì khác,

const app = express()
// vì vậy, cần gán hàm express() vào biến app để chạy ứng dụng express( không cần tham số)

const hbsPath = path.join(__dirname,'../Templates/partials')
hbs.registerPartials(hbsPath);
// Thiết lập đường dẫn cho module hbs

const viewsPath = path.join(__dirname,'../Templates/views')
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
        name : ' Van Ha'
    })
})
app.get('/weather',(req , res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provided an address'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, place}={})=>{
            if(error){
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, data)=>{
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    data,place
                })
            } )
    })
})
app.get('*',(req , res)=>{
    res.render('help',{
        title : '404 Page',
        name : ' Van Ha'
    })
})
app.get('*',(req , res)=>{
   res.send('404 Page')
})
app.listen(2000,()=>{
    console.log('Server is up on port 2000');
})
// Đối với các ứng dụng khác, khi chạy xong task, thì node sẽ đưa ta trở lại command line để thực hiện lệnh khác.
// Nhưng với web server thì khác, node process không bao giờ dừng lại cho đến khi ta dừng nó. Nhiệm vụ của nó khỏi động server và chạy liên tục.

// Mẹo với nodemon, nodemon chỉ lưu những trên những file .js
// Nếu muốn nodemon cũng restart các file khác như với file .js: nodemon app.js -e js,hbs
// Trong đó: e viết tắt extension, và đằng sau là các đuôi cần thêm vào.

