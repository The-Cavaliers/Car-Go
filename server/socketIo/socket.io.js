const websocket = require('../index');

websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
  socket.on('CarGo', message => console.log(message));

 // get the messages from the client
  socket.on('message', (data) => {
    // websocket.emit('message', { username: data.userName, message: data.message, groupName: data.groupName, date: data.date });
    console.log(data);
  });
  // getuser
   // get the messages from the client
  socket.on('add-user', (data) => {
    console.log(data);
  });
});
