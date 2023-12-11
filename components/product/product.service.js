const { Product, Review } = require("./product.model")

const getProductByID = async (id) => {
    return await Product.findById(id).lean()
}

const getRelatedProduct = async (category, currentID) => {
    return await Product.find({category: category, _id: {$ne: currentID}}).lean()
}

module.exports = {
    getProductByID,
    getRelatedProduct,
}