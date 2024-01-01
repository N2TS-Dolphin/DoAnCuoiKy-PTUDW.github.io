var mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        productID: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true},
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    { collection: "orderItems"}
);

const orderSchema = new mongoose.Schema(
    {
        accountID: { type: mongoose.Schema.Types.ObjectId, ref: "accounts", required: true },
        orderItemID: [{ type: mongoose.Schema.Types.ObjectId, ref: "orderItems", required: true }],
        totalPrice: { type: Number, required: true },
        address: { type: String },
        status: { type: String, required: true },
        orderTime: { type: Date },
    },
    { collection: "orders" }
);

const OrderItem = mongoose.model("orderItems", orderItemSchema)
const Order = mongoose.model("orders", orderSchema)

module.exports = {
    OrderItem,
    Order
}