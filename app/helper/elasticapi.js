var request = require('request');

var createQuery = exports.createQuery = function(query) {
  return {
    "fields": ["title", "filename", "download"],
    "query": {
      "query_string": {
        "query": query
      }
    },
    "highlight": {
    "pre_tags" : [""],
    "post_tags" : [""],
      "fields": {
        "file": {}
      }
    }
  };
};

var createUrl = exports.createUrl = function(environment) {
  var url = environment[0] + '/_search',
      regex = /.*?:\/\//g,
      protocol = url.match(regex);

  if (environment[1] && environment[2]) {
    url = url.replace(regex, '');
    url = protocol + environment[1] + ':' + environment[2] + '@' + url;
  }

  return url;
};

exports.doQuery = function(query, environment, errorCb, cb) {
  var url = createUrl(environment),
      json = createQuery(query);

  request.post(url, {json: json}, function (err, res, body) {
    if (err) {
      errorCb(err);
      return;
    }

    cb && cb(body);
  });
};