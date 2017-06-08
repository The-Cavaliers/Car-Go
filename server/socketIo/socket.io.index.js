const socketIo = require('socket.io');
const onConnect = require('./socket.io.handlers');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connect', onConnect);
};
