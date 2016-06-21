var lifts = require('../api/lifts');
var path  = require('path');

module.exports = function(router) {
  router.route('/lifts')
    .post(function(req, res) {
      console.log(req.body);
      lifts.addLift(req, res);
    })

    .get(function(req, res) {
      lifts.getAllLifts(req, res);
    });

  router.route('*').get(function(req, res) {
    res.sendFile(path.join(__dirname, '../public', '/index.html'));
  });

};
