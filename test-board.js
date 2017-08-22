const Soul = require('./server/card/soul.js');
const CardCollection = require('./server/card-collection.js');
const Player = require('./server/game/player.js');
const Board = require('./server/game/board.js');
const ELEMENT = require('./server/card/elements.js');

const Effect = require('./server/card/effect.js');
const Trigger = require('./server/card/trigger.js');
const Requirement = require('./server/card/requirement.js');

let c = new Soul({
  name: 'red1',
  cost: { red: 4 },
  element: ELEMENT.red,
  atk: 4,
  def: 2
});
let b = new Soul({
  name: 'blue1',
  cost: { blue: 1 },
  element: ELEMENT.blue,
  atk: 3,
  def: 3,
  description: 'a card that is blue'
});


const r = new Requirement(['manazone'], ['blue', 'red'], ['soul', 'effect-soul']);

const EFFECT = new Effect.AddTo(new Trigger.Activate('field'), { blue: 1 }, r, 'field');

const EFFECT2 = new Effect.Draw(new Trigger.OnOtherSummon('hand'), {}, 1);

let a = new Soul({
  name: 'red2',
  cost: { red: 1 },
  element: ELEMENT.red,
  atk: 4,
  def: 1,
  effect: EFFECT2
});

let d = new Soul({
  name: 'blue2',
  cost: { blue: 1 },
  element: ELEMENT.blue,
  atk: 1,
  def: 1,
  effect: EFFECT
});
// console.log(Soul);

let deck = new CardCollection([d.copy(), a.copy(), b.copy(), c.copy(), a.copy(), d.copy(), b.copy(), c.copy(), a.copy(), b.copy(), c.copy()]);
// console.log(deck);

let player1 = new Player(deck);
let player2 = new Player(new CardCollection([a.copy(), a.copy(), a.copy(), a.copy(), c.copy(), c.copy()]));

let board = new Board(player1, player2);
// console.log(board.players[1]);

module.exports = board;
