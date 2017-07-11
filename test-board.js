const Soul = require('./server/card/soul.js');
const CardCollection = require('./server/card-collection.js');
const Player = require('./server/game/player.js');
const Board = require('./server/game/board.js');
const ELEMENT = require('./server/card/elements.js');

const Effect = require('./server/card/effect.js');
const Trigger = require('./server/card/trigger.js');
const Requirement = require('./server/card/requirement.js');

let c = new Soul('red1', {'red': 4}, ELEMENT.red, 4, 2, null);
let b = new Soul('blue1', {'blue': 1}, ELEMENT.blue, 4, 2, null);
let a = new Soul('red2', {'red': 1}, ELEMENT.red, 4, 2, null);

const effect = {
  trigger: 'activate',
  type: 'addto',
  data: {
    from: 'deck',
    to: 'hand',
    requirements: []
  }
};

const effect2 = {
  trigger: 'activate',
  type: 'damage',
  data: {
    target: 'self',
    amount: -2
  },
  activate: (board, pi) => {
    board.players[pi].life += -2;
  }
}

const r = new Requirement(['manazone'], ['blue', 'red'], ['soul', 'effect-soul']);

const EFFECT = new Effect.AddTo(new Trigger.Activate('field'), { blue: 1 }, r, 'field');

let d = new Soul('blue2', { 'blue': 1}, ELEMENT.blue, 1, 1, EFFECT);
console.log(EFFECT);
// console.log(Soul);

let deck = new CardCollection([d.copy(), a.copy(), b.copy(), c.copy(), a.copy(), d.copy(), b.copy(), c.copy(), a.copy(), b.copy(), c.copy()]);
// console.log(deck);

let player1 = new Player(deck);
let player2 = new Player(new CardCollection([a.copy(), a.copy(), a.copy(), a.copy(), c.copy(), c.copy()]));

let board = new Board(player1, player2);

// const filter = (board, id, requirement) => {
//   /* takes in a requirements object and returns a list of cards that satisfy
//      the requirements.
//   */
//   const result = [];
//   const player = board.players[id];
//   // might do for each requirement
//   requirement.locations.forEach((loc) => {
//     player[loc].cards.forEach((card) => {
//       if (requirement.elements.includes(card.element) && requirement.cardType.includes(card.type)) {
//         result.push(card);
//       }
//     });
//   });
//   return result;
// };
//
// let hmmm = filter(board, 0, r);
// console.log(hmmm);

// console.log(board.players[1]);

module.exports = board;
