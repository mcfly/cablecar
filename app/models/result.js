var sanitize = require('validator').sanitize;

module.exports = Result;

/*
 * Takes the result from elasticsearch
 * and the initial searchquery model,
 * sanitizes the data and stores it
 */

function Result(object) {
  var results,
      result,
      i;

  if (object.results) {
    results = object.results;
  }

  if (!results || !results.hits) {
    results = {};
    results.hits = {};
  }

  if (object.query.isValid) {
    results.hits.searchQuery = object.query.value;
  }

  for (result in results.hits) {
    if (Array.isArray(results.hits[result])) {
      for (i = 0; i < results.hits[result].length; i++) {
        results.hits[result][i].fields.filename = sanitize(results.hits[result][i].fields.filename).xss();
        results.hits[result][i].highlight.file[0] = sanitize(results.hits[result][i].highlight.file[0]).xss();
      }
    }
  }

  this.values = results;
};