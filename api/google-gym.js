'use strict'
var request = require('request');

module.exports.findGymCoordinates = function(req, res) {
  //make api request to google maps
  const options = {
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?',
    qs: {
      address: '341 Gill Road Apollo, PA',
      key: 'AIzaSyBQ5YCopzxqDu-fvlTX_dTbwuQ-i_hDjd8'
    }
  }

  request(options, function(error, response, body) {
    let result = JSON.parse(body);
      res.json({
        latitude: result.results[0].geometry.location.lat,
        longitude: result.results[0].geometry.location.lng
      });
    });
};
