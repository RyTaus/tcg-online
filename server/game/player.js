const CardCollection = require('./../card-collection.js');

class Player {
  constructor(deck) {
    this.deck = deck;

    this.deck.cards.forEach((c) => {
      c.location = 'deck';
    })

    this.hand = new CardCollection();
    this.field = new CardCollection();
    this.afterworld = new CardCollection();

    this.life = 20;

  }

  draw(amount = 1) {
    for (let i = 0; i < amount; i++) {
      this.moveCardTo(this.deck.getTopCard(), 'hand');
    }
  }

  moveCardTo(card, location) {
    card.location = location;
    this[location].add(card);
  }
}

module.exports = Player;
