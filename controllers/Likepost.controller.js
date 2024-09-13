// controllers/postController.js
const PostSchema = require("../models/post.model");
const LikePostSchema = require("../models/LikePost.model");

// Like a Post-------
const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    // fist will Check if the post exist----------------
    const post = await PostSchema.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post-------------------
    const existingLike = await LikePostSchema.findOne({ post: postId, user: userId });

    if (existingLike) {
      return res.status(400).json({ message: "you already liked this post" });
    } else {

        const newLike = new LikePostSchema({ post: postId, user: userId });
        await newLike.save();

    //  we will increase the like in post--------------
      await PostSchema.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });

      return res.status(200).json({ success: true, message: "Post liked" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unlike a Post--------------
const unlikePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    // we will Check if the post exist----------------
    const post = await PostSchema.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has liked the post--------------
    const likepresent = await LikePostSchema.findOne({ post: postId, user: userId });

    if (!existingLike) {
      return res.status(400).json({ message: "Post not liked yet" });
    } else {
      // Remove the like--------------
      await LikePostSchema.findByIdAndDelete(likepresent._id);

      //  decrement likesCount in the Post model-------------------
      await PostSchema.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });

      return res.status(200).json({ success: true, message: "Post unliked" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { likePost, unlikePost };
