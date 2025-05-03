const express=require("express");
const  router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
//validation schema of joi
const {listingSchema,reviewSchema}=require("../schema.js");
const { isLoggedI, isOwner } = require("../middleware.js");

const multer=require('multer');
const{storage}=require("../cloudConfig.js");
const upload=multer({storage});

const ListingController=require("../controllers/listings.js");
//Index Route
 router.get("/",wrapAsync(ListingController.index)
   );

   //New Route
   router.get("/new",isLoggedI,wrapAsync(ListingController.renderNewForm));
   
   
   //show Route
   router.get("/:id",wrapAsync(ListingController.showListing));

//Create Route

   router.post("/" ,isLoggedI,upload.single('listings[image]'),wrapAsync(ListingController.createListing)
   );
   // router.post("/",upload.single('listings[image]'),(req,res)=>{
   //    res.send(req.file);
   // })
//Edit Route

router.get("/:id/edit",isLoggedI,isOwner,wrapAsync(ListingController.editListing));

//Update Route
router.put("/:id",isLoggedI,isOwner,upload.single('listings[image]'),wrapAsync(ListingController.updateListing));

//Delete Route
router.delete("/:id",isLoggedI,isOwner,wrapAsync(ListingController.deleteListing));   

module.exports=router;