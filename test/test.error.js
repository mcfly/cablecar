var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../app');

describe('error', function(done) {

  it('should get rendered when a connection error appears', function(done) {
    var temp;
    before(function() {
      temp = app.get('elastic');
      app.set('elastic', 'foo');
    });

    after(function() {
      app.set('elastic', temp);
    });

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

  it('should get rendered when a route does not exist', function(done) {
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
