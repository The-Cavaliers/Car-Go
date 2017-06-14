const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.verifyProfile = (req, res) => {
  const profile = req.body.email;
  knex('profiles').where('email', profile)
  .returning('*')
  .into('profiles')
  .then((userProfile) => {
    res.end(JSON.stringify([true, userProfile]));
  })
  .catch((error) => {
    console.log('Error getting user profile', error);
    res.end(JSON.stringify([false]));
  });
};
