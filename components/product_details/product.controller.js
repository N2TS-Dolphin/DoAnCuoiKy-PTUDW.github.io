const productService = require("./product.service")
const reviewService = require("./review/review.service")

const detail = async function(req, res, next) {
    // const layout = req.isAuthenticated() ? "logged_user/layout.hbs" : "user/layout.hbs"

    const product = await productService.getProductByID(req.params.id)
    const reviews = await reviewService.getProductReview(product._id)
    const relatedProduct = await productService.getRelatedProduct(product.category, product._id)

    var productRating = 0
    for(let i = 0; i < reviews.length; i++){
      productRating = (productRating + reviews[i].rating)
    }
    productRating = productRating / reviews.length

    res.render("product_details/index", {
        product: product,
        productRating: productRating.toFixed(1),
        reviews: reviews,
        relatedProduct: relatedProduct,
        layout: 'user/layout.hbs'
    });
}

module.exports = {
    detail,
}