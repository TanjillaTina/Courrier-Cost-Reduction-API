var express = require('express');
var router = express.Router();



const ConfirmController=require('../controllers/confirmcontroller');


router.get('/',ConfirmController.authCheck,ConfirmController.confirmPage);


/* GET users listing. */


module.exports = router;