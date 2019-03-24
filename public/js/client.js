
let chat = new Chat('chatcontainer', 'messageinput')
let socket = io();


let userListContainer = document.getElementById('usersList')
let usrUpdates = (userList) => {
 
   let filteredUser =  userList.map(usr => {
        return `<div class="users__user">
        <img src="./img/avatar.jpg" alt="" class="users__img">
        <div class="users__description">
            <h1 class="header header--main">${usr.name}</h1>
            <h1 class="header header--subheader">Last message:
                <span class="header header--main"> 5min</span> ago</h1>
        </div>
    </div>
    <hr class="lightseparator">`
    }).join('') || ""

    userListContainer.innerHTML = filteredUser;

}

let roomInfo = new RoomInfo('roomInfo')
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
chat.scroll(350);
//messagecontainer.innerHTML += generateMessageBlock(message)
})
socket.on('updateUserList', (users) => {
    usrUpdates(users)
    roomInfo.append(users)

})
socket.on('updateRoomSelection', (room) => {
    selectroom.activeRoom = room;
    selectroom.sortList()
})



let selectroom = new RoomSelect('selectroom')

/*let selectroom = document.getElementById('selectroom')
selectroom.addEventListener('click', () => {
    selectroom.classList.toggle('activeselect')
})*/

