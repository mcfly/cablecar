var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../app');

describe('error', function(done) {

  it('should get rendered when a template could not be rendered', function(done) {
    request(app)
      .post('/search')
      .expect(500)
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        expect(res.text).to.contain('Sad panda');
        done()
      });
  });

  it('should get rendered when a template could not be rendered', function(done) {
    request(app)
      .get('/trololololo')
      .expect(404)
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        expect(res.text).to.contain('Sad panda');
        expect(res.text).to.contain('404');
        done()
      });
  });
});
