class Button extends Phaser.Group {
  constructor(game, x, y, w, h, label, onclick, onrelease) {
    super(game);
    this.button = game.add.sprite(x - 10, y, 'bg');
    this.button.scale.setTo(w, h);

    this.add(this.button);
    this.button.inputEnabled = true;
    this.button.tint = 0x888888;
    this.button.events.onInputDown.add(onclick, this.button);
    this.button.events.onInputOver.add(() => { this.button.tint = 0xdddddd; });
    this.button.events.onInputOut.add(() => { this.button.tint = 0x888888; });

    this.button.events.onInputUp.add(onrelease, this.button);

    this.label = label;
    this.label.x = x;
    this.label.y = y;
    this.add(this.label);
  }
}
