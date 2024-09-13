const express=require("express")
const CommentRoutes=express.Router()
const {Authentication,AuthComment}=require("../middleware/AuthMiddleware")
const {addComment ,deleteComment} =require("../controllers/comment.controller")

CommentRoutes.post("/api/posts/:postId/comments",Authentication,addComment)
CommentRoutes.delete("/api/posts/:postId/comments/:commentId",Authentication,AuthComment,deleteComment)

module.exports=CommentRoutes