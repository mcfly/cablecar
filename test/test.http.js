var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../app.js');

describe('app should return http status codes', function(done) {

  describe('if a non existing site was requested', function(done) {
    it('should respond with http status 404', function(done) {
      request(app)
        .get('/trolololo')
        .expect(404, done);
    });
  });

  describe('if the home was requested', function(done) {
    it('should respond with http status 200', function(done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('if a rendering error is raised', function(done) {
    it('should respond with http status 500', function(done) {
      request(app)
        .post('/search')
        .expect(500, done);
    });
  });
});
