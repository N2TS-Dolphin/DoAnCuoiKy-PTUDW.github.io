const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("admin/home", {layout: "adminLayout"})
})

module.exports = router;