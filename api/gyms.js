'use strict'

let Gyms = require('../models/gyms');

module.exports.findGym = function(req, res) {
  //see if gym is in database/getinfo
  Gyms.find({"latitude": req.query.latitude},
  function(err, gyms) {
    if(err) {
      res.send(err);
    }
    res.json({gyms: gyms});
  });

};

module.exports.addGym = function(req, res) {
  //add gym to database
  let gym = new Gyms(req.body);
  gym.save(function(err) {
    if(err) {
      res.send(err);
    }
    res.json({gym: gym});
  });
};
