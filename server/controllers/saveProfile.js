// const models = require('../../db/models');
const dbConfig = require('../dbConfig.js');
const knex = require('knex')(dbConfig);

module.exports.saveProfile = function (req, res) {
  const data = req.body.profile;
  knex('profiles').where('email', data.email)
  .then((profile) => {
    if (profile.length === 0) {
      knex.insert({
        first_name: profile.first_name,
        last_name: profile.last_name,
        age: profile.age,
        gender: profile.gender,
        email: profile.email,
        about_me: profile.about_me,
        pets: profile.pets,
        smoking: profile.smoking,
        driver: profile.driver,
        preferred_ride: profile.preferred_ride,
        language: profile.language,
        music_preference: profile.music_preference,
        phone_number: profile.phone_number,
        user_id: profile.id,
      })
      .returning('*')
      .into('profiles')
      .then((userProfile) => {
        res.end(JSON.stringify([true, userProfile]));
      })
      .catch((error) => {
        console.log('Error getting user profile', error);
        res.end('Error getting user profile', error);
      });
    } else {
      res.send(JSON.stringify([false]));
    }
  });
};
