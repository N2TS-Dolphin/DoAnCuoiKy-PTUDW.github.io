var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var  passport = require('passport')


/* GET sign-in page. */
router.get('/', function(req, res, next) {
    var messages = req.flash('error')
    res.render('user/login/index',{ 
      messages: messages,
      hasErrors: messages.length > 0, layout: 'user/layout.hbs'
     })
  });

// Xử lý thông tin khi có người đăng nhập
router.post('/',
  passport.authenticate('local.signin', { successRedirect: '/users',
                                  failureRedirect: '/login',
                                  failureFlash: true })
);



module.exports = router;