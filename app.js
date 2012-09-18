
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();

var routes = require('./routes');


app.configure(function(){
  //Environment variables
  app.set('port', process.env.PORT || 3000);
  app.set('elastic', process.env.ELASTIC || 'http://127.0.0.1:9200');

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/search', routes.index)
app.post('/search', routes.search(app));

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
