// load các module
var passport = require("passport");
// load  Account model
var { Account } = require("../components/account/account.model");
var LocalStrategy = require("passport-local").Strategy;

var nodemailer = require("nodemailer");
// passport session setup

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// used to deserialize the user
passport.deserializeUser(function (id, done) {
  Account.findById(id, function (err, user) {
    done(err, { email: user.email });
  });
});

// Generate a random verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Configure nodemailer for sending emails
var transporter = nodemailer.createTransport({
  // configure your email service
  service: "gmail",
  auth: {
    user: "ntson21@clc.fitus.edu.vn",
    pass: "Ntson2101296773776",
  },
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
        newAccount.status = false;
        newAccount.verificationCode = generateVerificationCode();
        newAccount.save(function (err, result) {
          if (err) {
            return done(err);
          }

          // Send verification email
          var mailOptions = {
            from: "ntson21@clc.fitus.edu.vn",
            to: email,
            subject: "Email Verification",
            text: `Your verification code is: ${newAccount.verificationCode}`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return done(error);
            }

            return done(null, newAccount);
          });
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
          return done(null, 'notFoundUser', { message: "Not User Found" });
        }
        if (!user.validPassword(password)) {
          return done(null, 'falsePassword', { message: "Wrong Password" });
        }
        if (!user.status) {
          return done(null, 'false', { message: "Account not verified" });
        }
        return done(null, user);
      });
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "code", // change 'verificationField' to 'password'
    },
    function (email, code, done) {
      Account.findOne({ email: email }, function (err, user) {
        
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: "Not Found User." });
        }

        if (user.verificationCode !== code) {
          return done(null, false, { message: "Wrong Verification Code." });
        }
        user.status = true;
        user.verificationCode = "";
        user.save(function (err) {
          if (err) {
            return done(err);
          }
          return done(null, user);
        });
      });
    }
  )
);