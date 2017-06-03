const app = require('./app');
const server = require('http').Server(app);
const websocket = require('socket.io')(server);

const PORT = process.env.port || 3000;

server.listen(PORT, () => {
  console.log(`GoCar listening on port ${PORT}!`);
});

websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
  socket.on('CarGo', message => console.log(message));

  // get the messages from the client
  socket.on('message', (data) => {
    // websocket.emit('message', { username: data.userName, message: data.message, groupName: data.groupName, date: data.date });
    console.log(data);
  });
  //getuser
   // get the messages from the client
  socket.on('add-user', (data) => {
    console.log(data);
  });
});
