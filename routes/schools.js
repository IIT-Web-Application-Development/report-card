var express = require('express');
var router = express.Router();
let School = require('../models/school');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//routes for /schools
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

router.route('/:name')
	.get(function(req, res) {
	  let school = School.findOne({name: req.params.name});
		//console.log(school);
		school.exec((err, school) => {
	  	if(err) res.status(404).send(err)
	  	res.json(school)
	});
});

//routes for teachers
router.route('/:sname/teachers')
.get(function(req, res) {
	let teachers = School.find({name: req.params.sname}).select('teachers');
	teachers.exec((err, teachers) => {
		if(err) res.send(err);
		res.json(teachers);
	});
})

.post(function(req, res) {
	var newTeacher = new Teacher(req.body);
	newTeacher.save((err, teacher) => {
		if(err) res.status(400).send(err)
		res.json({message: "Teacher successfully added!", teacher})
	});
})

router.route('/:sname/teachers/:tname')
.get(function(req, res) {
	let teacher = School.findOne({'teachers[0].name': req.params.name});
	teacher.exec((err, teacher) => {
		if(err) res.status(404).send(err)
		res.json(teacher)
	});
});

//routes for comments
router.route('/:name/teachers/:tname/comments')
.get(function(req, res) {
	//var avgGrade;
	//var avgLetter;
	let comment = Comment.find({});
	comment.exec((err, comment) => {
		if(err) res.send(err);

		/*(res.body.CommunicationWithStudents){
			case "A":
				avgGrade = avgGrade +4;
				break;
			case "a":
				avgGrade = avgGrade +4;
				break;
			case "B":
				avgGrade = avgGrade +3;
				break;
			case "b":
				avgGrade = avgGrade +3;
				break;
			case "C":
				avgGrade = avgGrade +2;
				break;
			case "c":
				avgGrade = avgGrade +2;
				break;
			case "D":
				avgGrade = avgGrade +1;
				break;
			case "d":
				avgGrade = avgGrade +1;
				break;
			case "F":
				avgGrade = avgGrade +0;
				break;
			case "f":
				avgGrade = avgGrade +0;
				break;
			default:
				break;
		}
		switch(res.body.LectureAbility){
			case "A":
				avgGrade = avgGrade +4;
				break;
			case "a":
				avgGrade = avgGrade +4;
				break;
			case "B":
				avgGrade = avgGrade +3;
				break;
			case "b":
				avgGrade = avgGrade +3;
				break;
			case "C":
				avgGrade = avgGrade +2;
				break;
			case "c":
				avgGrade = avgGrade +2;
				break;
			case "D":
				avgGrade = avgGrade +1;
				break;
			case "d":
				avgGrade = avgGrade +1;
				break;
			case "F":
				avgGrade = avgGrade +0;
				break;
			case "f":
				avgGrade = avgGrade +0;
				break;
			default:
				break;
		}
		switch(res.body.Helpfulness){
			case "A":
				avgGrade = avgGrade +4;
				break;
			case "a":
				avgGrade = avgGrade +4;
				break;
			case "B":
				avgGrade = avgGrade +3;
				break;
			case "b":
				avgGrade = avgGrade +3;
				break;
			case "C":
				avgGrade = avgGrade +2;
				break;
			case "c":
				avgGrade = avgGrade +2;
				break;
			case "D":
				avgGrade = avgGrade +1;
				break;
			case "d":
				avgGrade = avgGrade +1;
				break;
			case "F":
				avgGrade = avgGrade +0;
				break;
			case "f":
				avgGrade = avgGrade +0;
				break;
			default:
				break;
		}
		switch(res.body.Understandability){
			case "A":
				avgGrade = avgGrade +4;
				break;
			case "a":
				avgGrade = avgGrade +4;
				break;
			case "B":
				avgGrade = avgGrade +3;
				break;
			case "b":
				avgGrade = avgGrade +3;
				break;
			case "C":
				avgGrade = avgGrade +2;
				break;
			case "c":
				avgGrade = avgGrade +2;
				break;
			case "D":
				avgGrade = avgGrade +1;
				break;
			case "d":
				avgGrade = avgGrade +1;
				break;
			case "F":
				avgGrade = avgGrade +0;
				break;
			case "f":
				avgGrade = avgGrade +0;
				break;
			default:
				break;
		}

		avgGrade = (avgGrade/4)
		if(avgGrade >= 3.5 && avgGrade <= 4.0){
			avgLetter = "A";
		}
		else if(avgGrade < 3.5 && avgGrade >= 3.0){
			avgLetter = "B";
		}
		else if(avgGrade < 3.0 && avgGrade >= 2.5){
			avgLetter = "C";
		}
		else if(avgGrade < 2.5 && avgGrade >= 2.0){
			avgLetter = "D";
		}
		else {
			avgLetter = "F";
		}
			do not know how to display average letter grade after in post

		*/

		res.json(comment);
	});
})
.post(function(req, res) {
	var newComment = new Comment(req.body);
	newComment.save((err, comment) => {
		if(err) res.status(400).send(err)
		res.json({message: "Comment successfully added!", comment})
	});
});

router.route('/:name/teachers/:tname/comments/:id')
	.get(function(req, res) {
	  let comment = Comment.findOne({_id: req.params.id});
	  Comment.exec((err, comment) => {
	  	if(err) res.status(404).send(err)

	  	res.json(comment)
	  });
	})
	.put(function(req, res) {
	  var comment = Coment.update({_id: req.params.id}, req.body);
	  comment.exec((err, comment) => {
	  	if(err) res.status(404).send(err)

	  	res.json({message: "Comment successfully updated!", comment: req.body})
	  });
	})
	.delete(function(req, res) {
	  Comment.remove({_id: req.params.id}, function (err) {
	  	if(err) res.status(404).send(err);

	  	res.json({message: "Comment successfully deleted!"})
	  });
	});

module.exports = router;
