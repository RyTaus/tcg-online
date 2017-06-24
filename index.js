const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const express = require('express');

const Soul = require('./server/card/soul.js');
const CardCollection = require('./server/card-collection.js');
const Player = require('./server/game/player.js');

const ELEMENT = require('./server/card/elements.js');

const portNumber = 8080;

let c = new Soul('c', {'red': 4}, ELEMENT.red, 4, 2, null);
let b = new Soul('b', {'blue': 1}, ELEMENT.blue, 4, 2, null);
let a = new Soul('a', {'red': 1, 'blue': 1}, ELEMENT.red, 4, 2, null);
console.log(Soul);

let deck = new CardCollection([a.copy(), b.copy(), c.copy(), a.copy(), b.copy(), c.copy(), a.copy(), b.copy(), c.copy()]);
console.log(deck);

app.use( express.static( __dirname + '/client' ));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

http.listen(portNumber, () => {
  console.log(`listening on port: ${portNumber}`);
});


let player = new Player(deck);


io.on('connection', (socket) => {
  socket.emit('initialize', player);

  socket.on('draw', () => {
    player.draw();
    socket.emit('update', player);
  })
})
