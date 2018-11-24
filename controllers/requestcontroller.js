
var express = require('express');
const passport=require('passport');

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
    res.render('requestpage',{user:req.user});
  };

  
module.exports={
    authCheck,
    requestPage   
}