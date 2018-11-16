var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('users');
});
*/


router.get('/', function(req, res, next) {
  let parms = { title: 'Welcome To Profile'};

  const accessToken = req.cookies.graph_access_token;
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.user = userName;
    parms.debug = `User: ${userName}\nAccess Token: ${accessToken}`;
  } else {
    parms.signInUrl = authHelper.getAuthUrl();
    parms.debug = parms.signInUrl;
  }

  res.render('users', parms);
});


module.exports = router;

