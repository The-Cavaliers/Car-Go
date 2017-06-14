const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.saveProfile = function (req, res) {
  const data = req.body.data;
  knex('profiles')
  .where('email', data.email)
  .then((profile) => {
    if (profile.length === 0) {
      knex.insert({
        first_name: data.first_name,
        last_name: data.last_name,
        age: data.age,
        gender: data.gender,
        email: data.email,
        about_me: data.about_me,
        pets: data.pets,
        smoking: data.smoking,
        preferred_ride: data.preferred_ride,
        language: data.language,
        music_preference: data.music_preference,
        phone_number: data.phone_number,
        user_id: data.id,
      })
      .returning('*')
      .into('profiles')
      .then((userProfile) => {

        res.end(JSON.stringify([true, userProfile]));
      });
    } else {
      knex('profiles')
      .where('email', data.email)
      .then((newData) => {
        console.log('USER PROFILE', newData);
        knex.update({
          first_name: data.first_name,
          last_name: data.last_name,
          age: data.age,
          gender: data.gender,
          about_me: data.about_me,
          pets: data.pets,
          smoking: data.smoking,
          preferred_ride: data.preferred_ride,
          language: data.language,
          music_preference: data.music_preference,
          phone_number: data.phone_number,
        }).into('profiles')
        .where('email', data.email)
        .catch((error) => {
          console.log('error updating user', error);
        });
      })
      .then((userProfile) => {
        console.log('This is what I get back after I update a profile', userProfile);
        res.end('Profile created');
      })
      .catch((error) => {
        console.log('Error getting user profile', error);
        res.end('Error getting user profile', error);
      });
    }
  });
};
