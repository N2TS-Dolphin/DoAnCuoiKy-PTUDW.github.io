const { Product, Review } = require("./product.model");

const getProductByID = async (id) => {
  const products = await Product.findById(id).lean();
  const creationTime =
    products.creationTime.getDate() +
    "/" +
    products.creationTime.getMonth() +
    "/" +
    products.creationTime.getFullYear();
  const product = {
    _id: products._id,
    productName: products.productName,
    price: products.price,
    productImg: products.productImg,
    status: products.status,
    category: products.category,
    manufacturer: products.manufacturer,
    creationTime: creationTime,
    rating: products.rating,
    description: products.description,
    totalPurchase: products.totalPurchase,
  };
  return product;
};
const getRelatedProduct = async (category, currentID) => {
  return await Product.find({
    category: category,
    _id: { $ne: currentID },
  }).lean();
};
const sortProductsByTime = (productData) => {
  const sortedProducts = [...productData];

  sortedProducts.sort((a, b) => {
    const timeA = new Date(a.creationTime).getTime();
    const timeB = new Date(b.creationTime).getTime();
    return timeB - timeA;
  });

  return sortedProducts;
};

const sortProductsByPriceDes = (productData) => {
  const sortedProducts = [...productData];

  sortedProducts.sort((a, b) => {
    const priceA = a.price;
    const priceB = b.price;
    return priceB - priceA;
  });

  return sortedProducts;
};

const sortProductsByPriceAsc = (productData) => {
  const sortedProducts = [...productData];

  sortedProducts.sort((a, b) => {
    const priceA = a.price;
    const priceB = b.price;
    return priceA - priceB;
  });

  return sortedProducts;
};
module.exports = {
  getProductByID,
  getRelatedProduct,
  sortProductsByTime,
  sortProductsByPriceDes,
  sortProductsByPriceAsc,
};
