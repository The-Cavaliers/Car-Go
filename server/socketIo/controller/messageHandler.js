const CONFIG = require('../../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports = (socket) => {
  socket.on('message', (message, roomId) => {
    console.log('message from server', message.roomId)
    const messageData = {
      _id: message._id,
      text: message.text,
      user: message.user,
      createdAt: new Date(message.createdAt),
    };
    knex('groups').where('id', message.roomId).insert(messageData)
    .then(() => {
      console.log('message saved', messageData)
    });
    socket.broadcast.to(socket.roomId).emit('receive', messageData);
  });
};
