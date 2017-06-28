

class Option extends Phaser.Group {
  constructor(game, option, x, y, menu) {
    // super(game, x, y, option.text);
    super(game);
    this.button = game.add.sprite(x - 10, y, 'bg');
    this.button.scale.setTo(1.6, 0.3);

    this.add(this.button);
    this.button.inputEnabled = true;
    this.button.tint = 0x888888;
    this.button.events.onInputDown.add(option.action, this.button);
    this.button.events.onInputOver.add(() => { this.button.tint = 0xdddddd });
    this.button.events.onInputOut.add(() => { this.button.tint = 0x888888 });

    this.button.events.onInputUp.add(() => menu.destroy(true), this.button);

    this.text = game.add.text(x - 10, y, option.text);
    this.add(this.text);
  }
}


class Menu extends Phaser.Group {
  constructor(game, options) {
    super(game);

    this.rect = game.add.sprite(game.input.x - 30, game.input.y - 15 - (30 * options.length), 'menu-bg');
    this.rect.scale.setTo(2, 1.5);
    this.rect.inputEnabled = true;
    this.add(this.rect);

    this.options = options.map((option, i) => {
      const opt = new Option(game, option, game.input.x, game.input.y - (35 * (options.length - i)), this);
      game.add.existing(opt);
      this.add(opt);
      return opt;
    });
  }

  kill() {
    this.destroy(true);
  }

}
