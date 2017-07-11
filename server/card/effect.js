/*
  Effect {
    Cost
    Archtype {
      Requirement
      ...
    }
  }

*/

class Effect {
  constructor(type, trigger) {
    this.type = type;
    this.trigger = trigger;
  }
}

class AddTo extends Effect {
  constructor(trigger, filters, destination, amount = 1) {
    super('AddTo', trigger);
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
      player.moveCardTo(card, this.data.destination);
    });
  }
}

let test = new AddTo('activate', { location: ['deck'], element: ['red'] }, 'hand');
// console.log(test);

effect = {
  trigger: 'activate',
  type: 'addto',
  data: {
    from: 'deck',
    to: 'hand',
    filters: []
  }
}

module.exports = AddTo;

// requirements will be lists of lists induvidual lists will be ors which will all be anded together.
