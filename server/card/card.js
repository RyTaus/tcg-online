/*
  Cards all have an activate feature that determines what happens when the card is played, additionally,
  effects can be activated
*/

class Card {
  constructor(name, cost, element) {
    this.name = name;
    this.cost = cost;
    this.element = element;
  }

  idToPlayer() {
    return +this.duel_id.charAt(0);
  }
}

module.exports = Card;
