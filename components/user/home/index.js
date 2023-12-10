var express = require('express');
var router = express.Router();
const { Product, Review } = require('../../../components/product_details/product.model')
const Handlebars = require('hbs')

Handlebars.registerHelper('ifLowerThree', function(value, options){
  if(value < 3) return options.fn(this)
})
Handlebars.registerHelper('ifBiggerThree', function(value, options){
  if(value >= 3) return options.fn(this)
})

router.get('/', async function(req, res, next) {
  const newProduct = await Product.find().sort({creation_time: 'descending'}).limit(10).lean()
  const msiProduct = await Product.find({manufacturer: 'MSI'}).sort({creation_time: 'descending'}).limit(6).lean()
  const asusProduct = await Product.find({manufacturer: 'Asus'}).sort({creation_time: 'descending'}).limit(6).lean()
  const oppoProduct = await Product.find({manufacturer: 'OPPO'}).sort({creation_time: 'descending'}).limit(6).lean()

  res.render('user/home/index', {
    newProduct: newProduct,
    msiProduct: msiProduct,
    asusProduct: asusProduct,
    oppoProduct: oppoProduct,
    layout: 'user/layout.hbs'
  });
});

module.exports = router;
