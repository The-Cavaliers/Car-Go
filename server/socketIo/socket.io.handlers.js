module.exports = (socket) => {
  socket.on('userJoined', (roomId) => {
    console.log('user joined on ', roomId);
    socket.join(roomId);
  });

  socket.on('userLeft', (roomId) => {
    console.log('user leaving', roomId)
    socket.leave(roomId);
  });

  socket.on('message', (message) => {
    console.log('messssageeeee', message.roomId, '********');
    const messageData = {
      _id: message._id,
      text: message.text,
      user: message.user,
      createdAt: new Date(message.createdAt),
    };
    socket.broadcast.to(message.roomId).emit('receive', messageData);
  });
};
