const router=require("express").Router();
const { json } = require("express");
const User=require("../models/User");
const bcrypt=require("bcrypt");

router.get("/getuser",async (req,res)=>{
    const user=new User({
    userName:"Satyam Singh",
    email:"saty@gmail.com",
    password:"12345"
    });
    await user.save();
    res.send("ok");
});

router.post("/register",async (req,res)=>{

  try{
    // Generate new Password   
   const salt =await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password,salt);
 // Create user 
    const user=new User({
        userName:req.body.userName,
        email:req.body.email,
        password:hashedPassword
        });
// save user and respond
      const us =await user.save();
      res.status(200).json(us);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.post("/login",async (req,res)=>{
    try{
   const user= await User.findOne({email:req.body.email}) ;
   !user && res.status(404).json("User not found");

   const validPassword= await bcrypt.compare(req.body.password,user.password);
   !validPassword && res.status(400).json("Wrong password");

   res.status(200).json(user);
}
catch(err){
    res.status(500).json(err);
}
})

module.exports=router