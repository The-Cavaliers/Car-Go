const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.saveGroup = (req, res) => {
  console.log('req bodyy', req.body)
  const user = { user_id: req.body.user_id };
  console.log('userrrr', user)
  knex('groups')
  .insert({
    name: req.body.username,
    leaving_from: req.body.leaving_from,
    going_to: req.body.going_to,
    email: req.body.email,
    img_url: req.body.picture_url,
    travelDate: req.body.travelDate,
    seats: req.body.seats,
  }).returning('id')
  .then(groupId => knex('users_groups').insert({
    user_id: user.user_id,
    group_id: groupId[0],
  }))
  .catch(err => console.log('err with saving group', err));
};
