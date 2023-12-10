const reviewService = require("./review.service")
const productService = require("../product.service")

const addNewReview = async (req, res, next) => {
    reviewService.createNewReview(req.params.id, req.body.review_name, req.body.rating, req.body.content)
    productService.updateProductRating(req.params.id)

    res.redirect("/product_details/" + req.params.id)
}

module.exports = {
    addNewReview,
}