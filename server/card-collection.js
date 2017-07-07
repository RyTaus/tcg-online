class CardCollection {
  constructor(cards = []) {
    this.cards = cards;
  }

  size() {
    return this.cards.length;
  }

  shuffle() {
    let s = this.cards.length;
    while (s) {
      s-= 1;
      const i = Math.floor(Math.random() * s);
      const j = this.cards[s];
      this.cards[s] = this.cards[i];
      this.cards[i] = this.cards[j];
    }
  }

  indexOf(card) {
    return this.cards.map(c => c.duel_id).indexOf(card.duel_id);
  }

  dataToCard(card) {
    if (card === null) {
      console.log('data-to-card of null');
      return null;
    }
    return this.cards[this.indexOf(card)];
  }

  getCard(card) {
    return this.cards.splice(this.indexOf(card), 1)[0];
  }

  getCardAt(index) {
    return this.cards.splice(index, 1)[0];
  }

  add(card) {
    this.cards.unshift(card);
  }

  getTopCard() {
    return this.cards[0];
  }
}

module.exports = CardCollection;
