// load các module
var passport = require("passport");
// load  Account model
var {Account} = require("../components/account/account.model");
var LocalStrategy = require("passport-local").Strategy;

// passport session setup

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// used to deserialize the user
passport.deserializeUser(function (id, done) {
  Account.findById(id, function (err, user) {
    done(err, {email: user.email});
  });
});
// local sign-up
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      Account.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: "Email is already in use." });
        }
        var newAccount = new Account();
        newAccount.email = email;
        newAccount.password = newAccount.encryptPassword(password);
        newAccount.save(function (err, result) {
          if (err) {
            return done(err);
          }
          return done(null, newAccount);
        });
      });
    }
  )
);

// local sign-in
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      Account.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Not user found" });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Wrong password" });
        }
        return done(null, user);
      });
    }
  )
);