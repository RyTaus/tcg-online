const filter = (board, id, requirement) => {
  /* takes in a requirements object and returns a list of cards that satisfy
     the requirements.
  */
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