const moment = require('moment')

let generateMessage = (from,body) => {
    return {
        from,
        body,
        timestamp: moment().valueOf(),
    }
}



let validateRoom = function(arg){
    let roomsList = 
    ['room1','room2','room3','room4']

    return roomsList.some((room) => {
        return room == arg
    })
}
module.exports = {generateMessage, validateRoom}