var express = require('express');
var router = express.Router();
<<<<<<< HEAD
=======
let School = require('../models/school');
>>>>>>> upstream/master

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
