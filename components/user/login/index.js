var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
var passport = require("passport");

/* GET sign-in page. */
router.get("/", function (req, res, next) {
  var messages = req.flash("error");
  res.render("user/login/index", {
    messages: messages,
    hasErrors: messages.length > 0,
    layout: "userLayout",
  });
});

// Xử lý thông tin khi có người đăng nhập
router.post("/", function (req, res, next) {
  passport.authenticate("local.signin", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user === 'notFoundUser') {
      // If user not found or wrong password
      req.flash("error", "Not User Found.");
      return res.redirect("/login");
    }
    if (user === 'falsePassword') {
      // If user not found or wrong password
      req.flash("error", "Wrong Password.");
      return res.redirect("/login");
    }
    if (user === 'false') {
      // If account not verified, redirect to the verification page
      return res.redirect("/verify");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      // If authenticated successfully, redirect to the dashboard or home page
      req.session.user = info.email;
      return res.redirect("/users");
    });
  })(req, res, next);
});

module.exports = router;
