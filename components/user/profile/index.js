var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const { Account } = require("../../account/account.model");
const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const { check, validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatar/");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.session.user}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });
router.use(upload.single("avatar"));

router.get("/", function (req, res) {
  var messages = req.flash("error");
  res.render("user/profile/index", {
    messages: messages,
    hasErrors: messages.length > 0,
    account: req.session.user,
    layout: "userLayout",
  });
});

router.use("/avatar", express.static("public/avatar"));
let defaultAvatar =
  "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";

// API endpoint để lấy đường dẫn avatar
router.get("/api/avatar", (req, res) => {
  res.json({ avatar: defaultAvatar });
});

// API endpoint để cập nhật avatar
router.post("/api/avatar", upload.single("avatar"), (req, res) => {
  const avatarPath = req.file.filename;
  res.json({ avatar: `/avatar/${avatarPath}` });
});

router.post(
  "/",
  async (req, res) => {
    if (req.session.user) {
      const OldPassword = req.body.oldpassword;
      const NewPassword = req.body.newpassword;

      const user = await Account.findOne({ email: req.session.user });

      console.log(user.password);
      console.log(OldPassword);

      if (!user.validPassword(OldPassword)) {
        req.flash("error", "Wrong Old Password.");
        return res.redirect("/user-profile");
      }

      if (NewPassword.length < 5) {
        req.flash("error", "Your password must be at least 5 characters.");
        return res.redirect("/user-profile");
      }

      user.password = user.encryptPassword(NewPassword);
      await user.save();
      res.redirect("/login");
    } else {
      res.redirect("/login");
    }
  }
);

module.exports = router;
