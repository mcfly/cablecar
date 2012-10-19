var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../app'),
    nock = require('nock');

describe('/', function(done) {

  it('should have a form', function(done) {
    request(app)
      .get('/')
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        expect(res.text).to.contain('<form method="post" action="/search"');
        done();
      });
  });

  it('should have a text input field', function(done) {
    request(app)
      .get('/')
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        expect(res.text).to.contain('<input type="text"');
        done();
      });
  });

  it('should have a submit-button', function(done) {
    request(app)
      .get('/')
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        expect(res.text).to.contain('<button type="submit"');
        done();
      });
  });
});
