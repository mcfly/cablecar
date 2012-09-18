var chai = require('chai'),
    app = require('../app');

var expect = chai.expect;

describe('app', function(done) {

  it('should use localhost:9200 as elasticsearch resource if no environment variable is set', function() {
    expect(app.get('elastic')).to.equal('localhost:9200');
  });


});