var elastic = require('../helper/elasticapi');

exports.index = function(req, res) {
  res.render('index', {title: 'My cool title.'});
};

exports.search = function(app) {

  return function(req, res) {

    function callback(results) {
      results.searchQuery = req.body.searchquery;
      res.render('results', {title: 'Result', results: results.hits});
    };

    elastic.doQuery(req.body.searchquery, app.get('elastic'), callback);
  }
};