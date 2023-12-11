var express = require('express');
const session = require('express-session');
var router = express.Router();
const { Product, Review } = require('../product_details/product.model')
const Handlebars = require('hbs')
var paginate = require('handlebars-paginate')

Handlebars.registerHelper('paginate', paginate)

/* GET product page. */
router.get('/', async (req, res, next) => {
  // const isLoggedIn = req.isAuthenticated(); // đang sử dụng Passport.js
  // const layout = isLoggedIn ? 'logged_user/layout.hbs' : 'user/layout.hbs';

  let perPage = 9;
  let page = parseInt(req.query.page) || 1;
  let searchProduct = req.query.product_name;

  if(searchProduct){
    req.session.product_name = req.query.product_name;
  }
  
  let search = {}
  if(req.session.product_name){
    search.product_name = {'$regex': req.session.product_name, $options:'i'}
  }


  const products = await Product
    .find(search)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .lean()
    .exec();

  const count = await Product.countDocuments();

  res.render('collection/index.hbs', {
    products,
    layout: 'user/layout.hbs',
    // concatenatedValues: concatenated,
    // product_name: req.query.product_name,
    user: req.user,
    pagination: {
      current: page,
      page,
      pageCount: Math.ceil(count / perPage),
      // concatenatedValues: concatenated
    },
  });
});

module.exports = router;