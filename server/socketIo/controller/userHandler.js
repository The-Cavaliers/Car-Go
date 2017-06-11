const CONFIG = require('../../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports = (io, socket) => {
  socket.on('userJoined', (user) => {
    socket.roomId = user.roomId;
    console.log('user joined on ', socket.roomId);
    socket.join(user.roomId);
    const newMessage = {
      _id: Math.floor(Math.random() * 1000000),
      text: `${user.username} has joined the chat`,
      user: {
        _id: 2,
        name: 'CarGo-Server-Bot',
        avatar: 'https://static.vecteezy.com/system/resources/previews/000/147/625/original/carpool-vector.jpg',
      },
    };
    socket.broadcast.to(socket.roomId).emit('receive', newMessage);

    knex('messages').where('group_id', user.roomId).select('*')
    .then((data) => {
      console.log('knex select data', data[1].user_name)
      io.in(socket.id).emit('receive', data);
    })
  });

  socket.on('userLeft', (oldRoomId) => {
    socket.leave(oldRoomId);
    socket.disconnect();
  });
};
