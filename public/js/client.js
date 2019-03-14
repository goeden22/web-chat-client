let selectroom = document.getElementById('selectroom')
selectroom.addEventListener('click', (e) => {
    selectroom.classList.toggle('activeselect')
})

let socket = io();

socket.on('connect', () => {
    console.log('connected to server')
})

socket.on('disconnect', () => {
    console.log('connected to server')
})