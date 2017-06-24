const socket = io();

let board = null;
let id = 0;

const gameBoard = {
  you: {
    deck: null,
    hand: null,
    field: null,
    afterworld: null
  },
  them: {
    deck: null,
    hand: null,
    field: null,
    afterworld: null
  },
  turn: null
}

const game = new Phaser.Game(1600, 1200, Phaser.CANVAS, '', {preload, create, update});

function preload() {
  game.load.image('red1', './assets/red1.png');
  game.load.image('red2', './assets/red2.png');
  game.load.image('blue1', './assets/blue1.png');
  game.load.image('blue2', './assets/blue2.png');
  game.load.image('back', './assets/card-back.png');

}

function create() {
  game.stage.backgroundColor = '#BBBBBB';


  gameBoard.you.deck = game.add.sprite(1400, 800, 'back');

  gameBoard.you.hand = game.add.group();
  gameBoard.you.field = game.add.group();


}

function update() {

}

const drawCard = (x, y, card, group) => {
  const temp = game.add.sprite(x, y, card.name);
  temp.scale.setTo(.8, .8);
  group.add(temp);
}

const updateState = () => {
  gameBoard.you.hand.removeAll();
  board.players[id].hand.cards.forEach((card, i) => {
    drawCard(200 + (200 * i), 800, card, gameBoard.you.hand)
  })
}


socket.on('initialize', (data) => {
  board = data.board;
  id = data.id;
  console.log(id);
})

socket.on('update', (data) => {
  board = data;
  updateState();
})
