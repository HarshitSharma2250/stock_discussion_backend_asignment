const express=require("express")
const PostRoutes=express.Router()
const {Authentication,AuthPosts}=require("../middleware/AuthMiddleware")
const { createPost, GetAllPost ,DeletePost ,singlePost} = require("../controllers/post.controller")

PostRoutes.post("/api/posts",Authentication,createPost)
PostRoutes.get("/api/posts",Authentication,GetAllPost)
PostRoutes.get("/api/posts/:postId",Authentication,singlePost)
PostRoutes.delete("/api/posts/:postId",Authentication,AuthPosts,DeletePost)

module.exports=PostRoutes