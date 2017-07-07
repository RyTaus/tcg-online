
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

const update = () => {
  io.sockets.emit('update', board);
}

const clients = [];

board.setUp();
console.log(board.pool);


const clientPlayerIndex = socket => clients.indexOf(socket);

io.on('connection', (socket) => {
  clients.push(socket);
  io.to(socket.id).emit('initialize', {board: board, id: clients.length - 1});
  console.log(`${socket.id} has joined`);
  const playerIndex = clientPlayerIndex(socket);

  const playerIdFromCard = (card) => {
    let id = +card.duel_id.charAt(0);
    console.log(typeof id);
    console.log(id);
    return id;
  }

  const cardOwner = (card) => {
    return board.players[playerIdFromCard(card)];
  }

  const dataToCard = (data) => {
    return board.dataToCard(data, data.location, board.players[playerIdFromCard(data)]);
  };
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
    console.log(playerIndex);
    const c = dataToCard(card);
    board.activate(c, board.players[playerIndex]);
    update();
  });

  socket.on('expunge', (card) => {
    const c = dataToCard(card);
    board.expunge(c, board.players[playerIndex]);
    board.players[playerIndex].grabCard(c, c.location);
    update();
  });

  socket.on('attack', ({ card, target }) => {
    console.log(card);
    console.log('attacks');
    console.log(target);
    board.attack(dataToCard(card), cardOwner(card), dataToCard(target), cardOwner(target));
    update();
  });

  socket.on('draw', () => {
    console.log(board.players[playerIndex]);
    board.players[playerIndex].draw();
    update();
  });

  socket.on('renew', () => {
    console.log(playerIndex);
    io.sockets.emit('update', board);
  });
});
