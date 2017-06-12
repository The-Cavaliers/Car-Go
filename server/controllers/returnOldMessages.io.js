const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.returnOldMessages = user =>
knex('messages').where('group_id', user.roomId).select('*')
.then(messages => messages.map(msgObj => ({
  _id: msgObj._id,
  text: msgObj.text,
  user: {
    _id: msgObj.user_id,
    name: msgObj.user_name,
    avatar: msgObj.user_avatar,
  },
})));
