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

router.route('/:name/teachers/:tname/comments')
.get(function(req, res) {
	let comments = Comment.find({});
	comment.exec((err, comment) => {
		if(err) res.send(err);
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
