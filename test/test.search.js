var expect = require('chai').expect,
    request = require('request'),
    app = require('../app'),
    shared = require('./shared');

describe('/search', function(done) {

  it('should show the filename', function(done) {
    shared.nock();
    request.post('http://localhost:3000/search', {form: {searchquery: 'Data'}}, function (err, res, body) {
      expect(body).to.contain('Redis manual.pdf');
      done();
    });
  });

  it('should show the abstract', function(done) {
    shared.nock();
    request.post('http://localhost:3000/search', {form: {searchquery: 'Data'}}, function (err, res, body) {
      expect(body).to.contain('Analysis and Graphics');
      done();
    });
  });

  it('should show the abstract', function(done) {
    var query = 'anothertest';
    shared.nock(query, {});
    request.post('http://localhost:3000/search', {form: {searchquery: query}}, function (err, res, body) {
      expect(body).to.contain('No Results');
      done();
    });
  });

  it('should show a download link', function(done) {
    shared.nock();
    request.post('http://localhost:3000/search', {form: {searchquery: 'Data'}}, function (err, res, body) {
      expect(body).to.contain('<a href="http://myserver.com/download/pdf/Redis manual.pdf');
      done();
    });
  });

  it('should show no download link if no download-variable set', function(done) {
    var query = 'nodownload';
    shared.nock(query, shared.ELASTIC_RESPONSE_NO_DOWNLOAD);
    request.post('http://localhost:3000/search', {form: {searchquery: query}}, function (err, res, body) {
      expect(body).to.not.contain('<a href="http://myserver.com/download/pdf/Redis manual.pdf');
      done();
    });
  });
});