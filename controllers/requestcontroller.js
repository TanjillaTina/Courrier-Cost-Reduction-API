
var express = require('express');
const passport=require('passport');
var Request=require('../models/request-model');
var User=require('../models/user-model');
//auth login

var authCheck=(req,res,next)=>{
    if(!req.user){
      //if user isn't logged in 
      req.flash('error_msg', 'You are not authorized to view that page');
      res.redirect('/');
 
    }
    else{
      //if logged in
     next();
    }
 };

var requestPage= (req, res)=> {

Request.find({}).distinct('shiperOrshippingTo.country1').then(function(results){
   let countries=results;
  //console.log(results);
  //console.log("Printing"+cons[0]);
  Request.find().then(function(result){
   let requests=result;

   //console.log("Printing Distinct Countries "+cons);
   //console.log("Printing Alll Doics"+alof);
   res.render('requestpage',{user:req.user,countries:countries,requests:requests});
  });


  
  
//return results;
});

  };

  
module.exports={
    authCheck,
    requestPage   
}