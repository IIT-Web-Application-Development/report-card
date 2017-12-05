let express = require('express')
let bodyParser = require('body-parser')
let app = express()

//array to hold schools
var schools = [ ];
var scount = 0;
var tcount = 0;
var ccount = 0;

app.use(express.static('views'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,  X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../views', 'index.html')))

//routes for /schools
app.route('/schools')
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
app.route('/schools/:sname')
.get(function(req, res) {
  var schoolname = req.params.sname;
  res.status(200);
  res.json(getSchool(schoolname));
});

//routes for teachers
app.route('/schools/:sname/teachers')
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

app.route('/schools/:sname/teachers/:tname')
.get(function(req, res) {
  var schoolname = req.params.sname;
  var teachername = req.params.tname;
  res.status(200);
  res.json(getTeacher(schoolname,teachername));
});

//possible routes with getComment
app.route('/schools/:sname/teachers/:tname/comments')
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

app.route('/schools/:sname/teachers/:tname/comments/:cid')
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

//set app to run on port 3000
app.listen(3000, function () {
  console.log('Reminder app listening on port 3000')
});
