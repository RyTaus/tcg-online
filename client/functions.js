const filter = (board, id, requirement) => {
  /* takes in a requirements object and returns a list of cards that satisfy
     the requirements.
  */
  // TODO Use Map To Get Correct Player
  const map = {
    me: id,
    them: (id + 1) % 2
  }
  const result = [];
  const player = board.players[id];
  // might do for each requirement
  requirement.locations.forEach((loc) => {
    player[loc].cards.forEach((card) => {
      if (requirement.elements.includes(card.element) && requirement.cardType.includes(card.type)) {
        result.push(card);
      }
    });
  });
  return result;
};

const getResponses = (board, id, action) => {
  const canRespond = (card) => {
    if (action.action === 'summon') {
      if (card.effect.trigger.type === 'on-other-summon') {
        return true;
      }
    }
    return false;
  }

  const responses = [];

  board.players[id].hand.cards.forEach((card) => {
    if (canRespond(card)) {
      responses.push(card);
    }
  });

  return responses;
};
