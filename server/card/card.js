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
}

module.exports = Card;
