const path = require('path');

const express = require('express');
// Thư viện express thực chất chỉ là 1 hàm, không phải là đối tượng hay gì khác,

const app = express()
// vì vậy, cần gán hàm express() vào biến app để chạy ứng dụng express( không cần tham số)

const viewsPath = path.join(__dirname,'../Templates')
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

