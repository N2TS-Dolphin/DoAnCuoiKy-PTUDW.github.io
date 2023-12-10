const { Product, Review } = require("./product.model")

const getProductByID = async (id) => {
    return await Product.findById(id).lean()
}

const getRelatedProduct = async (category, currentID) => {
    return await Product.find({category: category, _id: {$ne: currentID}}).lean()
}

const updateProductRating = async (productID) => {
    var product = Product.findById(productID)
    var reviews = Review.find({product_id: productID})

    var productRating = 0
    for(let i = 0; i < reviews.length; i++){
      productRating = (productRating + reviews[i].rating)
    }
    productRating = productRating / reviews.length

    product.rating = productRating.toFixed(1)
    await product.save()
}

module.exports = {
    getProductByID,
    getRelatedProduct,
    updateProductRating,
}