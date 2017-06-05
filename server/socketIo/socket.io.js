const socketIo = require('socket.io');

const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports = (server) => {
  const websocket = socketIo(server);

  websocket.on('connect', (socket) => {
    console.log('A client just joined on (socket.id)', socket.id);
    // client[socket.id] = socket;
    // console.log('client is', client)

    // socket.on('userJoined', (userId) => {
    //   // onUserJoined(userId, socket);
    //   console.log('user id', userId)
    //   if (!userId) {
    //     socket.emit('userJoined', socket.id);
    //     // returnMessage(socket); wrong need a diff function
    //   }
    //   // returnMessage(socket);
    // });

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
  });
};
