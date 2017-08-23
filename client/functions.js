const canAfford = (cost) => {
  let can = true;
  let sumCard = 0;
  let sumBoard = 0;
  Object.keys(board.pool).forEach((c) => {
    if (c !== 'Nuetral') {
      const costOfElem = cost[c] || 0;
      // console.log(`${c}: ${costOfElem}  ${board.pool[c]}`);
      // TODO should use player's pool
      if (costOfElem > board.players[id].pool[c]) {
        can = false;
      }
      sumCard += costOfElem;
      sumBoard += board.players[id].pool[c];
    }
  });
  // console.log(sumCard, '  ', sumBoard);
  return can && sumCard <= sumBoard;
};

const filter = (board, id, requirement) => {
  /* takes in a requirements object and returns a list of cards that satisfy
     the requirements.
  */
  // TODO Use Map To Get Correct Player
  const map = {
    me: id,
    them: (id + 1) % 2
  };
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
    if (card.type === 'soul') {
      return false;
    }
    if (action.action === 'summon') {
      if (card.effect.trigger.type === 'on-other-summon') {
        return true;
      }
    }
    return false;
  }

  const responses = [];

  //TODO loop through more than just hand
  board.players[id].hand.cards.forEach((card) => {
    if (canRespond(card)) {
      responses.push(card);
    }
  });

  return responses;
};

const cardToVisual = (card) => {
  let result;
  gameBoard.you[card.location].children.some((c) => {
    if (c.card.duel_id === card.duel_id) {
      result = c;
      return true;
    }
    return false;
  });
  return result;
}
