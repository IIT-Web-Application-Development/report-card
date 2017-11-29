//Require Mongoose
var mongoose = require('mongoose');
//grab teacher Schema
let Teacher = require('./teacher.js');
//Define a schema
var Schema = mongoose.Schema;


var SchoolSchema = new Schema({
    name: String,
    location: String,
    teachers: Teacher.schema,
    nickname: [ String ]
});

var School = mongoose.model('school', SchoolSchema);

module.exports = School;
