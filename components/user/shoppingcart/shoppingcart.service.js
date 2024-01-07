const { OrderItem, Order } = require("../order/order.model");
const { Account } = require("../../account/account.model");
const mongoose = require('mongoose');

async function getAccountID(username) {
  const account = await Account.findOne({ email: username }).lean();
  const id = account._id
  return id;
}

const createShoppingCart = async function (req, res, next) {
  const accountID = getAccountID(req.session.user);
  
  let newCart = new Order({
    accountID: mongoose.Types.ObjectId(accountID),
    totalPrice: 0,
    status: "Đang giao",
  });

  return newCart;
};

const createOrderItem = async function (product) {
  let newOrder = new OrderItem({
    name: product.name,
    quantity: product.quantity,
    price: product.price,
  });
};

const getShoppingCart = async (id) => {
  const cartData = await Order.findOne({ accountID: id })
    .populate("orderItemID")
    .lean();

  let totalPrice = 0;
  for (let orderItem of cartData.orderItemID) {
    totalPrice += orderItem.price * orderItem.quantity;
  }

  const cart = {
    _id: cartData._id,
    orderItemID: cartData.orderItemID,
    totalPrice: totalPrice,
    address: "",
    status: "Chờ",
    orderTime: "",
  };

  return cart;
};

// Xuất đối tượng để có thể sử dụng từ các tệp khác
module.exports = {
  getAccountID,
  createShoppingCart,
  createOrderItem,
  getShoppingCart,
};
