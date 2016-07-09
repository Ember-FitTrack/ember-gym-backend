'use strict'
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
describe('Testing API Endpoints', function() {
  describe('GET Requests', function() {
    it('responds to /', function(done) {
      chai.request(server)
        .get('/')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });

    it('retrieves records from /lifts', function(done) {
      chai.request(server)
        .get('/lifts')
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.lifts.should.be.a('array');
          done();
        });
    });

    it('retrieves coordinates from /google-gym', function(done) {
      chai.request(server)
        .get('/google-gym')
        .query({'address' : '190 Lothrop Street Pittsburgh, PA'})
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('latitude', 40.4417721);
          res.body.should.have.property('longitude', -79.9601156);
          done();
        });
    });

    it('retrieves gyms from /gym', function(done) {
      chai.request(server)
        .get('/gym')
        .query({'latitude' : 40.437164918})
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.gyms.should.be.a('array');
          done();
        });
    });

    it('retrieves local gym lifts from /gym-lifts', function(done) {
      chai.request(server)
        .get('/gym-lifts')
        .query({'latitude' : 40.437164918})
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.gymlift.should.be.a('array');
          done();
        });
    });
  });
});
