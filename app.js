var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session')
var passport = require('passport');
var mongoose = require('mongoose');
var dotenv = require('dotenv').config();
const express_handlebars = require("express-handlebars");
const express_handlebars_sections = require('express-handlebars-sections');
var paginate = require('handlebars-paginate')

// // Kết nối đến database
// mongoose.connect('mongodb+srv://404foundbugs:404foundbugs@websitedatabase.746k9dj.mongodb.net/GA2?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Kết nối đến MongoDB bị lỗi:'));
// db.once('open', function() {
//   console.log('Đã kết nối đến MongoDB thành công!');
  
// });
// Connect database
mongoose.connect(process.env.DATABASE_URL, 
  {useNewUrlParser: true, useUnifiedTopology: true}).then(function() {
      console.log("Successfully connected to the database");    
  }).catch(function(err) {
      console.log('Could not connect to the database. Exiting now...', err);
      process.exit();
  });

// Create an instance of the express-handlebars
const hbs = express_handlebars.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "views/layouts"),
  helpers: {
      sections: express_handlebars_sections(),
      eq(value1, value2){
        return value1 == value2;
      },
      lt(value1, value2){
        return value1 < value2;
      },
      lte(value1, value2){
        return value1 <= value2;
      },
      gt(value1, value2){
        return value1 > value2;
      },
      gte(value1, value2){
        return value1 >= value2;
      },
      add(value1, value2){
        return value1 + value2;
      },
      sub(value1, value2){
        return value1 - value2;
      },
      mult(value1, value2){
        return value1 * value2;
      },
      divide(value1, value2){
        return value1 / value2;
      },
      paginate: paginate
  }
});


var app = express();
// Passport
// require('./config/passport'); //vượt qua passport để config trang đăng nhâp/đăng ký
app.use(session({
  secret: 'adsa897adsa98bs',
  resave: false,
  saveUninitialized: false,
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session());

var indexRouter = require('./components/user/home/index');
var loginRouter = require('./components/user/login');
var signupRouter = require('./components/user/signup');
// var homeLoggedUserRouter = require('./components/logged_user/home');
var logoutRouter = require('./components/user/logout')
var collectionRouter = require('./components/user/collection/index')
var productRouter = require('./components/user/product/index')

// view engine setup
app.engine("hbs", hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
// app.use('/users', homeLoggedUserRouter);
app.use('/logout', logoutRouter);
app.use('/collection', collectionRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.post('/login', function (req,res){console.log("Hello")});

module.exports = app;
