const UserSchema = require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv=require("dotenv")
dotenv.config()
const PostSchema=require("../models/post.model")
const CommentSchema=require("../models/comment.model")
const likPostSchema=require("../models/LikePost.model")

const Authentication = async (req, res, next) => {
try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(403).json({
           message: "Authorization token missing" 
          });
    }
  
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  
   req.user=await UserSchema.findById(decoded.id)
  
  next()
} catch (error) {
    return res.status(401).json({
        message: "Invalid or expired token",
      });
}

};

// Middleware to authorize actions for delete posts 
const AuthPosts = async (req, res, next) => {
    const { postId } = req.params; 

    // Find the post by its ID from the post collection
    const finduser = await PostSchema.findById(postId);

    // Check if the post creator ID matches the ID of the user making the request
    if (finduser.user.toString() !== req.user._id.toString()) {
        // If the user is not the creator of the post, respond with a 403 Forbidden error
        return res.status(403).json({
            "message": "You are not authorized to perform this action."
        });
    }

    next(); 
};

// verify the authorise actions for delete comments 
const AuthComment = async (req, res, next) => {
    const { commentId } = req.params; 

    // Find the comment by its ID from the comment collection
    const finduser = await CommentSchema.findById(commentId);

    // Check if the comment creator ID matches the ID of the user making the request
    if (finduser.user.toString() !== req.user._id.toString()) {
        // If the user is not the creator of the comment, respond with a 403 Forbidden error
        return res.status(403).json({
            "message": "You are not authorized to perform this action."
        });
    }

    next(); 
};


module.exports={Authentication,AuthPosts,AuthComment}