const app = require('./app');
const server = require('http').Server(app);
const websocket = require('./socketIo/socket.io');


websocket(server);

const PORT = process.env.port || 3000;

server.listen(PORT, () => {
  console.log(`GoCar listening on port ${PORT}!`);
});
