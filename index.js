const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const express = require('express');

const board = require('./test-board.js');

const portNumber = 8080;


app.use( express.static( __dirname + '/client' ));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

http.listen(portNumber, () => {
  console.log(`listening on port: ${portNumber}`);
});




const clients = [];

io.on('connection', (socket) => {
  clients.push(socket);
  io.to(socket.id).emit('initialize', {board: board, id: clients.length - 1});
  console.log(`${socket.id} has joined`);
  // socket.emit('initialize', board);

  socket.on('disconnect', () => {
    let index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
    console.log(`${socket.id} has left`);
  })

  socket.on('draw', () => {
    board.players[0].draw();
    socket.emit('update', board);
  });

  socket.on('renew', () => {
    socket.emit('update', board);
  })
})
