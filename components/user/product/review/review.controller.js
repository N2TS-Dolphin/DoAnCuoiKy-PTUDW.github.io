const reviewService = require("../review/review.service")

const addNewReview = async (req, res, next) => {
    await reviewService.createNewReview(req.params.id, req.body.review_name, req.body.rating, req.body.content)
    await reviewService.updateProductRating(req.params.id)
    res.redirect("/product/" + req.params.id)
}

const getReviewJson = async (req, res, next) => {
    res.json(await reviewService.getProductReview(req.params.id))
}

module.exports = {
    addNewReview,
    getReviewJson
}