var express = require('express');
var router = express.Router();
let School = require('../models/school');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/')
.get(function(req, res) {
	let schools = School.find({});
	schools.exec((err, schools) => {
		if(err) res.send(err);
		res.json(schools);
	});
})
.post(function(req, res) {
	var newSchool = new School(req.body);
	newSchool.save((err, school) => {
		if(err) res.status(400).send(err)
		res.json({message: "School successfully added!", school})
	});
});

router.route('/:sname/teacher/:tname')
.post(function(req, res) {
	var newTeacher = new Teacher(req.body);
	newTeacher.save((err, teacher) => {
		if(err) res.status(400).send(err)
		res.json({message: "Teacher successfully added!", teacher})
	});
});

.get(function(req, res) {
	let teacher = Teacher.findOne({tname: req.params.name});
	schools.exec((err, game) => {
		if(err) res.status(404).send(err)
		res.json(game)
	});
});

module.exports = router;
