var express = require('express');
const session = require('express-session');
var router = express.Router();
const { Product, Review } = require('../product/product.model')
// const Handlebars = require('hbs')
// var paginate = require('handlebars-paginate')

// Handlebars.registerHelper('paginate', paginate)

function getFivePage(totalPage, page){
  let fivePage = []
  for(let i = 1; i <= totalPage; i++){
    if(i >= (page - 2) || i <= (page + 2)){
      fivePage.push(i)
    }
  }
  return fivePage
}

/* GET product page. */
router.get('/', async (req, res, next) => {

  let perPage = 6;
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

  const count = await Product.countDocuments(search);
  const fivePage = getFivePage(count, page)

  res.render('collection/index.hbs', {
    products,
    layout: "layout.hbs",
    user: req.user,
    productCount: count,
    currentPage: page,
    fivePage: fivePage,
    totalPage: count,
  });
});

module.exports = router;