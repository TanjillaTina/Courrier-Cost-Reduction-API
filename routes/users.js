var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('users');
});
*/


router.get('/',usersController.usersPage);


module.exports = router;

