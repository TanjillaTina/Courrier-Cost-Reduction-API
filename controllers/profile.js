var express = require('express');
var RequestStatus="INBOUND";
var UserModel=require('../models/user-model');
var Request=require('../models/request-model');

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
       res.render('profile',{user:user,reqstat:RequestStatus});

};


  var outBound=(req,res)=>{
    var user=req.user;
    RequestStatus="OUTBOUND";      
    res.render('profile',{user:user,reqstat:RequestStatus});

    };

    var inBound=(req,res)=>{
      var user=req.user;
      RequestStatus="INBOUND";   
      res.render('profile',{user:user,reqstat:RequestStatus});
  
      };


      var addRequest=(req,res)=>{

        var user=req.user;
        var d = new Date();


            let request=new Request({
              userId:user._id,
              reqDay:d.getDay(),
              reqDate:d,
              buyer:req.body.buyer,
              orderNumber:req.body.orderNumber,
              style:req.body.style,
              estemWeight:req.body.estemWeight,
              article:req.body.article,
              item:req.body.item,
              reqtype:req.body.reqType

            });

            request.save().then((result)=>{
                console.log(result);

              result.shiperOrshippingTo.push({
                cpname1:req.body.comname1,
                cpnum1:req.body.cpnum1,
                comname1:req.body.comname1,
                comadd1:req.body.comadd1,
                city1:req.body.city1,
                country1:req.body.country1
              });
              result.conignee.push({
                cpname2:req.body.comname2,
                cpnum2:req.body.cpnum2,
                comname2:req.body.comname2,
                comadd2:req.body.comadd2,
                city2:req.body.city2,
                country2:req.body.country2
              });



              result.save();
              res.redirect('/profile');
            }).catch((err)=>{
              console.log(err);
              res.redirect('/profile');  
            });
    
        };


 module.exports = {
  authCheck,
  profilePage,
  inBound,
  outBound,
  addRequest

  
  };

