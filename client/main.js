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
let pool = null;
let phase = null;
let turn = null;

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
  gameBoard.you.deck.inputEnabled = true;
  gameBoard.you.deck.events.onInputDown.add(() => {
    message.draw();
  });

  gameBoard.you.hand = game.add.group();
  gameBoard.you.field = game.add.group();

  gameBoard.them.hand = game.add.group();
  gameBoard.them.field = game.add.group();

  pool = game.add.group();
  life = game.add.text(800, 50, 'you:  || them:  ');
  phase = game.add.text(800, 100, 'Phase: ');
  turn = game.add.text(800, 150, 'Turn: ');



  updateState();
}

function update() {

}

const canAfford = (cost) => {
  let can = true;
  let sumCard = 0;
  let sumBoard = 0;
  Object.keys(board.pool).forEach((c) => {
    if (c !== 'Nuetral') {
      const costOfElem = cost[c] || 0;
      // console.log(`${c}: ${costOfElem}  ${board.pool[c]}`);
      if (costOfElem > board.pool[c]) {
        can = false;
      }
      sumCard += costOfElem;
      sumBoard += board.pool[c];
    }
  });
  // console.log(sumCard, '  ', sumBoard);
  return can && sumCard <= sumBoard;
}

class Option {
  constructor(text, action) {
    this.text = text;
    this.action = action;
  }
}

const getActions = (card) => {
  let actions = [];
  switch (card.location) {
    case 'hand':
      if (canAfford(card.cost)) {
        actions.push(new Option('summon', () => { message.playCard(card); }));
      }
      if (board.canExpunge) {
        actions.push(new Option('expunge', () => { message.expunge(card); }));
      }
      break;

    case 'field':
      if (!card.hasAttacked) {
        actions.push(new Option('attack', () => {
          menu.kill();
          menu = new CardSelection(game, board.players[(id + 1) % 2].field.cards, (target) => { message.attack(card, target); });
        }));
      }
      break;

    default:
      break;
  }
  if (board.turn != id) {
    actions = [];
    console.log('not your turn biaaaaatch');
  }
  if (board.phase.state !== 'main') {
    actions = [];
    console.log('no actions not in main');
  }
  return actions;
};

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
  if (board.phase.state === 'standby') {
    socket.emit('standby');
  }

  life.setText(`you: ${board.players[id].life} || them: ${board.players[(id + 1) % 2].life}`);
  phase.setText(`Phase: ${board.phase.state}`);
  turn.setText(`Trun: ${board.turn === id ? 'yours' : 'theirs'}`);


  pool.removeAll();

  Object.keys(board.players[id].pool).forEach((elem, i) => {
    pool.add(game.add.text(900, 200 + (50 * i), `${elem}: ${board.players[id].pool[elem]}`));
  });

  gameBoard.you.hand.removeAll();
  board.players[id].hand.cards.forEach((card, i) => {
    drawCard(200 + (200 * i), 1000, card, gameBoard.you.hand, () => {
      if (menu) {
        menu.kill();
      }
      menu = new Menu(game, getActions(card));
    });
  });


  gameBoard.you.field.removeAll();
  board.players[id].field.cards.forEach((card, i) => {
    drawCard(200 + (200 * i), 700, card, gameBoard.you.field, () => {
      if (menu) {
        menu.kill();
      }
      menu = new Menu(game, getActions(card));
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
