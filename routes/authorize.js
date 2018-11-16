var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

/* GET /authorize. */
router.get('/', function(req, res, next) {
  // Get auth code
  const code = req.query.code;

  // If code is present, use it
  if (code) {
    let parms = { title: 'Home'};

    parms.signInUrl = authHelper.getAuthUrl();
    parms.debug = parms.signInUrl;
    
    res.render('index', parms);
  } else {
    // Otherwise complain
    res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
  }
});

module.exports = router;