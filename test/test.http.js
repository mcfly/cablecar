var expect = require('chai').expect,
    request = require('request'),
    app = require('../app.js');

describe('app should return http status codes', function(done) {

  describe('if a non existing site was requested', function(done) {
    it('should respond with http status 404', function(done) {
      request('http://localhost:3000/trolololo', function (err, res, body) {
        expect(res.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('if the home was requested', function(done) {
    it('should respond with http status 200', function(done) {
      request('http://localhost:3000/', function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('if a rendering error is raised', function(done) {
    it('should respond with http status 500', function(done) {
      request.post('http://localhost:3000/search', function (err, res, body) {
        expect(res.statusCode).to.equal(500);
        done();
      });
    });
  });
});
