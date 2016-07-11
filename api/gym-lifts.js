'use strict'

let gymLifts = require('../models/gymLifts');

module.exports.findLifts = function(req, res) {
  //find all lifts with the same latitude
  gymLifts.find({"latitude": req.query.latitude},
    function(err, lifts) {
      if (err) {
        res.send(err);
      }
      res.json({gymlift: lifts});
    });
};

module.exports.addLift = function(req, res) {
  let lift = new gymLifts(req.body);
  //add a new lift to the database
  lift.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({gymLifts: lift});
  });
};
