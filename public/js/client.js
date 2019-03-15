let generateMessageBlock = (message) => {
    return `<div class="chat__messagecontainer">
    <div class="chat__user">
        <img src="./img/avatar.jpg" alt="" class="smallavatar">
        <h1 class="header header--subheader">${message.from}</h1>
    </div>
    <div class="chat__messageblock">
        <div class="chat__message">
            <p class="header header--subheader">${message.body}</p>
        </div>
        <h1 class="header header--subheader chat__timestamp">${message.time}</h1>

    </div>

</div>`
}

let selectroom = document.getElementById('selectroom')
selectroom.addEventListener('click', () => {
    selectroom.classList.toggle('activeselect')
})
const messagecontainer = document.getElementById('chatcontainer')
const messageinput = document.getElementById('messageinput')


let socket = io();

socket.on('connect', () => {
    console.log('connected to server')
})

socket.on('disconnect', () => {
    console.log('connected to server')
})
socket.on('newMessage', (message) => {

messagecontainer.innerHTML += generateMessageBlock(message)
})
messageinput.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('bla')
    let messageText = messageinput.querySelector('#messagetext')
    socket.emit('createMessage', {from: "Johnny", body: messageText.value})
    messageText.value = ""
})