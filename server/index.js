const app = require('./app');
const server = require('http').Server(app);
const io = require('./socket_io/socket.io.index');

<<<<<<< HEAD
io(server);
=======
// Mahima's Changes
const Mapio = require('socket.io')(server);
require('./socketIo/mapIo')(Mapio);

websocket(server);
>>>>>>> PubNub v1

const PORT = process.env.port || 3000;

server.listen(PORT, () => {
  console.log(`GoCar listening on port ${PORT}!`);
});
