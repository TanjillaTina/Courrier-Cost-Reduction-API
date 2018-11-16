var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');


/*

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

*/







router.get('/', async function(req, res, next) {
    // Get auth code
    const code = req.query.code;
  
    // If code is present, use it
    if (code) {
      let token;
  
      try {
        token = await authHelper.getTokenFromCode(code);
      } catch (error) {
        res.render('error', { title: 'Error', message: 'Error exchanging code for token', error: error });
      }
  
      res.render('users', { title: 'Home', debug: `Access token: ${token}` });
    } else {
      // Otherwise complain
      res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
    }
  });

  module.exports = router;