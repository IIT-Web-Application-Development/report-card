//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
//grab teacher Schema
let Teacher = require('./teacher.js');

var schoolSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    teachers: Teacher.schema
});

var School = mongoose.model('Schools', schoolSchema);

module.exports = School;
