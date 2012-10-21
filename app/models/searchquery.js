module.exports = function(object) {
  var query;

  this.isValid = false;

  if (!object) {
    return;
  }

  query = object.query;

  // validation
  if (query && query.length > 1) {
    this.isValid = true;
  }
  this.value = query;
};