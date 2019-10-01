let Avatars = function(id){
    this.list = document.getElementById('loginform')
    this.avatar = "1"
    this.setAvatar = (av) => {
        this.avatar = av
        document.querySelectorAll('.loginform__avatar').forEach((el) => {
            el.classList.remove('loginform--active');
        })
        document.getElementById(`avatar${av}`).classList.add('loginform--active')
        localStorage.setItem('avatar', this.avatar)
    }
    this.list.onclick = (e) => {
        if(e.target.name){
            this.setAvatar(e.target.name)
        }
       
    }
}
let avatars = new Avatars
localStorage.setItem('avatar', avatars.avatar)
