const Card = require('./card.js')

class Soul extends Card {
  constructor(name, cost, element, atk, def, effect) {
    super(name, cost, element);
    this.attack = atk;
    this.defense = def;
    this.effect = effect;
    this.type = this.effect ? 'effect-soul' : 'soul';
  }

  activate(board, player) {
    if (player.canAfford(this.cost)) {
      player.moveCardTo(this, 'field');
    }
  }

  copy() {
    return new Soul(this.name, this.cost, this.element, this.attack, this.defense, this.effect);
  }
}

module.exports = Soul;
