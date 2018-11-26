
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
   //let reqs=!result.requestQueue;
  let reqs=result.filter((result)=>{
    // console.log("Type is "+todos);
       return !result.requestQueue;
     
   });
   //console.log("Printing Distinct Countries "+cons);
   //console.log("Printing from here "+reqs);


   res.render('requestpage',{user:req.user,countries:countries,requests:reqs});
  });


  
  
//return results;
});

  };


  var SendToOnProcess=(req,res)=>{
 var requesstId=req.body.reqqId;
 console.log("Printing Req Id "+requesstId);


 //res.redirect('/requests');



 Request.findById(requesstId, function(err, usera) {
    usera.set(usera.requestQueue=!usera.requestQueue);
  

  // Using a promise rather than a callback
  usera.save().then(function(savedPost) {
    res.redirect('/requests');
  }).catch(function(err) {
    res.status(500).send(err);
  });
});
  };
  
module.exports={
    authCheck,
    requestPage,
    SendToOnProcess
}