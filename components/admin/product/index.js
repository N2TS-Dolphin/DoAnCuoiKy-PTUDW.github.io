const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("admin/product", {layout: "adminLayout"})
})

module.exports = router;