const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.getGroups = function (req, res) {
  knex.select('group_id').from('users_groups')
  .where('users_groups.user_id', req.body.user_id)
  .join('groups', 'groups.id', '=', 'users_groups.group_id')
  .select('*')
  .then((groups) => {
    console.log('group array from getGroups', groups)
    if (groups.length === 0) {
      console.log('nothing found');
      res.status(201).send({ data: [] });
    } else {
      res.status(201).send(groups);
    }
  })
  .catch((err) => {
    console.log('this is the err', err);
    res.status(503).send({ data: [] });
  });
};
