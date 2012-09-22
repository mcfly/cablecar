##Nodelastic

Nodelastic is a webinterface for Elasticsearch with installed attachments plugin.

It supports you with an own, independent searchengine for your indexed files, e.g. PDFs.

Elastcsearch with the attachments plugin should be capable of the following formats:

 * HyperText Markup Language
 * XML and derived formats
 * Microsoft Office document formats
 * OpenDocument Format
 * Portable Document Format
 * Electronic Publication Format
 * Rich Text Format
 * Compression and packaging formats
 * Text formats
 * Audio formats
 * Image formats
 * Video formats
 * Java class files and archives
 * The mbox format

For all supported document formats and details visit [Apache Tika](http://tika.apache.org/1.2/formats.html)


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