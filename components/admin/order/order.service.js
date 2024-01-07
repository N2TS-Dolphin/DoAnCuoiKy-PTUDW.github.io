const {Order, OrderItem} = require("../../user/order/order.model")

const formatDate = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const result = day + "/" + month + "/" + year
    return result
}

const getAllOrder = async (page) => {
    const orders = await Order.find().sort({orderTime: "desc"}).skip((10 * page) - 10).limit(10).lean().exec()
    let order = []
    for(const each of orders){
        const date = formatDate(each.orderTime)
        const temp = {
            _id: each._id,
            address: each.address,
            status: each.status,
            orderTime: date,
            totalPrice: each.totalPrice,
        }
        order.push(temp)
    }
    return order
}
const getFilterOrder = async (page, filter) => {
    const orders = await Order.find(filter).sort({orderTime: "desc"}).skip((10 * page) - 10).limit(10).lean().exec()
    let order = []
    for(const each of orders){
        const date = formatDate(each.orderTime)
        const temp = {
            _id: each._id,
            address: each.address,
            status: each.status,
            orderTime: date,
            totalPrice: each.totalPrice,
        }
        order.push(temp)
    }
    return order
}
const countAllOrder = async () => {
    return await Order.countDocuments()
}
const getFivePage = (totalPage, page) => {
    let fivePage = []
    for(let i = 1; i <= totalPage; i++){
        if(i >= (page - 2) || i <= (page + 2)){
            fivePage.push(i)
        }
    }
    return fivePage
}
const countFilterOrder = async (filter) => {
    return await Order.find(filter).countDocuments()
}
const findOrderByID = async (orderID) => {
    const order = await Order.findOne({_id: orderID}).populate("accountID").exec()
    let date = ""
    if(order.orderTime != null){
        date = formatDate(order.orderTime)
    }
    let orderItems = []
    for(const each of order.orderItemID){
        const orderItem = await OrderItem.findOne({_id: each._id}).populate("productID").exec()
        if(orderItem){
            const temp = {
                productName: orderItem.productID.productName,
                productPrice: orderItem.productID.price,
                quantity: orderItem.quantity,
                price: orderItem.price
            }
            orderItems.push(temp)
        } 
    }

    const result = {
        _id: order._id,
        totalPrice: order.totalPrice,
        status: order.status,
        address: order.address,
        orderTime: date,
        accountEmail: order.accountID.email,
        orderItems: orderItems
    }
    return result 
}
const updateOrder = async (orderID, status) => {
    if(status){
        const order = await Order.findOneAndUpdate({_id: orderID}, {status: status},{new: true})
    }
}

module.exports = {
    getAllOrder,
    getFilterOrder,
    countAllOrder,
    getFivePage,
    countFilterOrder,
    findOrderByID,
    updateOrder,
}