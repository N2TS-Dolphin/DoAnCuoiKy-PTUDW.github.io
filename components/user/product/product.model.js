const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    productImg: [{ type: String }],
    status: { type: String, required: true },
    category: { type: String, required: true },
    manufacturer: { type: String, required: true },
    creationTime: { type: Date, required: true },
    rating: { type: Number, required: true },
    totalPurchase: { type: Number, required: true }
}, {collection: "product"})

const reviewSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
    accountID: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true },
    content: { type: String },
    creationTime: { type: Date, required: true },
}, {collection: "reviews"})

const revenueSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
    orderID: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    purchaseTime: { type: Date, required: true }
}, {collection: "revenues"})

const Product = mongoose.model("product", productSchema)
const Review = mongoose.model("reviews", reviewSchema)
const Revenue = mongoose.model("revenues", revenueSchema)

module.exports = {
    Product, 
    Review,
    Revenue
}