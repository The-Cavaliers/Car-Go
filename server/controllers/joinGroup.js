const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.joinGroup = (req, res) => {
  knex('users_groups').insert({
    user_id: req.body.user_id,
    group_id: req.body.group_id,
  })
  .then(() => {
    res.end('join success');
  })
  .then(() => knex('groups').where('id', '=', req.body.group_id)
    .decrement('seats', 1))
  .catch((err) => {
    console.log('err', err);
  });
};
