var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../app'),
    shared = require('./shared');

describe('/search', function(done) {

  it('should show the filename', function(done) {
    shared.nock();
    request(app)
      .post('/search')
      .send({searchquery: 'Data'})
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        expect(res.text).to.contain('Redis manual.pdf');
        done();
      });
  });

  it('should show the abstract', function(done) {
    shared.nock();
    request(app)
      .post('/search')
      .send({searchquery: 'Data'})
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        expect(res.text).to.contain('Analysis and Graphics');
        done();
      });
  });

  it('should show "No Results" if the result is empty', function(done) {
    var query = 'anothertest';
    shared.nock(query, {});
    request(app)
      .post('/search')
      .send({searchquery: query})
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        expect(res.text).to.contain('No Results');
        done()
      });
  });

  it('should show a download link', function(done) {
    shared.nock();
    request(app)
      .post('/search')
      .send({searchquery: 'Data'})
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        expect(res.text).to.contain('<a href="http://myserver.com/download/pdf/Redis manual.pdf');
        done()
      });
  });

  it('should show no download link if no download-variable set', function(done) {
    var query = 'nodownload';
    request(app)
      .post('/search')
      .send({searchquery: query})
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        expect(res.text).to.not.contain('<a href="http://myserver.com/download/pdf/Redis manual.pdf');
        done()
      });
  });

  describe('XSS', function(done) {

    it('it should prevent XSS from searchqueries', function(done) {
      var query ='<script>alert(0);</script>';
      shared.nock('[removed]alert&#40;0&#41;;[removed]', shared.ELASTIC_RESPONSE_NO_DOWNLOAD);
      request(app)
        .post('/search')
        .send({searchquery: query})
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          expect(res.text).to.contain('[removed]alert&#40;0&#41;;[removed]');
          done();
        });
    });

    it('it should filter XSS from documents', function(done) {
      var query = 'XSS';
      shared.nock(query, shared.ELASTIC_RESPONSE_XSS);
      request(app)
        .post('/search')
        .send({searchquery: query})
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          expect(res.text).to.contain('[removed]alert&#40;0&#41;;[removed]');
          expect(res.text).to.contain('[removed]blah(0);[removed]');
          done();
        });
    });
  });
});