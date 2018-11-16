var authHelper = require('../helpers/auth');

var mainUthorizefun= async function(req, res, next) {
    // Get auth code
    const code = req.query.code;
  
    // If code is present, use it
    if (code) {
      let token;
  
      try {
        token = await authHelper.getTokenFromCode(code,res);
      } catch (error) {
        res.render('error', { title: 'Error', message: 'Error exchanging code for token', error: error });
      }
  
      //res.render('users', { title: 'Home', debug: `Access token: ${token}` });
      res.redirect('/users');
    } else {
      // Otherwise complain
      res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
    }
  };


  var signOut= function(req, res, next) {
    authHelper.clearCookies(res);
  
    // Redirect to home
    res.redirect('/');
  };

  module.exports={
      mainUthorizefun,
      signOut
  }