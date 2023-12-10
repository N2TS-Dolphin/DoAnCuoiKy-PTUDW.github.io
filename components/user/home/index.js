var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index', {user: req.User, layout: 'user/layout.hbs'});

  res.render('home/index', { layout: 'user/layout.hbs' });
});


module.exports = router;
