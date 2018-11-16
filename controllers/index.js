var express = require('express');
//var router = express.Router();
var authHelper = require('../helpers/auth');


var indexPage=function(req, res, next) {
    let parms = { title: 'Home'};
  
    parms.signInUrl = authHelper.getAuthUrl();
    parms.debug = parms.signInUrl;
    //console.log(parms);
    res.render('index', parms);
  };
  
module.exports = {
    indexPage
    };
  