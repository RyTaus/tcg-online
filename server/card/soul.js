const Card = require('./card.js')

class Soul extends Card {
  constructor({ name, cost, element, description, atk, def, effect }) {
    super(name, cost, element, description);
    // console.log(description);
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
    // return new Soul(this.name, this.cost, this.element, this.attack, this.defense, this.effect);
    return new Soul({
      name: this.name,
      cost: this.cost,
      element: this.element,
      atk: this.attack,
      def: this.defense,
      effect: this.effect,
      description: this.description
    });
  }
}

module.exports = Soul;
