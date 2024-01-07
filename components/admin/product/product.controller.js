const productService = require("./product.service")
const fs = require('fs/promises');

const getAllProduct = async (req, res, next) => {
    const message = req.query.mess 
    const page = 1
    let product = await productService.getAllProduct(page)
    const totalProductCount = await productService.countAllProduct()
    const totalPage = Math.ceil(totalProductCount / 10)
    const fivePage = productService.getFivePage(totalPage, page)
    const category = await productService.getAllCategory()
    const manufacturer = await productService.getAllManufacturer()
    res.render("admin/product", {
        category: category,
        manufacturer: manufacturer,
        product: product,
        page: page,
        totalPage: totalPage,
        fivePage: fivePage,
        message: message,
        layout: "adminLayout"
    })
}

const getFilterProduct = async (req, res, next) => {
    const page = req.query.page || 1
    const name = req.query.productName
    const filterCategory = req.query.category
    const filterManufacturer = req.query.manufacturer
    const sortBy = req.query.sortBy
    const sortOrder = req.query.sortOrder
    let filter = {}
    if(name){filter.productName = {'$regex': name, $options: 'i'}}
    if(filterCategory){filter.category = filterCategory}
    if(filterManufacturer){filter.manufacturer = filterManufacturer}
    let sort = []
    if(sortBy != '' && sortOrder != ''){
        const order = (sortOrder == "asc") ? 1 : -1
        sort = [[sortBy, order]]
    }
    let product = await productService.getFilterProduct(filter, sort, page)
    const totalProductCount = await productService.countFilterProduct(filter, sort)
    const totalPage = Math.ceil(totalProductCount / 10)
    const fivePage = productService.getFivePage(totalPage, page)
    res.json({
        product: product,
        fivePage: fivePage, 
        totalPage: totalPage
    })
}
const createForm = async (req, res, next) => {
    const message = req.query.mess
    const category = await productService.getAllCategory()
    const manufacturer = await productService.getAllManufacturer()
    res.render("admin/product/create-product", {
        category: category,
        manufacturer: manufacturer,
        message: message,
        layout: "adminLayout"
    })
}
const updateForm = async (req, res, next) => {
    const message = req.query.mess
    const productID = req.params.id
    if(!productID){
        res.redirect("/product-admin")
    } else {
        const product = await productService.getProductByID(productID)
        const category = await productService.getAllCategory()
        const manufacturer = await productService.getAllManufacturer()
        res.render("admin/product/update-product", {
            category: category,
            manufacturer: manufacturer,
            product: product,
            message: message,
            layout: "adminLayout"
        })
    }
}


const createProduct = async (req, res, next) => {
    let mess = ""
    const fileNames = req.files.map(file => file.filename);
    const productName = req.body.productName
    let price = parseInt(req.body.price) || 0
    const category = req.body.category
    const manufacturer = req.body.manufacturer
    const status = req.body.status
    const description = req.body.description

    if(!productName){
        mess = "Vui lòng nhập tên sản phẩm."
        await productService.deleteFile(fileNames)
        res.redirect("/product-admin/create-product?mess=" + mess)
    } else if(isNaN(price)){
        mess = "Giá tiền phải là số."
        await productService.deleteFile(fileNames)
        res.redirect("/product-admin/create-product?mess=" + mess)
    } else {
        try{ 
            await productService.createNewProduct(productName, price, category, manufacturer, status, description, fileNames)
            mess = "Thêm sản phẩm mới thành công."
        } catch(error){
            await productService.deleteFile(fileNames)
            mess = "Không thể lưu vào cơ sở dữ liệu."
        }
        res.redirect("/product-admin/create-product?mess=" + mess)
    }
}

const updateProduct = async (req, res, next) => {
    let mess = ""
    const productID = req.params.id 
    const fileNames = req.files.map(file => file.filename);
    const oldImg = req.body.oldImg
    const productName = req.body.productName
    let price = parseInt(req.body.price) || 0
    const category = req.body.category
    const manufacturer = req.body.manufacturer
    const status = req.body.status
    const description = req.body.description
    
    if(oldImg){
        await productService.deleteProductImg(productID, oldImg)
        const deteteImg = [oldImg]
        await productService.deleteFile(deteteImg)
    } 
    const product = await productService.getProductByID(productID)
    if(product.productImg.length >= 5 && fileNames){
        await productService.deleteFile(fileNames)
        mess = "Đã có đủ 5 hình ảnh."
        res.redirect("/product-admin/update-product/" + productID + "?mess=" + mess)
    } else if(!productName){
        await productService.deleteFile(fileNames)
        mess = "Sản phẩm phải có tên."
        res.redirect("/product-admin/update-product/" + productID + "?mess=" + mess)
    } else if(isNaN(price)){
        mess = "Giá tiền phải là số."
        await productService.deleteFile(fileNames)
        res.redirect("/product-admin/update-product/" + productID + "?mess=" + mess)
    } else {
        try{ 
            await productService.updateProduct(productID, productName, price, category, manufacturer, status, description, fileNames)
            mess = "Thay đổi thành công."
        } catch(error){
            mess = "Không thể lưu vào cơ sở dữ liệu."
        }
        res.redirect("/product-admin/update-product/" + productID + "?mess=" + mess)
    }
}

const deleteProduct = async (req, res, next) => {
    let mess = ""
    const productID = req.params.id
    try{ 
        await productService.deleteProduct(productID)
        mess = "Đã xóa sản phẩm."
    } catch(error){
        mess = "Không thể xóa ra khỏi cơ sở dữ liệu."
    }
    res.redirect("/product-admin?mess=" + mess)
}

module.exports = {
    getAllProduct,
    getFilterProduct,
    createForm,
    updateForm,
    createProduct,
    deleteProduct,
    updateProduct
}