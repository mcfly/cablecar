var elastic = require('../helper/elasticapi'),
    models = require('../models/');

module.exports = function(app) {
  return function(req, res) {
    var environment = [app.get('elastic'), app.get('basicAuthElasticUser'), app.get('basicAuthElasticPw')],
        searchQuery;

    searchQuery = new models.SearchQuery({query: req.param('searchquery')});

    if (!searchQuery.isValid) {
      req.flash('Please enter a valid search query.');
      res.redirect('/');
    }

    function cb(results) {
      var results = new models.Result({
        results: results,
        query: searchQuery
      }).values;

      res.render('results', {results: results.hits});
    }

    function err() {
      res.render('error', {error: 'Connection error'});
    }
    elastic.doQuery(searchQuery.value, environment, err, cb);
  }
};