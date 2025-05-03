const Listing=require("../models/listingSchema.js");  
const {listingSchema,reviewSchema}=require("../schema.js");
const ExpressError=require('../utils/ExpressError.js');
const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient=mbxGeocoding({accessToken:mapToken});

  module.exports.index=async(req,res)=>{
    let allListing= await Listing.find({})
      res.render("listings/index.ejs",{allListing});
   }

   module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
     }

     module.exports.showListing=async(req,res)=>{
        let {id}=req.params;
        const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
        res.render("listings/show.ejs",{listing});
          console.log( listing);
      }


      module.exports.createListing=async(req,res,next)=>{


     let response=  await geocodingClient.forwardGeocode({
          query: req.body.listings.location,
          limit: 2
        })
        .send()
        // console.log(response.body.features[0].geometry);
        // path filename from cloudinaryt
        let url=req.file.path;
        let filename=req.file.filename;
        console.log(url,"...",filename);
    
        // let result= listingSchema.validate(req.body);
        let listing=req.body.listings;
        const newListing =new Listing(listing);
        newListing.geometry=response.body.features[0].geometry
        newListing.owner=req.user._id;
        newListing.image={url,filename};
        
         let savelisting=await newListing.save(); 
         console.log(savelisting);
         req.flash("success","New Listing Created!");
         res.redirect("/listings");
   }

    module.exports.editListing=async(req,res)=>{
        
      let {id}=req.params;
     const listing=await Listing.findById(id);
     res.render("listings/edit.ejs",{listing});
   }

   module.exports.updateListing=async(req,res)=>{
    
     
    if(!req.body.listings){
        throw new ExpressError(404,"Send valid data for linsting")
    }
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listings});
     if( typeof req.file!=="undefined"){
      let url=req.file.path;
      let filename=req.file.filename;
    listing.image={url ,filename};
      await listing.save();
     }

  req.flash("success","listing is updated");
    res.redirect(`/listings/${id}`);

}

 module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
   let deletedlisting= await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}