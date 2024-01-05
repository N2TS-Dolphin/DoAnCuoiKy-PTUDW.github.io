const { Product } = require("../../user/product/product.model")
const { Category, Manufacturer } = require("../../user/category/category.model")

const getAllProduct = async (req, res, next) => {
    const page = req.query.page || 1
    const filterCategory = req.query.category
    const filterManufacturer = req.query.manufacturer
    const sortBy = req.query.sortBy
    const sortOrder = req.query.sortOrder
    console.log(page, filterCategory, filterManufacturer, sortBy, sortOrder)
    let filter = {}
    if(filterCategory){filter.category = filterCategory}
    if(filterManufacturer){filter.manufacturer = filterManufacturer}
    let by = ""
    switch(sortBy){
        case 0: by = ""; break;
        case 1: by = "creationTime"; break;
        case 2: by = "price"; break;
        case 3: by = "totalPrice"; break;
    }
    let order = ""
    switch(sortOrder){
        case 0: order = ""; break;
        case 1: order = "desc"; break;
        case 2: order = "asc"; break;
    }
    let sort = [[sortBy, sortOrder]]
    console.log(sortBy, sortOrder)
    console.log(filter, sort)
    let product = await Product.find(filter).sort(sort).lean().exec()
    product.slice((page - 1) * 10, page * 10)
    const totalProductCount = await Product.countDocuments()
    const totalPage = Math.ceil(totalProductCount / 10)
    const fivePage = getFivePage(totalPage, page)
    for(const p of product){
        console.log(p.productName)
    }
    const category = await Category.find().lean().exec()
    const manufacturer = await Manufacturer.find().lean().exec()
    res.render("admin/product", {
        category: category,
        manufacturer: manufacturer,
        product: product,
        page: page,
        totalPage: totalPage,
        fivePage: fivePage,
        layout: "adminLayout"
    })
}

function getFivePage(totalPage, page){
    let fivePage = []
    for(let i = 1; i <= totalPage; i++){
        if(i >= (page - 2) || i <= (page + 2)){
            fivePage.push(i)
        }
    }
    return fivePage
}

const getFilterProduct = async (req, res, next) => {
    const page = req.query.page || 1
    const category = req.query.category
    const manufacturer = req.query.manufacturer
    const sortBy = req.query.sortBy
    const sortOrder = req.query.sortOrder
    let filter = {}
    if(category){filter.category = category}
    if(manufacturer){filter.manufacturer = manufacturer}
    let by;
    switch(sortBy){
        case 0: by = ""; break;
        case 1: by = "creationTime"; break;
        case 2: by = "price"; break;
        case 3: by = "totalPrice"; break;
    }
    let order
    switch(sortOrder){
        case 0: order = ""; break;
        case 1: order = "desc"; break;
        case 2: order = "asc"; break;
    }
    let sort = []
    if(sort !== "" && order !== ""){
        sort.push([by, order])
    }
    console.log(page)
    console.log(filter, sort)
    let product = await Product.find(filter).sort(sort).lean().exec()
    product.slice((page - 1) * 10, page * 10)
    const totalProductCount = await Product.countDocuments()
    const totalPage = Math.ceil(totalProductCount / 10)
    console.log(product.productName)
    console.log(totalProductCount, totalPage)
    res.send(product)
}
module.exports = {
    getAllProduct,
    getFilterProduct,
}