var request = require('request');

var createQuery = exports.createQuery = function (query) {
  return {
    "fields": ["title", "filename"],
    "query": {
      "query_string": {
        "query": query
      }
    },
    "highlight": {
      "fields": {
        "file": {}
      }
    }
  };
};

exports.doQuery = function(query, elascticServer, cb) {
  var url = elascticServer + '/_search',
      json = createQuery(query);

  request.post(url, {json: json}, function (err, res, body) {
    cb && cb(body);
  });
};