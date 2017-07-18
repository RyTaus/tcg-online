
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

const update = () => {
  io.sockets.emit('update', board);
};

const askForResponse = (action) => {
  io.to(clients[action.playerId].id).emit('response-query', {
    board,
    action,
    callback: (act) => {
      console.log('asked for response');
    }
  })
};

board.setUp();


const clientPlayerIndex = socket => clients.indexOf(socket);
const actionStack = [];


io.on('connection', (socket) => {

  clients.push(socket);
  io.to(socket.id).emit('initialize', {board: board, id: clients.length - 1});
  console.log(`${socket.id} has joined`);
  const playerIndex = clientPlayerIndex(socket);
  const otherPlayerIndex = (playerIndex + 1) % 2;

  const Action = require('./action.js')(playerIndex, update, askForResponse, actionStack);

  const playerIdFromCard = (card) => {
    let id = +card.duel_id.charAt(0);
    console.log(typeof id);
    console.log(id);
    return id;
  };

  const cardOwner = (card) => {
    return board.players[playerIdFromCard(card)];
  };

  const dataToCard = (data) => {
    // console.log(data);
    return board.dataToCard(data, data.location, board.players[playerIdFromCard(data)]);
  };

  const effectToAction = (card, data) => {
    if (card.effect.type === 'draw') {
      return new Action.Draw(card, data.amount);
    } else if (card.effect.type === 'add-to') {
      console.log(data);
      return new Action.MoveCard(card, data, card.effect.data.destination);
    }
  }
  // socket.emit('initialize', board);

  socket.on('disconnect', () => {
    let index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
    console.log(`${socket.id} has left`);
  });

  socket.on('respond', ({ action, response }) => {
    // TODO not assume reponse is activate effect? But maybe thats all it can be i think
    // TODO also maybe response contains the card along with additional choices??
    console.log(response);
    if (response === 'none') {

    } else {
      const c = dataToCard(response.card);
      const a = effectToAction(c, response.data);
      a.perform(board);
    }
    // board.activate(c, response.data, playerIndex);
  });

  socket.on('summon', (card) => {
    const c = dataToCard(card);
    const a = new Action.Summon(c);
    a.perform(board);
  });

  socket.on('activate', ({ card, data }) => {
    // TODO take an effect activation and break it into an action
    // Data is any additional info the effect needs to resolve, IE target
    const c = dataToCard(card);
    const a = effectToAction(card, data);
    a.perform(board);
    // board.activate(c, data, playerIndex);
    // update();
  });

  socket.on('expunge', (card) => {
    const c = dataToCard(card);
    board.expunge(c, board.players[playerIndex]);
    // board.players[playerIndex].grabCard(c, c.location);
    update();
  });

  socket.on('standby', () => {
    board.processStandby();
    update();
  });

  socket.on('attack', ({ card, target }) => {
    board.attack(dataToCard(card), cardOwner(card), dataToCard(target), cardOwner(target));
    update();
  });

  socket.on('draw', () => {
    // TODO callbacks for clients if request is not good
    console.log(board.players[playerIndex]);
    board.draw(playerIndex);
    update();
  });

  socket.on('end', () => {
    if (board.phase.in('main')) {
          board.processEnd();
    } else {
      console.log('Cannot end turn while not in main phase.');
    }
    update();
  })

  socket.on('renew', () => {
    console.log(playerIndex);
    io.sockets.emit('update', board);
  });
});
