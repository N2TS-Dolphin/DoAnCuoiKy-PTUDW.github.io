var express = require("express");
var router = express.Router();
const { Order, OrderItem } = require("../order/order.model");

router.get("/", function (req, res, next) {
  if (req.session.user) {
    var messages = req.flash("error");
    res.render("user/shoppingcart/index", {
      messages: messages,
      hasErrors: messages.length > 0,
      account: req.session.user,
      layout: "userLayout",
    });
  } else {
    res.redirect("/login");
  }
});



module.exports = router;