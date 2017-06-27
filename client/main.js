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

  updateState();
}

function update() {

}

const drawCard = (x, y, card, group, onclick) => {
  const temp = new Card(game, card, x, y, onclick);
  temp.scale.setTo(0.8, 0.8);
  group.add(temp);
};

const updateState = () => {
  gameBoard.you.hand.removeAll();
  board.players[id].hand.cards.forEach((card, i) => {
    drawCard(200 + (200 * i), 800, card, gameBoard.you.hand, () => {
      if (menu) {
        menu.kill();
      }
      menu = new Menu(game, [{ text: 'summon', action: () => { console.log(card);  message.playCard(card); } }, { text: 'expunge', action: () => { console.log(card);  message.expunge(card); }  }]);
    });
  });

  board.players[id].field.cards.forEach((card, i) => {
    drawCard(200 + (200 * i), 500, card, gameBoard.you.field, () => {
      if (menu) {
        menu.kill();
      }
      menu = new Menu(game, [{ text: 'attack', action: () => { console.log(card);  message.attack(card); } }]);
    });
  });
};


socket.on('initialize', (data) => {
  board = data.board;
  id = data.id;
  console.log(id);
});

socket.on('update', (data) => {
  board = data;
  updateState();
});
