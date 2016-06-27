'use strict'

let Lift = require('../models/lifts');

module.exports.getAllLifts = function(req, res) {
  Lift.find(function(err, lifts) {
    if (err) {
      res.send(err);
    }
    res.json({lifts: lifts});
  });
};

module.exports.addLift = function(req, res) {
  console.log('adding lift');
  var lift = new Lift(req.body);
  lift.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({lift: lift});
    console.log('json sent');
  });
};
