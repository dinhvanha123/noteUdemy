const path = require('path')
const http = require('http')
const express = require('express')
const app = express()
const socketio = require('socket.io')
const server = http.createServer(app)
// Thay vì express sẽ tạo server ở behind the scene, ta cấu hình lại cho nodejs
// Cách behavior của nodejs sẽ không thay đổi
// Dùng http để tạo server thay vì để express tự tạo server, sẽ giúp chúng ta cấu hình đc server 1 cách chủ động

const io = socketio(server)
// Khi ta khởi tạo instant socketio bằng const io, io sẽ lấy hàm socketio và truyền 1 server
// Đó là lý do ta dùng http tạo server thay vì để express tự tạo server, vì ko có param truyền vào

const PORT = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, "../public")
app.use(express.static(publicDirectory))


// let count = 0
// Tổng quan: emit method là kích hoạt event, on là khởi tạo event  khi event đc gọi
io.on('connection', ( socket ) => {
    // params socket is an object, it contains information about that new connection
    //  console.log('New WebSocket Connection');
    // socket.emit('countUpdated', count) // This will be used to send to the initial count to the client
    // So right here to send an event from server to client, we use socket.emit on the server. Params is name of the event
    // Param thứ 2 (count) sẽ đc truyền vào callback function bên client

    // socket.on('increment', () => {
    //     count++
    //     // socket.emit('countUpdated', count)   //  socket.emit emits an event to that specific connection.
    //     // when we use socket.emit we are emitting the event to a particular connection, not emit it to every connection available.
    //    io.emit('countUpdated', count)  // This one emits the event to every single connection.
    // })

    socket.emit("message", "Hello")
    socket.broadcast.emit("message","A new user has been join")
     // socket.broadcast.emit : Send message for everybody connection, except a particular client connection

    socket.on("sendMessage", (message) => {
        io.emit("message", message)
    })

    socket.on("disconnect", () => {
        io.emit("message", "A user has left !!")
    })
    // Event disconnect dành cho user disconnect ( close browser ...)
    // Event "disconnect" cần gõ chính xác. Event này ko cần emit method vì nó đc tích hợp bên trong socket.io
    socket.on("sendLocation" , ( position ) => {
        io.emit("message", `https://google.com/maps?q=${position.latitude},${position.longitude}`)
    })
})

server.listen(PORT, () => {
    console.log('Server starting up on port '+ PORT);
    
})