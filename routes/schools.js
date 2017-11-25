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
	  newSchool.save((err,school) => {
	  	if(err) res.status(400).send(err)
	  	res.json({message: "School successfully added!", school})
	  });
});

module.exports = router;
