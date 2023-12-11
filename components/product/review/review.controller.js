const reviewService = require("./review.service")

const addNewReview = async (req, res, next) => {
    reviewService.createNewReview(req.params.id, req.body.review_name, req.body.rating, req.body.content)

    res.redirect("/product/" + req.params.id)
}

module.exports = {
    addNewReview,
}