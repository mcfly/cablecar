var elastic = require('../helper/elasticapi');

exports.index = function(req, res) {
  res.render('index', {title: 'My cool title.'});
};

exports.search = function(app) {
  var environment = [app.get('elastic'), app.get('basicAuthElasticUser'), app.get('basicAuthElasticPw')];

  return function(req, res) {

    function cb(results) {
      results.searchQuery = req.body.searchquery;
      res.render('results', {title: 'Result', results: results.hits});
    };

    function err() {
      res.render('results', {title: 'Connection error'});
    }

    elastic.doQuery(req.body.searchquery, environment, err, cb);
  }
};