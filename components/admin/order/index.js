const express = require('express');
const orderController = require("./order.controller")
const router = express.Router();

router.get("/", orderController.getAllOrder)
router.get("/filter", orderController.getFilterOrder)
router.get("/order-detail/:id", orderController.getOrderDetail)
router.post("/order-detail/:id", orderController.updateOrder)

module.exports = router