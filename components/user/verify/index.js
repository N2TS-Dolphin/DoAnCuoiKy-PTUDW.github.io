var express = require("express");
var passport = require("passport");
var router = express.Router();
const Account = require("../../account/account.model");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

router.get("/", function (req, res, next) {
  var messages = req.flash("error");
  res.render("user/verify/index", {
    messages: messages,
    hasErrors: messages.length > 0,
    layout: "userLayout",
  });
});

router.post("/", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.error("Authentication error: ", err);
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message);
      return res.redirect("/verify");
    }
    // If authenticated successfully, redirect to the dashboard or home page
    return res.redirect("/login");
  })(req, res, next);
});

module.exports = router;
