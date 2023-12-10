const productModel = require("../product.model")

const createNewReview = async (productID, reviewName, reviewRating, reviewContent) => {
    const review = new productModel.Review({
        product_id: productID,
        name: reviewName,
        rating: reviewRating,
        content: reviewContent
    })
    await review.save()
}

const getProductReview = async (productID) => {
    return await productModel.Review.find({product_id: productID}).lean()
}
module.exports = {
    createNewReview,
    getProductReview
}