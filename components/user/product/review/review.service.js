const { Product, Review} = require("../product.model")
const productService = require("../product.service")
const mongoose = require("mongoose")

const updateProductRating = async (productID) => {
    const reviews = await Review.find({productID: productID}).lean().exec()
    
    var productRating = 0
    for(let review of reviews){
        productRating = (productRating + review.rating)
    }
    productRating = Math.ceil(productRating / reviews.length)

    var product = await Product.findOneAndUpdate({ _id: productID }, { rating: productRating }, { new: true })
    return product
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
    const reviews =  await Review.find({productID: productID}).sort({creationTime: 1}).populate("accountID")

    let productReviews = []
    for(let review of reviews){
        const creationTime = review.creationTime.getDate() 
                            + "/" + review.creationTime.getMonth() 
                            + "/" + review.creationTime.getFullYear()
        productReviews.push({
            name: review.accountID.email,
            rating: review.rating,
            content: review.content,
            creationTime: creationTime
        })
    }
    return productReviews
}

module.exports = {
    updateProductRating,
    createNewReview,
    getProductReview
}