module.exports = (socket) => {
  socket.on('userJoined', (roomId) => {
    console.log('user joined on ', roomId);
    socket.join(roomId);
  });

  socket.on('userLeft', (roomId) => {
    socket.leave(roomId);
  });

  socket.on('message', (message) => {
    console.log('messssageeeee', message, '********');
    const messageData = {
      _id: message._id,
      text: message.text,
      user: message.user,
      createdAt: new Date(message.createdAt),
    };
    // console.log('socket rooms', io.sockets.adapter.rooms[io.room]);
    socket.broadcast.to(message.roomId).emit('receive', messageData);
  });
};
