const { Product, Review } = require("./product.model")

const getProductByID = async (id) => {
    return await Product.findById(id).lean()
}

const getRelatedProduct = async (category, currentID) => {
    return await Product.find({category: category, _id: {$ne: currentID}}).lean()
}
const sortProductsByTime = (productData) => {
	const sortedProducts = [...productData];

	sortedProducts.sort((a, b) => {
	  const timeA = new Date(a.creation_time).getTime();
	  const timeB = new Date(b.creation_time).getTime();
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
    sortProductsByPriceAsc
}