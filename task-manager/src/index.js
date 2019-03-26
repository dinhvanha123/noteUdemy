const express =require('express');
require('./db/mongoose')
// Require với file mongoose để khởi động kết nối với Mlab, nên không cần gán variable

// const User = require('./models/user');
// const Task = require('./models/task');

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();

const port = process.env.PORT || 3000 ;
app.use(express.json())
// Ta dùng express.json() để xử lý dữ liệu Json đến được gửi từ Client cho Server.
// Nó sẽ gắn dữ liệu Json đến vào đối tượng body của req ( req.body )
// Ta cũng có thể dùng bodyParser.json()

app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log('Server is up running on '+port);
})