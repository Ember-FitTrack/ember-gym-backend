'use strict'

let gymLifts = require('../models/gymLifts');

module.exports.findLifts = function(req, res) {
  gymLifts.find(function(err, gymLifts) {
    if (err) {
      res.send(err);
    }
    res.json({gymLifts: gymLifts});
  });
};
