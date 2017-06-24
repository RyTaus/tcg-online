class CardCollection {
  constructor(cards = []) {
    this.cards = cards;
  }

  size() {
    return this.cards.length;
  }

  shuffle() {
    let s = this.cards.length;
    while(s) {
      s-= 1;
      const i = Math.floor(Math.random() * s);
      const j = this.cards[s];
      this.cards[s] = this.cards[i];
      this.cards[i] = this.cards[j];
    }
  }

  getCardAt(index) {
    return this.cards.splice(index, 1)[0];
  }

  add(card) {
    this.cards.unshift(card);
  }

  getTopCard() {
    return this.getCardAt(0);
  }
}

module.exports = CardCollection;
