const  { likePost, unlikePost }=require("../controllers/Likepost.controller")
const {Authentication} =require("../middleware/AuthMiddleware")
const express=require("express")
const LikeRoutes=express.Router()

LikeRoutes.post("/api/posts/:postId/like",Authentication,likePost)
LikeRoutes.delete("/api/posts/:postId/like",Authentication,unlikePost)


module.exports=LikeRoutes