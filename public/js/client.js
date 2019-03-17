
let chat = new Chat('chatcontainer', 'messageinput')
let socket = io();



socket.on('connect', () => {
    let chatParams = /\?nickname=(.*)&room=(.*)/g.exec(window.location.search.replace(/\+/g,'')) || undefined

                                    //callback as third argument
    socket.emit('join', {nickname: chatParams[1], room: chatParams[2]}, function(err) {
           if (err){
            alert(err)
            window.location.href = '/'
           }
            
            
        
    })
})

socket.on('disconnect', () => {

})
socket.on('newMessage', (message) => {
chat.appendMessage(message)
//messagecontainer.innerHTML += generateMessageBlock(message)
})


let selectroom = document.getElementById('selectroom')
selectroom.addEventListener('click', () => {
    selectroom.classList.toggle('activeselect')
})