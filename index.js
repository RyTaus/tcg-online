
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const express = require('express');

const board = require('./test-board.js');
console.log(board.players[1].deck.cards.length);

const portNumber = 8080;


app.use( express.static( __dirname + '/client' ));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

http.listen(portNumber, () => {
  console.log(`listening on port: ${portNumber}`);
});

const clients = [];

board.setUp();
console.log(board.players[1].deck.cards.length);


const clientPlayerIndex = socket => clients.indexOf(socket);

io.on('connection', (socket) => {
  clients.push(socket);
  io.to(socket.id).emit('initialize', {board: board, id: clients.length - 1});
  console.log(`${socket.id} has joined`);
  const playerIndex = clientPlayerIndex(socket);
  // socket.emit('initialize', board);

  socket.on('disconnect', () => {
    let index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
    console.log(`${socket.id} has left`);
  });

  socket.on('activate', (card) => {
    console.log(card);
    let c = board.dataToCard(card, card.location, board.players[playerIndex]);
    board.activate(c, board.players[playerIndex]);
    socket.emit('update', board);
  });

  socket.on('draw', () => {
    console.log(board.players[playerIndex]);
    board.players[playerIndex].draw();
    socket.emit('update', board);
  });

  socket.on('renew', () => {
    console.log(playerIndex);
    socket.emit('update', board);
  });
});
