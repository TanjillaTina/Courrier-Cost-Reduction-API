
var UserModel=require('../models/user-model');
var express = require('express');
var RequestStatus="INBOUND";

//this fun is to check if,someone is logged-in in the page, if yes, redirect to profile page, else redirect to login page
//middleware function, that's gonna set in before profile page is redirected
var authCheck=(req,res,next)=>{
    if(!req.user){
      //if user isn't logged in 
      res.redirect('/auth/login');
 
    }
    else{
      //if logged in
     next();
    }
 };

 var profilePage= (req, res)=> {
  
var user=req.user;

var d = new Date();
//var id=user._id;
//   UserModel.findById(id).then(function(results){
//             // console.log("Showing Todos \n ",results);
// /*
//             let todos=results.tasks.filter((todo)=>{
//                 return !todo.done;
              
//             });
//            // console.log('Printing All todos  '+todos);
            
//             let Donetodos=results.tasks.filter((todo)=>{
//             return todo.done;
//             });
//       */      
          res.render('profile',{user:user,reqstat:RequestStatus,date:d});
//   }
// );
 

 ///res.render('profile',{user:user});
};


  var outBound=(req,res)=>{
    var user=req.user;
    RequestStatus="OUTBOUND";
    //var id=user._id;
    //   UserModel.findById(id).then(function(results){
    //             // console.log("Showing Todos \n ",results);
    // /*
    //             let todos=results.tasks.filter((todo)=>{
    //                 return !todo.done;
                  
    //             });
    //            // console.log('Printing All todos  '+todos);
                
    //             let Donetodos=results.tasks.filter((todo)=>{
    //             return todo.done;
    //             });
    //       */      
              res.render('profile',{user:user,reqstat:RequestStatus});

    };

    var inBound=(req,res)=>{
      var user=req.user;
      RequestStatus="INBOUND";
      //var id=user._id;
      //   UserModel.findById(id).then(function(results){
      //             // console.log("Showing Todos \n ",results);
      // /*
      //             let todos=results.tasks.filter((todo)=>{
      //                 return !todo.done;
                    
      //             });
      //            // console.log('Printing All todos  '+todos);
                  
      //             let Donetodos=results.tasks.filter((todo)=>{
      //             return todo.done;
      //             });
      //       */      
                res.render('profile',{user:user,reqstat:RequestStatus});
  
      };



 module.exports = {
  authCheck,
  profilePage,
  inBound,
  outBound

  
  };

