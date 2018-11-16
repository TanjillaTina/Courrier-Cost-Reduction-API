var express = require('express');

var authHelper = require('../helpers/auth');




var usersPage= async function(req, res, next) {
    let parms = { title: 'Welcome To Profile'};
  
   // const accessToken = req.cookies.graph_access_token;
    const accessToken = await authHelper.getAccessToken(req.cookies, res);
    // const accessToken = authHelper.getAccessToken(req.cookies, res);
    const userName = req.cookies.graph_user_name;
  
    if (accessToken && userName) {
      parms.user = userName;
      parms.debug = `User: ${userName}\nAccess Token: ${accessToken}`;
    } else {
      parms.signInUrl = authHelper.getAuthUrl();
      parms.debug = parms.signInUrl;
    }
  
    res.render('users', parms);
  };




  
  module.exports={
      usersPage
  }