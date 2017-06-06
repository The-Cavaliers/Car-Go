module.exports = (socket) => {
  console.log('A client just joined on (socket.id)', socket.id);

  socket.on('message', (message) => {
    console.log('message from server', message);
    const messageData = {
      _id: message._id,
      text: message.text,
      user: message.user,
      createdAt: new Date(message.createdAt),
      // roomId,
    };
    socket.broadcast.emit('message', messageData);
  });
};
