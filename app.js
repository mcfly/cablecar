var express = require('express'),
    http = require('http'),
    path = require('path'),
    controllers = require('./app/controllers'),
    flashify = require('flashify');

var app = module.exports = express();

app.configure(function() {
  //Environment variables
  app.set('port', process.env.PORT || 3000);
  app.set('elastic', process.env.ELASTIC || 'http://127.0.0.1:9200');
  app.set('basicAuthElasticUser', process.env.ELASTICBASICUSER);
  app.set('basicAuthElasticPw', process.env.ELASTICBASICPW);

  app.set('title', 'Cablecar');

  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(express.cookieParser('secret'));
  app.use(express.session());
  app.use(flashify);

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(function(err, req, res, next) {
    res.status(500);
    res.render('error', {error: '500 error'});
  });

  app.use(function(req, res, next){
    res.status(404);
    res.render('error', {error: '404 error'});
  });
});

app.configure('development', function() {
  app.use(express.errorHandler());
  app.locals.pretty = true;
});
console.log(controllers.home);

app.get('/', controllers.home);
app.get('/search', controllers.home);
app.post('/search', controllers.search(app));

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
