const reviewService = require("../review/review.service")
const productService = require("../product.service")

const addNewReview = async (req, res, next) => {
    await reviewService.createNewReview(req.params.id, req.body.accountID, req.body.rating, req.body.content)
    const product = await reviewService.updateProductRating(req.params.id)
    console.log(product)
    const reviews = await reviewService.getProductReview(req.params.id)
    res.json({reviews: reviews, product: product})
}

const getReviewJson = async (req, res, next) => {
    const reviews = await reviewService.getProductReview(req.params.id)
    const product = await productService.getProductByID(req.params.id)
    res.json({reviews: reviews, product: product})
}

module.exports = {
    addNewReview,
    getReviewJson
}