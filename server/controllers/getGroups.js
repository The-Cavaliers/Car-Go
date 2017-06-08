const models = require('../../db/models');
const dbConfig = require('../dbConfig.js');
const knex = require('knex')(dbConfig);


module.exports.getGroups = function (req, res) {
	var id = req.body.user_id;
  knex('groups')
  .where('user_id', id)
  .then(groups => {
    if(groups.length === 0) {
      console.log('nothing found');
      res.status(201).send(null);
    } else {
      res.status(201).send(groups);
    }
  })
  .catch(err => {
    console.log('this is the err', err);
    res.status(503);
  });
};
