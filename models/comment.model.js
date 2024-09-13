const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'PostModal', required: true },  // References the post
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModal', required: true },  // References the user who made the comment
    comment: { type: String, required: true },                                        
    createdAt: { type: Date, default: Date.now },                                      
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const CommentModal=mongoose.model("commentModal",CommentSchema)

module.exports = CommentModal;
