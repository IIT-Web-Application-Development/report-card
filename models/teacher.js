//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
    name: { type: String, required: true },
    comments:  [{ body: String, date: Date, knowhow: String }],
    topics:  { CommunicationWithStudents : String, LectureAbility : String, Helpfulness : String, Understandability : String }
});

var Teacher = mongoose.model('teachers', teacherSchema);


module.exports = Teacher;
