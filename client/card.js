class Card extends Phaser.Sprite {
  constructor(game, card, x, y, owner, onclick) {
    super(game, x, y, card ? card.name : 'bg');
    this.card = card;
    this.onclick = onclick;

    this.scale.setTo(0.6, 0.6);
    this.anchor.setTo(0.5, 0.5);

    this.inputEnabled = true;
    this.events.onInputDown.add(() => { console.log('click'); }, this);
    this.events.onInputDown.add(onclick, this);
    this.events.onInputOver.add(this.setSideBar, this);


    if (owner) {
      this.events.onInputOver.add(() => { this.scale.setTo(0.7, 0.7); });
      this.events.onInputOut.add(() => { this.scale.setTo(0.6, 0.6); });
    }
  }

  highlight() {
    this.tint = 0x888888;
  }

  setSideBar() {
    setSideBar(this);
  }
}
