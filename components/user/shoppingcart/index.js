var express = require("express");
var router = express.Router();
const { Order, OrderItem } = require("../order/order.model");
const shoppingcartService = require("./shoppingcart.service");

router.get("/", async function (req, res, next) {
  if (req.session.user) {
    const cart = await shoppingcartService.getShoppingCart(await shoppingcartService.getAccountID(req.session.user));

    var messages = req.flash("error");
    res.render("user/shoppingcart", {
      messages: messages,
      hasErrors: messages.length > 0,
      cart: cart,
      account: req.session.user,
      layout: "userLayout",
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
