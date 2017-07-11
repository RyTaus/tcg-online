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

let test = new AddTo(new Trigger.Activate('field'), { location: ['deck'], element: ['red'] }, 'hand');


module.exports = {
  AddTo
};

// requirements will be lists of lists induvidual lists will be ors which will all be anded together.
