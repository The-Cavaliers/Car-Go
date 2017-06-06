const socketIo = require('socket.io');
const onConnect = require('./ioConnect');

module.exports = (server) => {
  const websocket = socketIo(server);

  websocket.on('connect', onConnect);
};
