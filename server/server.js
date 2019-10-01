//path. join to metoda ktora pozwala nam z relatywnej sciezki stworzyc bezwzgledna sciezke
const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const {generateMessage, validateRoom, validateNickname} = require('./utils/utils.js');
const {UserList} = require('./utils/users.js')
const moment = require('moment')


const publicPath = path.join(__dirname, '../public');
const app = express();
//implementujemy socketa na serwerze
const server = http.createServer(app);
const io = socketIo(server)

let users = new UserList()
//middleware do uruchamiania na serwerze statycznych plików
app.use(express.static(publicPath))


//LISTENERY
io.on('connection', (socket) => {
    console.log('new user connected')
  //socket reprezentuje indywidualne połączenie z konkretnym użytkownikiem, io reprezentuje ogólne połączenie dla wszystkich użytkowników

  
  
  
  socket.on('changeRoom', () => {
    let crtUser = users.getUser(socket.id)
    if(crtUser){
      users.removeUser(socket.id)
      io.to(crtUser.room).emit('updateUserList', users.users)
      io.to(crtUser.room).emit('updateRoomSelection', crtUser.room)
    }
  })
  socket.on('join', (params, callback) => {
    let testRegEx = RegExp('^[a-zA-Z0-9]*$', 'g')
   if(!validateNickname(params.nickname)){
      callback("Your nickname must be alfanumeric value and be at least 3 characters long")
    } else if (!validateRoom(params.room)){
      callback("Room is invalid")
    } else{

      socket.join(params.room)
      users.removeUser(socket.id)
      users.addUser({id: socket.id, name: params.nickname, room: params.room, avatar:params.avatar})

      io.to(params.room).emit('updateUserList', users.getRoomUsers(params.room))
      io.to(params.room).emit('updateRoomSelection', params.room)
      callback();
    }
  })
  socket.on('createMessage', (message) =>{
    
    let user = users.getUser(socket.id)
    console.log(user.name)
    io.to(user.room).emit('updateUserList', {time: moment().valueOf(), user: user.name, avatar: user.avatar})
    if(validateNickname(user.name) && message.body.trim().length > 0){
      socket.broadcast.to(user.room).emit('newMessage', generateMessage(users.getUser(socket.id).name,message.body, false))
      socket.emit('newMessage', generateMessage(users.getUser(socket.id).name,message.body, true))
      
    }
    
  })
  socket.on('disconnect', () => {
    let crtUser = users.getUser(socket.id)
    if(crtUser){
      users.removeUser(socket.id)
      io.to(crtUser.room).emit('updateUserList', users.users)
    }
    
  })
})



server.listen(process.env.PORT || 3000, () => {
    console.log(`all ok`);
  });