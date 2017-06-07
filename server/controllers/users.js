const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.checkUser = (req, res) => {
  const user = req.body;
  knex('users').where('email', user.email)
  .then((response) => {
<<<<<<< HEAD
=======
    console.log('RESPONSE FROM SERVER', response);
>>>>>>> first update after rebase
    if (response.length === 0) {
      knex.insert({
        username: user.username,
        token: user.token,
        email: user.email,
        picture_url: user.picture_url,
        social_provider: user.provider,
      }).returning('*').into('users')
      .then((userLogin) => {
        // userLogin.id = id;
        res.send([false, userLogin]);
      })
      .catch((error) => {
        console.log('err', error);
        res.send('PLS HALP! ERROR from server side', error);
      })
    } else {
      res.send([true, response]);
    }
  })
};
