import {UsersList, RoomSelect, Chat, RoomInfo, AnimForeground, MobileButtons} from './utils/utils.js'
import {timeago} from './libs/timeago.min.js';


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
    mainAnim.off();
})

socket.on('disconnect', () => {

})
socket.on('newMessage', (message) => {
chat.appendMessage(message)
chat.scroll(350);
//messagecontainer.innerHTML += generateMessageBlock(message)
})
socket.on('updateUserList', (users) => {
   if (users.time){
        usersList.setTime(users.time, users.user)
    } else if (!users.time){
        console.log(users)
        usersList.updateUsers(users)
        usersList.append(usersList.usrList);
        roomInfo.append(users)
    }
   
    

})
socket.on('updateRoomSelection', (room) => {
    selectroom.activeRoom = room;
    selectroom.sortList()
})
setInterval(function(){
if (usersList.usrList){
    usersList.append(usersList.usrList)
}

}, 10000);


let chat = new Chat('chatcontainer', 'messageinput', (arg) => {
    socket.emit('createMessage', arg)
})
let usersList = new UsersList('usersList', 'usrSearch')
let roomInfo = new RoomInfo('roomInfo')
let mainAnim = new AnimForeground('animForeground')
let selectroom = new RoomSelect('selectroom',mainAnim.on, (event) => {
    socket.emit(event)
})
let mobileFunctions = new MobileButtons('roomscontainer','userscontainer','roomsbutton','usersbutton')

/*let selectroom = document.getElementById('selectroom')
selectroom.addEventListener('click', () => {
    selectroom.classList.toggle('activeselect')
})*/

