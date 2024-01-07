const {OrderItem, Order} = require('../order/order.model');

const ShoppingCartService = {
    cart: [],
  
    // Thêm sản phẩm vào giỏ hàng
    addToCart: function (product) {
      this.cart.push(product);
    },
  
    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: function (productName) {
      this.cart = this.cart.filter(product => product.name !== productName);
    },
  
    // Lấy thông tin giỏ hàng
    getCart: function () {
      return this.cart;
    }
  };
  
  // Xuất đối tượng để có thể sử dụng từ các tệp khác
  export default ShoppingCartService;
  