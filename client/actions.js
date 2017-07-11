const message = {
  playCard(card) { socket.emit('summon', card); },
  activate(card, data) { socket.emit('activate', { card, data }); }, // TODO add data section holding other factors of effect activation such as card selection
  attack(card, target) { socket.emit('attack', { card, target }); },
  expunge(card) { socket.emit('expunge', card); },
  draw() { socket.emit('draw'); }

};
