var express = require('express');
var router = express.Router();


//array to hold schools
var schools = [ ];
var scount = 0;
var tcount = 0;
var ccount = 0;

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
  scount++;
});

//functions to fine schools, teachers and comments
var getSchool = function(schoolname) {
  function findSchool(school) {
    return school.name === schoolname;
  }
  return schools.find(findSchool);
};
var getTeacher = function(schoolname,teachername) {
  var school = getSchool(schoolname);
  function findTeacher(teacher) {
    return teacher.name === teachername;
  }
  return school.teachers.find(findTeacher);
};
//added getCommnet; for some reason doesn't work with id works with other getStuff going to leave for now just incase we need later
var getComment = function(schoolname,teachername,commentid){
  var teacher = getTeacher(schoolname, teachername);
  //console.log(teacher);
  function findComment(comment) {
    return comment.id === commentid;
  }
  return teacher.comments.find(findComment);
};

// /schools/sname
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
  tcount++;
});

router.route('/:sname/teachers/:tname')
.get(function(req, res) {
  var schoolname = req.params.sname;
  var teachername = req.params.tname;
  res.status(200);
  res.json(getTeacher(schoolname,teachername));
});

//possible routes with getComment
router.route('/:sname/teachers/:tname/comments')
.get(function(req, res) {
  let schoolname = req.params.sname;
  let	teachername = req.params.tname;
  res.status(200);
  res.json(getTeacher(schoolname,teachername).comments);
})
.post(function(req, res){
  let schoolname = req.params.sname;
  let teachername = req.params.tname;
  var id = {"id" : ccount};
  var newComment = req.body;
  newComment.id = id.id;
  getTeacher(schoolname,teachername).comments.push(newComment);
  res.status(200);
  res.json({message: "Comment successfully added!", newComment});
  ccount++;
});

router.route('/:sname/teachers/:tname/comments/:cid')
.get(function(req, res){
  var schoolname = req.params.sname;
  var teachername = req.params.tname;
  var arrayplace = req.params.cid;
  res.status(200);
  res.json(getTeacher(schoolname,teachername).comments[arrayplace]);
})
.delete(function(req, res){
  var schoolname = req.params.sname;
  var teachername = req.params.tname;
  var arrayplace = req.params.cid;
  delete getTeacher(schoolname,teachername).comments[arrayplace];
  res.json({message: "Comment deleted successfully!"})
});

module.exports = router;
