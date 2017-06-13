const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.getMapPins = (req, res) => {
  knex('groups').where({
    leaving_from: 'San Francisco',
  }).select('*')
  .then((response) => {
    //console.log(response);
    res.send(response);
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });

};
