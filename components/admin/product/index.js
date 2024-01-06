const express = require('express');
const productController = require("./product.controller")

const productARouter = (upload) => {
    const router = express.Router();
    router.get("/", productController.getAllProduct)
    router.get("/filter", productController.getFilterProduct)
    router.get("/create-product", productController.createForm)
    router.post("/create-product", upload.array('productImg', 5), productController.createProduct)
    router.get("/update-product/:id", productController.updateForm)
    router.post("/update-product/:id", upload.array('productImg', 1), productController.updateProduct)
    router.get("/delete-product/:id", productController.deleteProduct)

    return router
}
module.exports = productARouter;