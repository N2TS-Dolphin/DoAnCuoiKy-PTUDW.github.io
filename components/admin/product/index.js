const express = require('express');
const router = express.Router();
const productController = require("./product.controller")

router.get("/", productController.getAllProduct)
// router.get("/filter", productController.getFilterProduct)

module.exports = router;