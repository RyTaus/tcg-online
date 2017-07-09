class CardSelection extends Phaser.Group {
  constructor(game, cards = [], onselection = () => {console.log('selected');}) {
    super(game);
    this.game_reference = game;
    this.cards = cards;
    console.log(this.cards);

    this.offset = 0;
    this.onselection = onselection;

    const backdrop = game.add.sprite(100, 100, 'bg');
    backdrop.scale.setTo(14, 10);
    backdrop.tint = 0x882288;
    backdrop.alpha = 0.6;
    // backdrop.inputEnabled = true;
    const m = this;
    const accept = new Button(game, 800, 900, 1, 0.5, new Phaser.Text(game, 0, 0, 'accept'), () => {onselection(this.cards[this.offset])}, () => {m.kill()});

    this.add(backdrop);
    this.add(accept);


    const right = new Button(game, 1400, 100, 0.5, 1, new Phaser.Text(game, 0, 0, '>'), this.move(this, 1), () => {});
    const left = new Button(game, 200, 100, 0.5, 1, new Phaser.Text(game, 0, 0, '<'), this.move(this, -1), () => {});

    this.add(right);
    this.add(left);

    this.update();
  }

  update() {
    if (this.focus) {
      this.focus.destroy(true);
    }
    this.focus = new Card(this.game_reference, this.cards[this.offset], 350, 350, () => {console.log('ok');});
    this.focus.scale.setTo(1, 1);
    this.focus.inputEnabled = true;
    this.focus.events.onInputDown.add(() => {console.log('ok')}, this);
    this.add(this.focus);
  }

  move(cs, amount) {
    return () => {
      cs.offset = (((cs.offset + amount) % cs.cards.length) + cs.cards.length) % cs.cards.length;
      cs.update();
    }
  }

  kill() {
    this.destroy(true);
  }
}
