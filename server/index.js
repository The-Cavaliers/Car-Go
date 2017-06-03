

const User = require('../db/models/users');

const app = require('./app');

const dbConfig = require('./dbConfig.js');
const knex = require('knex')(dbConfig);
const http = require('http');
const socketio = require('socket.io');

const server = http.Server(app);
const websocket = socketio(server);

app.post('/sign-login', (req, res) => {
  const user = req.body;
  // console.log('USER ISssssssss', user);
  knex('users').where({
    email: user.email,
  })
  .then((response) => {
    console.log('response from KNEX', response);
    if (response.length === 0) {
      new User({
        username: user.username,
        token: user.token,
        email: user.email,
        picture_url: user.picture_url,
        social_provider: user.provider,
      }).save()
      .then((users) => {
        res.send([false, users]);
      })
      .catch((error) => {
        console.log('err', error);
        res.send('PLS HALP! ERROR');
      });
    } else {
      res.send([true, response]);
    }
  });
});

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
    websocket.emit('message', { username: data.userName, message: data.message, groupName: data.groupName, date: data.date });
    console.log(data);
  });
  //getuser
   // get the messages from the client
  socket.on('add-user', (data) => {
    console.log(data);
  });
});
