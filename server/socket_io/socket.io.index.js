const socketIo = require('socket.io');
const mainHandler = require('./mainHandler');

module.exports = (server) => {
  const io = socketIo(server);
  io.on('connect', socket => mainHandler(io, socket));
};
