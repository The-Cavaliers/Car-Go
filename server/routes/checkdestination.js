const express = require('express');
const request = require('request');

const router = express.Router();

router.route('/')
.post((req, res) => {
  const city = req.body.destination;
  request(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=AIzaSyAornmj-fPWKKlz-1nH-fN-Olid970Zjcg`, (error, response, cities) => {
    if (error) {
      res.end('There was an error finding that city!', error);
    } else {
      const cityList = JSON.parse(cities).predictions.splice(0, 3).map((city) => {
        return city.structured_formatting.main_text;
      });
      const duplicateFreeCityList = [];
      cityList.forEach((city) => {
        duplicateFreeCityList.includes(city) ? console.log('duplicate') : duplicateFreeCityList.push(city);
      });
      res.end(JSON.stringify(duplicateFreeCityList));
    }
  });
});

module.exports = router;