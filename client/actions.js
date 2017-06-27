const message = {
  playCard(card) { socket.emit('activate', card); },
  expunge(card) { socket.emit('expunge', card); },
  draw() { socket.emit('draw'); }

};
