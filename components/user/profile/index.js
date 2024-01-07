var express = require('express');
var router = express.Router();

// Xử lý đăng xuất
router.get('/', function(req, res){
    // account = req.user.email;
    // console.log(account);
    res.render("user/profile/user-profile", 
    {layout: "userLayout",
    account: req.session.user
    })
});


  module.exports = router;