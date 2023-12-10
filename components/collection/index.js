var express = require('express');
var router = express.Router();

// const productController =  require('./product.controller');

// router.get('/', productController)

const { Product, Review } = require('./product.model')
const Handlebars = require('hbs')
var paginate = require('handlebars-paginate')

Handlebars.registerHelper('paginate', paginate)

/* GET product page. */
router.get('/', async (req, res, next) => {

  let perPage = 9;
  let page = parseInt(req.query.page) || 1;

  const products = await Product
    .find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .lean()
    .exec();

  const count = await Product.countDocuments();

  res.render('product/index', {
    products,
    // layout: layout,
    pagination: {
      current: page,
      page,
      pageCount: Math.ceil(count / perPage)
    },
  });
});



module.exports = router;