'use strict'

let Lift = require('../models/lifts');

module.exports.getAllLifts = function(req, res) {
  //grab all the lifts from the database
  Lift.find(function(err, lifts) {
    if (err) {
      res.send(err);
    }
    res.json({lifts: lifts});
  });
};

module.exports.addLift = function(req, res) {
  //add a new lift to the database
  var lift = new Lift(req.body);
  lift.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({lift: lift});
  });
};
