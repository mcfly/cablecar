var expect = require('chai').expect,
    elastic = require('../helper/elasticapi'),
    shared = require('./shared');

describe('elasticapi helper', function(done) {

  describe('building a search query', function() {
    it('should build a query in json', function() {
      var query = elastic.createQuery('weisswurst');
      var result = {
        "fields": ["title", "filename"],
        "query": {
          "query_string": {
            "query": "weisswurst"
          }
        },
        "highlight": {
          "fields": {
            "file": {}
          }
        }
      };

      expect(query).to.deep.equal(result);
    });
  });

  describe('doing a query', function(done) {
    it('should call the callback with data', function(done) {
      shared.nock();

      var cb = function(result) {
        expect(result).to.deep.equal(shared.ELASTIC_RESPONSE);
        done();
      };

      elastic.doQuery('Data', shared.ELASTIC_URL, cb);
    });
  });

  describe('working with htaccess', function(done) {
    it('should work with htaccess', function(done) {
      expect(true).to.deep.equal(false);

    });
  });
});