var express = require("express");
var nodemailer = require("nodemailer");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var router = express.Router();
const { Account } = require("../../account/account.model");

var transporter = nodemailer.createTransport({
    // configure your email service
    service: "gmail",
    auth: {
      user: "ntson21@clc.fitus.edu.vn",
      pass: "Ntson2101296773776",
    },
  });

router.get("/", function (req, res, next) {
  var messages = req.flash("error");
  res.render("user/forgotpassword/index", {
    messages: messages,
    hasErrors: messages.length > 0,
    layout: "userLayout",
  });
});

router.post("/", async (req, res) => {
  const email = req.body.email;

  // Tìm người dùng theo email
  const user = await Account.findOne({ email });

  if (!user) {
    // Người dùng không tồn tại, có thể thêm xử lý lỗi tại đây
    return res.redirect("/forgotpassword");
  }

  const resetToken = Math.random().toString(36).substring(2, 10);

  user.password = user.encryptPassword(resetToken);
  await user.save();

  const mailOptions = {
    from: "ntson21@clc.fitus.edu.vn",
    to: email,
    subject: "Forgot Your Password",
    text: `Your new password: ${resetToken}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return done(error);
    }
    return done(null, user);
  });

  res.redirect("/login");
});

module.exports = router;
