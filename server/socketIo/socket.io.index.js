const socketIo = require('socket.io');
const onConnect = require('./message');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connect', onConnect);
};
