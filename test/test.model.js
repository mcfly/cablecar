var expect = require('chai').expect,
    models = require('../app/models/'),
    shared = require('./shared');

describe('SearchQuery', function() {
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

describe('Result', function(done) {
  var Result = models.Result;

  it('should sanitize the searchquery value', function() {
    var query = new Result({
      results: shared.ELASTIC_RESPONSE,
      query: '<script>alert(0);</script>'
    });

    expect(query.values.hits.searchQuery).to.equal('[removed]alert&#40;0&#41;;[removed]');
  });

  it('should sanitize the elasticsearch result', function() {
    var query = new Result({
      results: shared.ELASTIC_RESPONSE_XSS,
      query: 'foo'
    });

    expect(query.values.hits.hits[0].highlight.file[0]).to.equal('[removed]blah(0);[removed]6\n1.11 Data permanency and removing objects . . . . . . . . . . . . . . . . . . . . . . . 6\n\n2 Simple');
  });
});
