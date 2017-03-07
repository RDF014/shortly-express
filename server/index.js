var app = require('./app.js');
var db = require('./db');
var port = 4586;

app.listen(port, function() {
  console.log('Shortly is listening on ' + port);
});
