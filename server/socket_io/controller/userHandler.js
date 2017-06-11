const CONFIG = require('../../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

const CarGoBot = {
  user: {
    _id: 1,
    name: 'CarGo-Bot',
    avatar: 'https://static.vecteezy.com/system/resources/previews/000/147/625/original/carpool-vector.jpg',
  },
};

module.exports = (io, socket) => {
  socket.on('user-joined', (user) => {
    socket.join(user.roomId);
    CarGoBot._id = Math.floor(Math.random() * 1000000);
    CarGoBot.text = `${user.username} has joined the chat`;
    socket.broadcast.to(user.roomId).emit('receive', CarGoBot);

    knex('messages').where('group_id', user.roomId).select('*')
    .then(messages => messages.map(msgObj => ({
      _id: msgObj._id,
      text: msgObj.text,
      user: {
        _id: msgObj.user_id,
        name: msgObj.user_name,
        avatar: msgObj.user_avatar,
      },
    })))
    .then((messages) => {
      CarGoBot._id = Math.floor(Math.random() * 1000000);
      CarGoBot.text = `Hi ${user.username}! Welcome to the group!`;
      messages.push(CarGoBot);
      messages.reverse();
      io.to(socket.id).emit('receive', messages);
    })
    .catch(err => console.log('err', err));
  });

  socket.on('user-left', (oldRoomId, user) => {
    CarGoBot._id = Math.floor(Math.random() * 1000000);
    CarGoBot.text = `${user} has left the chat`;
    socket.broadcast.to(oldRoomId).emit('receive', CarGoBot);
    socket.leave(oldRoomId);
    socket.disconnect();
  });
};
