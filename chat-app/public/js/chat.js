// cấu hình socketio bên client side
const socket = io()  // We initialize the connection 
 
// socket.on('countUpdated' , (count) => { // params count sẽ lấy giá trị từ event countUpdated truyền vào
//     console.log('The count has been updated!', count);
    
// })
// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('123');
//     socket.emit('increment')
// })
socket.on("message", (message) => {
    console.log('This is', message);
})
document.querySelector("#message-form").addEventListener('submit', (e) => {
    e.preventDefault() //  preventDefault method để giữ page ko load lại

    // const input = document.querySelector("input").value
    const input = e.target.elements.message.value
    // e.target : chỉ định form hiện tại đang tham chiếu
    // .elements,message : lấy input có thuộc tính name = message
    // .value : lấy giá trị của input đó

    socket.emit("sendMessage", input)
})
document.querySelector("#send-location").addEventListener('click', () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
    if( !navigator.geolocation ){
        return alert("Not support browser")
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("sendLocation", {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        })
    })
    
})