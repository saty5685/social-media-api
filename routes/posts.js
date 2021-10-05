const router=require("express").Router();
const Post=require("../models/Post");
const User = require("../models/User");

//create a post

router.post("/",async (req,res)=>{
    const newPost= new Post(req.body);
try{
   const savedPost=await  newPost.save();
   res.status(200).json(savedPost);

}
catch(err){
    res.status(500).json(err);
}

})

//update a post
router.put("/:id", async (req,res)=>{
    try{
    const post=await Post.findById(req.params.id)
     if(post.userId===req.body.userId){
         await post.updateOne({$set:req.body});
         res.status(200).json("post updated successfully");
     }
     else{
         res.status(420).json("you can update only your post");
     }
    }

    catch(err){
        res.status(500).json(err);
    }

})

//delete a post

router.delete("/:id", async (req,res)=>{
    try{
    const post=await Post.findById(req.params.id);
    if(post.userId===req.body.userId){
     await post.deleteOne({$set:req.body});
     res.status(200).json("post has been deleted successfully");
    }
    else{
        res.status(420).json("you can only delete your id");
    }

    }
    catch(err){
        res.status(500).json(err);
    }
})


//like a post
router.post("/likeUnlike/:id", async (req,res)=>{
    try{
    const post=await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
       await post.updateOne({$push:{likes:req.body.userId}})
       res.status(200).json("Post has been liked");
    }
    else{
      await post.updateOne({$pull:{likes:req.body.userId}})
      res.status(200).json("Post has been unliked");
    }
    }
    catch(err){
        res.status(500).json(err);
    }
})

// get a post 
router.get("/:id", async (req,res)=>{
    try{
    const post=await Post.findById(req.params.id);
    const isValidUser= await User.findById(req.body.userId);
    if(isValidUser.userName){

    }
     res.status(200).json(post);


    }

    
    catch(err){
        res.status(500).json(err);
    }
})

// get timeline post 










module.exports=router