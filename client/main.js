const socket = io();

let board = null;
let id = 0;
let waiting = false;

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

// let displayCard = null;
let life = null;
let pool = null;
let phase = null;
let turn = null;
let sidebar = {
  card: null,
  text: null
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
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

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
  const END = game.add.text(1400, 1100, 'END');
  END.inputEnabled = true;
  END.events.onInputDown.add(() => {
    message.end();
  });

  gameBoard.you.hand = game.add.group();
  gameBoard.you.field = game.add.group();

  gameBoard.them.hand = game.add.group();
  gameBoard.them.field = game.add.group();

  pool = game.add.group();
  life = game.add.text(800, 50, 'you:  || them:  ');
  phase = game.add.text(800, 100, 'Phase: ');
  turn = game.add.text(800, 150, 'Turn: ');
  sidebar.text = game.add.text(10, 350, '', { wordWrap: true, wordWrapWidth: 250 });

  updateState();
}

function update() {

}

const setSideBar = (card) => {
  sidebar.card = game.add.sprite(10, 10, card.card.name);
  sidebar.text.setText(card.card.description);

  console.log(card.card);
};

class Option {
  constructor(text, action) {
    this.text = text;
    this.action = action;
  }
}

const setDisplayCard = (card) => {
  const displayCard = game.add.sprite(game.width / 2, game.height / 2, card.name);
  displayCard.scale.setTo(3, 3);
  displayCard.anchor.setTo(0.5, 0.5);

  displayCard.alpha = 0.8;

  const destroyDisplay = () => {
    displayCard.destroy(false);
  };

  setTimeout(destroyDisplay, 500);
};

const getActions = (card) => {
  let actions = [];
  switch (card.location) {
    case 'hand':
      if (canAfford(card.cost)) {
        actions.push(new Option('summon', () => { setDisplayCard(card); message.playCard(card); }));
      }
      if (board.canExpunge) {
        actions.push(new Option('expunge', () => { setDisplayCard(card); message.expunge(card); }));
      }
      break;

    case 'field':
      if (!card.hasAttacked) {
        actions.push(new Option('attack', () => {
          menu.kill();
          menu = new CardSelection(game, board.players[(id + 1) % 2].field.cards, (target) => { message.attack(card, target); });
        }));
      }
      if (card.type === 'effect-soul') {
        if (card.effect.trigger.type === 'activate') {
          if (canAfford(card.effect.cost)) {
            if (card.effect.choose) {
              actions.push(new Option('activate', () => {
                menu.kill();
                // TODO the function should have some sort of counter containing amount chosen.
                // console.log(filter(board, id, card.effect.data.filters));
                menu = new CardSelection(
                  game,
                  filter(board, id, card.effect.data.filters),
                  (chosen) => {
                    console.log(chosen); setDisplayCard(card); message.activate(card, [chosen]);
                  }
                );

              }));
            } else {
              actions.push(new Option('activate', () => { message.activate(card); }));
            }
          }
        }
      }
      break;

    default:
      break;
  }
  if (board.turn !== id) {
    actions = [];
    console.log('not your turn biaaaaatch');
  }
  if (board.phase.state !== 'main') {
    actions = [];
    console.log('no actions not in main');
  }
  return actions;
};

const drawCard = (x, y, card, group, owner, onclick, flip = false) => {
  const temp = new Card(game, card, x, y, owner, onclick);

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
    pool.add(game.add.text(900, 200 + (50 * i), `${elem}: ${board.players[id].pool[elem]} / ${board.pool[elem]}`));
  });

  gameBoard.you.hand.removeAll();
  board.players[id].hand.cards.forEach((card, i) => {
    drawCard(400 + (200 * i), 1000, card, gameBoard.you.hand, true, () => {
      console.log(card);
      if (menu) {
        menu.kill();
      }
      menu = new Menu(game, getActions(card));
    });
  });


  gameBoard.you.field.removeAll();
  board.players[id].field.cards.forEach((card, i) => {
    drawCard(400 + (200 * i), 700, card, gameBoard.you.field, true, () => {
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
    drawCard(400 + (200 * i), 100, { name: 'back' }, gameBoard.them.hand, false, () => { }, true);
  });


  gameBoard.them.field.removeAll();
  board.players[(id + 1) % 2].field.cards.forEach((card, i) => {
    drawCard(400 + (200 * i), 350, card, gameBoard.them.field, false, () => { }, true);
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

socket.on('response-query', ({ action, callback }) => {
  console.log(action);
  let possibleResponses = getResponses(board, id, action);
  console.log(possibleResponses);
  if (possibleResponses.length > 0) {
    console.log('HERE I WOULD CHOOSE ACTION');
  }
  console.log();
  let card = possibleResponses[0];
  // TODO how to describe response
  let data = {};
  console.log(cardToVisual(card));
  setDisplayCard(card);
  cardToVisual(card).highlight();
  // TODO might need to add some sort of state esp for the selection of what card to activate.

  if (card) {
    message.respond(action, { card, data });
  } else {
    message.respond(action, 'none');

  }
});
