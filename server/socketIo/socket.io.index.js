const socketIo = require('socket.io');
const userHandler = require('./userHandler');
const messageHandler = require('./messageHandler');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connect', socket => userHandler(io, socket));
  io.on('connect', socket => messageHandler(io, socket));
};
