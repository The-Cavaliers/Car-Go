module.exports = (server) => {
  const websocket = require('socket.io')(server);

  websocket.on('connection', (socket) => {
    console.log('A client just joined on', socket.id);
    // socket.on('CarGo', message => console.log(message));

    socket.on('message', (message) => {
      socket.broadcast.emit('message', message);
      console.log(message);
    });
    // getuser
     // get the messages from the client
    // socket.on('add-user', (data) => {
    //   console.log(data);
    // });

  });
}
