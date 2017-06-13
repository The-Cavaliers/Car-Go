const app = require('./app');
const server = require('http').Server(app);
const io = require('./socket_io/socket.io.index');


const PORT = process.env.port || 3000;

server.listen(PORT, () => {
  console.log(`GoCar listening on port ${PORT}!`);
});
