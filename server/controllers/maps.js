const models = require('../../db/models');
const CONFIG = require('../../config/development.json');
const geocoder = require('geocoder');
const knex = require('knex')(CONFIG.knex_config);


module.exports.getMapPins = (req, res) => {
  //console.log('Response', req.query);

// Reverse Geocoding
  geocoder.reverseGeocode(req.query.location[0], req.query.location[1], (err, data) => {
  // do something with data
   console.log("data",data.results[0].address_components[3].long_name);
    knex('groups').where({
      leaving_from: data.results[0].address_components[3].long_name,
    }).select('*')
  .then((response) => {
    // console.log(response);
    res.send(response);
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });
  }, { key: 'AIzaSyCyMh2NG1WVqO3fwmrFA7km3Vgwu24YmYI' });
};
