
const models = require('../../db/models');
const dbConfig = require('../dbConfig.js');
const geocoder = require('geocoder');
const knex = require('knex')(dbConfig);


module.exports.getMapPins = (req, res) => {
  console.log('Response', req.query);

// Reverse Geocoding
  geocoder.reverseGeocode(37.783692, -122.408967, (err, data) => {
  // do something with data
    console.log(data.results[0].address_components[3].long_name);
    knex('groups').where({
      leaving_from: data.results[0].address_components[3].long_name,
    }).select('*')
  .then((response) => {
    // console.log(response);
    res.send(response);
  })
  .catch((error) => {
    // console.log(error);
    res.send(error);
  });
  }, { key: 'AIzaSyCyMh2NG1WVqO3fwmrFA7km3Vgwu24YmYI' });
};
