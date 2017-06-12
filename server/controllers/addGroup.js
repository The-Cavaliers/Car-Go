// const models = require('../../db/models');

const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

// module.exports.saveGroup = function (res, req) {
// 	console.log('this is',res.body)
//   new models.Groups({
//     name: res.body.username,
//     leaving_from: res.body.leaving_from,
//     going_to: res.body.going_to,
//     email: res.body.email,
//     img_url: res.body.picture_url,
//     travelDate: res.body.travelDate,
//     user_id: res.body.user_id,
//   }).save();
// 	console.log('saved to data base')
// }

module.exports.saveGroup = (res, req) => {
  const user = { user_id: res.body.user_id };
  knex('groups')
  .insert({
    name: res.body.username,
    leaving_from: res.body.leaving_from,
    going_to: res.body.going_to,
    email: res.body.email,
    img_url: res.body.picture_url,
    travelDate: res.body.travelDate,
  }).returning('id')
  .then(groupId => knex('users_groups').insert({
    user_id: user.user_id,
    group_id: groupId[0],
  }))
  .catch(err => console.log('err with saving group', err));
};
