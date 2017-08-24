class CardSelection extends Phaser.Group {
  constructor(game, cards = [], onselection = () => { }) {
    super(game);
    this.game_reference = game;
    this.cards = cards;

    this.offset = 0;
    this.onselection = onselection;

    const backdrop = game.add.sprite(100, 100, 'bg');
    backdrop.scale.setTo(14, 10);
    backdrop.tint = 0x882288;
    backdrop.alpha = 0.6;
    const m = this;
    const accept = new Button(game, 800, 900, 1, 0.5, new Phaser.Text(game, 0, 0, 'accept'), () => {onselection(this.cards[this.offset])}, () => {m.kill()});

    this.add(backdrop);
    this.add(accept);


    const right = new Button(game, 1400, 100, 0.5, 1, new Phaser.Text(game, 0, 0, '>'), this.move(1), () => {});
    const left = new Button(game, 200, 100, 0.5, 1, new Phaser.Text(game, 0, 0, '<'), this.move(-1), () => {});

    this.add(right);
    this.add(left);

    this.change();
  }

  change() {
    if (this.focus) {
      this.focus.destroy(true);
    }
    this.focus = new Card(this.game_reference, this.cards[this.offset], 350, 350, false);
    this.focus.scale.setTo(1, 1);
    this.focus.inputEnabled = true;
    this.add(this.focus);
  }

  move(amount) {
    return () => {
      this.offset =
          (((this.offset + amount) % this.cards.length) + this.cards.length) % this.cards.length;
      this.change();
    }
  }

  kill() {
    this.destroy(true);
  }
}
