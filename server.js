var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/schools', , {
  useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  // we're connected!
});
