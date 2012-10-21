var elastic = require('../helper/elasticapi'),
    models = require('../app/models/');

exports.index = function(req, res) {
  res.render('index', {title: 'My cool title.'});
};

exports.search = function(environment) {
  return function(req, res) {
    var searchQuery;

    searchQuery = new models.SearchQuery({query: req.param('searchquery')});

    function cb(results) {
      var results = new models.Result({
        results: results,
        query: searchQuery.value
      }).values;

      res.render('results', {title: 'Result', results: results.hits});
    };

    function err() {
      res.render('error', {title: 'Connection error'});
    }
    elastic.doQuery(searchQuery.value, environment, err, cb);
  }
};