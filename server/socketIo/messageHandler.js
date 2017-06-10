module.exports = (io, socket) => {
  socket.on('message', (message, roomId) => {
    console.log('message from server', message.user)
    const messageData = {
      _id: message._id,
      text: message.text,
      user: message.user,
      createdAt: new Date(message.createdAt),
    };
    socket.broadcast.to(socket.roomId).emit('receive', messageData);
  });
};
