var expect = require('chai').expect,
    request = require('request'),
    app = require('../app'),
    shared = require('./shared');

beforeEach(function() {
  require('./shared').nock();
});

describe('/search', function(done) {

  it('should show the filename', function(done) {
    request.post('http://localhost:3000/search', {form: {searchquery: 'Data'}}, function (err, res, body) {
      expect(body).to.contain('Redis manual.pdf');
      done();
    });
  });

  it('should show the abstract', function(done) {
    request.post('http://localhost:3000/search', {form: {searchquery: 'Data'}}, function (err, res, body) {
      expect(body).to.contain('Analysis and Graphics');
      done();
    });
  });
});