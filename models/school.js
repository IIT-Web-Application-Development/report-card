//Require Mongoose
var mongoose = require('mongoose');
//grab teacher Schema
let Teacher = require('./teacher.js');
//Define a schema
var Schema = mongoose.Schema;


var schoolSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    teachers: Teacher.schema
});

var School = mongoose.model('schools', schoolSchema);

module.exports = School;
