const app = require('./app');

const http = require('http');
const socketio = require('socket.io');

const server = http.Server(app);
const websocket = socketio(server);

const PORT = process.env.port || 3000;

server.listen(PORT, () => {
  console.log(`GoCar listening on port ${PORT}!`);
});

// The event will be called when a client is connected.
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
