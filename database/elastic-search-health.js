const client = require('./elastic-search');

client.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});
