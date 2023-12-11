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


  for (const key in req.session) {
    if (key !== 'page') {
      console.log(`${key}: ${req.session[key]}`);
    }
  }
    // Concatenate values into a single string
    
    const concatenated = Object.entries(req.session)
    .filter(([key]) => key !== 'cookie' && key !== 'page')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  console.log("Concatenated values in req.session (excluding 'page'):", concatenated);

  const products = await Product
    .find(search)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .lean()
    .exec();

  const count = await Product.countDocuments();

  console.log("Heloooooo");
  console.log(req.session);
  console.log(req.query);
  console.log(req.params)

  res.render('product/index', {
    products,
    layout: layout,
    concatenatedValues: concatenated,
    product_name: req.query.product_name,
    pagination: {
      current: page,
      page,
      pageCount: Math.ceil(count / perPage),
      concatenatedValues: concatenated
    },
  });
});

// router.get('/', (req, res) => {
//     // Thực hiện tìm kiếm với các tham số truy vấn ở đây
//     // const productName = req.query.product_name;
//     const productName = req.session.productName
//     const page = req.query.page;

//     // Render trang hoặc chuyển hướng đến trang mới
//     // (tuỳ thuộc vào cách bạn thiết kế ứng dụng)
    
// });


module.exports = router;