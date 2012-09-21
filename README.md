##Nodelastic

Nodelastic is a webinterface for Elasticsearch with installed attachments plugin.

It supports you with an own, independent searchengine for your indexed files, e.g. PDFs.

##Start with own environment variables

Supported are:

```
NODE_ENV            set to `production` for production!
PORT                Port of the App
ELASTIC             Url of the Elasticsearc Service
ELASTICBASICUSER    Basic Auth Username for Elasticsearch
ELASTICBASICPW      Basic Auth Password for Elasticsearch
```

Example Startup:

```
NODE_ENV="production" ELASTIC="YOUR_ELASTIC_SEARCH_IP_AND_PORT" \
PORT="80" node app.js
```