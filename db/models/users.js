const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  groups() {
    return this.hasMany('groups');
  },
});

module.exports = db.model('User', User);
