const dbConfig = require('../dbConfig.js');
const knex = require('knex')(dbConfig);

module.exports.verifyProfile = (req, res) => {
  const profile = req.body.email;
  knex('profiles').where('email', profile)
  .returning('*')
  .into('profiles')
  .then((userProfile) => {
    console.log('This is the users profile', userProfile);
    res.end(JSON.stringify([true, userProfile]));
  })
  .catch((error) => {
    console.log('Error getting user profile', error);
    res.end(JSON.stringify([false]));
  });
};
