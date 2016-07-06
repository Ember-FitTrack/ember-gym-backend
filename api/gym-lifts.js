'use strict'

let gymLifts = require('../models/gymLifts');

module.exports.findLifts = function(req, res) {
    console.log(req.query);
  gymLifts.find({"latitude": req.query.latitude},
    function(err, lifts) {

      console.log(lifts);
      if (err) {
        res.send(err);
      }
      res.json({gymlift: lifts});

    });
};

module.exports.addLift = function(req, res) {
  let lift = new gymLifts(req.body);
  lift.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({gymLifts: lift});
  });
};
