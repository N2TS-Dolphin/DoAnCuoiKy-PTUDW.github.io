const express = require("express")
const router = express.Router({mergeParams: true})
const reviewController = require("./review.controller")
  
router.post("/", reviewController.addNewReview)

module.exports = router