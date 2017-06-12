const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.checkUser = (req, res) => {
  const user = req.body;
  knex('users').where('email', user.email)
  .then((response) => {
    if (response.length === 0) {
      knex.insert({
        username: user.username,
        email: user.email,
        picture_url: user.picture_url,
        token: user.token,
        social_provider: user.social_provider,
      }).returning('*').into('users')
      .then((userLogin) => {
        res.end(JSON.stringify([false, userLogin]));
      })
      .catch((error) => {
        console.log('err', error);
        res.end('PLS HALP! ERROR in users.js controller', error);
      });
    } else {
      res.end(JSON.stringify([true, response]));
    }
  });
};
