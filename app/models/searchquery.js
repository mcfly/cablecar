var sanitize = require('validator').sanitize;

module.exports = SearchQuery;

function SearchQuery(object) {
  var query;

  this.isValid = false;

  if (!object) {
    return;
  }

  //sanitize
  query = sanitize(object.query).xss();

  // validation
  if (query && query.length > 1) {
    this.isValid = true;
  }
  this.value = query;
};