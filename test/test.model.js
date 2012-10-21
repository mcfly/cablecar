var expect = require('chai').expect,
    models = require('../app/models/');

describe('SearchQuery', function(done) {
  var SearchQuery = models.SearchQuery;

  it('is invalid if query is empty', function() {
    var query = new SearchQuery({query: ''});
    expect(query.isValid).to.equal(false);
  });

  it('is invalid if parameter is undefined', function() {
    var query = new SearchQuery();
    expect(query.isValid).to.equal(false);
  });

  it('is valid if it is not empty', function() {
    var query = new SearchQuery({query: 'foo'});
    expect(query.isValid).to.equal(true);
  });

  it('should store the value', function() {
    var query = new SearchQuery({query: 'foo'});
    expect(query.value).to.equal('foo');
  });

  it('should sanitize the value', function() {
    var query = new SearchQuery({query: '<script>alert(0);</script>'});
    expect(query.value).to.equal('[removed]alert&#40;0&#41;;[removed]');
  });
});
