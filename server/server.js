//path. join to metoda ktora pozwala nam z relatywnej sciezki stworzyc bezwzgledna sciezke
const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const {generateMessage, validateRoom} = require('./utils/utils.js');

const publicPath = path.join(__dirname, '../public');
const app = express();
//implementujemy socketa na serwerze
const server = http.createServer(app);
const io = socketIo(server)
//middleware do uruchamiania na serwerze statycznych plików
app.use(express.static(publicPath))


//LISTENERY
io.on('connection', (socket) => {
    console.log('new user connected')
  //socket reprezentuje indywidualne połączenie z konkretnym użytkownikiem, io reprezentuje ogólne połączenie dla wszystkich użytkowników

  socket.on('disconnect', () => {
    console.log('user has disconnected')
  })
  
  socket.on('createMessage', (message) =>{
    console.log('blabla')
    io.emit('newMessage', generateMessage(message.from,message.body))
  })
  socket.on('join', (params, callback) => {
    let testRegEx = RegExp('^[a-zA-Z0-9]*$', 'g')
   if(!testRegEx.test(params.nickname) || params.nickname.length < 3){
      callback("Your nickname must be alfanumeric value and be at least 3 characters long")
    } else if (!validateRoom(params.room)){
      callback("Room is invalid")
    } else{

      socket.join(params.room)
      callback();
    }
  
  })
})



server.listen(3000, () => {
    console.log(`Started up at port 3000`);
  });