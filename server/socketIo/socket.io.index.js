const socketIo = require('socket.io');
// const onConnect = require('./socket.io.handlers');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connect', (socket) => {
    socket.on('userJoined', (user) => {
      socket.roomId = user.roomId;
      console.log('user joined on ', user);
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
      io.to(socket.roomId).emit('receive', newMessage);
    });

    socket.on('userLeft', (oldRoomId) => {
      console.log('user leaving', oldRoomId)
      socket.leave(oldRoomId);
    });

    socket.on('message', (message, roomId) => {
      console.log('message from front ', message);
      console.log('room id', roomId, socket.rooms);
      // console.log('socket rooms', io.sockets.adapter.rooms[roomId].sockets)
      const messageData = {
        _id: message._id,
        text: message.text,
        user: message.user,
        createdAt: new Date(message.createdAt),
      };
      socket.broadcast.to(socket.roomId).emit('receive', messageData);
      // io.sockets.to(socket.room).emit('receive', messageData)
    });
  });
};
