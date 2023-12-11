var express = require('express');
var router = express.Router();
const { Product, Review } = require('../product/product.model')
const Handlebars = require('hbs')
var paginate = require('handlebars-paginate')

Handlebars.registerHelper('paginate', paginate)

/* GET product page. */
router.get('/', async (req, res, next) => {
  // const isLoggedIn = req.isAuthenticated(); // đang sử dụng Passport.js
  // const layout = isLoggedIn ? 'logged_user/layout.hbs' : 'user/layout.hbs';

  let perPage = 9;
  let page = parseInt(req.query.page) || 1;

  const products = await Product
    .find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .lean()
    .exec();

  const count = await Product.countDocuments();

  res.render('collection/index', {
    products,
    layout: 'layout.hbs',
    user: req.user,
    pagination: {
      current: page,
      page,
      pageCount: Math.ceil(count / perPage)
    },
  });
});



module.exports = router;