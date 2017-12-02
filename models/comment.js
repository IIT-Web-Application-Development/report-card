//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    body: String,
    date: Date,
    knowhow: String
});

var comment = mongoose.model('comment', CommentSchema);


module.exports = comment;
