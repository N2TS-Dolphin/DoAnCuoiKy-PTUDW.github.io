const { Account } = require("../../../account/account.model")
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

const createNewReview = async (productID, accountEmail, reviewRating, reviewContent) => {
    const account = await Account.findOne({email: accountEmail}).lean().exec()
    if(account){
        var review = new Review({
            productID: mongoose.Types.ObjectId(productID),
            accountID: mongoose.Types.ObjectId(account._id),
            rating: reviewRating,
            content: reviewContent,
            creationTime: Date.now()
        })
        await review.save()
    }
}

const getProductReview = async (productID) => {
    const reviews =  await Review.find({productID: productID}).sort({creationTime: 1}).populate("accountID").exec()
    console.log(reviews)
    let productReviews = []
    for(let review of reviews){
        const creationTime = review.creationTime.getDate() 
                            + "/" + review.creationTime.getMonth() 
                            + "/" + review.creationTime.getFullYear()
        const name = review.accountID.email.split("@")
        productReviews.push({
            name: name[0],
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