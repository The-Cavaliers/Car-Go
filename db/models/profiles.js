const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths() {
    return this.hasMany('Auth');
  },
});

module.exports = db.model('Profile', Profile);
