
const { string } = require("joi");
const mongoose=require("mongoose");

//Schema
const Schema=mongoose.Schema;

 const listingSchema=new Schema({
   title:{
    type:String,
    required:true,

   },
   description:{
    type:String,
    required:true,
    },
   image:{
    url:String,
    filename:String,
   },
   price:Number,
   location:String,
   country:String,

  // review
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref :"Review",
    }
  ],

  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },

geometry:{
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }}
      });

 //mondel
 const Listing=mongoose.model("Listing",listingSchema);
 module.exports=Listing;
