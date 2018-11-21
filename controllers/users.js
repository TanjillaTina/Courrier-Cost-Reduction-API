var express = require('express');
var authHelper = require('../helpers/auth');
var myAuxFuns = require('../extraFunctions/myAuxFuns');
const User=require('../models/user-model');


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
     // parms.userId = userId;
      var userDetailArray=myAuxFuns.getUserDetail(userName);
     //console.log("Username is now",userDetailArray[0]);
 /////////check if user exixsts in db, then find it's requests and show, otherwise add the user to db list

       //check if user already exists in our db
       User.findOne({username:userDetailArray[0],comname:userDetailArray[1],dept:userDetailArray[3]}).then((currentUser)=>{
        if(currentUser){
           //already hv d user
           //console.log('user is '+currentUser);
           //serializing the user
           done(null,currentUser);
        }
        else{
            //if nt, create new user in db
             
             
              new User({
               
                username:userDetailArray[0],
                comname:userDetailArray[1],
                dept:userDetailArray[3],
                designation:userDetailArray[2]
                
              }).save().then((newUser=>{
                  console.log('User Created '+newUser);
                  //res.render('/');

                  //again serializing

                  done(null,newUser);
              }));
              

          }
    });



 /////////////////////////////////////////////////////////////////////////////////////////////

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



 var addReq=async function(req, res, next){
  
 };



  module.exports={
      usersPage,
      authCheck,
      addReq
  }