var express = require('express');

var authHelper = require('../helpers/auth');


var myAuxFuns = require('../extraFunctions/myAuxFuns');

var usersPage= async function(req, res, next) {
    let parms = { title: 'Welcome To Profile'};
  
   // const accessToken = req.cookies.graph_access_token;
    const accessToken = await authHelper.getAccessToken(req.cookies, res);
    // const accessToken = authHelper.getAccessToken(req.cookies, res);
    const userName = req.cookies.graph_user_name;
     // RegFuns.getUsername(userName);
     
//console.log('Printing The tupe os ',typeof(userName));
    if (accessToken && userName) {

      parms.user = userName;
      var userDetailArray=myAuxFuns.getUserDetail(userName);
     console.log("Username is now",userDetailArray[0]);


      parms.debug = `User: ${userName}\nAccess Token: ${accessToken}`;
      res.render('users', parms);
    } else {
      parms.signInUrl = authHelper.getAuthUrl();
      parms.debug = parms.signInUrl;
      res.render('index',parms);
    }
  
   
  };

  var authCheck=async (req,res,next)=>{
    const mykey = await authHelper.getAccessToken(req.cookies, res);
    let parms = { title: 'Welcome To Profile'};
    if(!mykey){
        parms.signInUrl = authHelper.getAuthUrl();
        parms.debug = parms.signInUrl;
        res.render('index',parms);
      //if user isn't logged in 
      res.redirect('/');
 
    }
    else{
      //if logged in
     next();
    }
 };





  module.exports={
      usersPage,
      authCheck
  }