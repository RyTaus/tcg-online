const CardCollection = require('./../card-collection.js');

class Player {
  constructor(deck) {
    this.deck = deck;

    this.deck.cards.forEach((c) => {
      c.location = 'deck';
    });

    this.hand = new CardCollection();
    this.field = new CardCollection();
    this.afterworld = new CardCollection();

    this.life = 20;
  }

  setUp(n) {
    this.deck.cards.forEach((card, i) => {
      card.duel_id = `${n}_${i}`;
    });
    this.draw(2 + n);
  }

  canAfford(cost) {
    // TODO chceck if you can actually afford cost.
    return true;
  }

  grabCard(card, location) {
    return this[location].getCard(card);
  }

  dataToCard(card, location) {
    return this[location].dataToCard(card);
  }

  draw(amount = 1) {
    for (let i = 0; i < amount; i++) {
      this.moveCardTo(this.deck.getTopCard(), 'hand');
    }
  }

  moveCardTo(card, location) {
    // TODO remove from old location
    this.grabCard(card, card.location);
    card.location = location;
    this[location].add(card);
  }
}

module.exports = Player;
