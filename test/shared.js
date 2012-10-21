/*
 * Fixtures and test helper
 */

var nock = require('nock'),
    elastic = require('../app/helper/elasticapi');

var ELASTIC_URL = exports.ELASTIC_URL = 'http://127.0.0.1:9200';

var RESPONSE = exports.ELASTIC_RESPONSE = {
  "took" : 62,
  "timed_out" : false,
  "_shards" : {
    "total" : 11,
    "successful" : 11,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 0.019027881,
    "hits" : [ {
      "_index" : "test",
      "_type" : "attachment",
      "_id" : "Mc-PsjDyTn-8mWD5tN7izg",
      "_score" : 0.019027881,
      "fields" : {
        "filename" : "Redis manual.pdf",
        "download" : "http://myserver.com/download/pdf/"
      },
      "highlight" : {
        "file" : [ "Environment for Data Analysis and Graphics\n\nVersion 2.15.1 (2012-06-22)\n\nW. N. Venables, D. M. Smith\nand the R", "6\n1.11 Data permanency and removing objects . . . . . . . . . . . . . . . . . . . . . . . 6\n\n2 Simple", "subsets of a data set . . . . 11\n2.8 Other types of objects . . . . . . . . . . . . . . . . . . . . . . . .", "Lists and data frames . . . . . . . . . . . . . . . . . . . . . . . . . 28\n6.1 Lists . . . . . . . . . .", "29\n6.3 Data frames . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . " ]
      }
    } ]
  }
};

exports.ELASTIC_RESPONSE_NO_DOWNLOAD = {
  "took" : 62,
  "timed_out" : false,
  "_shards" : {
    "total" : 11,
    "successful" : 11,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 0.019027881,
    "hits" : [ {
      "_index" : "test",
      "_type" : "attachment",
      "_id" : "Mc-PsjDyTn-8mWD5tN7izg",
      "_score" : 0.019027881,
      "fields" : {
        "filename" : "Redis manual.pdf"
      },
      "highlight" : {
        "file" : [ "Environment for Data Analysis and Graphics\n\nVersion 2.15.1 (2012-06-22)\n\nW. N. Venables, D. M. Smith\nand the R", "6\n1.11 Data permanency and removing objects . . . . . . . . . . . . . . . . . . . . . . . 6\n\n2 Simple", "subsets of a data set . . . . 11\n2.8 Other types of objects . . . . . . . . . . . . . . . . . . . . . . . .", "Lists and data frames . . . . . . . . . . . . . . . . . . . . . . . . . 28\n6.1 Lists . . . . . . . . . .", "29\n6.3 Data frames . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . " ]
      }
    } ]
  }
};


exports.ELASTIC_RESPONSE_XSS = {
  "took" : 62,
  "timed_out" : false,
  "_shards" : {
    "total" : 11,
    "successful" : 11,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 0.019027881,
    "hits" : [ {
      "_index" : "test",
      "_type" : "attachment",
      "_id" : "Mc-PsjDyTn-8mWD5tN7izg",
      "_score" : 0.019027881,
      "fields" : {
        "filename" : "<script>alert(0);</script>"
      },
      "highlight" : {
        "file" : [ "<script>blah(0);</script>6\n1.11 Data permanency and removing objects . . . . . . . . . . . . . . . . . . . . . . . 6\n\n2 Simple", "subsets of a data set . . . . 11\n2.8 Other types of objects . . . . . . . . . . . . . . . . . . . . . . . .", "Lists and data frames . . . . . . . . . . . . . . . . . . . . . . . . . 28\n6.1 Lists . . . . . . . . . .", "29\n6.3 Data frames . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . " ]
      }
    } ]
  }
};


var EMPTY_RESPONSE = exports.EMPTY_ELASTIC_RESPONSE = {
  "took" : 6,
  "timed_out" : false,
  "_shards" : {
    "total" : 11,
    "successful" : 11,
    "failed" : 0
  },
  "hits" : {
    "total" : 0,
    "max_score" : null,
    "hits" : [ ]
  }};

exports.nock = function(query, res) {
  if (!query) {
    query = 'Data';
  }
  if (!res) {
    res = RESPONSE;
  }
  nock(ELASTIC_URL)
    .post('/_search', elastic.createQuery(query))
    .reply(200, res);
};