/*
  Effect {
    Cost
    Archtype {
      Requirement
      ...
    }
  }

*/
const Trigger = require('./trigger.js');

class Effect {
  constructor(type, trigger, cost) {
    this.type = type;
    this.trigger = trigger;
    this.cost = cost;
  }
}

class AddTo extends Effect {
  constructor(trigger, cost, filters, destination, amount = 1) {
    super('AddTo', trigger, cost);
    this.choose = true;
    this.data = {
      destination,
      filters,
      amount
    };
  }

  activate(cardsData, board, playerIndex) {
    const player = board.players[playerIndex];
    const cards = [];
    cardsData.forEach((cd) => {
      cards.push(player.dataToCard(cd));
    });
    cards.forEach((card) => {
      board.moveCardTo(card, this.data.destination, playerIndex);
    });
  }
}

class Debug extends Effect {
  constructor(trigger, cost = {}, fn) {
    super('debug', trigger, cost);
    this.data = {
      fn
    };
  }

  activate(d) {
    this.data.fn(d);
  }
}

class Draw extends Effect {
  constructor(trigger, cost, amount = 1) {
    super('draw', trigger, cost);
    this.data = {
      amount
    };
  }

  activate(cardsData, board, playerIndex) {
    const player = board.players[playerIndex];
    player.draw(this.data.amount);
  }
}
let test = new AddTo(new Trigger.Activate('field'), { location: ['deck'], element: ['red'] }, 'hand');


module.exports = {
  AddTo,
  Debug,
  Draw
};

// requirements will be lists of lists induvidual lists will be ors which will all be anded together.
