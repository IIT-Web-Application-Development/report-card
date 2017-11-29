//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
//grabs the comment schema
let Comment = require('./comment.js');

var TeacherSchema = new Schema({
    name: String,
    comments: [Comment.schema]    
});

var Teacher = mongoose.model('teacher', TeacherSchema);


module.exports = Teacher;
