var express = require('express');
var router = express.Router();
const { Product, Review } = require('../product/product.model')
const Handlebars = require('hbs')
var paginate = require('handlebars-paginate')
const productController = require('../product/product.service')

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
async function generateData(category, page, sort = null, filter=null) {
  // const currentCategory =
  //     category.charAt(0).toUpperCase() + category.slice(1);
  // const currentType = type
  //     ? type.charAt(0).toUpperCase() + type.slice(1)
  //     : null;
  let allProduct = await Product
          .find()
          .lean()
          .exec();
      // await productController.getProductByCategoryAndSubcategory(
      //     category,
      //     type
      // );
  let count = await Product.countDocuments();
  if (sort) {
    allProduct = await generateSort(sort, allProduct);
  }
  if (filter) {
    allProduct = await generatePrice(filter, allProduct);
  } 
  const productData = allProduct.slice((page - 1) * 6, page * 6);
  const categories = [...new Set(allProduct.map(product => product.category))];
  const manufacturers = [...new Set(allProduct.map(product => product.manufacturer))];

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
  const filter = req.query.filter;
  const manufacturer = req.query.manufacturer;
  console.log(category);
  console.log(filter);
  const data = await generateData(category, page, sort, filter);
  res.render("collection/index", { ...data, user: req.user });
});

module.exports = router;