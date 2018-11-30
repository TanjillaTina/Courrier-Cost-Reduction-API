
var express = require('express');
const passport=require('passport');
var Request=require('../models/request-model');
var User=require('../models/user-model');
var fs = require('fs');
var path = require('path');
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

Request.find({ shiperOrshippingTo:{ $size: 1 },
conignee: { $size: 1 } , 'requestQueue':false 
 }).distinct('shiperOrshippingTo.country1').then(function(results){
   let countries=results;
 console.log(results);
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
  





  var SetCourrierName=(req,res)=>{
    var getCountryName=req.body.countryNamee;
    var CourrierComName=req.body.CourrierComName;

    console.log("Printing Country Name "+getCountryName +"And Courrier Name "+CourrierComName);
   

var k=0;
    
Request.find({'requestQueue':false,'shiperOrshippingTo.country1':getCountryName}).then(function(results){
  
   
  
    //console.log("Printing Results ids  "+results[0]._id);
    for(k=0;k<results.length;k++){
      Request.updateOne({_id:results[k]._id},{courriercomname:CourrierComName}).then(function(resultss){
       console.log("Updating "+k+resultss);
     });
         
      //console.log("Printing Results ids  "+results[k]._id);
    }


    res.redirect('/requests');
    
  
   //console.log("Printing Results "+reqs);
   //res.redirect('/requests');
   });
   
   // res.redirect('/requests');
   
     };



     var DownloadExcell=(req,res)=>{
var datai=" InBound Requests "+'\n';
datai=datai+"  "+'\t'+"  "+'\t'+" Shipping From "+'\t'+"  "+'\t'+"  "+'\t'+"  "+'\t'+
               "  "+'\t'+"  "+'\t'+"  "+'\t'
           +"  "+'\t'+"  "+'\t'+" Cosignee "+'\t'+"  "+'\t'+"  "+'\t'+"  "+'\n';

datai=datai+" Contact Person "+'\t'+" Contact Person Number "+'\t'+" Company Name "+'\t'+" Company Address "+'\t'+" City "+'\t'+" Country "+'\t'+
            "  "+'\t'+"  "+'\t'+" "+'\t'+
        " Contact Person "+'\t'+" Contact Person Number "+'\t'+" Company Name "+'\t'+" Company Address "+'\t'+" City "+'\t'+" Country "+'\n';


var datao="   OutBound Requests   "+'\n';
datao=datao+"  "+'\t'+"  "+'\t'+" Shipper "+'\t'+"  "+'\t'+"  "+'\t'+"  "+'\t'+
            "  "+'\t'+"  "+'\t'+"  "+'\t'
            +"  "+'\t'+"  "+'\t'+" Cosignee "+'\t'+"  "+'\t'+"  "+'\t'+"  "+'\n';
        
datao=datao+" Contact Person "+'\t'+" Contact Person Number "+'\t'+" Company Name "+'\t'+" Company Address "+'\t'+" City "+'\t'+" Country "+'\t'+
        "  "+'\t'+"  "+'\t'+" "+'\t'+
        " Contact Person "+'\t'+" Contact Person Number "+'\t'+" Company Name "+'\t'+" Company Address "+'\t'+" City "+'\t'+" Country "+'\n';
      //results[k].reqDate+

      /*data=data+resultss[k].reqDate+'\t'
                 +resultss[k].comname+'\t'
                 +resultss[k].usermail+'\t';

      */
      var ConnName=req.body.ConnName;
      console.log("Printing Country Name from excell "+ConnName);
      //res.redirect('/requests');
    
      Request.find({'requestQueue':false,'shiperOrshippingTo.country1':ConnName}).then(function(results){
  
 //  console.log("Printing Found Matched Results "+results);
  //console.log("Result Length "+results.length);


        for(k=0;k<results.length;k++){

      
          if(results[k].reqtype=='INBOUND'){
      
            datai=datai+results[k].shiperOrshippingTo[0].cpname1+'\t'+results[k].shiperOrshippingTo[0].cpnum1+'\t'+results[k].shiperOrshippingTo[0].comname1+'\t'+results[k].shiperOrshippingTo[0].comadd1+'\t'+results[k].shiperOrshippingTo[0].city1+'\t'+results[k].shiperOrshippingTo[0].country1+'\t'+
              "  "+'\t'+"  "+'\t'+" "+'\t'+
              results[k].conignee[0].cpname2+'\t'+results[k].conignee[0].cpnum2+'\t'+results[k].conignee[0].comname2+'\t'+results[k].conignee[0].comadd2+'\t'+results[k].conignee[0].city2+'\t'+results[k].conignee[0].country2+'\n';
          }
  
          if(results[k].reqtype=='OUTBOUND'){
      
            datao=datao+results[k].shiperOrshippingTo[0].cpname1+'\t'+results[k].shiperOrshippingTo[0].cpnum1+'\t'+results[k].shiperOrshippingTo[0].comname1+'\t'+results[k].shiperOrshippingTo[0].comadd1+'\t'+results[k].shiperOrshippingTo[0].city1+'\t'+results[k].shiperOrshippingTo[0].country1+'\t'+
              "  "+'\t'+"  "+'\t'+" "+'\t'+
              results[k].conignee[0].cpname2+'\t'+results[k].conignee[0].cpnum2+'\t'+results[k].conignee[0].comname2+'\t'+results[k].conignee[0].comadd2+'\t'+results[k].conignee[0].city2+'\t'+results[k].conignee[0].country2+'\n';
          }
  
         // console.log("Printing Result No "+k+" data is "+results[k]);
         //console.log("Printing Dtai "+k+" here "+datai);
        // console.log("Printing Dtao "+k+" here "+datao);
  
      }

  
      
    for(l=0;l<results.length;l++){

      Request.updateOne({_id:results[l]._id},{requestQueue:true}).then(function(resultss){
      

       console.log("Updating "+l+resultss);
     });
      
    }




   


 

    ////preparing the excell sheet
    var data=datai+datao;
    //console.log("Final InBound Data "+datai);
    //console.log("Final OutBound Data "+datao);
 var filename=ConnName+'.xls';
fs.appendFile(filename, data, (err) => {
    if (err) throw err;
    console.log('File created');
 });
  //////////
    
    
        res.redirect('/requests');
        
      
       //console.log("Printing Results "+reqs);
       //res.redirect('/requests');
       });




     };
module.exports={
    authCheck,
    requestPage,
    SendToOnProcess,
    SetCourrierName,
    DownloadExcell
}