const elasticsearch = require('elasticsearch')

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
  // auth: {
  //   username: 'elastic',
  //   password: 'changeme'
  // }
});

module.exports = client 


