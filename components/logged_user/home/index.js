var express = require("express");
var router = express.Router();
const { User } = require("../../user/user.model");
const { Product, Review } = require("../../product/product.model")

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // Chuyển hướng nếu chưa đăng nhập
}

// Trang chính yêu cầu xác thực
router.get("/", ensureAuthenticated, async function (req, res, next) {
  const user_id = req.user.id;
  const user = await User.findById(user_id).lean();
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

  res.render("home/index", {
    newProduct: newProduct,
    msiProduct: msiProduct,
    asusProduct: asusProduct,
    oppoProduct: oppoProduct,
    layout: "layout.hbs",
    user: user,
  });
});

module.exports = router;
