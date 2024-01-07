var express = require("express");
var router = express.Router();
const { Product, Review } = require("../product/product.model");
const Handlebars = require("hbs");
const { Account } = require("../../account/account.model");

Handlebars.registerHelper("ifLowerThree", function (value, options) {
  if (value < 3) return options.fn(this);
});
Handlebars.registerHelper("ifBiggerThree", function (value, options) {
  if (value >= 3) return options.fn(this);
});

router.get("/", async function (req, res, next) {
  const newProduct = await Product.find()
    .sort({ creation_time: "descending" })
    .limit(10)
    .lean();
  const msiProduct = await Product.find({ manufacturer: "MSI" })
    .sort({ creation_time: "descending" })
    .limit(6)
    .lean();
  const asusProduct = await Product.find({ manufacturer: "Asus" })
    .sort({ creation_time: "descending" })
    .limit(6)
    .lean();
  const oppoProduct = await Product.find({ manufacturer: "OPPO" })
    .sort({ creation_time: "descending" })
    .limit(6)
    .lean();

  res.render("user/home/index", {
    newProduct: newProduct,
    msiProduct: msiProduct,
    asusProduct: asusProduct,
    oppoProduct: oppoProduct,
    account: req.session.user,
    layout: "userLayout",
  });
});

router.get("/users", ensureAuthenticated, async function (req, res, next) {
  const newProduct = await Product.find()
    .sort({ creation_time: "descending" })
    .limit(10)
    .lean();
  const msiProduct = await Product.find({ manufacturer: "MSI" })
    .sort({ creation_time: "descending" })
    .limit(6)
    .lean();
  const asusProduct = await Product.find({ manufacturer: "Asus" })
    .sort({ creation_time: "descending" })
    .limit(6)
    .lean();
  const oppoProduct = await Product.find({ manufacturer: "OPPO" })
    .sort({ creation_time: "descending" })
    .limit(6)
    .lean();
  const account = req.user.email;

  res.render("user/home/index", {
    newProduct: newProduct,
    msiProduct: msiProduct,
    asusProduct: asusProduct,
    oppoProduct: oppoProduct,
    account: account,
    layout: "userLayout",
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // Chuyển hướng nếu chưa đăng nhập
}

module.exports = router;
