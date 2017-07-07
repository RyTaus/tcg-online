const message = {
  playCard(card) { socket.emit('activate', card); },
  attack(card, target) { socket.emit('attack', { card, target }); },
  expunge(card) { socket.emit('expunge', card); },
  draw() { socket.emit('draw'); }

};
