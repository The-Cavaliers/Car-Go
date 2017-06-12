const GroupController = require('../../controllers').SaveMessage;

module.exports = (socket) => {
  socket.on('message', (message, roomId) => {
    const messageData = {
      _id: message._id,
      text: message.text,
      user: message.user,
      createdAt: new Date(message.createdAt),
    };
    socket.broadcast.to(roomId).emit('receive', messageData);

    GroupController.saveMessage(message, roomId);
  });
};
