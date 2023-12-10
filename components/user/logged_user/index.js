var express = require("express");
var router = express.Router();

// Trang chính yêu cầu xác thực
router.get('/', ensureAuthenticated, function(req, res){
    res.render('home/index',);
  });
const { User } = require("../../user/user.model");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // Chuyển hướng nếu chưa đăng nhập
}

// Trang chính yêu cầu xác thực
router.get("/", ensureAuthenticated, async function (req, res, next) {
  const user_id = req.user.id;
  const user = await User.findById(user_id).lean();

  res.render("home/index", { layout: "logged_user/layout.hbs", user: user});
});


module.exports = router;