const userHandler = require('./controller/userHandler');
const messageHandler = require('./controller/messageHandler');

module.exports = (io, socket) => {
  userHandler(io, socket);
  messageHandler(socket);
};
