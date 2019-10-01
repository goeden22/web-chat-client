const timeago = require("timeago.js");
import moment from 'moment';
import $ from 'jquery';


const Chat = function(container, input, callback){
    this.container = document.getElementById(container),
    this.input = document.getElementById(input)
    this.getMessage = () => {
        return this.container.querySelectorAll('.chat__messagecontainer')
    }

    this.generateMessageBlock = function(message){
        if(message.self){
            return `<div class="chat__messagecontainer invertedmessage movedinverted">
                    
            <div class="chat__messageblock">
                <div class="chat__message messageinverted">
                    <p class="header header--secondary chat__paragraph">${message.body}</p>
                </div>
                <h1 class="header header--subheader chat__timestamp">${moment(message.time).format('HH:mm:ss')}</h1>
            </div>
            <div class="chat__user">
                <img src="./img/avatar.jpg" alt="" class="smallavatar">
                <h1 class="header header--subheader">${message.from}</h1>
            </div>
        </div>`
        } else{
            return `<div class="chat__messagecontainer moved">
        <div class="chat__user">
            <img src="./img/avatar.jpg" alt="" class="smallavatar">
            <h1 class="header header--subheader">${message.from}</h1>
        </div>
        <div class="chat__messageblock">
            <div class="chat__message">
                <p class="header header--subheader chat__paragraph">${message.body}</p>
            </div>
            <h1 class="header header--subheader chat__timestamp">${moment(message.time).format('HH:mm:ss')}</h1>
        </div>
    </div>`
        }
        

    }
    this.appendMessage = function(message){
      this.container.innerHTML += this.generateMessageBlock(message)
      //this.getMessage().lastChild.classList.remove('moved')
      let messages = this.getMessage();
      setTimeout(function(){
        messages[messages.length -1].style.transform = "translateX(0)"
      },50)
    }

    this.handleSubmit = (e) => {
        e.preventDefault();
        let messageText = messageinput.querySelector('#messagetext')
        callback({ body: messageText.value})
        messageText.value = ""
        //this.scroll();
    }
    this.scroll = (time) => {
        $(this.container).animate({scrollTop: this.container.scrollHeight}, time)
    }
    this.input.onsubmit = this.handleSubmit.bind(this)
}

function RoomInfo(id){
    this.container = document.getElementById(id)
    this.generateInfo = (users) =>{
        return `<img src="./img/avatar.jpg" alt="" class="largeavatar">
                <h1 class="header header--secondary sspace">${users[0].room}</h1>
             
                <div class="rooms__infogroup">
                    <h1 class="header header--secondaryShaded sspace">Users:</h1>
                    <h1 class="header header--secondary sspace">${users.length}</h1>
                </div>`

    }
    this.append = (list) => {
        
        this.container.innerHTML = this.generateInfo(list)
    }
}

let RoomSelect = function(id, callback, callback2){
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
    this.optionChoose = () => {
      return this.optionList.map(option => {
            return  `<div class="selectroom__option">
            <h1 class="header header--secondary" name="${option.name}">${option.name}</h1>
        </div>`
        }).join("");
    } 

    this.append = () => {
        this.options.innerHTML = this.optionChoose();
    }
    this.sortList = () => {
        this.optionList = this.optionList.sort((x,y) => {
        
                 return x.name == this.activeRoom ? -1 : y.name == this.activeRoom ? 1 : 0; 
            
        })
        this.append();
       
        
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
        callback();
        setTimeout(function(){
            callback2('changeRoom');
            let url = new URL(window.location.href);
            url.searchParams.set('room', newRoom);
            window.location.href = url.href;
        }, 400)

        
       
    }
    this.openList = () => {
        this.container.classList.toggle('activeselect')
    }
    this.container.onclick = this.openList.bind(this);
    this.options.onclick = this.changeRoom.bind(this);
    this.append()
   
}

let AnimForeground = function(id){
    this.foreground = document.getElementById(id);
    this.on = () => {
       
        let foreground = this.foreground
      foreground.classList.toggle('anim__on')
    }
    this.off = () => {
        let foreground = this.foreground;
        setTimeout(function(){
            foreground.classList.toggle('anim__on')
        }, 750)
    }
}
let MobileButtons = function(rooms,users, roomsButton, usersButton){
    this.roomsContainer = document.getElementById(rooms);
    this.usersContainer = document.getElementById(users);
    this.roomsButton = document.getElementById(roomsButton);
    this.usersButton = document.getElementById(usersButton)

    this.roomsButton.onclick = () => {
        this.roomsContainer.classList.toggle('mobile__active')
        this.roomsContainer.querySelector('.rooms__content').classList.toggle('visibleContent')
    }
    this.usersButton.onclick = () => {
        this.usersContainer.classList.toggle('mobile__active')
        this.usersContainer.querySelector('.users__content').classList.toggle('visibleContent')
    }
}
let UsersList = function(id,id2){
    this.container = document.getElementById(id);
    this.searchUser = document.getElementById(id2)
    this.usrList = []
    this.domList = (list) => {
        return list.map(usr => {
            let time = usr.time ? timeago.format(usr.time) : "none"
            return `<div class="users__user">
            <img src="./img/avatar${usr.avatar}.jpg" alt="" class="users__img">
            <div class="users__description">
                <h1 class="header header--main">${usr.name}</h1>
                <h1 class="header header--subheader">Last message:
                    <span class="header header--main">${time}</span></h1>
            </div>
        </div>
        <hr class="lightseparator">`
        }).join('') || ""
    }
    this.updateUsers = (users) => {
        this.usrList = users
    }
    this.setTime = (time,user) => {
        let tempList = this.usrList.map(usr => {
            if(usr.name == user){
                usr.time = time;
            }
            return usr
        })
        this.updateUsers(tempList);
        this.append(this.usrList)
    }
    this.append = (list) => {
        this.container.innerHTML = this.domList(list);
    } 
    this.usrSearch = (string) => {
        this.append(this.usrList.filter(usr => {
            return usr.name.includes(string)
        }))
    }
    this.searchUser.onkeyup = (e) => {
       this.usrSearch(e.target.value)
    }
}
export {UsersList, RoomSelect, Chat, RoomInfo, AnimForeground, MobileButtons}