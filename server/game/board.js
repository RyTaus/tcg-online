class Board {
  constructor(player1, player2) {
    this.players = [player1, player2];

    this.turn = 0;
  }

  nextTurn() {
    this.turn = (this.turn + 1) % 2;
  }
}

module.exports = Board;
