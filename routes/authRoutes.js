var express = require('express');
var router = express.Router();
const passport=require('passport');
const authController=require('../controllers/authcontroller');


/* GET users listing. */

//auth login
router.get('/login',authController.loginPage);



//local=login

/* GET register page. */
router.post('/login', function(req, res, next) {

  passport.authenticate('local',{
    successRedirect:'/admin',
    failureRedirect:'/',
    //failureFlash:true
})(req,res,next);


});

//auth logout
router.get('/logout',authController.logOut);


///////////////////outlook



router.get('/outlook',
  passport.authenticate('windowslive', {
    scope: [
      'openid',
      'profile',
      'offline_access',
      'https://outlook.office.com/Mail.Read'

    ]
  })
);


router.get('/outlook/callback', 
  passport.authenticate('windowslive', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect profile.
    res.redirect('/profile/');
    //res.render('Outlook Succedd');
  });

module.exports = router;
