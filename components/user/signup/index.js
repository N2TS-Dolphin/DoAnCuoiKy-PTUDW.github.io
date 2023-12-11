var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var  passport = require('passport')


/* GET sign-up page. */
router.get('/', function(req, res, next) {
    var messages = req.flash('error')
   
    res.render('user/signup/index',{ 
      messages: messages,
      hasErrors: messages.length > 0, layout: 'layout.hbs'
     })
  });
  
  /* Post sign-up page. */
  // Xử lý thông tin khi có người đăng ký
  router.post('/', 
  [
    check('email', 'Your email is not valid').isEmail(),
    check('password', 'Your password must be at least 5 characters').isLength({ min: 5 })
    ],
    (function (req, res, next) {
  
    var messages = req.flash('error');
    const result= validationResult(req);
    var errors=result.errors;
    if (!result.isEmpty()) {
      var messages = [];
      errors.forEach(function(error){
          messages.push(error.msg);
      });
      res.render('user/signup/index',{
        messages: messages,
        hasErrors: messages.length > 0, layout: 'layout.hbs'
      });
    }else{
       next();
    }
    }),
    passport.authenticate('local.signup', { successRedirect: '/login',
                                    failureRedirect: '/signup',
                                    failureFlash: true })
  );
  
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login'); // Chuyển hướng nếu chưa đăng nhập
  }
  

module.exports = router;