const HEIGHT = 40;
const WIDTH = 300;

class Option extends Phaser.Text {
  constructor(game, option, x, y, menu) {
    super(game, x, y, option.text);
    this.inputEnabled = true;
    this.events.onInputDown.add(option.action, this);
    this.events.onInputUp.add(() => menu.destroy(true), this);

  }
}


class Menu extends Phaser.Group {
  constructor(game, options) {
    super(game);

    this.rect = game.add.sprite(game.input.x - 30, game.input.y - 15 - (30 * options.length), 'menu-bg');
    this.rect.scale.setTo(2, 1.5);
    this.rect.inputEnabled = true;
    // this.rect.events.onInputOut.add(() => this.destroy(true), this.rect);
    // game.add.existing(rect);
    this.add(this.rect);

    this.options = options.map((option, i) => {
      const opt = new Option(game, option, game.input.x, game.input.y - (30 * (options.length - i)), this);
      game.add.existing(opt);
      this.add(opt);
      return opt;
    });
  }

  kill() {
    this.destroy(true);
  }

}
