'use strict'
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
describe('loading express', function() {
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

  it('retrieves coordinates from google-maps api', function(done) {
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
      //to finish
  });
});
