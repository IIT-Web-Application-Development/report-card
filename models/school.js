//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var teacher = require('./teacher.js');

var schoolSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    teachers: teacher
});


var School = mongoose.model('School', schoolSchema);


module.exports = School;
