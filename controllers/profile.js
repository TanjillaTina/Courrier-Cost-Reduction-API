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
       var d = new Date();
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

        // var user=req.user;
        // var id=user._id;
        // var buyer=req.body.buyer;
        // var orderNumber=req.body.orderNumber;
        // var style=req.body.style;
        // var estemWeight=req.body.estemWeight;
        // var article=req.body.article;
        // var item=req.body.item;

        // var reqtype=req.body.reqType;
        // console.log("Buyer "+buyer+
        //             " Ordet Number "+orderNumber+
        //             " style "+style+
        //             " estemWeight "+estemWeight+
        //             " article  "+article+
        //             " item "+item+
        //             "Req status "+reqtype);

        // var cpname1=req.body.comname1;
        // var cpnum1=req.body.cpnum1;
        // var comname1=req.body.comname1;
        // var comadd1=req.body.comadd1;
        // var city1=req.body.city1;
        // var country1=req.body.country1;
        // console.log("cpname1 "+cpname1+
        // " cpnum1 "+cpnum1+
        // " comname1 "+comname1+
        // " comadd1 "+comadd1+
        // " city1  "+city1+
        // " country1 "+country1);

        // var cpname2=req.body.comname2;
        // var cpnum2=req.body.cpnum2;
        // var comname2=req.body.comname2;
        // var comadd2=req.body.comadd2;
        // var city2=req.body.city2;
        // var country2=req.body.country2;
        // console.log("cpname2 "+cpname2+
        // " cpnum2 "+cpnum2+
        // " comname2 "+comname2+
        // " comadd2 "+comadd2+
        // " city2  "+city2+
        // " country2 "+country2);
       



            let request=new Request({
              userId:user._id,
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

