const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    product_name: String,
    price: Number,
    product_img: String,
    status: String,
    category: String,
    manufacturer: String,
    creation_time: Date
}, {collection: "product"})

const reviewSchema = new mongoose.Schema({
    product_id: String,
    name: String,
    rating: Number,
    content: String
}, {collection: "reviews"})

const Product = mongoose.model("product", productSchema, "product")
const Review = mongoose.model("reviews", reviewSchema, "reviews")

module.exports = {
    Product, 
    Review
}