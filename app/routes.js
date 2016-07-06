'use strict'

let lifts = require('../api/lifts');
let path  = require('path');
let gyms  = require('../api/gyms');
let googleApi = require('../api/google-gym');
let gymLifts = require('../api/gym-lifts.js');
module.exports = function(router) {
  router.route('/lifts')
    .post(function(req, res) {
      lifts.addLift(req, res);
    })

    .get(function(req, res) {
      lifts.getAllLifts(req, res);
    });

  router.route('/google-gym')
    .get(function(req, res) {
      googleApi.findGymCoordinates(req, res);
    });

  router.route('/gym-lifts')
    .get(function(req, res) {
      gymLifts.findLifts(req, res);
    });

  router.route('/gym')

    .post(function(req, res) {
      gyms.addGym(req, res);
    })

    .get(function(req, res) {
      gyms.findGym(req, res);
    });

  router.route('*').get(function(req, res) {
    res.sendFile(path.join(__dirname, '../public', '/index.html'));
    });

};
