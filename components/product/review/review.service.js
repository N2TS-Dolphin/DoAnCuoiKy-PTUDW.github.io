const { Product, Review} = require("../product.model")

const createNewReview = async (productID, reviewName, reviewRating, reviewContent) => {
    var review = new Review({
        product_id: productID,
        name: reviewName,
        rating: reviewRating,
        content: reviewContent,
    })
    return await review.save()
}

const getProductReview = async (productID) => {
    return await Review.find({product_id: productID}).lean()
}

module.exports = {
    createNewReview,
    getProductReview
}