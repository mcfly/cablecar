var expect = require('chai').expect,
    request = require('request'),
    app = require('../app'),
    nock = require('nock');

describe('/', function(done) {

  it('should have a form', function(done) {
    request('http://localhost:3000/', function (err, res, body) {

      expect(body).to.contain('<form method="post" action="/search"');

      done();
    });
  });

  it('should have a text input field', function(done) {
    request('http://localhost:3000/', function (err, res, body) {

      expect(body).to.contain('<input type="text"');

      done();
    });
  });

  it('should have a submit-button', function(done) {
    request('http://localhost:3000/', function (err, res, body) {

      expect(body).to.contain('<button type="submit"');

      done();
    });
  });
});
