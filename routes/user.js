const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/user.js");


router.get("/signup",userController.renderSignup);

router.post("/signup",wrapAsync(userController.signup));

router.get("/login",(req,res)=>{
   res.render("user/login.ejs");
});

router.post("/login",saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login' }),userController.renderLoginForm);

//for logout
router.get("/logout",userController.logout);

module.exports=router;