var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./routes');

var app = module.exports = express();

app.configure(function() {
  //Environment variables
  app.set('port', process.env.PORT || 3000);
  app.set('elastic', process.env.ELASTIC || 'http://127.0.0.1:9200');
  app.set('basicAuthElasticUser', process.env.ELASTICBASICUSER);
  app.set('basicAuthElasticPw', process.env.ELASTICBASICPW);

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(function(err, req, res, next) {
    res.status(500);
    res.render('error', {title: 'Error'});
  });

  app.use(function(req, res, next){
    res.status(404);
    res.render('error', {title: '404 Error'});
  });
});

app.configure('development', function() {
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

var environment = [app.get('elastic'), app.get('basicAuthElasticUser'), app.get('basicAuthElasticPw')];

app.get('/', routes.index);
app.get('/search', routes.index);
app.post('/search', routes.search(environment));

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
