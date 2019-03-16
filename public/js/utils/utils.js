
function Chat(container, input){
    this.container = document.getElementById(container),
    this.input = document.getElementById(input)

    this.generateMessageBlock = function(message){
        return `<div class="chat__messagecontainer">
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
    this.appendMessage = function(message){
      this.container.innerHTML += this.generateMessageBlock(message)
    }

    this.handleSubmit = (e) => {
        e.preventDefault();
        let messageText = messageinput.querySelector('#messagetext')
        socket.emit('createMessage', {from: "Johnny", body: messageText.value})
        messageText.value = ""
        this.scroll();
    }
    this.scroll = () => {
        $(this.container).animate({scrollTop: this.container.scrollHeight}, 750)
    }
    this.input.onsubmit = this.handleSubmit.bind(this)
}