//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    name: String,
    comments: String,
    topics:  {
      CommunicationWithStudents : String,
      LectureAbility : String,
      Helpfulness : String,
      Understandability : String },
    date: Date,
    knowhow: String
});

var comment = mongoose.model('comment', CommentSchema);


module.exports = comment;	