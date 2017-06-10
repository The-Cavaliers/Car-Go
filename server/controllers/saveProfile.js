const models = require('../../db/models');
const dbConfig = require('../dbConfig.js');
const knex = require('knex')(dbConfig);


module.exports.saveProfile = function (req, res) {
	console.log('this is',req.body)
  new models.Profile({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
    gender: req.body.age,
    about_me: req.body.about_me,
    pets: req.body.pets,
    smoking: req.body.smoking,
    driver: req.body.driver,
    preferred_ride: req.body.preferred_ride,
    language: req.body.language,
    music_preference: req.body.music_preference,
    phone_number: req.body.phone_number,
    user_id: req.body.user_id,
  }).save();
	console.log('saved to data base')
}
