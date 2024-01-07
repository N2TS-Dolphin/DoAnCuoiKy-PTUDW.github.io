const productService = require("./product.service");
const reviewService = require("./review/review.service");

const displayProduct = async (req, res, next) => {
  if (req.session.user) {
    const product = await productService.getProductByID(req.params.id);
    const reviews = await reviewService.getProductReview(req.params.id);
    const relatedProduct = await productService.getRelatedProduct(
      product.category,
      product._id
    );
    console.log(req.session.user);
    res.render("user/product/index", {
      product: product,
      reviews: reviews,
      relatedProduct: relatedProduct,
      user: req.user,
      account: req.session.user,
      layout: "userLayout",
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  displayProduct,
};
