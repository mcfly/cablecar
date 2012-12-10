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

  describe('if the search was requested with GET', function(done) {
    it('should respond with http status 200', function(done) {
      request(app)
        .get('/search')
        .expect(200, done);
    });
  });

  describe('if a connnection error is raised', function(done) {
    var temp;

    before(function() {
      temp = app.get('elastic');
      app.set('elastic', 'foo');
    });

    after(function() {
      app.set('elastic', temp);
    });

    it('should respond with http status 500', function(done) {
      request(app)
        .post('/search')
        .expect(500, done);
    });
  });

  describe('if an empty searchquery was provided', function(done) {
    it('should redirect', function(done) {
      var query = '';

      request(app)
        .post('/search')
        .send({searchquery: query})
        .expect(302, done);
    });
  });
});
