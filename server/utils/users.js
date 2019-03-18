let UserList = function(){
    this.users = [];
    this.addUser = (tempus) => {
        let user = {id: this.users.length + 1, name: tempus.name, room: tempus.room}
        this.users.push(user)
        return user
    }
    this.getUser = (id) => {
        return this.users.find(user => {
            return user.id == id
        })
    };
    this.removeUser = (id) =>{
        let user = this.getUser(id);

        if(user){
            this.users = this.users.filter(user => {
                return user.id != id
            })
        }
        
        return user
    };
    this.getRoomUsers = (room) => {
        return this.users.filter(user => {
            return user.room == room;
        })
    }
}

module.exports = {UserList}