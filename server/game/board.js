const elements = require('./../card/elements.js');
const Phase = require('./phase.js');

class Board {
  constructor(player1, player2) {
    this.players = [player1, player2];

    this.turn = 0;

    this.phase = new Phase();

    this.canExpunge = true;
    this.pool = { };
    Object.keys(elements).forEach((e) => {
      this.pool[e] = 0;
    });
    this.manafiedCards = [];
  }

  nextTurn() {
    this.turn = (this.turn + 1) % 2;
    this.phase = new Phase();
    // TODO reset mana and phase
  }

  draw(playerIndex) {
    if (this.phase.in('draw')) {
      this.players[playerIndex].draw();
      this.phase.next();
      return true;
    }
    console.log('invalid phase');
    return false;
  }

  activate(thing, player) {
    thing.activate(this, player);
  }

  processStandby() {
    // TODO loop through effects that happen on standby
    this.phase.next();
    return this;
  }

  expunge(card, player) {
    this.pool[card.element] += 1;
    this.players[0].pool[card.element] += 1;
    this.players[1].pool[card.element] += 1;
    this.manafiedCards.push(card);
    player.moveCardTo(card, 'manazone');
  }

  attack(attacker, attackerPlayer, target, targetPlayer) {
    targetPlayer.life -= attacker.attack - target.defense;
    targetPlayer.moveCardTo(target, 'afterworld');
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
