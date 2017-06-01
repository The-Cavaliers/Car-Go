'use strict';
const User = require('../db/models/users');
// const User = require('./app');

const app = require('./app');

const dbConfig = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'thesis_devel',
    charset: 'utf8',
  },
};

const knex = require('knex')(dbConfig);

app.post('/sign-login', (req, res) => {
  const user = req.body;
  console.log('USER ISssssssss', user);
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
        res.send(users);
      })
      .catch((error) => {
        console.log('err', error);
        res.send('PLS HALP! ERROR');
      });
    } else {
      res.send(response);
    }
  });
});

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`GoCar listening on port ${PORT}!`);
});
