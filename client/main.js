const socket = io();

let board = null;
let id = 0;

let menu = null;

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
};

let life = null;

const game = new Phaser.Game(1600, 1200, Phaser.CANVAS, '', {preload, create, update});

function preload() {
  game.load.image('bg', './assets/bg.png');
  game.load.image('menu-bg', './assets/menu-bg.png');
  game.load.image('red1', './assets/red1.png');
  game.load.image('red2', './assets/red2.png');
  game.load.image('blue1', './assets/blue1.png');
  game.load.image('blue2', './assets/blue2.png');
  game.load.image('back', './assets/card-back.png');
}

function create() {
  const bg = game.add.sprite(0, 0, 'bg');
  bg.scale.setTo(16, 12);
  bg.inputEnabled = true;
  bg.events.onInputDown.add(() => {
    if (menu) {
      menu.kill();
    }
  });

  gameBoard.you.deck = game.add.sprite(1400, 800, 'back');

  gameBoard.you.hand = game.add.group();
  gameBoard.you.field = game.add.group();

  gameBoard.them.hand = game.add.group();
  gameBoard.them.field = game.add.group();

  life = game.add.text(800, 50, 'you:  || them:  ');

  updateState();
}

function update() {

}

const drawCard = (x, y, card, group, onclick, flip = false) => {
  const temp = new Card(game, card, x, y, onclick);
  temp.scale.setTo(0.6, 0.6);
  temp.anchor.setTo(0.5, 0.5);

  if (flip) {
    temp.angle += 180;
  }
  group.add(temp);
  return temp;
};

const updateState = () => {
  life.setText(`you: ${board.players[id].life} || them: ${board.players[(id + 1) % 2].life}`);

  gameBoard.you.hand.removeAll();
  board.players[id].hand.cards.forEach((card, i) => {
    drawCard(200 + (200 * i), 1000, card, gameBoard.you.hand, () => {
      if (menu) {
        menu.kill();
      }
      menu = new Menu(game, [{ text: 'summon', action: () => { console.log(card);  message.playCard(card); } }, { text: 'expunge', action: () => { console.log(card);  message.expunge(card); }  }]);
    });
  });


  gameBoard.you.field.removeAll();
  board.players[id].field.cards.forEach((card, i) => {
    drawCard(200 + (200 * i), 700, card, gameBoard.you.field, () => {
      if (menu) {
        menu.kill();
      }
      menu = new Menu(game, [{ text: 'attack', action: () => {
        menu.kill();
        console.log(board.players[(id + 1) % 2].field);
        menu = new CardSelection(game, board.players[(id + 1) % 2].field.cards, (target) => { message.attack(card, target) });
      } }]);
    });
  });

  updateOpponent();
};

const updateOpponent = () => {
  gameBoard.them.hand.removeAll();

  board.players[(id + 1) % 2].hand.cards.forEach((card, i) => {
    drawCard(200 + (200 * i), 100, { name: 'back' }, gameBoard.them.hand, () => { }, true);
  });


  gameBoard.them.field.removeAll();
  board.players[(id + 1) % 2].field.cards.forEach((card, i) => {
    drawCard(200 + (200 * i), 350, card, gameBoard.them.field, () => { }, true);
  });
}


socket.on('initialize', (data) => {
  board = data.board;
  id = data.id;
  console.log(id);
});

socket.on('update', (data) => {
  board = data;
  updateState();
});
