const CommentSchema=require("../models/comment.model")
const PostSchema=require("../models/post.model")

const addComment = async (req, res) => {
    try {
      const { comment } = req.body;
      const { postId } = req.params;
  
    //  first will check if the post is exist or not ---------------------
      const post = await PostSchema.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
    //   add comments----------
      const newComment = new CommentSchema({
        post: postId,
        user: req.user._id,
        comment,
      });
  
      const savedComment = await newComment.save();
      res.status(201).json({ 
        success: true,
         commentId: savedComment._id,
          message: 'Comment added successfully' 
        });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
const deleteComment=async(req,res)=>{
    const { commentId } = req.params;

    try {
        // Checking first , if the comment exists------
        const comment = await CommentSchema.findById(commentId);
        if (!comment) {
          return res.status(404).json({
            message: "Comment not found",
          });
        }
    
        // now will Delete the comment------
        await CommentSchema.findByIdAndDelete(commentId);
    
        res.status(200).json({
            success: true,
             message: 'Comment deleted successfully' 
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    
}



  module.exports = { addComment,deleteComment };
