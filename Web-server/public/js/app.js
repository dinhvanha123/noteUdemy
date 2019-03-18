
const formLocation = document.querySelector('form');
const inputLocation = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

formLocation.addEventListener('submit',(event)=>{ // sự kiện có 1 argument là event
    event.preventDefault();
    // preventDefault dùng để cho form không load lại page, để ta có thể xử lý tiếp

    messageOne.textContent='Loading...';
    messageTwo.textContent='';
    fetch('/weather?address='+inputLocation.value).then((respond)=>{
    respond.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
        }else{
            messageOne.textContent=data.data;
            messageTwo.textContent=data.place;
        }
    })
})
})
