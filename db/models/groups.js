
const db = require('../');

const Group = db.Model.extend({
  tableName: 'groups',
  user: function() {
    return this.hasMany('Users');
  }
});

module.exports = db.model('Group', Group);