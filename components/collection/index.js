var express = require('express');
var router = express.Router();
const { Product, Review } = require('../product/product.model')
const Handlebars = require('hbs')
var paginate = require('handlebars-paginate')
const productController = require('../product/product.service');
const { search } = require('../product');

Handlebars.registerHelper('paginate', paginate)

async function generateSort(type, allProducts) {
  
  if (type == "1") {
    return  productController.sortProductsByPriceAsc(allProducts);
  }
  if (type == "2") {
    return  productController.sortProductsByPriceDes(allProducts);
  }
  if (type == "3") {
    return  productController.sortProductsByTime(allProducts);
}
  return allProducts;
}
async function generatePrice(price_min, price_max, allProducts) {

  let minPrice=Number.MAX_SAFE_INTEGER;
  let maxPrice=0;
  for (const product of allProducts) {
    const productPrice = product.price || 0;

    if (productPrice < minPrice) {
      minPrice = productPrice;
    }

    if (productPrice > maxPrice) {
      maxPrice = productPrice;
    }
  }
  if(!price_min){
    price_min=minPrice;
  }
  if(!price_max){
    price_max=maxPrice;
  }

  return allProducts.filter(product => {
    const productPrice = product.price;
    return productPrice >= price_min && productPrice <= price_max;
  });
}
async function generateData(category, page, sort = null, manufacturer=null, price_min=null, price_max=null, search) {

  var products = await Product
          .find()
          .lean()
          .exec();
          

  if(search){
    let productSearch = {};
    productSearch.product_name = {'$regex': search, $options:'i'}
    products = await Product.find(productSearch).lean().exec();
    console.log(products);
  }
  if (sort) {
    products = await generateSort(sort, products);
  }
  if (price_min || price_max) {
    products = await generatePrice(price_min, price_max, products);
  } 
  if(manufacturer){
    products = products.filter(product => product.manufacturer === manufacturer);
  }
  if(category){
    products = products.filter(product => product.category === category);
  }

  let allProducts = await Product
  .find()
  .lean()
  .exec();

  const productData = products.slice((page - 1) * 6, page * 6);
  const categories = [...new Set(allProducts.map(product => product.category))];
  const manufacturers = [...new Set(allProducts.map(product => product.manufacturer))];

  const count = products.length ;

  return {
    products: productData,
    categories,
    manufacturers,
    productCount: count,
      pagination: {
        current: page,
        page,
        pageCount: Math.ceil(count / 6)
      },
    curPage: page,
    sortType: sort,
  };
}
/* GET product page. */
router.get('/', async (req, res, next) => {
  let page = parseInt(req.query.page) || 1;
  const category = req.query.category;
  const sort = req.query.sort;
  const manufacturer = req.query.manufacturer;
  const price_min = req.query.price_min;
  const price_max = req.query.price_max;
  const search = req.query.search;

  console.log(search);
  
  const data = await generateData(category, page, sort, manufacturer, price_min, price_max, search);
  res.render("collection/index", { ...data, user: req.user });
});

module.exports = router;