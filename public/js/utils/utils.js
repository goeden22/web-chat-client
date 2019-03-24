
function Chat(container, input){
    this.container = document.getElementById(container),
    this.input = document.getElementById(input)
    this.getMessage = () => {
        return this.container.querySelectorAll('.chat__messagecontainer')
    }

    this.generateMessageBlock = function(message){
        if(message.self){
            return `<div class="chat__messagecontainer invertedmessage moved">
                    
            <div class="chat__messageblock">
                <div class="chat__message messageinverted">
                    <p class="header header--secondary">${message.body}</p>
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
                <p class="header header--subheader">${message.body}</p>
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
        socket.emit('createMessage', {from: "Johnny", body: messageText.value})
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
        this.optionList = this.optionList.sort((a,b) => {
            if(b.name == this.activeRoom){
                return 1
            } else{
                return 0
            }
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
        socket.emit('changeRoom')
        let url = new URL(window.location.href)
        url.searchParams.set('room', newRoom)
        window.location.href = url.href
       
    }
    this.openList = () => {
        this.container.classList.toggle('activeselect')
    }
    this.container.onclick = this.openList.bind(this)
    this.options.onclick = this.changeRoom.bind(this)
    this.append()
   
}