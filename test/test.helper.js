var expect = require('chai').expect,
    elastic = require('../helper/elasticapi'),
    shared = require('./shared'),
    sinon = require('sinon');

describe('elasticapi helper', function() {

  describe('createQuery() - building a search query', function() {
    it('should build a query in json', function() {
      var query = elastic.createQuery('weisswurst');
      var result = {
        "fields": ["title", "filename", "download"],
        "query": {
          "query_string": {
            "query": "weisswurst"
          }
        },
        "highlight": {
          "pre_tags" : [""],
          "post_tags" : [""],
          "fields": {
            "file": {}
          }
        }
      };

      expect(query).to.deep.equal(result);
    });
  });

  describe('doQuery()', function(done) {

    it('should call the error-callback in case of an error and not the success-cb', function(done) {
      var cbSpy = sinon.spy();

      var err = function() {
        expect(cbSpy.called).to.equal(false);
        done();
      };

      elastic.doQuery('Data', [undefined], err, cbSpy);
    });

    it('should call the success-callback with data and do not call the error callback', function(done) {
      var errSpy = sinon.spy();
      shared.nock();

      var cb = function(result) {
        expect(errSpy.called).to.equal(false);
        expect(result).to.deep.equal(shared.ELASTIC_RESPONSE);
        done();
      };
      var err = function() {};

      elastic.doQuery('Data', [shared.ELASTIC_URL], err, cb);
    });
  });

  describe('createUrl() - basic auth enabled @ elasticsearch', function() {
    it('should create an url with pw and username if ENV-variables were set', function() {
      var url = elastic.createUrl(['http://foobar.de', 'myusername', 'supersecret']);

      expect(url).to.equal('http://myusername:supersecret@foobar.de/_search');
    });

    it('should create an https-url with pw and username if ENV-variables were set', function() {
      var url = elastic.createUrl(['https://foobar.de', 'myusername', 'supersecret']);

      expect(url).to.equal('https://myusername:supersecret@foobar.de/_search');
    });

    it('should create an url without pw and username if no ENV-variables were set', function() {
      var url = elastic.createUrl(['http://foobar.de', undefined, undefined]);

      expect(url).to.equal('http://foobar.de/_search');
    });
  });
});