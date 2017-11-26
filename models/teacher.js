//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var TeacherSchema = new Schema({
    name: String,
    comments:  [{ body: String, date: Date, knowhow: String }],
    topics:  {
      CommunicationWithStudents : String,
      LectureAbility : String,
      Helpfulness : String,
      ˇUnderstandability : String }
});

var Teacher = mongoose.model('teacher', TeacherSchema);


module.exports = Teacher;
