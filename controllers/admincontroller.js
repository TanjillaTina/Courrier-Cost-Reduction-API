var express = require('express');
// var readline = require('readline');
// var fs = require('fs');
//const Country=require('../models/countries');


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

var adminPage= (req, res)=> {

    res.render('admin', { user: req.user});
  };
  
module.exports = {
    adminPage,
    authCheck
 
    };