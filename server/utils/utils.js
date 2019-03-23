const moment = require('moment')

let generateMessage = (from,body, self) => {
    return {
        from,
        body,
        timestamp: moment().valueOf(),
        self
    }
}



let validateRoom = function(arg){
    let roomsList = 
    ['room1','room2','room3','room4']

    return roomsList.some((room) => {
        return room == arg
    })
}
let validateNickname = function(nickname){
    let testRegEx = RegExp('^[a-zA-Z0-9]*$', 'g')
   if(!testRegEx.test(nickname) || nickname.length < 3){
       return false
    } else {
        return true
    }
}
module.exports = {generateMessage, validateRoom, validateNickname}