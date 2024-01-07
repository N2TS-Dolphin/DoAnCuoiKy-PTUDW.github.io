const orderService = require("./order.service")
const getAllOrder = async (req, res, next) => {
    const message = req.query.mess 
    const page = 1
    let order = await orderService.getAllOrder(page)
    const totalOrderCount = await orderService.countAllOrder()
    const totalPage = Math.ceil(totalOrderCount / 10)
    const fivePage = orderService.getFivePage(totalPage, page)
    res.render("admin/order", {
        order: order,
        page: page,
        totalPage: totalPage,
        fivePage: fivePage,
        message: message,
        layout: "adminLayout"
    })
}
const getFilterOrder = async (req, res, next) => {
    const page = req.query.page || 1
    const status = req.query.status
    let filter = {}
    if(status){filter.status =  status}

    let order = await orderService.getFilterOrder(page, filter)
    const totalOrderCount = await orderService.countFilterOrder(filter)
    const totalPage = Math.ceil(totalOrderCount / 10) 
    const fivePage = orderService.getFivePage(totalPage, page)
    res.json({
        order: order,
        fivePage: fivePage, 
        totalPage: totalPage
    })
}
const getOrderDetail = async (req, res, next) => {
    
}

const updateOrder = async (req, res, next) => {
    
}

module.exports = {
    getAllOrder,
    getFilterOrder,
    getOrderDetail,
    updateOrder
}