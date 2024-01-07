const { Product } = require("../../user/product/product.model")
const { Category, Manufacturer } = require("../../user/category/category.model")
const fs = require('fs/promises');
const path = require('path');

const formatDate = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const result = day + "/" + month + "/" + year
    return result
}

const getAllProduct = async (page) => {
    const products = await Product.find().skip((10 * page) - 10).limit(10).lean().exec()
    let product = []
    for(const each of products){
        const date = formatDate(each.creationTime)
        const temp = {
            _id: each._id,
            productName: each.productName,
            category: each.category,
            manufacturer: each.manufacturer,
            status: each.status,
            creationTime: date,
            price: each.price,
        }
        product.push(temp)
    }
    return product
}
const countAllProduct = async () => {
    return await Product.countDocuments()
}
const getAllCategory = async () => {
    return await Category.find().lean().exec()
}

const getAllManufacturer = async () => {
    return await Manufacturer.find().lean().exec()
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

const getFilterProduct = async (filter, sort, page) => {
    const products = await Product.find(filter).sort(sort).skip((10 * page) - 10).limit(10).lean().exec()
    let product = []
    for(const each of products){
        const date = formatDate(each.creationTime)
        const temp = {
            _id: each._id,
            productName: each.productName,
            category: each.category,
            manufacturer: each.manufacturer,
            status: each.status,
            creationTime: date,
            price: each.price,
        }
        product.push(temp)
    }
    return product
}
const countFilterProduct = async (filter, sort) => {
    return await Product.find(filter).sort(sort).countDocuments()
}

const createNewProduct = async (productName, price, category, manufacturer, status, description, fileNames) => {
    let newProduct = new Product({
        productImg: fileNames,
        productName: productName,
        price: price,
        category: category,
        manufacturer: manufacturer,
        status: status,
        description: description,
        creationTime: Date.now(),
        totalPurchase: 0,
        rating: 0
    })
    return await newProduct.save()
}

const deleteFile = async (fileNames) => {
    for(const each of fileNames){
        const oldImagePath = path.join(__dirname, '../../../public/img', each);
        await fs.unlink(oldImagePath);
    }
}

const getProductByID = async (productID) => {
    const product = await Product.findOne({_id: productID}).lean().exec()
    let date = ""
    if(product.creationTime != null){
        date = formatDate(product.creationTime)
    }
    const result = {
        _id: product._id,
        productImg: product.productImg,
        productName: product.productName,
        price: product.price,
        category: product.category,
        manufacturer: product.manufacturer,
        status: product.status,
        description: product.description,
        creationTime: date,
        totalPurchase: product.totalPurchase,
        rating: product.rating
    }
    return result 
}

const deleteProductImg = async (productID, oldImg) => {
    const product = await Product.findOneAndUpdate(
        {_id: productID}, {
            $pullAll: {
                productImg: [oldImg]
            }
        },{new: true}
    )
}

const updateProduct = async (productID, productName, price, category,
    manufacturer, status, description, fileNames) => {
    if(productName){
        const product = await Product.findOneAndUpdate({_id: productID}, {productName: productName},{new: true})
    }
    if(category){
        const product = await Product.findOneAndUpdate({_id: productID}, {category: category},{new: true})
    }
    if(manufacturer){
        const product = await Product.findOneAndUpdate({_id: productID}, {manufacturer: manufacturer},{new: true})
    }
    if(price){
        const product = await Product.findOneAndUpdate({_id: productID}, {price: price},{new: true})
    }
    if(status){
        const product = await Product.findOneAndUpdate({_id: productID}, {status: status},{new: true})
    }
    if(description){
        const product = await Product.findOneAndUpdate({_id: productID}, {description: description},{new: true})
    }
    if(fileNames){
        const product = await Product.findOneAndUpdate(
            {_id: productID}, {
                $push: {
                    productImg: fileNames
                }
            },{new: true}
        )
    }
}

const deleteProduct = async (productID) => {
    const product = await Product.findOne({_id: productID}).lean().exec()
    await deleteFile(product.productImg)
    return await Product.findOneAndDelete({_id: productID})
}
module.exports = {
    getAllProduct,
    countAllProduct,
    getAllCategory,
    getAllManufacturer,
    getFivePage,
    getFilterProduct,
    countFilterProduct,
    createNewProduct,
    deleteFile,
    getProductByID,
    deleteProductImg,
    updateProduct,
    deleteProduct
}