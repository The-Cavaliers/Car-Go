const CONFIG = require('../../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports = (socket) => {
  socket.on('message', (message, roomId) => {
    // console.log('roomId from server', message.user._id)
    const messageData = {
      _id: message._id,
      text: message.text,
      user: message.user,
      createdAt: new Date(message.createdAt),
    };
    socket.broadcast.to(socket.roomId).emit('receive', messageData);

    knex('messages').where('group_id', message.roomId)
    .insert({
      _id: message._id,
      text: message.text,
      user_id: message.user._id,
      group_id: roomId,
      user_name: message.user.name,
      user_avatar: message.user.avatar,
      createdAt: message.createdAt,
    })
    .catch((error) => {
      console.log('err', error);
      res.end('Error with message saving', error);
    });
  });
};
