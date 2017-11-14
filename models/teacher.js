//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
    name: { type: String, required: true },
    topics:  [{ "Communication with Students": String, "Lecture Ability": String, "Helpfulness": String, "Understandability": String }],
    comments:  [{ body: String, date: Date, knowhow: String }]
});

var Teacher = mongoose.model('School', teacherSchema);


module.exports = Teacher;
