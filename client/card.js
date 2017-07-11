class Card extends Phaser.Sprite {
  constructor(game, card, x, y, onclick) {
    super(game, x, y, card ? card.name : 'bg');
    this.card = card;
    this.onclick = onclick;
    this.anchorPoint = { x, y };

    this.inputEnabled = true;
    this.events.onInputDown.add(() => {console.log('click');}, this);
    this.events.onInputDown.add(onclick, this);
  }
}
