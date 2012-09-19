##Nodelastic

Nodelastic is a webinterface for Elasticsearch with installed attachments plugin.

It supports you with an own, independent searchengine for your indexed files, e.g. PDFs.

##Start with own environment variables

Supported are:

```
PORT        Port of the App
ELASTIC     Url of the Elasticsearc Service
```

Example call:

```
ELASTIC="YOUR_ELASTIC_SEARCH_IP_AND_PORT" PORT="80" node app.js
```