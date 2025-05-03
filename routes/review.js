const express=require("express");
// mergeParams use to pass id  from app.js fil 
const  router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError=require('../utils/ExpressError.js');
//validation schema of joi
const {listingSchema,reviewSchema}=require("../schema.js");
const { isLoggedI,validateReview, isReviewAuthor } = require("../middleware.js");
//review models
const Review=require("../models/review.js");
const Listing=require("../models/listingSchema.js");

const reviewController=require("../controllers/review.js");

// Reviews Post Route
router.post("/",isLoggedI,validateReview,wrapAsync(reviewController.createReview));


//delete review route
router.delete("/:reviewId",isLoggedI,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;
