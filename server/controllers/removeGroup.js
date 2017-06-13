const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.removeGroup = (req, res) => {
  knex('groups')
  .where('id', req.body.group_id)
  .modify((qb) => {
    qb.andWhere('email', req.body.email)
    .del()
    .then(() => {
      knex('users_groups')
      .where({
        'users_groups.user_id': req.body.user_id,
        'users_groups.group_id': req.body.group_id,
      })
      .del()
      .then(() => knex.select('group_id').from('users_groups')
      .where('users_groups.user_id', req.body.user_id)
      .join('groups', 'groups.id', '=', 'users_groups.group_id')
      .select('*')
      .then((groups) => {
        if (groups.length === 0) {
          console.log('nothing found');
          res.status(201).send([]);
        } else {
          res.status(201).send(groups);
        }
      }));
    })
    .catch((err) => {
      console.log('err in driver del', err);
      res.status(503);
    });
  });
};
