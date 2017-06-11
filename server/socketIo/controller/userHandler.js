const CONFIG = require('../../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports = (io, socket) => {
  socket.on('userJoined', (user) => {
    socket.join(user.roomId);
    const newMessage = {
      _id: Math.floor(Math.random() * 1000000),
      text: `${user.username} has joined the chat`,
      user: {
        _id: 1,
        name: 'CarGo-Bot',
        avatar: 'https://static.vecteezy.com/system/resources/previews/000/147/625/original/carpool-vector.jpg',
      },
    };
    socket.broadcast.to(user.roomId).emit('receive', newMessage);

    knex('messages').where('group_id', user.roomId).select('*')
    .then((messages) => {
      messages.forEach((msgObj) => {
        io.in(socket.id).emit('receive', {
          _id: msgObj._id,
          text: msgObj.text,
          user: {
            _id: msgObj.user_id,
            name: msgObj.user_name,
            avatar: msgObj.user_avatar,
          },
        });
      });
    })
    .then(() => {
      newMessage.text = `Hi ${user.username}! Welcome to the group!`;
      io.to(socket.id).emit('receive', newMessage);
    })
  });

  socket.on('userLeft', (oldRoomId) => {
    socket.leave(oldRoomId);
    socket.disconnect();
  });
};
