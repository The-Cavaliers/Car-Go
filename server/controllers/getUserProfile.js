const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.getProfile = function (req, res) {
  const email = req.body.email;
  knex('profiles').where('email', email)
    .then((groups) => {
      if (groups.length === 0) {
        console.log('nothing profile');
        res.status(201).send({ data: [] });
      } else {
        res.status(201).send(groups);
      }
    })
    .catch((err) => {
      console.log(err);
    })
};