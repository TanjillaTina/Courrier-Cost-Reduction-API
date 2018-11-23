var express = require('express');
var readline = require('readline');
var fs = require('fs');
const Country=require('../models/countries');


var indexPage= (req, res)=> {

// var myInterface = readline.createInterface({
//   input: fs.createReadStream('./confiles/countries.txt')
// });
// let countries=new Array();
// var lineno = 0;
// myInterface.on('line', (line)=> {
//   lineno++;
//  // console.log('Line number ' + lineno + ': ' + line);
//   var s=String(line);
//   countries.push({name:s});
// //   new Country({
                 
// //     countryname:String(line)

// // }).save().then((newCountry=>{
// //     console.log('newCountry Created '+newCountry);
// //     //res.render('/');

// //     //again serializing

// //      done(null,newCountry);
// // }));

// }
// );
// var k=0;
// for(k=0;k<countries.length;k++)
// {
//   console.log("Namw "+countries.name);
// }
// console.log(countries);

    res.render('index', { user: req.user});
  };
  
module.exports = {
    indexPage
    };
  
  