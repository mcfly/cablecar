var expect = require('chai').expect,
    request = require('request'),
    app = require('../app');

describe('error', function(done) {

  it('should get rendered when a template could not be rendered', function(done) {
    request.post('http://localhost:3000/search', function (err, res, body) {
      expect(res.statusCode).to.equal(500);
      expect(body).to.contain('Sad panda');
      done();
    });
  });
});
