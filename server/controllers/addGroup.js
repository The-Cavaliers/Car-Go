const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.saveGroup = (req, res) => {
  console.log('REQUEST RECIEVED: ', req.body);
  const userInfo = req.body;
  console.log('USERINFO***********', userInfo)
  const user = { user_id: req.body.user_id };
  knex('groups')
  .insert({
    name: userInfo.username,
    leaving_from: userInfo.leaving_from,
    going_to: userInfo.going_to,
    email: userInfo.email,
    img_url: userInfo.picture_url,
    travelDate: userInfo.travelDate,
    seats: userInfo.seats,
  }).returning('id')
  .then(groupId => knex('users_groups').insert({
    user_id: user.user_id,
    group_id: groupId[0],
  }))
  .then((response) => {
    console.log('THE INSERT INTO USERS', response);
    res.end('GROUP CREATED');
  })
  .catch(err => console.log('err with saving group', err));
};
