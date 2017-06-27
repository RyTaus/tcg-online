class Board {
  constructor(player1, player2) {
    this.players = [player1, player2];

    this.turn = 0;
  }

  nextTurn() {
    this.turn = (this.turn + 1) % 2;
  }

  activate(thing, player) {
    thing.activate(this, player);
  }

  setUp() {
    this.players.forEach((player, i) => {
      player.setUp(i);
    });
  }

  dataToCard(card, location, player) {
    return player.dataToCard(card, location);
  }
}

module.exports = Board;
