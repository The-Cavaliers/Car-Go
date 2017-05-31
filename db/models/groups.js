
const db = require('../');

const Groups = db.Model.extend({
  tableName: 'groups',
  auths: function() {
    return this.hasMany('users');
  }
});

module.exports = db.model('Groups', Groups);