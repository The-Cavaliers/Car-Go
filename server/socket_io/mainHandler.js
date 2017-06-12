const userHandler = require('./controllers/userHandler');
const messageHandler = require('./controllers/messageHandler');

module.exports = (io, socket) => {
  userHandler(io, socket);
  messageHandler(socket);
};
