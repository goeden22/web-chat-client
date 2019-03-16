
let chat = new Chat('chatcontainer', 'messageinput')

let socket = io();

socket.on('connect', () => {
    console.log('connected to server')
})

socket.on('disconnect', () => {
    console.log('connected to server')
})
socket.on('newMessage', (message) => {
chat.appendMessage(message)
//messagecontainer.innerHTML += generateMessageBlock(message)
})


let selectroom = document.getElementById('selectroom')
selectroom.addEventListener('click', () => {
    selectroom.classList.toggle('activeselect')
})