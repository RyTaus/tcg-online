/*
  Every time a player wants to do something it is encaptured in an action.
  These actions contain the data needed to commit the action as well as
  to see if anything can be done in response to the action.

  action: name of the action
  card: the card responsible for the action
  data: the additional data needed to describe the action
  playerId: the player performing the action

  perform: this function performs the action as well as asks for responses
*/

const createActions = (playerId, upd, afr) => {
  const update = upd;
  const askForResponse = afr;

  class Action {
    constructor(action, card) {
      this.action = action;
      this.card = card;
      this.data = {};
      this.playerId = playerId;
    }
  }

  class Debug extends Action {
    constructor(card) {
      super('debug', card);
    }

    perform(board) {
      board.activate(this.card, this.playerId);
    }
  }

  class Summon extends Action {
    constructor(card) {
      super('summon', card);
    }

    perform(board) {
      board.summon(this.card, board.players[this.playerId]);
      update();
      askForResponse(this);
    }
  }

  class MoveCard extends Action {
    // data is from and to
    constructor(card, from, to) {
      super('move-card', card, { from, to });
    }
  }

  class Draw extends Action {
    constructor(card, amount) {
      super('draw', card);
      this.data = {
        amount
      };
    }
  }


  return {
    Summon,
    MoveCard
  };
};

module.exports = createActions;
