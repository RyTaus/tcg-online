class Card extends Phaser.Sprite {
  constructor(game, card, x, y, onclick) {
    super(game, x, y, card.name);
    this.card = card;
    this.anchorPoint = { x: x, y: y };

    this.inputEnabled = true;
    this.events.onInputUp.add(onclick, this);
  }

}
