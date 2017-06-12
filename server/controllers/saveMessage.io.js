const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.saveMessage = (message, roomId) => {
  knex('messages').where('group_id', message.roomId)
  .insert({
    _id: message._id,
    text: message.text,
    user_id: message.user._id,
    group_id: roomId,
    user_name: message.user.name,
    user_avatar: message.user.avatar,
    createdAt: message.createdAt,
  })
  .catch((error) => {
    console.log('Error with message saving', error);
  });
};
