const { Product, Review} = require("../product.model")
const productService = require("../product.service")
const mongoose = require("mongoose")

const updateProductRating = async (productID) => {
    const reviews = await getProductReview(productID)
    const product = await productService.getProductByID(productID)

    var productRating = 0
    for(let i = 0; i < reviews.length; i++){
      productRating = (productRating + reviews[i].rating)
    }
    productRating = productRating / reviews.length

    product.rating = productRating
    await product.save()
}

const createNewReview = async (productID, accountID, reviewRating, reviewContent) => {
    var review = new Review({
        productID: mongoose.Types.ObjectId(productID),
        accountID: mongoose.Types.ObjectId(accountID),
        rating: reviewRating,
        content: reviewContent,
        creationTime: Date.now()
    })
    return await review.save()
}

const getProductReview = async (productID) => {
    const reviews =  await Review.find({product_id: productID}).populate("accountID").lean().exec()

    let productReviews = []
    for(let review of reviews){
        const name = review.accountID.name
        const rating = review.rating
        const content = review.content
        const creationTime = review.creationTime
    }
    const name = reviews.accountID.name
    const rating = reviews
}

module.exports = {
    createNewReview,
    getProductReview
}