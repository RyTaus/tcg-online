const socket = io();

let player = null;

socket.on('initialize', (data) => {
  player = data;
})

socket.on('update', (data) => {
  player = data;
})
