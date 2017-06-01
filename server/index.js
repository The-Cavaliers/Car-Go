'use strict';
const User = require('../db/models/users');

const app = require('./app');

const bookshelf = app.get('bookshelf');

app.post('/sign-login', (req, res) => {
  const user = req.body;
  console.log('USER ISssssssss', user)
  new User({
    username: user.username,
    token: user.token,
    email: user.email,
    picture_url: user.picture_url,
  }).save()
  .then((users) => {
    res.send(users.toJSON());
  })
  .catch((error) => {
    console.log('err', error);
    res.send('PLS HALP! ERROR')
  })
});

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`GoCar listening on port ${PORT}!`);
});
