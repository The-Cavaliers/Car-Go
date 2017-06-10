module.exports = (io, socket) => {
  socket.on('userJoined', (user) => {
    socket.roomId = user.roomId;
    console.log('user joined on ', socket.roomId)
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
    socket.leave(oldRoomId);
    socket.disconnect();
  });
};
