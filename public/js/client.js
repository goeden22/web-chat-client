
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


let RoomSelect = function(id){
    this.container = document.getElementById(id)
    this.activeRoom = ""
    this.optionList = [{
        name: 'room1'
    },
    {
        name: 'room2'
    },
    {
        name: 'room3'
    },
    {
        name: 'room4'
    },]
    this.optionChoose = this.optionList.map(option => {
        return  `<div class="selectroom__option">
        <h1 class="header header--secondary" name="${option.name}">${option.name}</h1>
    </div>`
    }).join("");

    this.append = () => {
        this.options.innerHTML = this.optionChoose
    }
    this.options = document.getElementById('selectroomContainer')
    this.options2 = this.container.querySelectorAll('.selectroom__option')
    
    this.changeRoom = (e) => {
        if (!this.container.classList.contains('activeselect')){
            return false
        }
        
        let newRoom = e.target.getAttribute('name')
        if(!newRoom){
            return false
        }
        socket.emit('changeRoom')
        let url = new URL(window.location.href)
        url.searchParams.set('room', newRoom)
        window.location.href = url.href
       
      console.log(e.target)
    }
    this.openList = () => {
        this.container.classList.toggle('activeselect')
    }
    this.container.onclick = this.openList.bind(this)
    this.options.onclick = this.changeRoom.bind(this)
    this.append()
   
}
let selectroom = new RoomSelect('selectroom')

/*let selectroom = document.getElementById('selectroom')
selectroom.addEventListener('click', () => {
    selectroom.classList.toggle('activeselect')
})*/

