'use strict'
var request = require('request');

module.exports.findGymCoordinates = function(req, res) {
  //make api request to google maps
  const options = {
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?',
    qs: {
      address: req.address,
      key: AIzaSyBQ5YCopzxqDu-fvlTX_dTbwuQ-i_hDjd8
    }
  }

  request(options)
    .then(function(response) {

    })
    .catch(function(err) {

    });

};
