var express = require('express');
var router = express.Router();



const RequestController=require('../controllers/requestcontroller');


router.get('/',RequestController.authCheck,RequestController.requestPage);
router.post('/SendToOnProcess',RequestController.authCheck,RequestController.SendToOnProcess);
router.post('/SetCourrierName',RequestController.authCheck,RequestController.SetCourrierName);
router.post('/DownloadExcell',RequestController.authCheck,RequestController.DownloadExcell);
/* GET users listing. */


module.exports = router;