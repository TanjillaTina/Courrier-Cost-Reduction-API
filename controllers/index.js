var express = require('express');
//var readline = require('readline');
//var fs = require('fs');
//const Country=require('../models/countries');


var indexPage= (req, res)=> {
/*
var myInterface = readline.createInterface({
  input: fs.createReadStream('./confiles/countries.txt')
});

var lineno = 0;
myInterface.on('line', function (line) {
  lineno++;
  console.log('Line number ' + lineno + ': ' + line);
  //countries.push(line);
  new Country({
                 
    countryname:String(line)

}).save().then((newCountry=>{
    console.log('newCountry Created '+newCountry);
    //res.render('/');

    //again serializing

     done(null,newCountry);
}));

});
*/


    res.render('index', { user: req.user });
  };
  
module.exports = {
    indexPage
    };
  
  