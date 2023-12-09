var express = require('express');
var router = express.Router();




// Trang chính yêu cầu xác thực
router.get('/', ensureAuthenticated, function(req, res){
    res.render('home/index', { layout: 'logged_user/layout.hbs' });
  });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login'); // Chuyển hướng nếu chưa đăng nhập
  }

module.exports = router;
