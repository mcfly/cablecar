var sanitize = require('validator').sanitize;

module.exports = SearchQuery;

function SearchQuery(object) {
  var query,
      sanitizedQuery;

  this.isValid = false;

  if (!object) {
    return;
  }

  //sanitize
  sanitizedQuery = sanitize(object.query).xss();

  query = sanitizedQuery;

  // validation
  if (query && query.length > 1) {
    this.isValid = true;
  }
  this.value = query;
};