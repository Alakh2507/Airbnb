

const User=require("../models/user.js");


module.exports.renderSignup=(req,res)=>{
res.render("user/signup.ejs");
}


module.exports.signup=async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registerUser=await User.register(newUser,password);
    //automatic login after singup
    req.login(registerUser, (err) => {
      if (err) {
          return next(err);
      }
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
  });

    console.log(registerUser);
    // req.flash("success" ,"Welcome to Wanderlust");
    // res.redirect("/listings");
    }catch(err){
        req.flash("success","you have already registered ");
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm=async(req,res)=>{
    req.flash("success","Welcome to Wanderlust! You are logged in!");
    let redirect=res.locals.redirectUrl;
    if(redirect){
      res.redirect(redirect);
    }else{
    res.redirect("/listings");
    }
}


module.exports.logout= async (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "you are logged out!");
      res.redirect("/listings");
    });
  }