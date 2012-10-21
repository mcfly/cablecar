var elastic = require('../helper/elasticapi'),
    models = require('../app/models/'),
    sanitize = require('validator').sanitize;

exports.index = function(req, res) {
  res.render('index', {title: 'My cool title.'});
};

exports.search = function(environment) {
  return function(req, res) {
    var searchQuery;

    searchQuery = new models.SearchQuery({query: req.param('searchquery')});

    function cb(results) {
      var result,
          i;

      if (!results || !results.hits) {
        results = {};
        results.hits = {};
      }
      results.hits.searchQuery = searchQuery.value;

      for (result in results.hits) {
        if (Array.isArray(results.hits[result])) {
          for (i = 0; i < results.hits[result].length; i++) {
            results.hits[result][i].fields.filename = sanitize(results.hits[result][i].fields.filename).xss();
            results.hits[result][i].highlight.file[0] = sanitize(results.hits[result][i].highlight.file[0]).xss();
          }
        }
      }
      res.render('results', {title: 'Result', results: results.hits});
    };

    function err() {
      res.render('error', {title: 'Connection error'});
    }
    elastic.doQuery(searchQuery.value, environment, err, cb);
  }
};