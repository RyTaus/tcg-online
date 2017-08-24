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

const createActions = (playerId, upd, afr, as) => {
  const update = upd;
  const askForResponse = afr;
  const actionStack = as

  class Action {
    constructor(action, card) {
      this.action = action;
      this.card = card;
      this.data = {};
      this.playerId = playerId;
    }
  }

  class Expunge extends Action {
    constructor(card) {
      super('expunge', card);
    }

    perform(board) {
      board.expunge(this.card, board.players[this.playerId]);
      update();
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
      actionStack.push(this);
      board.summon(this.card, board.players[this.playerId]);
      update();
      askForResponse(this);
    }
  }

  class MoveCard extends Action {
    // data is from and to
    constructor(card, cards, to, from) {
      super('move-card', card);
      this.data = {
        from,
        to,
        cards
      }
    }

    perform(board) {
      actionStack.push(this);
      const player = board.players[this.playerId];
      const cards = [];
      this.data.cards.forEach((cd) => {
        cards.push(player.dataToCard(cd));
      });
      cards.forEach((card) => {
        board.moveCardTo(card, this.data.to, this.playerId);
      });

      update();
    }
  }

  class Draw extends Action {
    constructor(card, amount) {
      super('draw', card);
      this.data = {
        amount
      };
    }

    perform(board) {
      actionStack.push(this);
      board.players[this.playerId].draw(this.data.amount);
      update();
      askForResponse(this);
    }
  }


  return {
    Summon,
    MoveCard,
    Draw,
    Expunge
  };
};

module.exports = createActions;
