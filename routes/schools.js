var express = require('express');
var router = express.Router();


//array to hold schools
var schools = [ ];
var scount = 0;
var tcount = 0;
//routes for /schools
router.route('/')
.get(function(req, res) {
 res.json(schools);
})
.post(function(req, res) {
	var id = {"id" : scount};
  var newSchool = req.body;
  newSchool.id = id.id;
  newSchool.teachers = [ ];
  schools.push(newSchool);
  res.status(200);
  res.json({message: "School successfully added!", newSchool})
	scount + 1;
});

var getSchool = function(schoolname) {
	function findSchool(school) {
    return school.name === schoolname;
  }
	return schools.find(findSchool);
};

var getTeacher = function(teachername) {
	function findTeacher(teacher) {
    return school.school.name === teachername;
  }
	return schools.find(findTeacher);
};

router.route('/:sname')
	.get(function(req, res) {
	var schoolname = req.params.sname;
	res.status(200);
	res.json(getSchool(schoolname));
});

//routes for teachers
router.route('/:sname/teachers')

.get(function(req, res) {
let schoolname = req.params.sname;
	res.status(200);
	res.json(getSchool(schoolname).teachers);
})

.post(function(req, res) {
	let schoolname = req.params.sname;
	var id = {"id" : tcount};
  var newTeacher = req.body;
  newTeacher.id = id.id;
  newTeacher.comments = [ ];
  getSchool(schoolname).teachers.push(newTeacher);
  res.status(200);
	res.json({message: "Teacher successfully added!", newTeacher})
	tcount + 1;
})

router.route('/:name/teachers/:tname')
.get(function(req, res) {
	var schoolName = req.params.name;
  var teacherName = req.params.tname;
	// let teacher = School.findOne({ schoolName: req.params.tname});
	// teacher.exec((err, teacher) => {
	// 	if(err) res.status(404).send(err)
	// 	res.json(teacher)
	// });
  res.status(200);
  res.json(getTeacher(teacherName));
});

//routes for comments
router.route('/:name/teachers/:tname/comments')
.get(function(req, res) {
	//var avgGrade;
	//var avgLetter;
	var schoolName = req.params.name.teachers.name;
	//var teacherName = req.params.tname;
	let comments = School.findOne({ schoolName: req.params.tname}, {comments: 1});
	comments.exec((err, comments) => {
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

		res.json(comments);
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
	  let comment = Comments.findOne({_id: req.params.id});
	  comment.exec((err, comment) => {
	  	if(err) res.status(404).send(err)

	  	res.json(comment)
	  });
	})
	.delete(function(req, res) {
	  Comments.remove({_id: req.params.id}, function (err) {
	  	if(err) res.status(404).send(err);

	  	res.json({message: "Comment successfully deleted!"})
	  });
	});

module.exports = router;
