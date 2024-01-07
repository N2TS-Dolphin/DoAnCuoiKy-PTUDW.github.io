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
    const orderID = req.params.id
    const message = req.query.mess
    if(!orderID){
        res.redirect("/order-admin")
    } else {
        const order = await orderService.findOrderByID(orderID)
        res.render("admin/order/order-detail", {
            order: order,
            message: message,
            layout: "adminLayout"
        })
    }
}

const updateOrder = async (req, res, next) => {
    let mess = ""
    const orderID = req.params.id 
    const status = req.body.status
    try{ 
        await orderService.updateOrder(orderID, status)
        mess = "Trạng thái thay đổi thành " + status + "."
    } catch(error){
        mess = "Không thể lưu trạng thái vào cơ sở dữ liệu."
    }
    res.redirect("/order-admin/order-detail/" + orderID + "?mess=" + mess)
}

module.exports = {
    getAllOrder,
    getFilterOrder,
    getOrderDetail,
    updateOrder
}