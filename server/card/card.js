/*
  Cards all have an activate feature that determines what happens when
  the card is played, additionally,effects can be activated
*/

class Card {
  constructor(name, cost, element, description = '') {
    this.name = name;
    this.cost = cost;
    this.element = element;
    this.description = description;
  }

  idToPlayer() {
    return +this.duel_id.charAt(0);
  }
}

module.exports = Card;
