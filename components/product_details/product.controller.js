const productService = require("./product.service")
const reviewService = require("./review/review.service")

const detail = async function(req, res, next) {
    // const layout = req.isAuthenticated() ? "logged_user/layout.hbs" : "user/layout.hbs"

    const product = productService.getProductByID(req.params.id)
    const reviews = reviewService.getProductReview(product._id)
    const relatedProduct = productService.getRelatedProduct(product.category, product._id)

    res.render("product_details/index", {
        product: product,
        reviews: reviews,
        relatedProduct: relatedProduct,
        user: req.user,
        layout: '../views/user/layout.hbs'
    });
}

module.exports = {
    detail,
}