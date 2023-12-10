const express = require("express")
const router = express.Router()
const reviewController = require("./review.controller")
  
router.post("/", reviewController.addNewReview)

module.exports = router