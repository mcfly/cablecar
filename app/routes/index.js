var elastic = require('../helper/elasticapi'),
    models = require('../models/');

exports.index = function(req, res) {
  res.render('index', {title: 'My cool title.'});
};

exports.search = function(environment) {
  return function(req, res) {
    var searchQuery;

    searchQuery = new models.SearchQuery({query: req.param('searchquery')});

    if (!searchQuery.isValid) {
      req.flash('Please enter a valid search query.');
      res.redirect('/');
    }

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