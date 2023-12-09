var express = require('express');
var router = express.Router();

// Xử lý đăng xuất
router.get('/', function(req, res){
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
      // Optionally, you can clear or reset session variables here
      // For example: req.session.user = null;
      res.redirect('/'); // Redirect after logout
    });
  });

  module.exports = router;