const models = require('../../db/models');
const dbConfig = require('../dbConfig.js');
const knex = require('knex')(dbConfig);

module.exports.getMapPins = (req, res) => {
  knex('groups').where({
    leaving_from: 'San Francisco',
  }).select('*')
  .then((response) => {
    //console.log(response);
    res.send(response);
  })
  .catch((error) => {
    //console.log(error);
    res.send(error);
  });

};

