//path. join to metoda ktora pozwala nam z relatywnej sciezki stworzyc bezwzgledna sciezke
const express = require('express');
const path = require('path')
const http = require('http')
const socketIo = require('socket.io')

const publicPath = path.join(__dirname, '../public')
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

})



server.listen(3000, () => {
    console.log(`Started up at port 3000`);
  });