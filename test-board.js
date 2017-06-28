const Soul = require('./server/card/soul.js');
const CardCollection = require('./server/card-collection.js');
const Player = require('./server/game/player.js');
const Board = require('./server/game/board.js');
const ELEMENT = require('./server/card/elements.js');

let c = new Soul('red1', {'red': 4}, ELEMENT.red, 4, 2, null);
let b = new Soul('blue1', {'blue': 1}, ELEMENT.blue, 4, 2, null);
let a = new Soul('red2', {'red': 1, 'blue': 1}, ELEMENT.red, 4, 2, null);
// console.log(Soul);

let deck = new CardCollection([a.copy(), b.copy(), c.copy(), a.copy(), b.copy(), c.copy(), a.copy(), b.copy(), c.copy()]);
// console.log(deck);

let player1 = new Player(deck);
let player2 = new Player(new CardCollection([a.copy(), a.copy(), a.copy(), a.copy(), c.copy(), c.copy()]));

let board = new Board(player1, player2);

// console.log(board.players[1]);

module.exports = board;
