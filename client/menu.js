class Menu extends Phaser.Group {
  constructor(game, options) {
    super(game);

    this.rect = game.add.sprite(game.input.x - 30, game.input.y - 15 - (30 * options.length), 'menu-bg');
    this.rect.scale.setTo(2, 1.5);
    this.rect.inputEnabled = true;
    this.add(this.rect);


    this.options = options.map((option, i) => {
      const opt = new Button(game, game.input.x, game.input.y - (35 * (options.length - i)),
          1.6, 0.3, new Phaser.Text(game, 0, 0, option.text), option.action, () => this.kill());
      game.add.existing(opt);
      this.add(opt);
      return opt;
    });
  }

  kill() {
    this.destroy(true);
  }

}
