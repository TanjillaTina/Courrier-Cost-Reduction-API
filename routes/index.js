
var express = require('express');
var router = express.Router();
//var authHelper = require('../helpers/auth');
var indexRouter=require('../controllers/index');

/* GET home page. */
router.get('/',indexRouter.indexPage);

module.exports = router;
